"use client";

import { useEffect, useState } from "react";
import { getMisRecetas, deleteReceta } from "@/apis/receta.api";
import CrearRecetaModal from "@/components/ui/receta_modal";
import EditarRecetaModal from "@/components/ui/editar_receta_modal";
import Link from "next/link";

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [recetaEditando, setRecetaEditando] = useState<any>(null);
  const [eliminandoId, setEliminandoId] = useState<number | null>(null);

  const cargarRecetas = async (token: string) => {
    const data = await getMisRecetas(token);
    setRecetas(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No hay token almacenado");
      return;
    }

    getMisRecetas(token)
      .then((data) => setRecetas(data))
      .catch((err) => console.error("Error real:", err));
  }, []);

  const recargarRecetas = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    cargarRecetas(token);
  };

  /* ================= ELIMINAR ================= */

  const eliminar = async (recetaId: number) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta receta?\nEsta acción no se puede deshacer."
    );

    if (!confirmar) return;

    try {
      setEliminandoId(recetaId);

      await deleteReceta(recetaId);

      setRecetas((prev) =>
        prev.filter((r) => r.id !== recetaId)
      );
    } catch (e: any) {
      alert(e.message);
    } finally {
      setEliminandoId(null);
    }
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
          <div
            key={r.id}
            className="border p-4 rounded hover:shadow"
          >
            <Link href={`/pages/recetas/${r.id}`}>
              <h2 className="font-semibold">{r.nombre}</h2>

              {r.imagen && (
                <img
                  src={r.imagen}
                  className="mt-2 rounded h-40 w-full object-cover"
                />
              )}
            </Link>

            {/* BOTONES */}
            <div className="flex gap-4 mt-3">
              <button
                className="text-sm text-blue-600"
                onClick={() => setRecetaEditando(r)}
              >
                Editar
              </button>

              <button
                className="text-sm text-red-600"
                disabled={eliminandoId === r.id}
                onClick={() => eliminar(r.id)}
              >
                {eliminandoId === r.id
                  ? "Eliminando..."
                  : "Eliminar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDITAR */}
      {recetaEditando && (
        <EditarRecetaModal
          receta={recetaEditando}
          onClose={() => setRecetaEditando(null)}
          onUpdated={(actualizada) => {
            setRecetas((prev) =>
              prev.map((r) =>
                r.id === actualizada.id ? actualizada : r
              )
            );
          }}
        />
      )}
    </div>
  );
}
