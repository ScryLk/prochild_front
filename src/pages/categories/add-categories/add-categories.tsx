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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
          <SelectTrigger
            id="parent-category"
            className="w-[180px] cursor-pointer"
          >
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-3/5 cursor-pointer">
              Adicionar Icone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Icone</DialogTitle>
              <DialogDescription>
                Adicionar icone para identificação da categoria, apenas formato
                SVG permitido
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                {/* Estilização do input de arquivo */}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer col-span-4 flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Escolher Icone
                  <input id="file-upload" type="file" className="sr-only" />
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer"
          >
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
