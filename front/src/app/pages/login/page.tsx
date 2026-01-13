"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/apis/auth.api";
import RegisterModal from "@/components/ui/register_modal";
import RecoverPasswordModal from "@/components/ui/recover_password_modal";

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

export default function LoginPage() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [showRecover, setShowRecover] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(correo, contraseña);

      // guardar sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      router.push("/pages/recetas");
    } catch (error: any) {
      alert(error?.message || "Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Ingresa a tu cuenta</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Correo</Label>
              <Input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Contraseña</Label>
              <Input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            {/* RECUPERAR CONTRASEÑA */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 underline"
                onClick={() => setShowRecover(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Entrar
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowRegister(true)}
            >
              Crear cuenta
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* MODAL REGISTRO */}
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
      />

      {/* MODAL RECUPERAR CONTRASEÑA */}
      <RecoverPasswordModal
        open={showRecover}
        onClose={() => setShowRecover(false)}
      />
    </div>
  );
}
