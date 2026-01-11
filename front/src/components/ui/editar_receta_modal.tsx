"use client";

import { useState } from "react";
import { updateReceta } from "@/apis/receta.api";

export default function EditarRecetaModal({
  receta,
  onClose,
  onUpdated,
}: {
  receta: any;
  onClose: () => void;
  onUpdated: (receta: any) => void;
}) {
  const [nombre, setNombre] = useState(receta.nombre);
  const [imagen, setImagen] = useState(receta.imagen || "");
  const [guardando, setGuardando] = useState(false);

  async function guardar() {
    try {
      setGuardando(true);

      const actualizada = await updateReceta(
        receta.id,
        { nombre, imagen }
      );

      onUpdated(actualizada);
      onClose();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        <h3 className="text-lg font-bold mb-4">Editar receta</h3>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-4"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="border px-3 py-1 rounded" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={guardar}
            disabled={guardando}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
