"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRecetaById } from "@/apis/receta.api";
import { Button } from "@/components/ui/button";

export default function RecetaDetallePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [receta, setReceta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const cargarReceta = async () => {
      try {
        const data = await getRecetaById(id);
        setReceta(data);
      } catch (error) {
        alert("Receta no encontrada");
        router.push("/pages/recetas");
      } finally {
        setLoading(false);
      }
    };

    cargarReceta();
  }, [id]);

  if (loading) {
    return <p className="p-6">Cargando...</p>;
  }

  if (!receta) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Button variant="outline" onClick={() => router.back()}>
        ← Volver
      </Button>

      <div className="mt-6">
        {receta.imagen && (
          <img
            src={receta.imagen}
            className="w-full max-h-[400px] object-cover rounded"
          />
        )}

        <h1 className="text-3xl font-bold mt-4">{receta.nombre}</h1>
      </div>
    </div>
  );
}
