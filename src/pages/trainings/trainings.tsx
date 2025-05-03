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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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

interface Categories {
  id: number;
  nome: string;
  icone_id: string;
  secao_nome: string;
  created_at: string;
  updated_at: string;
}

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
          setCategories(result.success || []); // Certifique-se de que "success" contém as categorias
          console.log("Categorias carregadas:", result.success);
        } else {
          console.error("Erro ao carregar as categorias.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor.", error);
      }
    };

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
        toast.success("Treinamento deletado com sucesso!"); // Exibe o toast de sucesso
      } else {
        toast.error("Erro ao excluir o treinamento."); // Exibe o toast de erro
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor."); // Exibe o toast de erro
    }
  };

  const handleEdit = async () => {
    if (!selectedTraining) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/trainings/edit/${selectedTraining.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            categoria_id: selectedTraining.categoria_id,
            titulo: selectedTraining.titulo,
            descricao: selectedTraining.descricao,
            arquivo_nome: selectedTraining.arquivo_nome,
            arquivo_caminho: selectedTraining.arquivo_caminho,
            tamanho: selectedTraining.tamanho,
          }),
        }
      );

      if (response.ok) {
        toast.success("Treinamento atualizado com sucesso!");
        setTrainings((prev) =>
          prev.map((t) => (t.id === selectedTraining.id ? selectedTraining : t))
        );
        setIsEditDialogOpen(false);
        setSelectedTraining(null);
        
      } else {
        toast.error("Erro ao atualizar o treinamento.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Treinamentos", href: "/trainings" },
        ]}
      />
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
                  <TableCell className="font-medium">
                    {training.titulo}
                  </TableCell>
                  <TableCell className="font-medium">
                    {training.categoria_nome}
                  </TableCell>
                  <TableCell>{training.descricao}</TableCell>
                  <TableCell>
                    {new Date(training.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(training.updated_at).toLocaleString()}
                  </TableCell>
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
                            <button
                              className="hover:bg-gray-300 rounded-md p-2 cursor-pointer"
                              onClick={() => {
                                setSelectedTraining(training);
                                setIsDialogOpen(true); 
                              }}
                            >
                              <Eye color="gray" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Visualizar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="hover:bg-blue-300 rounded-md p-2 cursor-pointer"
                              onClick={() => {
                                setSelectedTraining(training);
                                setIsEditDialogOpen(true);
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className="hover:bg-red-300 rounded-md p-2 cursor-pointer"
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
                                  Tem certeza de que deseja excluir o
                                  treinamento{" "}
                                  <strong>{selectedTraining?.titulo}</strong>?
                                  Essa ação não pode ser desfeita.
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
        {selectedTraining && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Treinamento</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Label htmlFor="">Titulo</Label>
                <input
                  type="text"
                  placeholder="Título"
                  value={selectedTraining.titulo}
                  onChange={(e) =>
                    setSelectedTraining({
                      ...selectedTraining,
                      titulo: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                />
                <Label htmlFor="">Descrição</Label>
                <textarea
                  placeholder="Descrição"
                  value={selectedTraining.descricao}
                  onChange={(e) =>
                    setSelectedTraining({
                      ...selectedTraining,
                      descricao: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                />
                <Label htmlFor="">Nome do Arquivo</Label>
                <input
                  type="text"
                  placeholder="Nome do Arquivo"
                  value={selectedTraining.arquivo_nome}
                  onChange={(e) =>
                    setSelectedTraining({
                      ...selectedTraining,
                      arquivo_nome: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                />
                <Label htmlFor="">Arquivo</Label>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer col-span-4 flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Escolher Arquivo
                      <input id="file-upload" type="file" className="sr-only" />
                    </Label>
                  </div>
                </div>
                <Select
                  value={selectedTraining?.categoria_id?.toString()} // Certifique-se de que o valor seja uma string
                  onValueChange={(value) =>
                    setSelectedTraining({
                      ...selectedTraining!,
                      categoria_id: parseInt(value), // Atualiza o ID da categoria corretamente
                    })
                  }
                >
                  <Label htmlFor="">Categorias</Label>
                  <SelectTrigger className="border p-2 w-auto rounded">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id.toString()}
                          className="cursor-pointer w-auto hover:bg-gray-100 hover:text-gray-800 rounded-md"
                        >
                          {cat.nome} {/* Exibe o nome da categoria */}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-gray-500 px-4 py-2">
                        Nenhuma categoria encontrada
                      </p>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={() => {
                    setSelectedTraining(null);
                    setIsEditDialogOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleEdit}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {selectedTraining && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Visualizar Treinamento</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Label htmlFor="">Título</Label>
                <p className="border p-2 rounded bg-gray-100">
                  {selectedTraining.titulo}
                </p>

                <Label htmlFor="">Descrição</Label>
                <p className="border p-2 rounded bg-gray-100">
                  {selectedTraining.descricao}
                </p>

                <Label htmlFor="">Nome do Arquivo</Label>
                <p className="border p-2 rounded bg-gray-100">
                  {selectedTraining.arquivo_nome}
                </p>

                <Label htmlFor="">Arquivo</Label>
                <a
                  href={selectedTraining.arquivo_caminho}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {selectedTraining.arquivo_nome}
                </a>

                <Label htmlFor="">Categoria</Label>
                <p className="border p-2 rounded bg-gray-100">
                  {categories.find(
                    (cat) => cat.id === selectedTraining.categoria_id
                  )?.nome || "Categoria não encontrada"}
                </p>

                <Label htmlFor="">Criado em</Label>
                <p className="border p-2 rounded bg-gray-100">
                  {new Date(selectedTraining.created_at).toLocaleString()}
                </p>

                <Label htmlFor="">Atualizado em</Label>
                <p className="border p-2 rounded bg-gray-100">
                  {new Date(selectedTraining.updated_at).toLocaleString()}
                </p>
              </div>
              <DialogFooter>
                <Button
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <ToastContainer /> 
    </Layout>
  );
}
