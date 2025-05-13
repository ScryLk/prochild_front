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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Eye, Pen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editNome, setEditNome] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editRole, setEditRole] = useState<string>("user"); // sempre como string aqui

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/", {
          method: "GET",
          credentials: "include",
          redirect: "follow",
        });

        if (response.ok) {
          const result = await response.json();
          setUsers(result.users || []);
        } else {
          setError("Erro ao carregar os usuários.");
        }
      } catch (error) {
        setError("Erro ao conectar ao servidor.");
      }
    };

    fetchUsers();
  }, []);

  const handleEditSave = async () => {
    if (!selectedUser || editNome.trim() === "" || editEmail.trim() === "") {
      toast.error("Nome e email não podem estar vazios.");
      return;
    }

    const roleBoolean = editRole === "admin"; // string → boolean

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/users/edit/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          redirect: "follow",
          body: JSON.stringify({
            nome: editNome,
            email: editEmail,
            role: roleBoolean,
          }),
        }
      );

      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  nome: editNome,
                  email: editEmail,
                  role: roleBoolean, // mantemos como boolean internamente
                }
              : user
          )
        );
        toast.success("Usuário atualizado com sucesso!");
        setEditOpen(false);
        setSelectedUser(null);
      } else {
        toast.error("Erro ao atualizar o usuário.");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Usuários", href: "/users" },
        ]}
      />
      <h1 className="text-xl font-bold mt-5">Usuários</h1>
      <div className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <Table>
          <TableCaption>
            {users.length === 0
              ? "Nenhum usuário cadastrado."
              : "Lista de Usuários"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {String(user.role) === "admin" ? "Administrador" : "Usuário"}
                </TableCell>

                <TableCell>
                  {new Date(user.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(user.updated_at).toLocaleString()}
                </TableCell>
                <TableCell className="flex gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="hover:bg-gray-300 rounded-md p-2 cursor-pointer"
                          onClick={() => {
                            toast.info(
                              "Visualizar usuário ainda não implementado."
                            );
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
                            setSelectedUser(user);
                            setEditNome(user.nome);
                            setEditEmail(user.email);
                            setEditRole(user.role ? "admin" : "user"); // boolean → string
                            setEditOpen(true);
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
                        <button
                          className="hover:bg-red-300 rounded-md p-2 cursor-pointer"
                          onClick={() => {
                            toast.warn(
                              "Função de exclusão ainda não implementada."
                            );
                          }}
                        >
                          <Trash color="red" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Excluir</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Altere os dados do usuário e clique em "Salvar".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-nome">Nome</Label>
              <Input
                id="edit-nome"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Função</Label>
              <select
                id="edit-role"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
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
