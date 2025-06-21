"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams();
  const isSpanish = searchParams.get("lang") === "es";
  const currentLang = isSpanish ? "Español" : "English";

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FDFAEC" }}
    >
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 z-10" style={{ backgroundColor: "#FDFAEC" }}>
        <div className="flex items-center gap-1">
          <div className="w-20 h-20 bg-[#FDFAEC] rounded-md flex items-center justify-center mr-1 overflow-hidden"> {/* removed border class */}
            <Image
              src="/logo.svg"
              alt="VoteNM Logo"
              width={160}
              height={160}
              className="object-cover object-center w-20 h-20"
              priority
            />
          </div>
          <span className="font-extrabold text-2xl text-black tracking-tight">
            VoteNM
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="https://www.sos.nm.gov/"
            target="_blank"
            rel="noopener"
            className="hover:underline text-gray-700"
          >
            NM Secretary of State
          </Link>
          {/* Language Dropdown */}
          <div className="relative flex items-center">
            <select
              id="language-select"
              className="appearance-none bg-transparent px-1 py-1 text-gray-700 focus:outline-none cursor-pointer"
              onChange={e => {
                if (e.target.value === 'es') {
                  window.location.search = '?lang=es';
                } else {
                  window.location.search = '';
                }
              }}
              value={isSpanish ? 'es' : 'en'}
              style={{ minWidth: 0 }}
            >
              <option value={isSpanish ? 'es' : 'en'}>{currentLang}</option>
              <option value={isSpanish ? 'en' : 'es'}>{isSpanish ? 'English' : 'Español'}</option>
            </select>
            <span className="ml-1 text-gray-400 pointer-events-none select-none">▼</span>
          </div>
        </nav>
      </header>

      {/* Hero Section with overlayed tagline and button */}
      <section className="relative w-full h-[60vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        {/* Background image (nm.webp) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/nm.webp"
            alt="New Mexico landscape"
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>
        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center w-full px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
            VoteNM
          </h1>
          <p className="text-lg md:text-2xl text-white max-w-xl mx-auto mb-6">
            {isSpanish
              ? 'Ayudando a los habitantes de Nuevo México a votar por correo—de manera clara, segura y a tiempo.'
              : 'Helping New Mexicans vote by mail—clearly, securely, and on time.'}
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-md bg-[#005cf0] text-white px-8 py-3 text-base font-semibold shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
          >
            {isSpanish ? 'Solicitar' : 'Apply'}
          </Link>
        </div>
      </section>

      {/* Info Box Section */}
      <section className="flex flex-col items-center justify-center px-4 py-10">
        <div className="rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl w-full text-center bg-white">
          <p className="text-base md:text-lg text-gray-700 mb-2">
            {isSpanish
              ? 'La fecha límite para solicitar votar por correo en la Elección Local Regular de Nuevo México es el '
              : 'The deadline to apply to vote by mail for the New Mexico Regular Local Election is '}<span className="font-semibold">{isSpanish ? 'martes 7 de octubre de 2025' : 'Tuesday, October 7, 2025'}</span>{isSpanish ? '.' : '.'}
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            {isSpanish
              ? 'Se recomienda solicitar lo antes posible para evitar posibles retrasos.'
              : 'You are encouraged to apply as early as possible to reduce any potential delays.'}
          </p>
          <p className="text-base md:text-lg text-gray-700">
            {isSpanish
              ? 'Si desea verificar el estado de su solicitud previamente enviada, visite el '
              : 'If you want to check on the status of your previously submitted application, please visit the '}
            <a
              href="https://www.sos.nm.gov/voting-and-elections/voter-information-portal-nmvote-org/absentee-and-early-voting/"
              target="_blank"
              rel="noopener"
              className="text-[#005cf0] underline hover:text-blue-700"
            >
              {isSpanish ? 'portal de votantes de Nuevo México' : 'New Mexico voter portal.'}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between border-t border-gray-200 px-6 py-6 text-xs text-gray-500 mt-auto" style={{ backgroundColor: "#FDFAEC" }}>
        <div className="mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} VoteNM. All rights reserved.
        </div>
        <nav className="flex gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </footer>
    </main>
  );
}
