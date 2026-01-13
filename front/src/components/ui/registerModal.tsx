"use client";

import { useState } from "react";
import { registerUsuario } from "@/apis/usuario.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: Props) {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUsuario({
        correo,
        nombre: nombre || undefined,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCorreo("");
    setNombre("");
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear cuenta</DialogTitle>
          <DialogDescription>
            Regístrate para comenzar
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label>Correo</Label>
              <Input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div>
              <Label>Nombre (opcional)</Label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-green-600 font-medium">
              ✅ Cuenta creada correctamente
            </p>

            <p className="text-sm text-muted-foreground">
              Revisa tu correo para crear tu contraseña y poder ingresar.
            </p>

            <Button onClick={handleClose} className="w-full">
              Entendido
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
