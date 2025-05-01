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
  secao_id: number;
}

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]); // Estado para armazenar os treinamentos
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
            credentials: "include", // Inclui cookies automaticamente
          }
        );

        if (response.ok) {
          const result = await response.json();
          setTrainings(result.success || []); // Supondo que os treinamentos estão no campo "success"
        } else {
          console.error("Erro ao carregar os treinamentos.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor.", error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />
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
              <TableHead className="w-1/5">Título</TableHead>
              <TableHead className="w-1/5">Descrição</TableHead>
              <TableHead className="w-1/5">Criado em</TableHead>
              <TableHead className="w-1/5">Atualizado em</TableHead>{" "}
              <TableHead className="w-1/5">Arquivo</TableHead>
              {/* Nova coluna */}
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
                  <TableCell>{training.descricao}</TableCell>
                  <TableCell>
                    {new Date(training.updated_at).toLocaleString()}{" "}
                    {/* Exibe o updated_at */}
                  </TableCell>

                  <TableCell>
                    {new Date(training.created_at).toLocaleString()}
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
                            <button
                              className="hover:bg-red-300 rounded-md p-2"
                              onClick={() =>
                                console.log(
                                  `Excluir treinamento ${training.id}`
                                )
                              }
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
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
