import {
  Home,
  Search,
  ListOrdered,
  LayoutGrid,
  Book,
  ChevronUp,
  User,
} from "lucide-react";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
  {
    title: "Usuários",
    url: "/users",
    icon: User
  }
];

export function AppSidebar() {
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const userNameFromSession = user.name; 
          setUserName(userNameFromSession || "Usuário");
        } else {
          setUserName("Usuário");
        }
      } catch (error) {
        console.error("Erro ao obter o nome do usuário:", error);
        setUserName("Usuário");
      }
    };
  
    fetchUserName();
  }, []);

  return (
    <Sidebar>
      <SidebarContent className="bg-stone-100 flex flex-col-reverse md:flex-col">
        <SidebarFooter className="md:hidden fixed bottom-0 w-full bg-gray-200 p-2 flex justify-around">
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
        <div className="hidden md:block">
          <SidebarGroup>
            <div className="flex items-center justify-center h-16">
              <img
                src="./logo-color-three.png"
                alt="Logo"
                className="h-38 w-38 flex object-contain"
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
        <SidebarFooter className="hidden md:block mt-auto p-4 border-t border-gray-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex cursor-pointer items-center gap-2 w-full">
                {userName}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width] hover:border-1 hover:border-gray-500">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}