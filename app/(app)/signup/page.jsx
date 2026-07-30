import { Suspense } from "react";

import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign Up | DevBoard",
  description: "Create your DevBoard account",
};

export default function SignUpPage() {
  return (
    <section className="auth">
      <Suspense fallback={<div className="auth-card">Loading...</div>}>
        <AuthForm mode="signup" />
      </Suspense>
    </section>
  );
}
