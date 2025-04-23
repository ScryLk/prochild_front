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

export default function Categories() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categorias", href: "/categories" },
  ];

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

        <Table>
          <TableCaption>Categorias</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Categoria</TableHead>
              <TableHead>Treinamentos Cadastrados</TableHead>
              <TableHead>Seção</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Partes do Corpo</TableCell>
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

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="">
                          <div className="hover:bg-gray-300 rounded-md p-2">
                            <Library color="black" />
                          </div>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Treinamentos</p>
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
