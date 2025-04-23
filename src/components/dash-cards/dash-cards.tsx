import { User } from "lucide-react";

export default function DashCards() {
  return (
    <div className="bg-stone-200 h-56 w-2/6 max-w-sm rounded-md items-center border border-border justify-center flex flex-col gap-2 p-4">
      {/* Ícone */}
      <User className="text-black w-10 h-10" />

      {/* Título */}
      <h1 className="text-black text-lg font-semibold text-center">
        Usuários Cadastrados
      </h1>
    </div>
  );
}