import NextAuth from "next-auth";

import { getAuthOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

let handler = null;

function getHandler() {
  if (!handler) {
    handler = NextAuth(getAuthOptions());
  }

  return handler;
}

export async function GET(request, context) {
  return getHandler()(request, context);
}

export async function POST(request, context) {
  return getHandler()(request, context);
}
