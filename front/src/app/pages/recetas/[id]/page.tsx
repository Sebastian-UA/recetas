'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  getRecetaById,
  addIngrediente,
} from '../../../../apis/receta.api';

export default function RecetaDetallePage() {
  const params = useParams();
  const router = useRouter();

  const [receta, setReceta] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreIngrediente, setNombreIngrediente] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [guardando, setGuardando] = useState(false);

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

  async function guardarIngrediente() {
    if (!nombreIngrediente || !cantidad) {
      alert('Completa todos los campos');
      return;
    }

    try {
      setGuardando(true);
      const id = Number(params.id);

      const nuevo = await addIngrediente(id, {
        nombre: nombreIngrediente,
        cantidad,
      });

      setReceta((prev: any) => ({
        ...prev,
        receta_ingrediente: [
          ...(prev.receta_ingrediente ?? []),
          nuevo,
        ],
      }));

      setNombreIngrediente('');
      setCantidad('');
      setMostrarModal(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) return <p>Cargando receta...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!receta) return <p>No existe esa receta</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">{receta.nombre}</h1>

      {receta.imagen && (
        <img
          src={receta.imagen}
          className="w-60 mb-4 rounded"
          alt="imagen"
        />
      )}

      {/* INGREDIENTES */}
      <h2 className="text-lg font-semibold mb-2">
        Ingredientes
      </h2>

      {receta.receta_ingrediente?.length === 0 && (
        <p className="text-gray-500">
          No hay ingredientes aún
        </p>
      )}

      <ul className="space-y-2">
        {receta.receta_ingrediente?.map((ri: any) => (
          <li
            key={ri.id}
            className="border p-2 rounded"
          >
            <strong>{ri.ingrediente.nombre}</strong>
            {' — '}
            {ri.cantidad}
          </li>
        ))}
      </ul>

      <button
        className="mt-4 bg-green-600 text-white px-3 py-1 rounded"
        onClick={() => setMostrarModal(true)}
      >
        Agregar ingrediente
      </button>

      <button
        className="mt-4 ml-2 bg-gray-500 text-white px-3 py-1 rounded"
        onClick={() => router.push('/recetas')}
      >
        Volver
      </button>

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h3 className="text-lg font-bold mb-3">
              Nuevo ingrediente
            </h3>

            <input
              className="border w-full p-1 mb-2"
              placeholder="Ingrediente"
              value={nombreIngrediente}
              onChange={(e) =>
                setNombreIngrediente(e.target.value)
              }
            />

            <input
              className="border w-full p-1 mb-3"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) =>
                setCantidad(e.target.value)
              }
            />

            <div className="flex justify-end gap-2">
              <button
                className="border px-3 py-1 rounded"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>

              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                disabled={guardando}
                onClick={guardarIngrediente}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
