"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  isSpanish = false,
  langParam = "",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { isSpanish?: boolean; langParam?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form onSubmit={handleSignUp} className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 mt-2">
            {isSpanish ? "Crear cuenta" : "Sign up"}
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <label htmlFor="email" className="block mb-2 text-xs text-gray-500">{isSpanish ? "Correo electrónico" : "Email"}</label>
            <input
              id="email"
              type="email"
              placeholder={isSpanish ? "Ingresa tu correo electrónico" : "Enter your email"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 text-base"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="block mb-2 text-xs text-gray-500">{isSpanish ? "Contraseña" : "Password"}</label>
            <input
              id="password"
              type="password"
              placeholder={isSpanish ? "Crea una contraseña" : "Enter your password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 text-base"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="repeat-password" className="block mb-2 text-xs text-gray-500">{isSpanish ? "Repite la contraseña" : "Repeat Password"}</label>
            <input
              id="repeat-password"
              type="password"
              placeholder={isSpanish ? "Repite tu contraseña" : "Repeat your password"}
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 text-base"
            />
          </div>
          {error && <p className="text-sm text-red-500">{isSpanish ? (error === "Passwords do not match" ? "Las contraseñas no coinciden" : error) : error}</p>}
          <button
            type="submit"
            className="w-full md:w-auto bg-[#005cf0] text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isSpanish ? (isLoading ? "Creando cuenta..." : "Crear cuenta") : (isLoading ? "Creating an account..." : "Sign up")}
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          {isSpanish ? "¿Ya tienes una cuenta?" : "Already have an account?"} {" "}
          <Link href={`/auth/login${langParam}`} className="underline underline-offset-4 text-[#005cf0]">{isSpanish ? "Iniciar sesión" : "Login"}</Link>
        </div>
      </form>
    </div>
  );
}
