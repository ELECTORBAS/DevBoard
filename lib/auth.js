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
import { signInSchema } from "@/lib/validations/auth";

export function getAuthOptions() {
  return {
    adapter: DrizzleAdapter(getDb(), {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
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
          const db = getDb();

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
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }

        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
        }

        return session;
      },
    },
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET,
  };
}
