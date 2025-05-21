import { useEffect, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JSX } from "react";
import { SketchPicker, ColorResult } from "react-color";

interface Section {
  id: number;
  nome: string;
}

export default function AddCategories() {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [savedIcon, setSavedIcon] = useState<string | null>(null);
  const [savedIconComponent, setSavedIconComponent] = useState<JSX.Element | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryColor, setCategoryColor] = useState<string>("#ffffff");
  const [isColorPickerDialogOpen, setIsColorPickerDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          "https://prochild-back-proud-star-4651.fly.dev/sections/sections/",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setSections(result.Sucesso || []); 
        } else {
          console.error("Erro ao carregar as seções.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
      }
    };

    fetchSections();
  }, []);

  const handleSaveIcon = () => {
    const selected = icons.find((icon) => icon.id === selectedIcon);
    if (selected) {
      setSavedIcon(capitalizeFirstLetter(selected.id)); 
      setSavedIconComponent(selected.icon); 
      setIsDialogOpen(false);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim() || !selectedSection || !savedIcon) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    setLoading(true);
  
    try {
      const raw = JSON.stringify({
        secao_id: selectedSection, 
        nome: categoryName, 
        cor: categoryColor, 
        icone_id: savedIcon, 
      });
  
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
        credentials: "include", 
      };
  
      const response = await fetch(
        "https://prochild-back-proud-star-4651.fly.dev/categories/",
        requestOptions
      );
  
      if (response.ok) {
        toast.success("Categoria adicionada com sucesso!");
        setTimeout(() => {
          window.location.href = "/categories";
        }, 2000);
      } else {
        toast.error("Erro ao adicionar a categoria.");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      toast.error("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
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
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <label htmlFor="parent-category">Seção</label>
        <Select onValueChange={(value) => setSelectedSection(value)}>
          <SelectTrigger id="parent-category" className="w-3/5 cursor-pointer">
            <SelectValue placeholder="Selecione uma seção" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seções</SelectLabel>
              {sections.map((section) => (
                <SelectItem key={section.id} value={section.id.toString()}>
                  {section.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <label htmlFor="category-color">Cor da Categoria</label>
        <Dialog
          open={isColorPickerDialogOpen}
          onOpenChange={setIsColorPickerDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-3/5 cursor-pointer flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: categoryColor }}
              ></div>
              {categoryColor ? categoryColor : "Escolher Cor"}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[500px] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Escolher Cor</DialogTitle>
              <DialogDescription>
                Escolha uma cor para identificar a categoria.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <SketchPicker
                color={categoryColor}
                onChangeComplete={(color: ColorResult) =>
                  setCategoryColor(color.hex)
                }
                className="shadow-md"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => setIsColorPickerDialogOpen(false)} 
                className="cursor-pointer"
              >
                Salvar Cor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-3/5 cursor-pointer flex items-center gap-2"
            >
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
                {icons.map((icon) => (
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
                  </button>
                ))}
              </div>
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
            type="button"
            onClick={handleAddCategory}
            className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
          <a href="/categories">
            <Button className="bg-gray-500 w-28 hover:bg-gray-700 mt-5 cursor-pointer" disabled={loading}>
              Cancelar
            </Button>
          </a>
        </div>
      </div>
      <ToastContainer /> 
    </Layout>
  );
}
