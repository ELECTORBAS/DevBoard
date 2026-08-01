"use client";

import { ShieldCheck, KeyRound, MonitorSmartphone } from "lucide-react";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Security</h1>
            <p className="mt-2 text-sm text-muted-foreground">Protect your workspace with stronger account controls.</p>
          </div>
          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">Recommended</div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <KeyRound className="size-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Password</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Last changed 3 months ago. Use a password manager for better protection.</p>
          <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">Change password</button>
        </section>

        <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="size-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Active sessions</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">2 sessions are currently active on desktop and mobile.</p>
          <button className="mt-4 rounded-lg border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background">Review sessions</button>
        </section>

        <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Security recommendations</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border bg-background/70 p-4">Enable two-step verification for extra protection.</div>
            <div className="rounded-xl border border-border bg-background/70 p-4">Review connected devices and revoke unknown sessions.</div>
            <div className="rounded-xl border border-border bg-background/70 p-4">Keep recovery options updated for fast account access.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
