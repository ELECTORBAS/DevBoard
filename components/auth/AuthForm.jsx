"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";

export default function AuthForm({ mode = "signin" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  const schema = isSignUp ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: isSignUp
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      if (isSignUp) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error ?? "Unable to create account");
          return;
        }

        toast.success("Account created successfully");
      }

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(
          isSignUp
            ? "Account created, but sign in failed. Try signing in manually."
            : "Invalid email or password"
        );
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="auth-subtitle">
          {isSignUp
            ? "Sign up with email or continue with Google."
            : "Sign in to access your DevBoard workspace."}
        </p>
      </div>

      <GoogleSignInButton callbackUrl={callbackUrl} />

      <div className="auth-divider">
        <span>or</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        {isSignUp && (
          <div className="auth-field">
            <label htmlFor="name" className="auth-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="auth-input"
              placeholder="Jane Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="auth-error">{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="auth-field">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="auth-input"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="auth-error">{errors.email.message}</p>
          )}
        </div>

        <div className="auth-field">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="auth-input"
            placeholder={isSignUp ? "At least 8 characters" : "Your password"}
            {...register("password")}
          />
          {errors.password && (
            <p className="auth-error">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading
            ? isSignUp
              ? "Creating account..."
              : "Signing in..."
            : isSignUp
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>

      <p className="auth-footer">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="auth-link">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="auth-link">
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
