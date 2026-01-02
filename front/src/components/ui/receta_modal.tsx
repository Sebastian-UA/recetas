"use client";

import { useState } from "react";
import { createReceta } from "@/apis/receta.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CrearRecetaModal({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");

  const handleCreate = async () => {
    await createReceta({ nombre, imagen });
    setNombre("");
    setImagen("");
    onCreated(); // 🔄 refresca lista
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nueva receta</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear receta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <Label>Imagen (URL)</Label>
            <Input value={imagen} onChange={(e) => setImagen(e.target.value)} />
          </div>

          <Button onClick={handleCreate}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
