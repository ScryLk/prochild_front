import Layout from "@/components/layout/layout";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddSections() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Seções", href: "/sections" },
    { label: "Adicionar Seção", href: "/addsections" },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">Adicionar Seção</h1>
        <label htmlFor="category-name">Nome da Seção</label>
        <Input
          id="category-name"
          placeholder="Nome da Seção"
          className="w-3/5"
        />
        <div className="flex gap-3">
          <Button className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer">
            Salvar
          </Button>
          <a href="/">
            <Button className="bg-gray-500 w-28 hover:bg-gray-700 mt-5 cursor-pointer">
              Cancelar
            </Button>
          </a>
        </div>
      </div>
    </Layout>
  );
}
