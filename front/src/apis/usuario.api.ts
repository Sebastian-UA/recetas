import { Usuario } from "@/types/usuario";

const API_URL = "https://recetas-9uau.onrender.com/api";

/* ================= LOGIN ================= */

export async function loginUsuario(
  correo: string,
  contraseña: string
): Promise<{ token: string; usuario: Usuario }> {
  const res = await fetch(`${API_URL}/usuario/login`, {// La función devuelve token y usuario, que sera lo que retornara
    method: "POST",
    headers: { "Content-Type": "application/json" },//da aviso al backend de que lo que se envia esta en formato json
    body: JSON.stringify({ correo, contraseña }),//los transforma a formato json
  });

  const text = await res.text();// “lee lo que me devolvió el backend como texto”
  const data = text ? JSON.parse(text) : null;//lo convierte a objeto JS, si no hay nada ,lo deja en null

  if (!res.ok) {//el .ok es para ver si la respuesta del fetch fue exitosa true, ahora pregunto si fue false
    throw new Error(data?.message || "Credenciales incorrectas");
  }

  return data;//envia los datos en relacion a esta funcion
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
