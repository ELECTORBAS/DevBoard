import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/auth/SignOutButton";
import UsernameSettings from "@/components/settings/UsernameSettings";
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
    <section className="dashboard-page">
      <div className="dashboard-page__card">
        <p className="dashboard-page__eyebrow">Authenticated</p>
        <h1 className="dashboard-page__title">
          Welcome{session.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="dashboard-page__email">{session.user?.email}</p>
        <p className="dashboard-page__email">
          @{session.user?.username || "set-your-username"}
        </p>
        <div className="mt-4">
          <UsernameSettings />
        </div>
        <SignOutButton />
      </div>
    </section>
  );
}
