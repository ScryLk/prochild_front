import Layout from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Search } from "lucide-react";

export default function SearchBar() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pesquisar", href: "/categories" },
  ];

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-10">
        <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
          Pesquisar
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="search"
            placeholder="Pesquisar"
            className="pl-10" // Adiciona espaço para o ícone
          />
        </div>
      </div>
    </Layout>
  );
}