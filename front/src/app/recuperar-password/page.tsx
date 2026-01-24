import { Suspense } from "react";
import RecuperarPasswordClient from "./RecuperarPasswordClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <RecuperarPasswordClient />
    </Suspense>
  );
}
