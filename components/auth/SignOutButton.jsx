"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SignOutButton({ className, variant = "outline", ...props }) {
  return (
    <Button
      variant={variant}
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn("mt-6", className)}
      {...props}
    >
      Sign out
    </Button>
  );
}
