const API_URL = "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMisRecetas(token: string) {
  const res = await fetch('http://localhost:4000/api/receta', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('No autorizado');
  }

  return res.json();
}



export async function getRecetaById(id: number, token: string) {
  const res = await fetch(`http://localhost:4000/api/receta/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) throw new Error('No encontrada');
  if (!res.ok) throw new Error('No autorizado');

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
