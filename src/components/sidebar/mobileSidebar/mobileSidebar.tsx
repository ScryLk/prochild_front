import { useLocation } from "react-router-dom";
import { Home, Search, ListOrdered, LayoutGrid, Book, User } from "lucide-react";

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
    icon: User,
  }
];

export function MobileSidebar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full bg-gray-200 p-2 flex justify-around lg:hidden">
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
    </div>
  );
}