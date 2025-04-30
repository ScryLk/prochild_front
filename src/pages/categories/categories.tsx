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
import { Pen, Trash, Library } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
  id: number;
  nome: string;
  treinamentos_cadastrados: number;
  secao: string;
  icone_id:string;
  created_at: Date;
  updated_at: Date;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categorias", href: "/categories" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/categories/categories/", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setCategories(result.success || []); // Corrigido para "success"
        } else {
          setError("Erro ao carregar as categorias.");
        }
      } catch (error) {
        setError("Erro ao conectar ao servidor.");
      }
    };

    fetchCategories();
  }, []);

  async function handleDelete(categoryId: number) {
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
  }

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
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.nome}</TableCell>
                <TableCell>{category.icone_id}</TableCell>
                <TableCell>{new Date(category.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(category.updated_at).toLocaleString()}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <div className="flex gap-5 items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={`/categories/edit/${category.id}`}>
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
                          <button className="hover:bg-red-300 cursor-pointer rounded-md p-2" onClick={() => handleDelete(category.id)}>
                            <Trash color="red" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Excluir</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="hover:bg-gray-300 cursor-pointer rounded-md p-2">
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
    </Layout>
  );
}