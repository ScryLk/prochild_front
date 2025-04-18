import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import AppHeader from "../header/app-header"

interface LayoutProps {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode // Conteúdo principal
}

const Layout: React.FC<LayoutProps> = ({
  header,
  sidebar,
  footer,
  children,
}) => {
  return (
    <div className="flex mt-0  flex-wrap content-start overflow-hidden">
      {/* Header */}
      <div className="w-full mt-0">{header || <AppHeader />}</div>

      {/* Sidebar */}
      <div className="w-1/4 h-3/4">
        <SidebarProvider>
          {sidebar || <AppSidebar />}
        </SidebarProvider>
      </div>

      {/* Content */}
      <div className="grow h-3/4">{children}</div>

      {/* Footer */}
      <div className="w-full h-[5%]">
        {footer || <h1>Direitos Reservados</h1>}
      </div>
    </div>
  )
}

export default Layout