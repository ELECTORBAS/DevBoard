"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg className="auth-google-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 15.02 1 12 1 7.35 1 3.4 3.65 1.54 7.54l3.86 3C6.35 7.54 8.96 5.04 12 5.04z"
      />
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.44-1.09 2.66-2.31 3.48l3.6 2.79c2.1-1.94 3.76-4.8 3.76-8.37z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.46c-.25-.75-.39-1.56-.39-2.46s.14-1.71.39-2.46l-3.86-3C.54 8.56 0 10.22 0 12s.54 3.44 1.54 5.46l3.86-3z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.6-2.79c-.99.66-2.27 1.06-4.36 1.06-3.04 0-5.65-2.5-6.6-5.5l-3.86 3C3.4 20.35 7.35 23 12 23z"
      />
    </svg>
  );
}

export default function GoogleSignInButton({ callbackUrl = "/dashboard" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signIn("google", { callbackUrl });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="auth-google-btn"
    >
      <GoogleIcon />
      <span>{loading ? "Connecting..." : "Continue with Google"}</span>
    </button>
  );
}
