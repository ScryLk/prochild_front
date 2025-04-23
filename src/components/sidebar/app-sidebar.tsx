import {
  Home,
  Search,
  Settings,
  User2,
  ChevronUp,
  ListOrdered,
  LayoutGrid,
  Book,
} from "lucide-react";

import logo from "@public/logo-color.png"

import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Página Inicial",
    url: "/",
    icon: Home,
  },
  {
    title: "Pesquisar",
    url: "/search",
    icon: Search,
  },
  {
    title: "Seções",
    url: "/sections",
    icon: ListOrdered,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: LayoutGrid,
  },
  {
    title: "Treinamentos",
    url: "/trainings",
    icon: Book,
  },
];
export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="bg-stone-100 flex flex-col-reverse md:flex-col">
        {/* Footer com os ícones no modo responsivo */}
        <SidebarFooter className="md:hidden flex justify-around bg-gray-200 p-2">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className={`flex flex-col items-center gap-1 text-sm ${
                location.pathname === item.url
                  ? "text-gray-800"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.title}</span>
            </a>
          ))}
        </SidebarFooter>

        {/* Conteúdo principal da Sidebar (visível em telas maiores) */}
        <div className="hidden md:block">
          <SidebarGroup>
            <div className="flex items-center justify-center h-16">
              <img
                src="./logo-color-three.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <SidebarGroupLabel>Prochild</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                        location.pathname === item.url
                          ? "bg-gray-500 text-white hover:bg-gray-700 hover:text-white"
                          : "hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-300 focus:text-gray-900"
                      }`}
                    >
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}