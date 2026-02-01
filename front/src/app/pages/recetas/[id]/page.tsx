'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  getRecetaById,
  addIngrediente,
  updateIngrediente,
  deleteIngrediente,
  addPaso,
  updatePaso,
  deletePaso,
} from '../../../../apis/receta.api';

export default function RecetaDetallePage() {
  const params = useParams();
  const router = useRouter();

  const [receta, setReceta] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  /* ================= INGREDIENTES ================= */

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreIngrediente, setNombreIngrediente] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [guardando, setGuardando] = useState(false);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [cantidadEditada, setCantidadEditada] = useState('');

  /* ================= PASOS ================= */

  const [mostrarModalPaso, setMostrarModalPaso] = useState(false);
  const [textoPaso, setTextoPaso] = useState('');
  const [guardandoPaso, setGuardandoPaso] = useState(false);

  const [editandoPasoId, setEditandoPasoId] = useState<number | null>(null);
  const [textoPasoEditado, setTextoPasoEditado] = useState('');

  /* ================= CARGA ================= */

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
  }, [params.id, router]);

  /* ================= INGREDIENTES ================= */

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
        receta_ingrediente: [...prev.receta_ingrediente, nuevo],
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

  async function guardarEdicion(riId: number) {
    try {
      const actualizado = await updateIngrediente(riId, {
        nombre: nombreEditado,
        cantidad: cantidadEditada,
      });

      setReceta((prev: any) => ({
        ...prev,
        receta_ingrediente: prev.receta_ingrediente.map((ri: any) =>
          ri.id === riId ? actualizado : ri
        ),
      }));

      setEditandoId(null);
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function eliminarIngrediente(riId: number) {
    const confirmar = window.confirm(
      '¿Estás seguro de eliminar este ingrediente de la receta?'
    );
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await deleteIngrediente(riId, token);

      setReceta((prev: any) => ({
        ...prev,
        receta_ingrediente: prev.receta_ingrediente.filter(
          (ri: any) => ri.id !== riId
        ),
      }));
    } catch (e: any) {
      alert(e.message);
    }
  }

  /* ================= PASOS ================= */

  async function guardarPaso() {
    if (!textoPaso.trim()) {
      alert('Escribe el paso');
      return;
    }

    try {
      setGuardandoPaso(true);

      const nuevo = await addPaso(
        Number(params.id),
        textoPaso
      );

      setReceta((prev: any) => ({
        ...prev,
        pasos: [...(prev.pasos ?? []), nuevo],
      }));

      setTextoPaso('');
      setMostrarModalPaso(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setGuardandoPaso(false);
    }
  }

  async function guardarEdicionPaso(pasoId: number) {
    try {
      const actualizado = await updatePaso(
        pasoId,
        textoPasoEditado
      );

      setReceta((prev: any) => ({
        ...prev,
        pasos: prev.pasos.map((p: any) =>
          p.id === pasoId ? actualizado : p
        ),
      }));

      setEditandoPasoId(null);
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function eliminarPaso(pasoId: number) {
    const confirmar = window.confirm(
      '¿Estás seguro de eliminar este paso?'
    );
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await deletePaso(pasoId, token);

      setReceta((prev: any) => ({
        ...prev,
        pasos: prev.pasos.filter((p: any) => p.id !== pasoId),
      }));
    } catch (e: any) {
      alert(e.message);
    }
  }


  /* ================= RENDER ================= */

  if (cargando) return <p>Cargando receta...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!receta) return <p>No existe esa receta</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">{receta.nombre}</h1>

      {receta.imagen && (
        <img src={receta.imagen} className="w-60 mb-4 rounded" />
      )}

      {/* ================= INGREDIENTES ================= */}

      <h2 className="text-lg font-semibold mb-2">Ingredientes</h2>

      <ul className="space-y-2">
        {receta.receta_ingrediente.map((ri: any) => (
          <li key={ri.id} className="border p-2 rounded">
            {editandoId === ri.id ? (
              <>
                <input
                  className="border p-1 mb-1 w-full"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                />

                <input
                  className="border p-1 w-full"
                  value={cantidadEditada}
                  onChange={(e) => setCantidadEditada(e.target.value)}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-2 rounded"
                    onClick={() => guardarEdicion(ri.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="text-sm"
                    onClick={() => setEditandoId(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <strong>{ri.ingrediente.nombre}</strong> — {ri.cantidad}
                <input type="checkbox" />
                <div className="mt-1 flex gap-3">
                  <button
                    className="text-sm text-blue-600"
                    onClick={() => {
                      setEditandoId(ri.id);
                      setNombreEditado(ri.ingrediente.nombre);
                      setCantidadEditada(ri.cantidad);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-sm text-red-600"
                    onClick={() => eliminarIngrediente(ri.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
             
          </li>
        ))}
      </ul>

      <button
        className="mt-4 bg-green-600 text-white px-3 py-1 rounded"
        onClick={() => setMostrarModal(true)}
      >
        Agregar ingrediente
      </button>

      {/* ================= PASOS ================= */}

      <h2 className="text-lg font-semibold mt-6 mb-2">Pasos</h2>

      <ol className="list-decimal ml-6 space-y-2">
        {receta.pasos?.map((p: any) => (
          <li key={p.id} className="border p-2 rounded">
            {editandoPasoId === p.id ? (
              <>
                <textarea
                  className="border w-full p-2 mb-2"
                  value={textoPasoEditado}
                  onChange={(e) => setTextoPasoEditado(e.target.value)}
                />

                <div className="flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-2 rounded"
                    onClick={() => guardarEdicionPaso(p.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="text-sm"
                    onClick={() => setEditandoPasoId(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{p.pasos}</p>
                <input type="checkbox" />

                <div className="mt-2 flex gap-3">
                  <button
                    className="text-sm text-blue-600"
                    onClick={() => {
                      setEditandoPasoId(p.id);
                      setTextoPasoEditado(p.pasos);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-sm text-red-600"
                    onClick={() => eliminarPaso(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>

      <button
        className="mt-4 bg-green-600 text-white px-3 py-1 rounded"
        onClick={() => setMostrarModalPaso(true)}
      >
        Agregar paso
      </button>

      {/* ================= MODALES ================= */}

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h3 className="text-lg font-bold mb-3">Nuevo ingrediente</h3>

            <input
              className="border w-full p-1 mb-2"
              placeholder="Ingrediente"
              value={nombreIngrediente}
              onChange={(e) => setNombreIngrediente(e.target.value)}
            />

            <input
              className="border w-full p-1 mb-3"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button onClick={guardarIngrediente}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalPaso && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="text-lg font-bold mb-3">Nuevo paso</h3>

            <textarea
              className="border w-full p-2 mb-3"
              rows={4}
              value={textoPaso}
              onChange={(e) => setTextoPaso(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setMostrarModalPaso(false)}>
                Cancelar
              </button>
              <button onClick={guardarPaso}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
