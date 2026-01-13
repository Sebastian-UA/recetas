import { Usuario } from "@/types/usuario";

const API_URL = "http://localhost:4000/api";

/* ================= LOGIN ================= */

export async function loginUsuario(
  correo: string,
  contraseña: string
): Promise<{ token: string; usuario: Usuario }> {
  const res = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contraseña }),
  });

  if (!res.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return res.json();
}

/* ================= REGISTRO ================= */

export async function registerUsuario(data: {
  correo: string;
  nombre?: string;
}) {
  const res = await fetch(`${API_URL}/usuario/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al registrar");
  }

  return res.json();
}

/* ================= CREAR PASSWORD ================= */

export async function crearPassword(
  token: string,
  password: string
) {
  const res = await fetch(`${API_URL}/usuario/crear-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al crear contraseña");
  }

  return res.json();
}
