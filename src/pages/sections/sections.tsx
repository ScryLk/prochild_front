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

// Defina o tipo para as seções
interface Section {
  id: number;
  nome: string;
  quantidade_categorias: number;
  quantidade_treinamentos: number;
}

export default function Sections() {
  const [sections, setSections] = useState<Section[]>([]); // Estado para armazenar as seções
  const [error, setError] = useState<string>(""); // Estado para armazenar erros

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Seções", href: "/sections" },
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Cookie", document.cookie); // Envia os cookies do navegador
  
        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          credentials: "include", // Inclui cookies na requisição
          redirect: "follow" as RequestRedirect,
        };
  
        const response = await fetch(
          "http://127.0.0.1:8000/sections/sections/",
          requestOptions
        );
  
        if (response.ok) {
          const result = await response.json();
          console.log("Dados retornados pela API:", result);
          setSections(result.Sucesso || []); // Acessa a propriedade 'Sucesso' que contém o array
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
          <TableCaption>Seções</TableCaption>
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
      <TableCell>{section.quantidade_categorias ?? 0}</TableCell> {/* Fallback para 0 */}
      <TableCell>{section.quantidade_treinamentos ?? 0}</TableCell> {/* Fallback para 0 */}
      <TableCell className="flex items-center gap-2">
        <div className="flex gap-5 items-center cursor-pointer justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={`/sections/edit/${section.id}`}>
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
                <button
                  onClick={() => handleDelete(section.id)}
                  className="hover:bg-red-300 rounded-md p-2 cursor-pointer"
                >
                  <Trash color="red" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir</p>
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

  // Função para excluir uma seção
  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta seção?")) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/sections/sections/${id}/`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          setSections(sections.filter((section) => section.id !== id));
        } else {
          console.error("Erro ao excluir a seção:", response.status);
          alert("Erro ao excluir a seção.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
      }
    }
  }
}