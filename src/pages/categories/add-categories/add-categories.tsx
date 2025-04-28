import { useState } from "react";
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
import {
  Home,
  Search,
  ListOrdered,
  LayoutGrid,
  Book,
  Heart,
  Car,
  Accessibility,
  Stethoscope,
  HeartPulse,
  Bandage,
  Syringe,
  Pill,
  Thermometer,
  Brain,
  Eye,
} from "lucide-react";
import { JSX } from "react";

export default function AddCategories() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null); // Ícone atualmente selecionado
  const [savedIcon, setSavedIcon] = useState<string | null>(null); // Ícone salvo após clicar em "Salvar Ícone"
  const [savedIconComponent, setSavedIconComponent] = useState<JSX.Element | null>(null); // Componente do ícone salvo
  const [currentPage, setCurrentPage] = useState(1); // Página atual para a paginação
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar a visibilidade do Dialog

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categorias", href: "/categories" },
    { label: "Adicionar Categoria", href: "/addcategories" },
  ];

  const icons = [
    { id: "home", icon: <Home />, label: "Home" },
    { id: "search", icon: <Search />, label: "Pesquisar" },
    { id: "sections", icon: <ListOrdered />, label: "Seções" },
    { id: "categories", icon: <LayoutGrid />, label: "Categorias" },
    { id: "trainings", icon: <Book />, label: "Treinamentos" },
    { id: "heart", icon: <Heart />, label: "Favoritos" },
    { id: "car", icon: <Car />, label: "Carro" },
    { id: "accessibility", icon: <Accessibility />, label: "Acessibilidade" },
    { id: "stethoscope", icon: <Stethoscope />, label: "Estetoscópio" },
    { id: "heartPulse", icon: <HeartPulse />, label: "Batimento Cardíaco" },
    { id: "bandage", icon: <Bandage />, label: "Curativo" },
    { id: "syringe", icon: <Syringe />, label: "Seringa" },
    { id: "pill", icon: <Pill />, label: "Pílula" },
    { id: "thermometer", icon: <Thermometer />, label: "Termômetro" },
    { id: "brain", icon: <Brain />, label: "Cérebro" },
    { id: "eye", icon: <Eye />, label: "Olho" },
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(icons.length / itemsPerPage);
  const paginatedIcons = icons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSaveIcon = () => {
    const selected = icons.find((icon) => icon.id === selectedIcon);
    if (selected) {
      setSavedIcon(selected.id);
      setSavedIconComponent(selected.icon); // Salva o componente do ícone
      setIsDialogOpen(false); // Fecha o Dialog
    }
  };

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
        <Select onValueChange={(value) => console.log("Seção selecionada:", savedIcon, value)}>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-3/5 cursor-pointer flex items-center gap-2">
              {savedIconComponent ? (
                <>
                  {savedIconComponent}
                  Ícone Selecionado
                </>
              ) : (
                "Escolher Ícone"
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[500px] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Escolher Ícone</DialogTitle>
              <DialogDescription>
                Escolha um ícone para identificar a categoria.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                {paginatedIcons.map((icon) => (
                  <button
                    key={icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                    className={`p-4 border cursor-pointer rounded-md flex flex-col items-center justify-center ${
                      selectedIcon === icon.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="text-2xl">{icon.icon}</div>
                    <span className="text-sm mt-2 text-center break-words">
                      {icon.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveIcon}
                className="cursor-pointer"
              >
                Salvar Ícone
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