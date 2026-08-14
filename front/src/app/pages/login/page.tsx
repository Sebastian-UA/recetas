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
  const router = useRouter();//redireccionar al usuario a otra pagina

  const [correo, setCorreo] = useState("");//useState , es como let pero mas dinamico , para actualizar de inmediato el valor(el setCorreo es parte de la funcion, ese es el que actualiza a correo)
  const [contraseña, setContraseña] = useState("");

  const [showRegister, setShowRegister] = useState(false);// si comienza en false es para ocultar al primer momento la info(sirve para el modal)
  const [showRecover, setShowRecover] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { //e de evento, React.FormEvent es para avisar de que los parametros seran un evento(de formulario)
    e.preventDefault(); // evita que se recargue la página y que se borren los datos de las variables al enviar el formulario

    try {
      const data = await login(correo, contraseña);//data guarda la respuesta de la funcion login

      // guardar sesión
      localStorage.setItem("token", data.token);// para mantener el toke guardado mientras este iniciado sesion, "token" es la variable donde se guardara el token , data trae el token de la bd
      localStorage.setItem("usuario", JSON.stringify(data.usuario));//guardar que usuario esta ingresando , y transforma todo a string antes

      router.push("/pages/recetas");//se redirige a pages/recetas, si todo esta correcto
    } catch (error: any) {
      alert(error?.message || "Correo o contraseña incorrectos");//en caso de que falle
    }
  };

  return (
    <div className="min-h-screen items-center justify-center bg-[#abe3ee] flex flex-col">
      <h1 className="text-5xl font-bold">Mis Recetas</h1>
      <Card className="w-full max-w-sm bg-[#7189b6]">
        <CardHeader>{/*tarjeta con secciones*/}
          <CardTitle className="text-indigo-50">Entrar</CardTitle>
          <CardDescription className="text-indigo-100">Ingresa a tu cuenta</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>{/*onsubmit , para iniciar el evento cuando se envi el form */}
          <CardContent className="space-y-4">
            <div>
              <Label className="text-indigo-50">Correo</Label>
              <Input
                className="bg-amber-50"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}//onchange, para activar el evento al momento de escribir, lo demas es para actualizar el correo con lo que se acaba de escribir
                required//es obligatorio
              />
            </div>

            <div>
              <Label className="text-indigo-50">Contraseña</Label>
              <Input
                className="bg-amber-50"
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
                className="text-sm text-blue-50 underline"
                onClick={() => setShowRecover(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">{/* como esta dentro del form , se va a donde esta especificado al comienzo del form */}
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
      <RegisterModal //se ejecuta el modal importado
        open={showRegister}//habre el contenido
        onClose={() => setShowRegister(false)}//cuando se sale se cierra
      />

      {/* MODAL RECUPERAR CONTRASEÑA */}
      <RecoverPasswordModal
        open={showRecover}
        onClose={() => setShowRecover(false)}
      />
    </div>
  );
}
