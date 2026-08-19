"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "סקירה", href: "/admin", icon: LayoutDashboard },
  { label: "לידים", href: "/admin/leads", icon: Users },
  { label: "משימות", href: "/admin/tasks", icon: CheckSquare },
  { label: "חשבוניות", href: "/admin/invoices", icon: FileText },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <Sidebar collapsible="icon" side="right" className="border-l border-sidebar-border">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              size="lg"
              className="h-11 px-2 hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent group-data-[collapsible=icon]:hidden"
            >
              <Link href="/admin">
                <Image
                  src="/logo.png"
                  alt="JT Solutions"
                  width={28}
                  height={28}
                  className="size-7 rounded-md object-contain"
                />
                <span className="text-base font-semibold text-slate-900">JT Admin</span>
              </Link>
            </SidebarMenuButton>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-4 p-3">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="h-8 px-1 text-sm">ניהול</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className={cn(
                        "h-10 gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a] hover:text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn("size-4", active ? "text-white" : "text-slate-600")}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="gap-3 px-3 pb-3">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="הגדרות"
              className="h-10 gap-3 rounded-lg px-3 text-sm text-slate-500"
              disabled
            >
              <Settings className="size-4" />
              <span>הגדרות</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="חשבון"
                  className="flex h-11 items-center gap-3 rounded-md"
                >
                  <Avatar className="size-6 shrink-0">
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      י מ
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-medium group-data-[collapsible=icon]:hidden">
                    יוסף מ
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" side="left" sideOffset={12}>
                <DropdownMenuLabel>החשבון שלי</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>פרופיל</DropdownMenuItem>
                <DropdownMenuItem disabled>הגדרות</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => void logout()}>התנתקות</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
