"use client";

export default function SettingsToggle({ enabled = false, onToggle, label }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-border bg-background/70 p-4 transition hover:bg-background">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted-foreground/30"}`}
        aria-pressed={enabled}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </label>
  );
}
