import { Suspense } from "react";

import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign Up | DevBoard",
  description: "Create your DevBoard account",
};

export default function SignUpPage() {
  return (
    <section className="auth-page">
      <Suspense fallback={<div className="auth-page__card">Loading...</div>}>
        <AuthForm mode="signup" />
      </Suspense>
    </section>
  );
}
