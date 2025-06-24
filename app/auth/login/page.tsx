"use client";
import SiteLayout from "../../components/SiteLayout";
import { LoginForm } from "@/components/login-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const isSpanish = searchParams.get("lang") === "es";
  const langParam = isSpanish ? "?lang=es" : "";
  return (
    <SiteLayout>
      <div className="min-h-[80vh] flex items-center justify-center" style={{ backgroundColor: "#FDFAEC" }}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <LoginForm isSpanish={isSpanish} langParam={langParam} />
        </div>
      </div>
    </SiteLayout>
  );
}