import Layout from "@/components/layout/layout";
import { Breadcrumb } from "@/components/app-breadcrumb/app-breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { File } from "lucide-react";

export default function AddTraining() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Treinamentos", href: "/trainings" },
    { label: "Adicionar Treinamento", href: "/addtrainings" },
  ];

  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [trainingTitle, setTrainingTitle] = useState<string>("");
  const [trainingDescription, setTrainingDescription] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  interface Categories {
    id: number;
    nome: string;
    icone_id: string;
    secao_nome: string;
    created_at: string;
    updated_at: string;
  }

  const handleSaveTraining = async () => {
    if (!selectedCategoryId || !trainingTitle || !trainingDescription) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    const requestBody = {
      categoria_id: selectedCategoryId,
      titulo: trainingTitle,
      tamanho: "N/A", // Ajuste conforme necessário
      descricao: trainingDescription,
      arquivo_nome: selectedFileName || "N/A",
      arquivo_caminho: filePath || "N/A",
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/trainings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        alert("Treinamento cadastrado com sucesso!");
        // Redirecione ou limpe os campos do formulário, se necessário
      } else {
        alert("Erro ao cadastrar o treinamento.");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      alert("Erro ao conectar ao servidor.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/categories/categories",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setCategories(result.success || []); // Certifique-se de que "success" contém as categorias
          console.log("Categorias carregadas:", result.success);
        } else {
          console.error("Erro ao carregar as categorias.");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor.", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Layout>
  <div className="flex flex-col gap-4">
    <Breadcrumb items={breadcrumbItems} />
    <h1 className="text-xl font-bold">Adicionar Treinamento</h1>

    <label htmlFor="training-title">Nome do Treinamento</label>
    <Input
      id="training-title"
      placeholder="Nome do treinamento"
      className="w-3/5"
      value={trainingTitle}
      onChange={(e) => setTrainingTitle(e.target.value)}
    />

    <label htmlFor="parent-category">Categoria</label>
    <Select
      onValueChange={(value) => setSelectedCategoryId(value)}
    >
      <SelectTrigger id="parent-category" className="w-3/5 cursor-pointer">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((cat) => (
            <SelectItem
              key={cat.id}
              value={cat.id.toString()}
              className="cursor-pointer w-auto hover:bg-gray-100 hover:text-gray-800 rounded-md"
            >
              {cat.nome}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    <label htmlFor="training-description">Descrição</label>
    <textarea
      id="training-description"
      placeholder="Descrição do treinamento"
      className="w-3/5 border p-2 rounded"
      value={trainingDescription}
      onChange={(e) => setTrainingDescription(e.target.value)}
    />

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-3/5 cursor-pointer">
          {selectedFileName ? selectedFileName : "Adicionar Arquivo"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Arquivo</DialogTitle>
          <DialogDescription>
            Adicionar treinamento, apenas formatos PDF, PNG e MP4 aceitos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer col-span-4 flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Escolher Arquivo
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFileName(file.name);
                    setFilePath(file.name); // Simula o caminho do arquivo
                  } else {
                    setSelectedFileName(null);
                    setFilePath(null);
                  }
                }}
              />
            </label>
          </div>
          {selectedFileName && (
            <Label className="text-sm text-gray-600">
              <File /> {selectedFileName}
            </Label>
          )}
        </div>
        <DialogFooter>
          <Button type="button" className="cursor-pointer">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <div className="flex gap-3">
      <Button
        className="bg-emerald-500 w-28 hover:bg-emerald-700 mt-5 cursor-pointer"
        onClick={handleSaveTraining}
      >
        Salvar
      </Button>
      <a href="/">
        <Button className="bg-gray-500 w-28 hover:bg-gray-700 mt-5 cursor-pointer">
          Cancelar
        </Button>
      </a>
    </div>
  </div>
</Layout>
  );
}
