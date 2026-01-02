const API_URL = "http://localhost:4000/api";

export async function login(correo: string, contraseña: string) {
  const res = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contraseña }),
  });

  if (!res.ok) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return res.json(); 
  // debe devolver { token, usuario }
}
