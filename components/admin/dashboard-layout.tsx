"use client";

import type { CSSProperties, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardSidebar } from "@/components/admin/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider
        className="jt-admin h-svh min-h-0 overflow-hidden bg-background text-foreground"
        style={
          {
            "--sidebar-width": "15rem",
            "--sidebar-width-icon": "3.25rem",
          } as CSSProperties
        }
      >
        <DashboardSidebar />
        <SidebarInset className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#f8fbff]">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
