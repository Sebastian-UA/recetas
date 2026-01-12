"use client";

import { useState } from "react";
import { registerUsuario } from "@/apis/usuario.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !correo || !contraseña) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      await registerUsuario({ nombre, correo, contraseña });
      alert("Usuario creado correctamente");
      onClose();
    } catch (error: any) {
      alert(error.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear cuenta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <Label>Correo</Label>
            <Input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div>
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creando..." : "Registrarse"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
