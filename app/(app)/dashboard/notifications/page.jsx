import Link from "next/link";

const notifications = [
  {
    id: 1,
    type: "Mention",
    title: "Alicia mentioned you in DevBoard Redesign",
    detail: "Please review the latest comments before the handoff.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "Task update",
    title: "Auth Improvements moved to review",
    detail: "The onboarding flow now needs a final QA pass.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "Project invite",
    title: "You were invited to Notifications Hub",
    detail: "Open the project to see the shared board and recent activity.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    type: "Reminder",
    title: "Design review is due tomorrow",
    detail: "A reminder was sent for the UI polish checklist.",
    time: "Yesterday",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Notifications
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Mark all read
          </button>
          <Link
            href="/dashboard"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Inbox</h2>
            <p className="text-sm text-muted-foreground">
              A preview of the kind of activity you would see in DevBoard.
            </p>
          </div>
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-400">
            {notifications.filter((item) => item.unread).length} unread
          </span>
        </div>

        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 transition-colors ${
                item.unread
                  ? "border-violet-500/30 bg-violet-500/10"
                  : "border-border bg-background/70"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground">
                    {item.type.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      {item.unread && (
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
