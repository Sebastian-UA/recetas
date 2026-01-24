import { Suspense } from "react";
import CrearPasswordClient from "./CrearPasswordClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      Cargando...
    </div>}>
      <CrearPasswordClient />
    </Suspense>
  );
}
