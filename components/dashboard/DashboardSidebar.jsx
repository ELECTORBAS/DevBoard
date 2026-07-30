"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Settings, User, Menu, X } from "lucide-react";

import ThemeToggle from "@/components/Landing/ThemeToggle";
import SignOutButton from "@/components/auth/SignOutButton";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
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
          className="flex items-center gap-3 px-2 py-1.5 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="DevBoard Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
              DevBoard
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Workspace
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Info, Theme Toggle & Logout */}
      <div className="space-y-4 pt-4 border-t border-sidebar-border">
        {/* User Card */}
        {session?.user && (
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              <User className="size-4" />
            </div>
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
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-2 px-1">
          <ThemeToggle />
          <SignOutButton className="mt-0 h-9 px-3 text-xs" variant="outline" />
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
          <span className="font-bold text-sidebar-foreground">DevBoard</span>
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
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar (Fixed Left Column) */}
      <aside className="hidden md:flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
