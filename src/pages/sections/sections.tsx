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

export default function Sections() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Seções", href: "/sections" },
  ];

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
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Teste</TableCell>
              <TableCell className="flex items-center gap-2">
                <div className="flex gap-5 items-center justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="/">
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
                        <a href="">
                          <div className="hover:bg-red-300 rounded-md p-2">
                            <Trash color="red" />
                          </div>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Excluir</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
