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

export function LoginForm({
  className,
  isSpanish = false,
  langParam = "",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isSpanish?: boolean;
  langParam?: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form onSubmit={handleLogin} className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 mt-2">
            {isSpanish ? "Iniciar sesión" : "Login"}
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="block mb-2 text-xs text-gray-500"
            >
              {isSpanish ? "Correo electrónico" : "Email"}
            </label>
            <input
              id="email"
              type="email"
              placeholder={
                isSpanish
                  ? "Ingresa tu correo electrónico"
                  : "Enter your email"
              }
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 text-base"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="block mb-2 text-xs text-gray-500"
              >
                {isSpanish ? "Contraseña" : "Password"}
              </label>
              <Link
                href={`/auth/forgot-password${langParam}`}
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#005cf0]"
              >
                {isSpanish
                  ? "¿Olvidaste tu contraseña?"
                  : "Forgot your password?"}
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder={
                isSpanish ? "Ingresa tu contraseña" : "Enter your password"
              }
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
                ? "Iniciando sesión..."
                : "Iniciar sesión"
              : isLoading
                ? "Logging in..."
                : "Login"}
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          {isSpanish
            ? "¿No tienes una cuenta?"
            : "Don’t have an account?"}{" "}
          <Link
            href={`/auth/sign-up${langParam}`}
            className="underline underline-offset-4 text-[#005cf0]"
          >
            {isSpanish ? "Crear cuenta" : "Sign up"}
          </Link>
        </div>
      </form>
    </div>
  );
}
