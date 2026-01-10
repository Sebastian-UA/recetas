const API_URL = "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("token");
}

// =======================
// RECETAS
// =======================

export async function getMisRecetas(token: string) {
  const res = await fetch(`${API_URL}/receta`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("No autorizado");
  }

  return res.json();
}

export async function getRecetaById(id: number, token: string) {
  const res = await fetch(`${API_URL}/receta/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) throw new Error("No encontrada");
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

// =======================
// INGREDIENTES
// =======================

export async function addIngrediente(
  recetaId: number,
  data: {
    nombre: string;
    cantidad: string;
  }
) {
  const token = getToken();
  if (!token) throw new Error("No autorizado");

  const res = await fetch(
    `${API_URL}/receta/${recetaId}/ingrediente`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Error al agregar ingrediente");
  }

  return res.json();
}


export async function updateIngrediente(
  recetaIngredienteId: number,
  data: { nombre: string; cantidad: string },
) {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `http://localhost:4000/api/receta/ingrediente/${recetaIngredienteId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) throw new Error('No se pudo actualizar');

  return res.json();
}

export async function deleteIngrediente(
  recetaIngredienteId: number,
  token: string,
) {
  const res = await fetch(
    `http://localhost:4000/api/receta/ingrediente/${recetaIngredienteId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Error al eliminar el ingrediente');
  }

  return res.json();
}

