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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    // Adiciona o sessionid de forma xumbada
    myHeaders.append(
      "Cookie",
      "sessionid=t0yd2l4j53gfwbszrvxmvi8qtkxxmxry; expires=Mon, 12 May 2025 12:02:38 GMT; HttpOnly; Max-Age=1209600; Path=/; SameSite=Lax"
    );

    const raw = JSON.stringify({
      email: email,
      password_hash: password,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
      credentials: "include", // Inclui cookies na requisição
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/users/login/",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Login bem-sucedido:", result);
        const userData = {
          id: result.id,
          name: result.name,
          email: result.email,
          role: result.role,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="items-center justify-center flex">
            <img src="./logo-color-new.png" className="h-4/5" alt="" />
          </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Acessar painel administrador Prochild.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
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
                <a href="" className="underline text-sm">
                  Esqueci minha senha
                </a>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <CardFooter className="flex justify-end mt-4">
              <Button type="submit" className="cursor-pointer">
                Acessar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}