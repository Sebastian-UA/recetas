import { Usuario } from "@/types/usuario";

const API_URL = "https://recetas-9uau.onrender.com/api";

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

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Credenciales incorrectas");
  }

  return data;
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

  const text = await res.text();
  const result = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(result?.message || "Error al registrar");
  }

  return result;
}

/* ================= CREAR PASSWORD ================= */

export async function crearPassword(token: string, password: string) {
  const res = await fetch(`${API_URL}/usuario/crear-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Error al crear contraseña");
  }

  return data;
}


export async function recoverPassword(correo: string) {
  const res = await fetch(`${API_URL}/usuario/recover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || 'Error al enviar correo');
  }

  return data;
}


export async function resetPassword(token: string, password: string) {
  const res = await fetch(`${API_URL}/usuario/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || 'Token inválido');
  }

  return data;
}
