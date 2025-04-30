import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { MobileSidebar } from "@/components/sidebar/mobileSidebar/mobileSidebar";
import { Toaster } from "@/components/ui/sonner"




interface LayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode; // Conteúdo principal
}

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar para telas maiores */}
      <div className="hidden md:block h-full">
        <SidebarProvider>
          {sidebar || <AppSidebar />}
        </SidebarProvider>
      </div>

      {/* Main Content */}
      <div className="flex-grow h-full overflow-auto p-4">
        {children}
      </div>

      {/* Sidebar para dispositivos móveis */}
      <MobileSidebar />
      <Toaster />

      {/* Toaster para exibir notificações */}
    </div>
  );
};

export default Layout;