"use client";

import React, { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import { SignUpForm } from "@/components/sign-up-form";
import { useSearchParams } from "next/navigation";

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const isSpanish = searchParams.get("lang") === "es";
  const langParam = isSpanish ? "?lang=es" : "";
  return (
    <SiteLayout>
      <div className="min-h-[80vh] flex items-center justify-center" style={{ backgroundColor: "#FDFAEC" }}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <SignUpForm isSpanish={isSpanish} langParam={langParam} />
        </div>
      </div>
    </SiteLayout>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </Suspense>
  );
}
