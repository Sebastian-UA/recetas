const API_URL = "https://recetas-9uau.onrender.com/api";

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

export async function updateReceta(
  recetaId: number,
  data: { nombre: string; imagen?: string }
) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autorizado");

  const res = await fetch(
    `https://recetas-9uau.onrender.com/api/receta/${recetaId}`,
    {
      method: "PATCH", // 👈 importante
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Error al actualizar receta");
  }

  return res.json();
}

export async function deleteReceta(recetaId: number) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autorizado");

  const res = await fetch(`${API_URL}/receta/${recetaId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la receta");
  }

  return null; // ✅ correcto
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
    `https://recetas-9uau.onrender.com/api/receta/ingrediente/${recetaIngredienteId}`,
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
    `${API_URL}/receta/ingrediente/${recetaIngredienteId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    throw new Error('Error al eliminar el ingrediente');
  }

  return null;
}


// =======================
// PASOS
// =======================

export async function addPaso(
  recetaId: number,
  pasos: string,
) {
  const token = getToken();
  if (!token) throw new Error('No autorizado');

  const res = await fetch(
    `${API_URL}/receta/${recetaId}/paso`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pasos }),
    },
  );

  if (!res.ok) {
    throw new Error('Error al agregar paso');
  }

  return res.json();
}

export async function updatePaso(
  pasoId: number,
  pasos: string,
) {
  const token = getToken();
  if (!token) throw new Error('No autorizado');

  const res = await fetch(
    `${API_URL}/receta/paso/${pasoId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pasos }),
    },
  );

  if (!res.ok) {
    throw new Error('Error al actualizar paso');
  }

  return res.json();
}

export async function deletePaso(
  pasoId: number,
  token: string,
) {
  const res = await fetch(
    `${API_URL}/receta/paso/${pasoId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error('Error al eliminar paso');
  }

  return null;
}


