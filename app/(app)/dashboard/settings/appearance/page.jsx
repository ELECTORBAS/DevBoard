"use client";

import { useTheme } from "next-themes";
import { Palette } from "lucide-react";

const themeOptions = [
  { title: "Dark", value: "dark", description: "A modern low-light workspace." },
  { title: "Light", value: "light", description: "Crisp and bright surfaces." },
  { title: "Ocean", value: "ocean", description: "Cool blue tones for calm focus." },
  { title: "Forest", value: "forest", description: "Earthy greens for grounded productivity." },
  { title: "Sunset", value: "sunset", description: "Soft dusk hues with easier contrast." },
  { title: "Amber", value: "amber", description: "Warm amber tones with balanced readability." },
  { title: "Aurora", value: "aurora", description: "Soft teal highlights with vivid contrast." },
  { title: "Ember", value: "ember", description: "Rich orange warmth with subtle depth." },
  { title: "Citrine", value: "citrine", description: "Bright golden accents with gentle warmth." },
  { title: "Midnight", value: "midnight", description: "Deep navy mood with crisp highlights." },
  { title: "Lavender", value: "lavender", description: "Soft purple shadows with calm clarity." },
  { title: "Stone", value: "stone", description: "Neutral slate tones for subtle focus." },
];

const options = [
  { title: "Compact mode", value: "Off" },
  { title: "Sidebar density", value: "Comfortable" },
  { title: "Language", value: "English" },
];

export default function AppearanceSettingsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme || "dark";
  const currentThemeLabel = themeOptions.find((theme) => theme.value === currentTheme)?.title || "Dark";

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Appearance</h1>
            <p className="mt-2 text-sm text-muted-foreground">Match DevBoard to your preferred style and workflow.</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {currentThemeLabel}
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="size-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Theme selection</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {themeOptions.map((option) => {
            const active = currentTheme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={`group rounded-3xl border px-4 py-5 text-left transition ${
                  active
                    ? "border-primary/30 bg-primary/10 shadow-sm"
                    : "border-border bg-background/70 hover:border-border/80 hover:bg-background"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{option.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <span className={`inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold ${
                    active ? "bg-primary text-primary-foreground" : "bg-muted/10 text-muted-foreground"
                  }`}>
                    {active ? "Selected" : "Choose"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="size-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Workspace styling</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/70 p-4">
            <p className="text-sm text-muted-foreground">Theme</p>
            <p className="mt-1 font-medium text-foreground">{currentThemeLabel}</p>
          </div>
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
