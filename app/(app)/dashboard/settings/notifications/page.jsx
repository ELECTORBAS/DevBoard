"use client";

import { useState } from "react";
import { BellRing } from "lucide-react";
import SettingsToggle from "@/components/settings/SettingsToggle";

const options = [
  { key: "mentions", label: "Mentions and comments" },
  { key: "assignments", label: "Task assignments" },
  { key: "invitations", label: "Project invitations" },
  { key: "summaries", label: "Weekly summaries" },
];

export default function NotificationsSettingsPage() {
  const [toggles, setToggles] = useState({
    mentions: true,
    assignments: true,
    invitations: false,
    summaries: true,
  });

  const toggleSetting = (key) => {
    setToggles((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Notifications</h1>
            <p className="mt-2 text-sm text-muted-foreground">Choose what should reach you in-app and by email.</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Balanced</div>
        </div>
      </section>

      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BellRing className="size-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Delivery preferences</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Fine-tune how updates arrive so your inbox feels useful instead of noisy.</p>
        <div className="space-y-3">
          {options.map((item) => (
            <SettingsToggle
              key={item.key}
              label={item.label}
              enabled={toggles[item.key]}
              onToggle={() => toggleSetting(item.key)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
