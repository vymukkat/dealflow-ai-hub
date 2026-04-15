import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Radar, Bug, Mail, Kanban, Send,
  User, Users, Settings, Zap, BarChart3, Building2, Sparkles, DollarSign,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      { title: "Brand Radar", url: "/brand-radar", icon: Radar },
      { title: "AI Advisor", url: "/ai-advisor", icon: Sparkles },
      { title: "Scan Debug", url: "/scan-debug", icon: Bug, badge: "DEV" },
    ],
  },
  {
    label: "OUTREACH",
    items: [
      { title: "Email Drafts", url: "/drafts", icon: Mail, dotBadge: "3" },
      { title: "Pipeline", url: "/pipeline", icon: Kanban },
      { title: "Sent", url: "/sent", icon: Send },
      { title: "Revenue", url: "/revenue", icon: DollarSign },
      { title: "Brand CRM", url: "/brands", icon: Building2 },
    ],
  },
  {
    label: "CREATOR",
    items: [
      { title: "Media Kit", url: "/media-kit", icon: User },
      { title: "Audience", url: "/audience", icon: Users },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="p-4 pb-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Dealflow AI</span>
        </Link>
        <div className="mt-3 flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground">
            W
          </div>
          <span className="text-sm font-medium text-foreground">Wes Mukkati</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive(item.url)
                            ? "bg-secondary text-foreground font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto h-5 bg-amber-600 text-[10px] text-white border-0">
                            {item.badge}
                          </Badge>
                        )}
                        {(item as any).dotBadge && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-md bg-amber-600 text-[10px] font-medium text-white">
                            {(item as any).dotBadge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 pt-2">
        <p className="text-xs text-muted-foreground text-center">Dealflow AI v0.1 · Beta</p>
      </SidebarFooter>
    </Sidebar>
  );
}
