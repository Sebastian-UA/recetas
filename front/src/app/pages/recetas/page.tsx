"use client";

import { useEffect, useState } from "react";
import { getMisRecetas } from "@/apis/receta.api";
import CrearRecetaModal from "@/components/ui/receta_modal";
import Link from "next/link";

export default function RecetasPage() {
  const [recetas, setRecetas] = useState([]);
  const [usuario, setUsuario] = useState<any>(null);

  const cargarRecetas = async (token: string) => {
    const data = await getMisRecetas(token);
    setRecetas(data);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN ACTUAL:", token);

    if (!token) {
      console.error("No hay token almacenado");
      return;
    }

    getMisRecetas(token)
      .then((data) => {
        console.log("RECETAS:", data);
        setRecetas(data);
      })
      .catch((err) => {
        console.error("Error real:", err);
      });
  }, []);



  const recargarRecetas = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    cargarRecetas(token);
  };

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

        <CrearRecetaModal onCreated={recargarRecetas} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recetas.map((r: any) => (
          <Link
            key={r.id}
            href={`/pages/recetas/${r.id}`}
            className="border p-4 rounded hover:shadow cursor-pointer block"
          >
            <h2 className="font-semibold">{r.nombre}</h2>

            {r.imagen && (
              <img
                src={r.imagen}
                className="mt-2 rounded h-40 w-full object-cover"
              />
            )}
          </Link>
        ))}

      </div>
    </div>
  );
}
