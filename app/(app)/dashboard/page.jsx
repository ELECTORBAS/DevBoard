import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import SignOutButton from "@/components/auth/SignOutButton";
import { getAuthOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | DevBoard",
  description: "Your DevBoard workspace",
};

export default async function DashboardPage() {
  const session = await getServerSession(getAuthOptions());

  if (!session) {
    redirect("/signin");
  }

  return (
    <section className="dashboard">
      <div className="dashboard-card">
        <p className="dashboard-eyebrow">Authenticated</p>
        <h1 className="dashboard-title">
          Welcome{session.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="dashboard-email">{session.user?.email}</p>
        {session.user?.username && (
          <p className="mt-1 text-sm font-medium text-muted-foreground font-mono">
            @{session.user.username}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/dashboard/settings"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Account Settings
          </Link>
          <SignOutButton />
        </div>
      </div>
    </section>
  );
}
