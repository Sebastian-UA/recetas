import { Usuario } from "@/types/usuario";

const API_URL = "http://recetas-9uau.onrender.com/api";

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

export async function recoverPassword(correo: string) {
  const res = await fetch(
    `${API_URL}/usuario/recover`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo }),
    },
  );

  if (!res.ok) {
    throw new Error('Error al enviar correo');
  }

  return res.json();
}

export async function resetPassword(
  token: string,
  password: string,
) {
  const res = await fetch(
    `${API_URL}/usuario/reset-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    },
  );

  if (!res.ok) {
    throw new Error('Token inválido');
  }

  return res.json();
}
