"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  isSpanish = false,
  langParam = "",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { isSpanish?: boolean; langParam?: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/protected" + langParam);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : (isSpanish ? "Ocurrió un error" : "An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isSpanish ? "Restablecer contraseña" : "Reset Your Password"}
          </CardTitle>
          <CardDescription>
            {isSpanish
              ? "Por favor ingresa tu nueva contraseña."
              : "Please enter your new password below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password" className="block mb-2 text-xs text-gray-500">
                  {isSpanish ? "Nueva contraseña" : "New password"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSpanish ? "Ingresa tu nueva contraseña" : "New password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 text-base"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#005cf0] text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isSpanish
                  ? isLoading
                    ? "Guardando..."
                    : "Guardar nueva contraseña"
                  : isLoading
                    ? "Saving..."
                    : "Save new password"}
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              {isSpanish ? "¿Ya tienes una cuenta?" : "Already have an account?"} {" "}
              <Link
                href={`/auth/login${langParam}`}
                className="underline underline-offset-4 text-[#005cf0]"
              >
                {isSpanish ? "Iniciar sesión" : "Login"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
