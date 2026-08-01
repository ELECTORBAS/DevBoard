"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { id: "profile", label: "Profile", description: "Name, username, and bio", href: "/dashboard/settings/profile" },
  { id: "security", label: "Security", description: "Password and sessions", href: "/dashboard/settings/security" },
  { id: "notifications", label: "Notifications", description: "Email and in-app alerts", href: "/dashboard/settings/notifications" },
  { id: "appearance", label: "Appearance", description: "Theme and layout", href: "/dashboard/settings/appearance" },
  { id: "integrations", label: "Integrations", description: "Connected tools", href: "/dashboard/settings/integrations" },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-6 md:px-4 md:py-8">
      <div className="mb-6 rounded-[28px] border border-border bg-gradient-to-br from-primary/10 via-background to-card/80 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Workspace settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Account preferences</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage the parts of DevBoard that shape how you work every day, from your profile to your notification habits.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-muted-foreground shadow-sm">
            changes update instantly
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        <aside className="w-full shrink-0 xl:w-64">
          <div className="sticky top-6 rounded-2xl border border-border bg-card/80 p-3 shadow-sm">
            <div className="mb-3 px-2 py-1">
              <p className="text-sm font-semibold text-foreground">Settings</p>
              <p className="text-sm text-muted-foreground">Organized by area</p>
            </div>
            <nav className="space-y-1">
              {sections.map((section) => {
                const isActive = pathname === section.href || pathname.startsWith(`${section.href}/`);

                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-primary/30 bg-primary/10 shadow-sm"
                        : "border-transparent hover:border-border hover:bg-background/70"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{section.label}</p>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
