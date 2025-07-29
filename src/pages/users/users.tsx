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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [editRole, setEditRole] = useState<string>("user");
  const [viewOpen, setViewOpen] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/users/",
          {
            method: "GET",
            credentials: "include",
            redirect: "follow",
          }
        );

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
            role: editRole,
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
                  role: editRole,
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
        <div className="flex justify-end">
          <a href="/addusers">
            <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
              Adicionar Usuário
            </Button>
          </a>
        </div>
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
              <TableHead>Função</TableHead>
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
                            setViewUser(user);
                            setViewOpen(true);
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
                            setEditRole(
                              user.role === "admin" ? "admin" : "user"
                            ); 
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
                          onClick={() => setDeleteUser(user)}
                        >
                          <Trash color="red" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Excluir</p>
                      </TooltipContent>
                    </Tooltip>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          style={{ display: "none" }}
                          aria-hidden="true"
                          tabIndex={-1}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar Exclusão
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="text-sm">
                          Tem certeza que deseja excluir o usuário{" "}
                          <strong>{deleteUser?.nome}</strong>? Esta ação não
                          pode ser desfeita.
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white"
                            onClick={async () => {
                              if (!deleteUser) return;
                              try {
                                const response = await fetch(
                                  `http://127.0.0.1:8000/users/delete/${deleteUser.id}/`,
                                  {
                                    method: "DELETE",
                                    credentials: "include",
                                    redirect: "follow",
                                  }
                                );
                                if (response.ok) {
                                  setUsers((prev) =>
                                    prev.filter(
                                      (user) => user.id !== deleteUser.id
                                    )
                                  );
                                  toast.success(
                                    "Usuário excluído com sucesso!"
                                  );
                                } else {
                                  toast.error("Erro ao excluir usuário.");
                                }
                              } catch (error) {
                                toast.error("Erro de conexão ao excluir.");
                              } finally {
                                setDeleteUser(null);
                              }
                            }}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
              <Select
                value={editRole}
                onValueChange={(value) => setEditRole(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="user"
                    className="cursor-pointer hover:bg-muted hover:text-primary"
                  >
                    Usuário
                  </SelectItem>
                  <SelectItem
                    value="admin"
                    className="cursor-pointer hover:bg-muted hover:text-primary"
                  >
                    Administrador
                  </SelectItem>
                </SelectContent>
              </Select>
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

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>
              Essas informações são somente para visualização.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="view-nome">Nome</Label>
              <Input id="view-nome" value={viewUser?.nome || ""} disabled />
            </div>
            <div>
              <Label htmlFor="view-email">Email</Label>
              <Input id="view-email" value={viewUser?.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="view-role">Função</Label>
              <Select value={viewUser?.role === "admin" ? "admin" : "user"}>
                <SelectTrigger className="w-full" disabled>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-gray-500 cursor-pointer hover:bg-gray-600"
              type="button"
              onClick={() => setViewOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </Layout>
  );
}
