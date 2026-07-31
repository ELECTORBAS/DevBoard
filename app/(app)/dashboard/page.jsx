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
    </section>
  );
}
