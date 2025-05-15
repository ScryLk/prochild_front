import Layout from "@/components/layout/layout";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUsers() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Usuários", href: "/users" },
    { label: "Adicionar Usuário", href: "/addusers" },
  ];

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegisterUser = async () => {
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", password);
    console.log("Função:", role);
    if (!nome.trim() || !email.trim() || !password.trim() || !role.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const payload = {
      nome,
      email,
      password: password,
      role,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!");
        setTimeout(() => {
          window.location.href = "/users";
        }, 1500);
      } else {
        const result = await response.json();
        toast.error(result.error || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full md:w-3/5">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">Adicionar Usuário</h1>

        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            placeholder="Nome do usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email do usuário"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            placeholder="*****"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="role">Função</Label>
          <Select value={role} onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Selecione a função" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" className="cursor-pointer">
                Usuário
              </SelectItem>
              <SelectItem value="admin" className="cursor-pointer">
                Administrador
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button
            className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer"
            onClick={handleRegisterUser}
          >
            Salvar
          </Button>
          <a href="/users">
            <Button className="bg-gray-500 w-28 hover:bg-gray-700 mt-5 cursor-pointer">
              Cancelar
            </Button>
          </a>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
