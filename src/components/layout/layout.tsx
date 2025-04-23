import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

interface LayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode; // Conteúdo principal
}

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-full h-16 md:w-1/5 md:h-full">
        <SidebarProvider>
          {sidebar || <AppSidebar />}
        </SidebarProvider>
      </div>

      {/* Main Content */}
      <div className="flex-grow h-full overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;