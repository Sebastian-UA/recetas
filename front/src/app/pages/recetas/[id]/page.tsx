'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRecetaById } from '../../../../apis/receta.api';

export default function RecetaDetallePage() {
  const params = useParams();
  const router = useRouter();

  const [receta, setReceta] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargar() {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          router.push('/login');
          return;
        }

        const id = Number(params.id);
        const data = await getRecetaById(id, token);

        setReceta(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, [params.id]);

  if (cargando) return <p>Cargando receta...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!receta) return <p>No existe esa receta</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">{receta.nombre}</h1>

      {receta.imagen && (
        <img
          src={receta.imagen}
          className="w-60 mb-3"
          alt="imagen"
        />
      )}

      <p>Creada por: {receta.usuario?.correo}</p>

      <button
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => router.push('/recetas')}
      >
        Volver
      </button>
    </div>
  );
}
