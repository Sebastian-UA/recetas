"use client";

import { useEffect, useState } from "react";
import { getMisRecetas } from "@/apis/receta.api";
import CrearRecetaModal from "@/components/ui/receta_modal";

export default function RecetasPage() {
  const [recetas, setRecetas] = useState([]);
  const [usuario, setUsuario] = useState<any>(null);

  const cargarRecetas = async () => {
    const data = await getMisRecetas();
    setRecetas(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("usuario");

    if (!token || !userRaw) return;

    try {
      const parsedUser = JSON.parse(userRaw);
      console.log("PARSED USER:", parsedUser);
      setUsuario(parsedUser);
      cargarRecetas();
    } catch (e) {
      console.error("Error parseando usuario", e);
    }
  }, []);

  return (

    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-6 items-center">
        <div>
          <h1 className="text-2xl font-bold">Mis recetas</h1>

          {usuario && (
            <p className="text-sm text-gray-600">
              Bienvenido <strong>{usuario.nombre}</strong>
            </p>
          )}
        </div>

        <CrearRecetaModal onCreated={cargarRecetas} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recetas.map((r: any) => (
          <div key={r.id} className="border p-4 rounded">
            <h2 className="font-semibold">{r.nombre}</h2>
            {r.imagen && <img src={r.imagen} className="mt-2 rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}
