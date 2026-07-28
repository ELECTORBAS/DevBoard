import { Suspense } from "react";

import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign In | DevBoard",
  description: "Sign in to your DevBoard account",
};

export default function SignInPage() {
  return (
    <section className="auth-page">
      <Suspense fallback={<div className="auth-page__card">Loading...</div>}>
        <AuthForm mode="signin" />
      </Suspense>
    </section>
  );
}
