import Layout from "@/components/layout/layout";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddSections() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Seções", href: "/sections" },
    { label: "Adicionar Seção", href: "/addsections" },
  ];

  const [section, setSection] = useState("");

  async function handleAddSection() {
    if (!section.trim()) {
      toast.error("O nome da seção não pode estar vazio."); // Exibe mensagem de erro
      return;
    }

    try {
      const raw = JSON.stringify({
        nome: section, // Usa o valor do estado 'section'
      });

      const requestOptions: RequestInit = {
        method: "POST",
        credentials: "include",
        body: raw,
      };

      const response = await fetch("http://127.0.0.1:8000/sections/", requestOptions);

      if (response.ok) {
        const result = await response.json();
        console.log("Seção adicionada com sucesso:", result);
        toast.success("Seção adicionada com sucesso!"); // Exibe mensagem de sucesso
        setTimeout(() => {
          window.location.href = "/sections"; // Redireciona para a página de seções
        }, 2000); // Aguarda 2 segundos antes de redirecionar
      } else {
        console.error("Erro ao adicionar a seção:", response.status);
        toast.error("Erro ao adicionar a seção."); // Exibe mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      toast.error("Erro ao conectar ao servidor."); // Exibe mensagem de erro
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">Adicionar Seção</h1>
        <label htmlFor="category-name">Nome da Seção</label>
        <Input
          id="category-name"
          placeholder="Nome da Seção"
          className="w-3/5"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <div className="flex gap-3">
          <Button
            className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer"
            onClick={handleAddSection}
          >
            Salvar
          </Button>
          <a href="/sections">
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