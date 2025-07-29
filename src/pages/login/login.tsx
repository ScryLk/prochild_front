import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        const userData = {
          id: result.id,
          name: result.name,
          email: result.email,
          role: result.role,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/";
      } else if (response.status === 401) {
        setErrorMessage("Credenciais inválidas. Verifique seu email e senha.");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <Card className="w-[350px] shadow-lg border border-gray-200">
        <CardHeader>
          <div className="flex justify-center">
            <img src="./logo-color-new.png" className="h-12" alt="Prochild Logo" />
          </div>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Acesse o painel administrativo da Prochild
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <a href="#" className="underline text-sm text-gray-500 hover:text-gray-700">
                  Esqueci minha senha
                </a>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              )}
            </div>
            <CardFooter className="flex justify-end mt-4">
              <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
