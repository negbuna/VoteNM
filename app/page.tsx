"use client";
import SiteLayout from "./components/SiteLayout";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Notification from "../components/Notification";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const faqs = [
  {
    q: {
      en: "How does this site work?",
      es: "¿Cómo funciona este sitio?",
    },
    a: {
      en: `This simple mail-in ballot application is accepted by the New Mexico Secretary of State and county clerks. Your completed request is submitted electronically to your county or city registrar. A copy is emailed to you for your records.`,
      es: `Esta sencilla solicitud de boleta por correo es aceptada por la Secretaría de Estado de Nuevo México y los secretarios de condado. Su solicitud completada se envía electrónicamente a su registrador del condado o ciudad. Se le envía una copia por correo electrónico para sus registros.`,
    },
  },
  {
    q: {
      en: "What’s the difference between an absentee ballot and a mail-in ballot?",
      es: "¿Cuál es la diferencia entre una boleta de voto ausente y una boleta por correo?",
    },
    a: {
      en: `There is no difference in New Mexico. These terms are used interchangeably.`,
      es: `No hay diferencia en Nuevo México. Estos términos se usan indistintamente.`,
    },
  },
  {
    q: {
      en: "What if I don’t receive my mail-in ballot?",
      es: "¿Qué pasa si no recibo mi boleta por correo?",
    },
    a: {
      en: `You can check your ballot status on the New Mexico Voter Information Portal. If it doesn’t arrive or isn’t mailed within a few days, contact your county clerk.`,
      es: `Puede verificar el estado de su boleta en el Portal de Información para Votantes de Nuevo México. Si no llega o no se envía en unos días, comuníquese con su secretario del condado.`,
    },
  },
  {
    q: {
      en: "Where does my data go?",
      es: "¿A dónde va mi información?",
    },
    a: {
      en: `We only use the data you provide to fill out New Mexico's absentee form on your behalf and send it to your local registrar (county or city clerk). We delete your data afterwards.`,
      es: `Solo usamos la información que proporcionas para completar la solicitud de voto ausente de Nuevo México en tu nombre y enviarla a tu registrador local (secretario del condado o ciudad). Eliminamos tu información después.`,
    },
  },  
  {
    q: {
      en: "Can anyone receive a mail-in ballot?",
      es: "¿Cualquiera puede recibir una boleta por correo?",
    },
    a: {
      en: `Yes. All registered New Mexico voters are eligible to request a mail-in ballot. No excuse is required.`,
      es: `Sí. Todos los votantes registrados en Nuevo México pueden solicitar una boleta por correo. No se requiere excusa.`,
    },
  },
  {
    q: {
      en: "When will I receive my mail-in ballot?",
      es: "¿Cuándo recibiré mi boleta por correo?",
    },
    a: {
      en: `Ballot applications can be submitted anytime before the deadline (14 days before Election Day). Ballots are mailed about 28–45 days before elections.`,
      es: `Las solicitudes de boleta pueden enviarse en cualquier momento antes de la fecha límite (14 días antes del Día de las Elecciones). Las boletas se envían por correo aproximadamente 28–45 días antes de las elecciones.`,
    },
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const [isSpanish, setIsSpanish] = useState<boolean | null>(null);

  // Only determien language on client after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setIsSpanish(searchParams.get("lang") === "es");
    }
  }, []);

  // Render nothing until language is known
  if (isSpanish === null) return null;

  return (
    <section id="faq" className="max-w-2xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        {isSpanish ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
      </h2>
      <div className="divide-y divide-gray-200 rounded-2xl shadow bg-white">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              className="w-full text-left px-6 py-5 focus:outline-none focus:bg-gray-100 flex justify-between items-center"
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
              type="button"
            >
              <span className="font-semibold text-lg text-gray-900">
                {isSpanish ? faq.q.es : faq.q.en}
              </span>
              <span className="ml-4 text-gray-400">
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-96 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                }`}
              style={{
                pointerEvents: open === i ? "auto" : "none",
              }}
              aria-hidden={open !== i}
            >
              {open === i && (
                <div className="text-gray-700 whitespace-pre-line">
                  {isSpanish ? faq.a.es : faq.a.en}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-4 text-center">
        Source:{" "}
        <a
          href="https://www.sos.nm.gov/"
          className="underline"
          target="_blank"
          rel="noopener"
        >
          New Mexico Secretary of State
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const isSpanish = searchParams.get("lang") === "es";
  const currentLang = isSpanish ? "Español" : "English";
  const [showNotif, setShowNotif] = useState(false);
  const router = useRouter();

  const handleApply = async (e: React.MouseEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setShowNotif(true);
    } else {
      router.push("/apply");
    }
  };

  return (
    <SiteLayout>
      {/* Hero Section with overlayed tagline and button */}
      <section className="relative w-full h-[60vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        {/* Background image (nm2.webp) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/nm2.webp"
            alt="New Mexico landscape"
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>
        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4 w-full text-center">
            VoteNM
          </h1>
          <p className="text-lg md:text-2xl text-white max-w-xl mx-auto mb-6 w-full text-center">
            {isSpanish
              ? "Ayudando a los habitantes de Nuevo México a votar por correo—de manera clara, segura y a tiempo."
              : "Helping New Mexicans vote by mail—clearly, securely, and on time."}
          </p>
          <button
            onClick={handleApply}
            className="inline-flex items-center justify-center rounded-md bg-[#005cf0] text-white px-8 py-3 text-base font-semibold shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors w-auto mx-auto"
          >
            {isSpanish ? "Solicitar" : "Apply"}
          </button>
        </div>
        <Notification
          show={showNotif}
          message={isSpanish ? "Por favor, cree una cuenta para solicitar" : "Please create an account to apply"}
          onClose={() => setShowNotif(false)}
        />
      </section>
      {/* Info Box Section */}
      <section className="flex flex-col items-center justify-center px-4 py-10">
        <div className="rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl w-full text-center bg-white">
          <p className="text-base md:text-lg text-gray-700 mb-2">
            {isSpanish ? (
              <>
                Su secretario del condado debe recibir su solicitud de boleta por
                correo{" "}
                <span className="font-semibold">a más tardar 14 días</span> antes
                del Día de las Elecciones, según lo exige la ley de Nuevo México.
              </>
            ) : (
              <>
                Your local county clerk must receive your mail-in ballot request{" "}
                <span className="font-semibold">no later than 14 days</span> before
                Election Day, as required by New Mexico law.
              </>
            )}
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-2">
            {isSpanish ? (
              <>
                Para la Elección Local Regular de 2025, la fecha límite para
                solicitar una boleta es el{" "}
                <span className="font-semibold">martes 21 de octubre de 2025</span>
                .
              </>
            ) : (
              <>
                For the 2025 Regular Local Election, the deadline to request a ballot
                is{" "}
                <span className="font-semibold">Tuesday, October 21, 2025</span>
                .
              </>
            )}
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-2">
            {isSpanish
              ? "No espere: las solicitudes anticipadas le dan más tiempo para recibir, completar y devolver su boleta."
              : "Don’t wait—earlier applications give you more time to receive, complete, and return your ballot."}
          </p>
          <p className="text-base md:text-lg text-gray-700">
            {isSpanish ? (
              <>
                Si ya ha enviado una solicitud y desea verificar su estado, visite el
              </>
            ) : (
              <>
                If you’ve already submitted an application and want to check its
                status, visit the
              </>
            )}
            <a
              href="https://app.enhancedvoting.com/login/Voter/Account/Login2?returnUrl=%2Flogin%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dcore.voter.frontend%26scope%3Dopenid%2520profile%2520offline_access%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fapp.enhancedvoting.com%252Fvoter%252Fapi%252Fauth%252Fcallback%26acr_values%3Dusertype%253AVoter%2520voterLoginMode%253Alight%2520shortName%253Anewmexico%26code_challenge%3DG1Kyj-6n3ZYACaO7PWFvh9dDKk6kBY7jeQoZ1GS3i3A%26code_challenge_method%3DS256"
              target="_blank"
              rel="noopener"
              className="text-[#005cf0] underline hover:text-blue-700 ml-1"
            >
              {isSpanish ? "Portal de seguimiento de votos de Nuevo México" : "New Mexico Ballot Tracking Portal"}
            </a>
            .
          </p>
        </div>
      </section>
      <FaqAccordion />
    </SiteLayout>
  );
}
