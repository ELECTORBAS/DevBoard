import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Dashboard | DevBoard",
  description: "Manage your DevBoard tasks and settings",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
