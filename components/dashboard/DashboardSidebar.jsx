"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Settings, Menu, X, Bell, Plus, UserCircle2 } from "lucide-react";

import ThemeToggle from "@/components/Landing/ThemeToggle";
import SignOutButton from "@/components/auth/SignOutButton";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isSettingsPage = pathname?.startsWith("/dashboard/settings");
  const isCollapsed = isSettingsPage;
  const shouldExpand = isCollapsed && isHovered;

  const userInitial = (session?.user?.name || session?.user?.email || "U")
    .charAt(0)
    .toUpperCase();
  const avatarSrc = session?.user?.image || "/default-avatar.png";

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: UserCircle2,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const projects = [
    {
      name: "Project Alpha",
      href: "/dashboard/projects/alpha",
      color: "#3b82f6",
    },
    {
      name: "Project Beta",
      href: "/dashboard/projects/beta",
      color: "#10b981",
    },
    {
      name: "Project Gamma",
      href: "/dashboard/projects/gamma",
      color: "#f59e0b",
    },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Top Header & Navigation */}
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <Link
          href="/dashboard"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-2 py-1.5 transition-[opacity,transform] duration-300 ease-out hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="DevBoard Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          {(shouldExpand || !isCollapsed) && (
            <div className="flex flex-col">
              <span
                className="text-lg font-bold tracking-tight text-sidebar-foreground"
                style={{ fontFamily: "var(--font-audiowide)" }}
              >
                DevBoard
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                Workspace
              </span>
            </div>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {(shouldExpand || !isCollapsed) && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </div>
          )}
          {navLinks.map((link, i) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={i}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color,transform,opacity] duration-250 ease-out",
                  isCollapsed && !shouldExpand && "justify-center px-2",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "size-4",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {(shouldExpand || !isCollapsed) && <span>{link.name}</span>}
                </span>

                {(shouldExpand || !isCollapsed) && link.name === "Notifications" && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    4+
                  </span>
                )}
              </Link>
            );
          })}
          
        </nav>

        {/* Projects Links */}
        <nav className="space-y-1 mt-10">
          {(shouldExpand || !isCollapsed) && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Projects
            </div>
          )}
          {projects.map((project, i) => {
            const color = project.color;
            const isActive = pathname === project.href;

            return (
              <Link
                key={i}
                href={project.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color,transform,opacity] duration-250 ease-out",
                  isCollapsed && !shouldExpand && "justify-center px-2",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <span
                  style={{ backgroundColor: color }}
                  className="size-3 rounded-full"
                />
                {(shouldExpand || !isCollapsed) && <span>{project.name}</span>}
              </Link>
            );
          })}
          {(shouldExpand || !isCollapsed) && (
            <Link href={"/dashboard"} className="flex items-center justify-between gap-3 rounded-lg mt-6 px-3 py-2.5 text-sm font-medium transition-colors text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
              New Project <Plus />
            </Link>
          )}
        </nav>
      </div>

      {/* Bottom User Info, Theme Toggle & Logout */}
      <div className="space-y-4 pt-4 border-t border-sidebar-border">
        {/* User Card */}
        {status === "loading" ? (
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-2.5 animate-pulse">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/70" />
            <div className="flex flex-1 flex-col gap-2 overflow-hidden text-left">
              <div className="h-3 w-24 rounded-full bg-muted/70" />
              <div className="h-2.5 w-16 rounded-full bg-muted/60" />
            </div>
          </div>
        ) : (
          session?.user && (
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {session.user?.image ? (
                  <Image
                    src={avatarSrc}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <span>{userInitial}</span>
                )}
              </div>
              {(shouldExpand || !isCollapsed) && (
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-xs font-semibold text-sidebar-foreground truncate">
                    {session.user.name || "User"}
                  </span>
                  {session.user.username && (
                    <span className="text-[11px] text-muted-foreground font-mono truncate">
                      @{session.user.username}
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-2 px-1">
          <ThemeToggle />
          <SignOutButton className="dashboard-sidebar-signout" variant="outline" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between border-b border-border bg-sidebar px-4 py-3 sticky top-0 z-30">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="DevBoard Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span
            className="font-bold text-sidebar-foreground"
            style={{ fontFamily: "var(--font-audiowide)" }}
          >
            DevBoard
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar (Fixed Left Column) */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "hidden md:flex h-screen shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar sticky top-0 transition-[width,transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isCollapsed ? (shouldExpand ? "w-64" : "w-20") : "w-64",
        )}
      >

        {sidebarContent}
      </aside>
    </>
  );
}
