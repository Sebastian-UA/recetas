"use client";

import { useState } from "react";
import { recoverPassword } from "@/apis/usuario.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecoverPasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [correo, setCorreo] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    try {
      await recoverPassword(correo);
      setSent(true);
    } catch {
      alert("Error al enviar correo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recuperar contraseña</DialogTitle>
        </DialogHeader>

        {sent ? (
          <p className="text-sm text-gray-600">
            Si el correo existe, te llegará un enlace para recuperar tu
            contraseña.
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Correo</Label>
              <Input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <Button className="w-full" onClick={handleSend}>
              Enviar correo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
