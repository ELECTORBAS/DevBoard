"use client";

export default function SettingsPage() {
  return (
    <div className="rounded-[28px] border border-border bg-card/80 p-8 shadow-sm">
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-4">
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Workspace setup
        </span>
        <h2 className="text-2xl font-semibold text-foreground">Choose a settings area</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Each section is organized to make account preferences easier to manage. Pick an option from the sidebar to keep refining your workspace experience.
        </p>
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="font-medium text-foreground">Profile</p>
            <p className="mt-1 text-sm text-muted-foreground">Keep your identity clear for teammates and collaborators.</p>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="font-medium text-foreground">Notifications</p>
            <p className="mt-1 text-sm text-muted-foreground">Shape how updates reach you without feeling overwhelming.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
