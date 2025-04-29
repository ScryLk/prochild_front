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
import { Pen, Trash } from "lucide-react";
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
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 



interface Section {
  id: number;
  nome: string;
  quantidade_categorias: number;
  quantidade_treinamentos: number;
}

export default function Sections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string>("");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Seções", href: "/sections" },
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Cookie", document.cookie);

        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          credentials: "include",
          redirect: "follow",
        };

        const response = await fetch(
          "http://127.0.0.1:8000/sections/sections/",
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setSections(result.Sucesso || []);
        } else {
          console.error("Erro ao buscar as seções:", response.status);
          setError("Erro ao carregar as seções.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        setError("Erro ao conectar ao servidor.");
      }
    };

    fetchSections();
  }, []);

  async function handleDelete(sectionId: number) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sections/delete/${sectionId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setSections((prev) => prev.filter((section) => section.id !== sectionId));
        toast.success("Seção deletada com sucesso!"); // Exibe mensagem de sucesso
      } else {
        console.error("Erro ao excluir a seção:", response.status);
        toast.error("Erro ao excluir a seção."); 
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      toast.error("Erro ao conectar ao servidor."); 
    }
  }
  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-xl font-bold mt-5">Seções</h1>

      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <a href="/addsections">
            <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
              Adicionar Seção
            </Button>
          </a>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Table>
          <TableCaption>Lista de Seções</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/6">Seção</TableHead>
              <TableHead className="w-2/6">Categorias</TableHead>
              <TableHead className="w-2/6">Treinamentos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell className="font-medium">{section.nome}</TableCell>
                <TableCell>{section.quantidade_categorias ?? 0}</TableCell>
                <TableCell>{section.quantidade_treinamentos ?? 0}</TableCell>
                <TableCell>
                  <div className="flex gap-5 items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={`/sections/edit/${section.id}`}>
                            <div className="hover:bg-emerald-300 rounded-md p-2">
                              <Pen color="blue" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="hover:bg-red-300 cursor-pointer  rounded-md p-2">
                                <Trash color="red" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirmar Exclusão
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir a seção "{section.nome}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600 cursor-pointer text-white"
                                  onClick={() => handleDelete(section.id)}
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>Excluir</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ToastContainer />
    </Layout>
  );
}
