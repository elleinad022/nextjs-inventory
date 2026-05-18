"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

export function AppSidebarWrapper() {
  const pathname = usePathname();
  return <AppSidebar currentPath={pathname} />;
}
