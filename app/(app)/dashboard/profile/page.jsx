"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { BadgeCheck, CalendarDays, Sparkles, Target } from "lucide-react";

const focusAreas = [
  "Design systems",
  "Cross-functional planning",
  "Release readiness",
  "Stakeholder updates",
];

const activityFeed = [
  { title: "Reviewed sprint goals", detail: "Aligned roadmap and adjusted scope for the next milestone." },
  { title: "Shared a design update", detail: "Sent a summary to the product and engineering leads." },
  { title: "Completed 3 key tasks", detail: "Closed blockers around onboarding and onboarding copy." },
];

const recentProjects = [
  { name: "Pulse Workspace", progress: "82%", role: "Product lead" },
  { name: "Release HQ", progress: "64%", role: "Design owner" },
  { name: "Client Portal", progress: "91%", role: "Coordinator" },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const displayName = session?.user?.name || "Ava Chen";
  const displayRole = "Product Lead";
  const avatarSrc = session?.user?.image || "/default-avatar.png";
  const username = session?.user?.username || "ava";

  return (
    <div className="dashboard-page">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/10 via-background to-card p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background/80">
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-foreground">{displayName}</h1>
                  <BadgeCheck className="size-5 text-primary" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{displayRole} • @{username}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Keeps delivery organized, design polished, and every milestone moving with calm clarity.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Projects", value: "12" },
                { label: "Completed", value: "86" },
                { label: "Streak", value: "7d" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-center">
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">About</h2>
                  <p className="text-sm text-muted-foreground">A snapshot of how this user works and collaborates.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  Joined Sep 2024
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { title: "Location", value: "Remote • Lisbon" },
                  { title: "Timezone", value: "GMT +1" },
                  { title: "Focus", value: "Product strategy" },
                  { title: "Availability", value: "Open to new reviews" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="mt-1 font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Focus areas</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span key={area} className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-foreground">
                    {area}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
                <p className="text-sm text-muted-foreground">What has been moving recently.</p>
              </div>
              <div className="space-y-3">
                {activityFeed.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Target className="size-4 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Current momentum</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Tasks in motion", value: "9" },
                  { label: "Weekly wins", value: "4" },
                  { label: "Review requests", value: "2" },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-4 py-3">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <span className="font-semibold text-foreground">{metric.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent projects</h2>
                <p className="text-sm text-muted-foreground">Projects this profile is helping lead.</p>
              </div>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.name} className="rounded-xl border border-border bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground">{project.name}</p>
                      <span className="text-sm text-muted-foreground">{project.progress}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{project.role}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
