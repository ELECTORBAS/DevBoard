import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { updateUserUsername } from "@/lib/auth/username";
import { getServerSession } from "next-auth";

import { getAuthOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const session = await getServerSession(getAuthOptions());

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await request.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const result = await updateUserUsername({
      userId: session.user.id,
      username,
      db: getDb(),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Username update error:", error);
    return NextResponse.json(
      { error: error.message || "Unable to update username" },
      { status: 400 }
    );
  }
}
