import { Suspense } from "react";

import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign In | DevBoard",
  description: "Sign in to your DevBoard account",
};

export default function SignInPage() {
  return (
    <section className="auth">
      <Suspense fallback={<div className="auth-card">Loading...</div>}>
        <AuthForm mode="signin" />
      </Suspense>
    </section>
  );
}
