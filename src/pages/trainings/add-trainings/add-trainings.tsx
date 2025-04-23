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

export default function AddTraining() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Treinamentos", href: "/trainings" },
    { label: "Adicionar Treinamento", href: "/addtrainings" },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">Adicionar Treinamento</h1>
        <label htmlFor="category-name">Nome do Treinamento</label>
        <Input
          id="category-name"
          placeholder="Nome do treinamento"
          className="w-3/5"
        />
        <label htmlFor="parent-category">Filha de</label>
        <Select>
          <SelectTrigger
            id="parent-category"
            className="w-[180px] cursor-pointer"
          >
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cuidados Físicos</SelectLabel>
              <SelectItem value="intoxicacao">Intoxicação</SelectItem>
              <SelectItem value="viroses">Viroses</SelectItem>
              <SelectItem value="diarreia">Diarreia</SelectItem>
              <SelectItem value="queimaduras">Queimaduras</SelectItem>
              <SelectItem value="fraturas">Fraturas</SelectItem>
              <SelectItem value="engasgo">Engasgo</SelectItem>
              <SelectItem value="paradas">Paradas</SelectItem>
              <SelectItem value="batidas">Batidas</SelectItem>
              <SelectItem value="cortes">Cortes</SelectItem>
              <SelectItem value="lesoes">Lesões</SelectItem>
              <SelectItem value="sangramentos">Sangramentos</SelectItem>
              <SelectItem value="febre">Febre</SelectItem>
              <SelectItem value="convulsoes">Convulsões</SelectItem>
              <SelectItem value="respiratorios">Respiratórios</SelectItem>
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
