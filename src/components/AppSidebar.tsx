import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Radar, Bug, Mail, Kanban, Send,
  User, Users, Settings, Zap, BarChart3, Building2,
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
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      { title: "Brand Radar", url: "/brand-radar", icon: Radar },
      { title: "Scan Debug", url: "/scan-debug", icon: Bug, badge: "DEV" },
    ],
  },
  {
    label: "OUTREACH",
    items: [
      { title: "Email Drafts", url: "/drafts", icon: Mail },
      { title: "Pipeline", url: "/pipeline", icon: Kanban },
      { title: "Sent", url: "/sent", icon: Send },
      { title: "Brands", url: "/brands", icon: Building2 },
    ],
  },
  {
    label: "CREATOR",
    items: [
      { title: "Media Kit", url: "/media-kit", icon: User },
      { title: "Audience", url: "/audience", icon: Users },
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
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 pb-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">Dealflow AI</span>
        </Link>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            W
          </div>
          <span className="text-sm font-medium">Wes Mukkati</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-[10px] font-semibold tracking-widest text-muted-foreground">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive(item.url)
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto h-5 bg-orange-500 text-[10px] text-white hover:bg-orange-500">
                            {item.badge}
                          </Badge>
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
        <p className="text-xs text-muted-foreground text-center">Dealflow AI v0.1</p>
      </SidebarFooter>
    </Sidebar>
  );
}
