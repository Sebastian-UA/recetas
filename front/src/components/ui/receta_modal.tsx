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
    <Dialog >
      <DialogTrigger asChild>
        <Button className="text-sm rounded-full  text-amber-50 bg-[#1a0083] px-2 py-1">
          Nueva receta
          </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#7189b6]">
        <DialogHeader>
          <DialogTitle className="text-amber-50">Crear receta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-amber-50 py-1">Nombre</Label>
            <Input className="bg-amber-50 border-zinc-950 border-2" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <Label className="text-amber-50 py-1">Imagen (URL)</Label>
            <Input className="bg-amber-50 border-zinc-950 border-2" value={imagen} onChange={(e) => setImagen(e.target.value)} />
          </div>

          <Button className="bg-[#1a0083]" onClick={handleCreate}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
