"use client";

import { Palette } from "lucide-react";

const options = [
  { title: "Theme", value: "Dark" },
  { title: "Compact mode", value: "Off" },
  { title: "Sidebar density", value: "Comfortable" },
  { title: "Language", value: "English" },
];

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Appearance</h1>
            <p className="mt-2 text-sm text-muted-foreground">Match DevBoard to your preferred style and workflow.</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Minimal</div>
        </div>
      </section>

      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="size-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Workspace styling</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {options.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-background/70 p-4">
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="mt-1 font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
