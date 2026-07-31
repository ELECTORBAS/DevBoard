import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Dashboard | DevBoard",
  description: "Manage your DevBoard tasks and settings",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
