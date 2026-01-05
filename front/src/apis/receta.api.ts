const API_URL = "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMisRecetas() {
  const token = getToken();
  console.log("TOKEN EN getMisRecetas:", token);

  if (!token) {
    console.log("❌ NO HAY TOKEN, NO LLAMO AL BACK");
    return [];
  }

  const res = await fetch(`${API_URL}/receta`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("STATUS:", res.status);

  if (!res.ok) throw new Error("No autorizado");
  return res.json();
}

export async function createReceta(data: {
  nombre: string;
  imagen?: string;
}) {
  const token = getToken();

  if (!token) throw new Error("No autorizado");

  const res = await fetch(`${API_URL}/receta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear receta");
  return res.json();
}
