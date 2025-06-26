"use client";
import React, { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import { useSearchParams } from "next/navigation";

function SignUpSuccessPageContent() {
  const searchParams = useSearchParams();
  const isSpanish = searchParams.get("lang") === "es";
  return (
    <SiteLayout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <div className="w-full flex flex-col gap-6">
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 mt-2">
                {isSpanish ? "¡Gracias por registrarte!" : "Thank you for signing up!"}
              </h1>
            </div>
            <p className="text-base text-gray-500 text-center">
              {isSpanish
                ? "Te has registrado exitosamente. Por favor revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión."
                : "You've successfully signed up. Please check your email to confirm your account before signing in."}
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpSuccessPageContent />
    </Suspense>
  );
}
