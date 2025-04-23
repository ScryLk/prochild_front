import Layout from "@/components/layout/layout";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AddCategories() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categorias", href: "/categories" },
    { label: "Adicionar Categoria", href: "/addcategories" },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">Adicionar Categoria</h1>
        <label htmlFor="category-name">Nome da Categoria</label>
        <Input
          id="category-name"
          placeholder="Nome da Categoria"
          className="w-3/5"
        />
        <label htmlFor="parent-category">Filha de</label>
        <Select>
          <SelectTrigger id="parent-category" className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Seção" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seções</SelectLabel>
              <SelectItem value="cuidadosFisicos">Cuidados Físicos</SelectItem>
              <SelectItem value="partesCorpo">Partes do Corpo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-3">
          <Button className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer">
            Salvar
          </Button>
          <Button className="bg-gray-500 w-28 hover:bg-gray-700 mt-5 cursor-pointer">
            Cancelar
          </Button>
        </div>
      </div>
    </Layout>
  );
}
