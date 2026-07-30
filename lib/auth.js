import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { getDb } from "@/lib/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/lib/db/schema";
import { ensureUserProfile, getUniqueUsername } from "@/lib/auth/username";
import { signInSchema } from "@/lib/validations/auth";

/**
 * Wraps the DrizzleAdapter and overrides createUser to include
 * username generation. The base adapter does not know about the
 * custom `username` NOT NULL column, so without this override every
 * new OAuth sign-up would fail with a DB constraint error.
 */
function createAdapter(db) {
  const base = DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  });

  return {
    ...base,
    async createUser(data) {
      const username = await getUniqueUsername({
        db,
        base: data.name || data.email?.split("@")[0] || "user",
      });

      const [user] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          name: data.name || "User",
          email: data.email,
          emailVerified: data.emailVerified ?? null,
          image: data.image ?? null,
          username,
        })
        .returning();

      return user;
    },
  };
}

export function getAuthOptions() {
  const db = getDb();

  return {
    adapter: createAdapter(db),
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/signin",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const parsed = signInSchema.safeParse(credentials);

          if (!parsed.success) {
            return null;
          }

          const { email, password } = parsed.data;

          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (!user?.password) {
            return null;
          }

          const passwordMatches = await bcrypt.compare(password, user.password);

          if (!passwordMatches) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username,
          };
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (!user?.email) {
          return false;
        }

        // For Google OAuth: if the user already existed before linking Google,
        // ensure their profile (name, username) is complete.
        // New Google users are handled entirely by the adapter's createUser override.
        if (account?.provider === "google") {
          const [existingUser] = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, user.email))
            .limit(1);

          if (existingUser) {
            await ensureUserProfile({ user: existingUser, account, profile, db });
          }
          // If !existingUser, adapter.createUser will handle it — do NOT insert here.
        }

        return true;
      },
      async jwt({ token, user, trigger, session }) {
        if (trigger === "update" && session?.username) {
          token.username = session.username;
        }

        if (user) {
          token.id = user.id;
          token.username = user.username ?? null;
        }

        if (token.id && !token.username) {
          const db = getDb();
          const [dbUser] = await db
            .select({ username: users.username })
            .from(users)
            .where(eq(users.id, token.id))
            .limit(1);

          if (dbUser?.username) {
            token.username = dbUser.username;
          }
        }

        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
          session.user.username = token.username ?? null;
        }

        return session;
      },
    },
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET,
  };
}
