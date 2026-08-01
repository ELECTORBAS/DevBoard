"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weeklyProgress = [
  { name: "Mon", completed: 4, pending: 2 },
  { name: "Tue", completed: 6, pending: 3 },
  { name: "Wed", completed: 5, pending: 2 },
  { name: "Thu", completed: 7, pending: 4 },
  { name: "Fri", completed: 8, pending: 2 },
  { name: "Sat", completed: 6, pending: 1 },
];

const projectBreakdown = [
  { name: "Product planning", value: 26 },
  { name: "UI polish", value: 22 },
  { name: "Backend work", value: 18 },
  { name: "QA review", value: 16 },
  { name: "Infra tasks", value: 18 },
];

const statCards = [
  { label: "Open projects", value: "4", detail: "3 active boards" },
  { label: "Tasks in flow", value: "18", detail: "7 due this week" },
  { label: "Urgent items", value: "5", detail: "2 blocked by review" },
  { label: "Delivery rate", value: "82%", detail: "Across 37 completed tasks" },
];

const sampleProjects = [
  {
    name: "DevBoard Redesign",
    description: "Refreshing the dashboard experience and navigation patterns.",
    tasks: 12,
    completed: 8,
    status: "In review",
    accent: "from-violet-500 to-fuchsia-500",
    progress: 67,
  },
  {
    name: "Auth Improvements",
    description: "Improving onboarding and account security flows.",
    tasks: 9,
    completed: 5,
    status: "In progress",
    accent: "from-sky-500 to-cyan-500",
    progress: 56,
  },
  {
    name: "Notifications Hub",
    description: "Centralizing updates for comments, mentions, and alerts.",
    tasks: 7,
    completed: 4,
    status: "Planned",
    accent: "from-emerald-500 to-lime-500",
    progress: 43,
  },
];

const activityFeed = [
  { title: "New task assigned", detail: "Design review moved to QA board" },
  { title: "Sprint updated", detail: "Sprint 11 has 3 completed items" },
  { title: "Project shared", detail: "Notifications Hub opened for review" },
];

const COLORS = ["#8b5cf6", "#22c55e", "#f59e0b", "#38bdf8", "#fb7185"];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Developer overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              Your product delivery is trending up
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              This snapshot mirrors the way your project board tracks active
              work, task progress, and sprint delivery.
            </p>
          </div>
          <div className="rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground">
            Updated 5 min ago
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {card.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Weekly progress
              </h2>
              <p className="text-sm text-muted-foreground">
                Completed versus pending tasks across the current workweek
              </p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProgress}>
                <defs>
                  <linearGradient
                    id="completedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.2)"
                />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#completedGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Project focus
            </h2>
            <p className="text-sm text-muted-foreground">
              Distribution of effort across active initiatives
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {projectBreakdown.map((entry, index) => (
                    <Cell
                      key={`${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {projectBreakdown.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-foreground">{item.name}</span>
                </div>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Projects</h2>
            <p className="text-sm text-muted-foreground">
              Sample workspace projects for the board experience
            </p>
          </div>
          <button className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent">
            Create new project
          </button>
        </div>

        <div className="space-y-3">
          {sampleProjects.map((project) => (
            <div
              key={project.name}
              className="rounded-xl border border-border/80 bg-background/70 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${project.accent}`}
                >
                  <span className="text-sm font-semibold text-white">
                    {project.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-foreground">
                      {project.name}
                    </h3>
                    <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-400">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-border">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${project.accent}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{project.tasks} tasks</span>
                    <span>{project.completed} completed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border/80 bg-background/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-foreground">Recent activity</h3>
            <span className="text-sm text-muted-foreground">Today</span>
          </div>
          <div className="space-y-2">
            {activityFeed.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border/70 bg-card/50 p-3"
              >
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
