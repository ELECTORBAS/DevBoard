import { eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";

function normalizeUsername(value) {
  if (!value) {
    return "user";
  }

  const normalized = String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);

  return normalized || "user";
}

function buildUsernameBase({ name, email }) {
  if (name) {
    return name;
  }

  if (email) {
    return String(email).split("@")[0] || "user";
  }

  return "user";
}

export function buildUsername({ name, email, provider, providerAccountId }) {
  const base = buildUsernameBase({ name, email, provider, providerAccountId });
  return normalizeUsername(base);
}

export function getFallbackName({ name, email }) {
  return String(name || email || "User").trim() || "User";
}

export async function getUniqueUsername({
  db = getDb(),
  base,
  excludeUserId,
  provider,
  providerAccountId,
}) {
  const seed = base || buildUsername({ provider, providerAccountId });
  let candidate = normalizeUsername(seed);
  let suffix = 1;

  while (true) {
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, candidate))
      .limit(1);

    if (!existing || existing.id === excludeUserId) {
      return candidate;
    }

    candidate = `${normalizeUsername(seed)}-${suffix}`;
    suffix += 1;
  }
}

export async function ensureUserProfile({ user, account, profile, db = getDb() }) {
  if (!user?.id) {
    return null;
  }

  const [existingUser] = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!existingUser) {
    return null;
  }

  const nextName = getFallbackName({
    name: existingUser.name || profile?.name || user.name || user.email,
    email: existingUser.email,
  });
  const nextUsername = existingUser.username
    ? existingUser.username
    : await getUniqueUsername({
        db,
        base: buildUsername({
          name: nextName,
          email: existingUser.email,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId || profile?.sub,
        }),
        excludeUserId: existingUser.id,
      });

  const updates = {};

  if (!existingUser.name) {
    updates.name = nextName;
  }

  if (!existingUser.username) {
    updates.username = nextUsername;
  }

  if (Object.keys(updates).length === 0) {
    return existingUser;
  }

  await db.update(users).set(updates).where(eq(users.id, existingUser.id));

  return {
    ...existingUser,
    ...updates,
  };
}

export async function updateUserUsername({ userId, username, db = getDb() }) {
  const normalizedUsername = normalizeUsername(username);

  if (!normalizedUsername || normalizedUsername === "user") {
    throw new Error("Username must contain at least one letter or number");
  }

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, normalizedUsername))
    .limit(1);

  if (existing?.id === userId) {
    return { username: normalizedUsername, changed: false };
  }

  if (existing) {
    throw new Error("That username is already taken");
  }

  await db
    .update(users)
    .set({ username: normalizedUsername, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return { username: normalizedUsername, changed: true };
}
