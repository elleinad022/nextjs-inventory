import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@neondatabase/auth/react";
import { BarChart3, Package, Plus, Settings, User2 } from "lucide-react";
import Link from "next/link";

export function AppSidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row items-center space-x-2">
          <BarChart3 className="size-10" />
          <span className="text-lg font-semibold tracking-tight text-center">
            Inventory System
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((item, key) => {
          const isActive = currentPath === item.href;
          return (
            <SidebarGroup key={key}>
              <SidebarGroupLabel className="text-sm">
                <Link
                  className={`flex flex-row w-full gap-2 py-2 px-3 rounded-lg uppercase ${isActive ? "bg-sidebar-primary/20" : "hover:bg-sidebar-accent"} `}
                  href={item.href}>
                  {item.icon && <item.icon className="size-5" />}
                  {item.name}
                </Link>
              </SidebarGroupLabel>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton className="bg-sidebar-accent" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
