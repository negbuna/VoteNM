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
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  isSpanish = false,
  langParam = "",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isSpanish?: boolean;
  langParam?: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isSpanish
                ? "Revisa tu correo electrónico"
                : "Check Your Email"}
            </CardTitle>
            <CardDescription>
              {isSpanish
                ? "Te enviamos instrucciones para restablecer tu contraseña"
                : "Password reset instructions sent"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isSpanish
                ? "Si te registraste usando tu correo y contraseña, recibirás un correo para restablecer tu contraseña."
                : "If you registered using your email and password, you will receive a password reset email."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isSpanish ? "Restablecer contraseña" : "Reset Your Password"}
            </CardTitle>
            <CardDescription>
              {isSpanish
                ? "Por favor ingresa tu correo para restablecer tu contraseña"
                : "Type in your email and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    {isSpanish ? "Correo electrónico" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      isSpanish
                        ? "Ingresa tu correo electrónico"
                        : "m@example.com"
                    }
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full md:w-auto bg-[#005cf0] text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors" disabled={isLoading}>
                  {isSpanish
                    ? isLoading
                      ? "Enviando..."
                      : "Enviar correo de restablecimiento"
                    : isLoading
                      ? "Sending..."
                      : "Send reset email"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {isSpanish ? "¿Ya tienes una cuenta?" : "Already have an account?"}{" "}
                <Link
                  href={`/auth/login${langParam}`}
                  className="underline underline-offset-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isSpanish ? "Iniciar sesión" : "Login"}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
