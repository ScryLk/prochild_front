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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
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
  const [editNome, setEditNome] = useState<string>("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

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

        const response = await fetch(
          "http://127.0.0.1:8000/sections/sections/",
          {
            method: "GET",
            headers: myHeaders,
            credentials: "include",
            redirect: "follow",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setSections(result.Sucesso || []);
        } else {
          setError("Erro ao carregar as seções.");
        }
      } catch (error) {
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
        setSections((prev) =>
          prev.filter((section) => section.id !== sectionId)
        );
        toast.success("Seção deletada com sucesso!");
      } else {
        toast.error("Erro ao excluir a seção.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  }

  async function handleEditSave() {
    if (!selectedSection || editNome.trim() === "") {
      toast.error("O nome não pode estar vazio.");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sections/edit/${selectedSection.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: document.cookie,
          },
          body: JSON.stringify({ nome: editNome }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setSections((prev) =>
          prev.map((s) =>
            s.id === selectedSection.id ? { ...s, nome: editNome } : s
          )
        );
        toast.success("Seção atualizada com sucesso!");
        setEditOpen(false);
        setSelectedSection(null);
      } else {
        toast.error("Erro ao atualizar a seção.");
      }
    } catch (error) {
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
          <TableCaption>
            {" "}
            {sections.length === 0
              ? "Nenhuma seção cadastrada. Adicione uma seção."
              : "Lista de Seções"}
          </TableCaption>
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
                          <button
                            className="hover:bg-emerald-300 rounded-md p-2 cursor-pointer"
                            onClick={() => {
                              setSelectedSection(section);
                              setEditNome(section.nome);
                              setEditOpen(true);
                            }}
                          >
                            <Pen color="blue" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <AlertDialog>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <button className="hover:bg-red-300 rounded-md p-2 cursor-pointer">
                                <Trash color="red" />
                              </button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>Excluir</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar Exclusão
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a seção "
                              {section.nome}"?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => handleDelete(section.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
            <DialogTitle>Editar Seção</DialogTitle>
            <DialogDescription>
              Altere o nome da seção e clique em "Salvar".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="edit-nome">Nome</Label>
            <Input
              id="edit-nome"
              value={editNome}
              onChange={(e) => setEditNome(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="bg-gray-500 cursor-pointer hover:bg-gray-600"
              type="button"
              onClick={() => setEditOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-emerald-500 cursor-pointer hover:bg-emerald-600"
              type="button"
              onClick={handleEditSave}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Layout>
  );
}
