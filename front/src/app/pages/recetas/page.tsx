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
  //para barra de busqueda
  const [busqueda, setBusqueda] = useState("");

  const recetasFiltradas = recetas.filter((r) =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#abe3ee]">
      <div className="max-w-4xl mx-auto p-6" >
        <div className="flex flex-col justify-between my-6 items-center">
          <div className="flex my-5">
            <h1 className="text-9xl font-bold ">Mis recetas</h1>

            {usuario && (
              <p className="text-sm text-gray-600">
                Bienvenido <strong>{usuario.nombre}</strong>
              </p>
            )}
          </div>

          {/* Barra de busqueda */}
          <input
            type="text"
            placeholder="🔍 Buscar receta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="max-w-md mt-4 px-8 py-2 my-2 rounded-full border bg-white"
          />

          <CrearRecetaModal onCreated={recargarRecetas} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {recetasFiltradas.map((r: any) => (
            <div
              key={r.id}
              className=" p-4 rounded-4xl hover:shadow bg-[#7c9ccf]"
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
                  className="text-sm rounded-full  text-amber-50 bg-[#4050ff] px-2 py-1"
                  onClick={() => setRecetaEditando(r)}
                >
                  Editar
                </button>

                <button
                  className="text-sm text-amber-50 rounded-full bg-red-600 px-2 py-1"
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
    </div>
  );
}
