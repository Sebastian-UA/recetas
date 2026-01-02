import { Usuario } from "@/types/usuario";

const API_URL = "http://localhost:4000/api";

export async function loginUsuario(
  correo: string,
  contraseña: string
): Promise<Usuario> {
  const res = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contraseña }),
  });

  if (!res.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return res.json();
}
