import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  setActive?: boolean; // Prop opcional para destacar o item ativo
}

export function Breadcrumb({ items, setActive = true }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === items.length - 1 && setActive ? (
            // Item ativo (último item)
            <span className="text-gray-800 font-semibold">{item.label}</span>
          ) : (
            // Itens não ativos
            <Link
              to={item.href}
              className="hover:text-gray-800 text-gray-600 font-medium"
            >
              {item.label}
            </Link>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}