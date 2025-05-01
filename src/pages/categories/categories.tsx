import * as Icons from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import Layout from "@/components/layout/layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash, Pen, Library } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: number;
  nome: string;
  treinamentos_cadastrados: number;
  secao_nome: string;
  icone_id: string;
  created_at: Date;
  updated_at: Date;
}

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

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [editNome, setEditNome] = useState<string>("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editIcon, setEditIcon] = useState<string>("");
  const [editSecao, setEditSecao] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null); // Ícone atualmente selecionado
  const [sections, setSections] = useState<Section[]>([]);
  const [editSection, setEditSection] = useState<number | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]); // Estado para armazenar os treinamentos
  const [trainingsDialogOpen, setTrainingsDialogOpen] =
    useState<boolean>(false); // Controle do diálogo de treinamentos

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categorias", href: "/categories" },
  ];

  interface Category {
    id: number;
    nome: string;
    treinamentos_cadastrados: number;
    secao_nome: string;
    secao_id: number; // Adicionado para corrigir o erro
    icone_id: string;
    created_at: Date;
    updated_at: Date;
  }

  interface Training {
    id: number;
    titulo: string;
    descricao: string;
    arquivo_nome: string;
    arquivo_caminho: string;
    tamanho: string;
    created_at: Date;
  }

  interface Section {
    id: number;
    nome: string;
  }

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/sections/sections/",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const result = await response.json();
          setSections(result.Sucesso || []); // Acessa o campo "Sucesso" corretamente
        } else {
          toast.error("Erro ao carregar as seções.");
        }
      } catch (error) {
        toast.error("Erro ao conectar ao servidor.");
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/categories/categories/",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const result = await response.json();
          setCategories(result.success || []);
        } else {
          setError("Erro ao carregar as categorias.");
        }
      } catch (error) {
        setError("Erro ao conectar ao servidor.");
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/categories/delete/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryId)
        );
        toast.success("Categoria deletada com sucesso!");
      } else {
        toast.error("Erro ao excluir a categoria.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditNome(category.nome);
    setEditSection(category.secao_id); // Configura o ID da seção vinculada
    setEditIcon(category.icone_id);
    setEditOpen(true); // Abre o diálogo de edição
  };

  const handleListTraining = async (categoryId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/trainings/trainings/categorie/${categoryId}`,
        {
          method: "GET",
          credentials: "include", // Inclui cookies automaticamente
        }
      );

      if (response.ok) {
        const result = await response.json();
        setTrainings(result.success || []); // Atualiza o estado com os treinamentos retornados
        setTrainingsDialogOpen(true); // Abre o diálogo para exibir os treinamentos
      } else {
        toast.error("Erro ao carregar os treinamentos.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  const handleEditSave = async () => {
    if (!selectedCategory || editNome.trim() === "") {
      toast.error("O nome não pode estar vazio.");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/categories/edit/${selectedCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            nome: editNome,
            secao_nome: editSecao,
            icone_id: editIcon,
          }),
        }
      );
      if (response.ok) {
        setCategories((prev) =>
          prev.map((category) =>
            category.id === selectedCategory.id
              ? {
                  ...category,
                  nome: editNome,
                  secao_nome: editSecao,
                  icone_id: editIcon,
                }
              : category
          )
        );
        toast.success("Categoria atualizada com sucesso!");
        setEditOpen(false);
        setSelectedCategory(null);
      } else {
        toast.error("Erro ao atualizar a categoria.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-xl font-bold mt-5">Categorias</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <a href="/addcategories">
            <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
              Adicionar Categoria
            </Button>
          </a>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Table>
          <TableCaption>
            {categories.length === 0
              ? "Nenhuma categoria cadastrada. Adicione uma categoria."
              : "Lista de Categorias"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Categoria</TableHead>
              <TableHead>Ícone</TableHead>
              <TableHead>Seção</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.nome}</TableCell>
                <TableCell>
                  <Suspense fallback={<span>Carregando...</span>}>
                    {category.icone_id ? (
                      <DynamicIcon iconName={category.icone_id} />
                    ) : (
                      "Sem ícone"
                    )}
                  </Suspense>
                </TableCell>
                <TableCell>{category.secao_nome}</TableCell>
                <TableCell>
                  {new Date(category.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(category.updated_at).toLocaleString()}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <div className="flex gap-5 items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="hover:bg-emerald-300 cursor-pointer rounded-md p-2"
                            onClick={() => {
                              setEditNome(category.nome);
                              setEditIcon(category.icone_id);
                              setEditSecao(category.secao_nome);
                              setSelectedCategory(category);
                              setEditOpen(true); // Abre o diálogo de edição
                            }}
                          >
                            <Pen color="blue" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <AlertDialog>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <button
                                className="hover:bg-red-300 cursor-pointer rounded-md p-2"
                                onClick={() =>
                                  setSelectedCategoryId(category.id)
                                }
                              >
                                <Trash color="red" />
                              </button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excluir</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar Exclusão
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza de que deseja excluir esta categoria?
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 cursor-pointer hover:bg-red-600"
                            onClick={() => {
                              if (selectedCategoryId !== null) {
                                handleDelete(selectedCategoryId);
                                setSelectedCategoryId(null);
                              }
                            }}
                          >
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="hover:bg-gray-300 cursor-pointer rounded-md p-2"
                            onClick={() => handleListTraining(category.id)} // Passa o ID da categoria
                          >
                            <Library color="black" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Treinamentos Cadastrados</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Altere os campos abaixo e clique em "Salvar".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="edit-nome">Nome</Label>
            <Input
              id="edit-nome"
              value={editNome}
              onChange={(e) => setEditNome(e.target.value)}
            />

            <Label htmlFor="edit-secao">Seção</Label>
            <Select
              value={editSection?.toString()} // Define o valor inicial como o ID da seção vinculada
              onValueChange={(value) => setEditSection(Number(value))} // Atualiza o estado ao selecionar uma nova seção
            >
              <SelectTrigger id="edit-secao" className="w-auto">
                <SelectValue placeholder="Selecione uma seção" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seções</SelectLabel>
                  {sections.map((section) => (
                    <SelectItem
                      key={section.id}
                      value={section.id.toString()}
                      className="cursor-pointer hover:bg-gray-100 hover:text-black rounded-md"
                    >
                      {section.nome} {/* Exibe o nome da seção */}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label htmlFor="edit-icon">Ícone</Label>
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

            <div className="mt-2">
              <Label>Pré-visualização do ícone:</Label>
              <div className="mt-1">
                {editIcon && <DynamicIcon iconName={editIcon} />}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="bg-gray-500 hover:bg-gray-600"
              onClick={() => setEditOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleEditSave}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={trainingsDialogOpen} onOpenChange={setTrainingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Treinamentos Cadastrados</DialogTitle>
            <DialogDescription>
              Lista de treinamentos vinculados à categoria.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableCaption>Lista de Treinamentos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Arquivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.length > 0 ? (
                trainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">
                      {training.titulo}
                    </TableCell>
                    <TableCell>{training.descricao}</TableCell>
                    <TableCell>
                      <a
                        href={training.arquivo_caminho}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Baixar Arquivo
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    Nenhum treinamento cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer"
              onClick={() => setTrainingsDialogOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Layout>
  );
}

function DynamicIcon({ iconName }: { iconName: string }) {
  const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType;
  if (!Icon) return <span>Ícone não encontrado</span>;
  return <Icon />;
}
