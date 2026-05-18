import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarWrapper } from "@/components/app-sidebar-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarWrapper />
      <main className="relative">
        <SidebarTrigger className="absolute top-4 left-4 z-10" />
        {children}
      </main>
    </SidebarProvider>
  );
}
