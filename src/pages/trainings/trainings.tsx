import { useEffect, useState } from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Pen, Trash, Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Training {
  id: number;
  titulo: string;
  tamanho: string;
  descricao: string;
  arquivo_nome: string;
  arquivo_caminho: string;
  created_at: string;
  updated_at: string;
  categoria_id: number;
  categoria_nome: string;
  secao_id: number;
}

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [categories, setCategories] = useState<
    { id: number; titulo: string }[]
  >([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o Dialog

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Treinamentos", href: "/trainings" },
  ];

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/trainings/trainings",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setTrainings(result.success || []);
        } else {
          console.error("Erro ao carregar os treinamentos.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor.", error);
      }
    };

    fetchTrainings();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/categories/categories",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setCategories(result.success || []);
        } else {
          console.error("Erro ao carregar as categorias.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor.", error);
      }
    };
    console.log(categories);
    fetchCategories();
  }, []);

  const handleDelete = async (trainingId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/trainings/delete/${trainingId}`,
        {
          method: "DELETE",
          credentials: "include", // Inclui cookies automaticamente
        }
      );
      if (response.ok) {
        setTrainings((prev) =>
          prev.filter((training) => training.id !== trainingId)
        );
        toast.success("Treinamento deletado com sucesso!");
      } else {
        toast.error("Erro ao excluir o treinamento.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  return (
    <Layout>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Treinamentos", href: "/trainings" }]} />
      <h1 className="text-xl font-bold mt-5">Treinamentos</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <a href="/addtrainings">
            <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
              Adicionar Treinamento
            </Button>
          </a>
        </div>

        <Table>
          <TableCaption>Treinamentos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Título</TableHead>
              <TableHead className="w-1/6">Categoria</TableHead>
              <TableHead className="w-1/6">Descrição</TableHead>
              <TableHead className="w-1/6">Criado em</TableHead>
              <TableHead className="w-1/6">Atualizado em</TableHead>
              <TableHead className="w-1/6">Arquivo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.length > 0 ? (
              trainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.titulo}</TableCell>
                  <TableCell className="font-medium">{training.categoria_nome}</TableCell>
                  <TableCell>{training.descricao}</TableCell>
                  <TableCell>{new Date(training.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(training.updated_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <a
                      href={training.arquivo_caminho}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {training.arquivo_nome}
                    </a>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="flex gap-5 items-center justify-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={`/edittraining/${training.id}`}>
                              <div className="hover:bg-emerald-300 rounded-md p-2">
                                <Pen color="blue" />
                              </div>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className="hover:bg-red-300 rounded-md p-2"
                                  onClick={() => setSelectedTraining(training)}
                                >
                                  <Trash color="red" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirmar Exclusão
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <p>
                                  Tem certeza de que deseja excluir o treinamento{" "}
                                  <strong>{selectedTraining?.titulo}</strong>? Essa ação não pode
                                  ser desfeita.
                                </p>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="cursor-pointer">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-500 cursor-pointer hover:bg-red-600"
                                    onClick={() => {
                                      if (selectedTraining) {
                                        handleDelete(selectedTraining.id);
                                        setSelectedTraining(null);
                                      }
                                    }}
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excluir</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  Nenhum treinamento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}

