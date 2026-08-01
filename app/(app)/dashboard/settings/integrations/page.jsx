"use client";

import { PlugZap } from "lucide-react";

const integrations = [
  { name: "GitHub", status: "Connected" },
  { name: "Slack", status: "Not connected" },
  { name: "Google Drive", status: "Connected" },
];

export default function IntegrationsSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Integrations</h1>
            <p className="mt-2 text-sm text-muted-foreground">Connect the tools you want to use alongside DevBoard.</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Connected</div>
        </div>
      </section>

      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <PlugZap className="size-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Connected tools</h2>
        </div>
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between rounded-xl border border-border bg-background/70 p-4">
              <div>
                <p className="font-medium text-foreground">{integration.name}</p>
                <p className="text-sm text-muted-foreground">{integration.status}</p>
              </div>
              <button className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent">
                {integration.status === "Connected" ? "Manage" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
