"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const counties = [
    "Bernalillo",
    "Catron",
    "Chaves",
    "Cibola",
    "Colfax",
    "Curry",
    "De Baca",
    "Doña Ana",
    "Eddy",
    "Grant",
    "Guadalupe",
    "Harding",
    "Hidalgo",
    "Lea",
    "Lincoln",
    "Los Alamos",
    "Luna",
    "McKinley",
    "Mora",
    "Otero",
    "Quay",
    "Rio Arriba",
    "Roosevelt",
    "Sandoval",
    "San Juan",
    "San Miguel",
    "Santa Fe",
    "Sierra",
    "Socorro",
    "Taos",
    "Torrance",
    "Union",
    "Valencia",
];

function Tooltip({ text }: { text: string }) {
    const [show, setShow] = useState(false);
    return (
        <span className="relative ml-2">
            <button
                type="button"
                className="text-blue-500 underline cursor-pointer text-xs"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                tabIndex={0}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
            >
                Why?
            </button>
            {show && (
                <span className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded bg-gray-800 text-white text-xs px-3 py-2 shadow-lg">
                    {text}
                </span>
            )}
        </span>
    );
}

export default function ApplyPage() {
    const searchParams = useSearchParams();
    const isSpanish = searchParams.get("lang") === "es";

    return (
        <main
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#FDFAEC" }}
        >
            {/* Header (copied from homepage, logo links to /) */}
            <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center gap-1">
                    <Link
                        href="/"
                        className="w-20 h-20 bg-[#FDFAEC] rounded-md flex items-center justify-center mr-1 overflow-hidden"
                    >
                        <Image
                            src="/logo.svg"
                            alt="VoteNM Logo"
                            width={160}
                            height={160}
                            className="object-cover object-center w-20 h-20"
                            priority
                        />
                    </Link>
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
                            onChange={(e) => {
                                if (e.target.value === "es") {
                                    window.location.search = "?lang=es";
                                } else {
                                    window.location.search = "";
                                }
                            }}
                            value={isSpanish ? "es" : "en"}
                            style={{ minWidth: 0 }}
                        >
                            <option value={isSpanish ? "es" : "en"}>
                                {isSpanish ? "Español" : "English"}
                            </option>
                            <option value={isSpanish ? "en" : "es"}>
                                {isSpanish ? "English" : "Español"}
                            </option>
                        </select>
                        <span className="ml-1 text-gray-400 pointer-events-none select-none">
                            ▼
                        </span>
                    </div>
                </nav>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-16 h-16 bg-[#FDFAEC] rounded-md flex items-center justify-center overflow-hidden">
                            <Image
                                src="/logo.svg"
                                alt="VoteNM Logo"
                                width={128}
                                height={128}
                                className="object-cover object-center w-16 h-16"
                                priority
                            />
                        </div>
                        <span className="font-extrabold text-3xl text-black tracking-tight">
                            VoteNM
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                        {isSpanish
                            ? "Solicitar una boleta de voto por correo"
                            : "Apply to Vote by Mail"}
                    </h1>
                    <form className="w-full flex flex-col gap-8">
                        {/* Your Information */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">
                                {isSpanish
                                    ? "Tu información"
                                    : "Your Information"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="first-name"
                                    >
                                        {isSpanish
                                            ? "Nombre de pila"
                                            : "First Name"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="first-name"
                                        type="text"
                                        placeholder={
                                            isSpanish
                                                ? "Nombre de pila"
                                                : "First Name"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="suffix"
                                    >
                                        {isSpanish ? "Sufijo" : "Suffix"}
                                    </label>
                                    <input
                                        id="suffix"
                                        type="text"
                                        placeholder={
                                            isSpanish ? "Sufijo" : "Suffix"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="middle-name"
                                    >
                                        {isSpanish
                                            ? "Segundo nombre"
                                            : "Middle Name"}
                                    </label>
                                    <input
                                        id="middle-name"
                                        type="text"
                                        placeholder={
                                            isSpanish
                                                ? "Segundo nombre"
                                                : "Middle Name"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="last-name"
                                    >
                                        {isSpanish ? "Apellido" : "Last Name"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="last-name"
                                        type="text"
                                        placeholder={
                                            isSpanish ? "Apellido" : "Last Name"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="ssn"
                                    >
                                        {isSpanish
                                            ? "Últimos 4 dígitos del SSN"
                                            : "Last 4 digits of SSN"}{" "}
                                        <span className="text-red-500">*</span>
                                        <Tooltip
                                            text={
                                                isSpanish
                                                    ? "Se requiere por ley que proporcionemos los últimos cuatro dígitos de su número de seguro social para verificar su identidad para la votación por correo."
                                                    : "We are required by law to collect the last four digits of your Social Security Number to verify your identity for absentee voting."
                                            }
                                        />
                                    </label>
                                    <input
                                        id="ssn"
                                        type="text"
                                        placeholder={
                                            isSpanish
                                                ? "Últimos 4 dígitos del SSN"
                                                : "Last 4 digits of SSN"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="birth-year"
                                    >
                                        {isSpanish
                                            ? "Año de nacimiento (AAAA)"
                                            : "Birth Year (YYYY)"}{" "}
                                        <span className="text-red-500">*</span>
                                        <Tooltip
                                            text={
                                                isSpanish
                                                    ? "Su año de nacimiento se utiliza para confirmar su registro de votante y prevenir solicitudes duplicadas."
                                                    : "Your birth year is used to confirm your voter registration and prevent duplicate applications."
                                            }
                                        />
                                    </label>
                                    <input
                                        id="birth-year"
                                        type="text"
                                        placeholder={
                                            isSpanish
                                                ? "Año de nacimiento (AAAA)"
                                                : "Birth Year (YYYY)"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Where are you registered to vote? */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">
                                {isSpanish
                                    ? "¿Dónde estás registrado para votar en Nuevo México?"
                                    : "Where are you registered to vote in New Mexico?"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="street-address"
                                    >
                                        {isSpanish
                                            ? "Dirección"
                                            : "Street Address"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="street-address"
                                        type="text"
                                        placeholder={
                                            isSpanish
                                                ? "Dirección"
                                                : "Street Address"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="apt-unit"
                                    >
                                        {isSpanish ? "Apt / Unidad" : "Apt / Unit"}
                                    </label>
                                    <input
                                        id="apt-unit"
                                        type="text"
                                        placeholder={
                                            isSpanish
                                                ? "Apt / Unidad"
                                                : "Apt / Unit"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="city"
                                    >
                                        {isSpanish ? "Ciudad" : "City"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        placeholder={
                                            isSpanish ? "Ciudad" : "City"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="zip-code"
                                    >
                                        {isSpanish ? "Código postal" : "ZIP Code"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="zip-code"
                                        type="text"
                                        placeholder={
                                            isSpanish ? "Código postal" : "ZIP Code"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="county"
                                    >
                                        {isSpanish
                                            ? "Condado (Localidad)"
                                            : "County (Locality)"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="county"
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            {isSpanish
                                                ? "Seleccione un condado (localidad)"
                                                : "Select County (Locality)"}
                                        </option>
                                        {counties.map((county) => (
                                            <option key={county} value={county}>
                                                {county}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="future-elections"
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="future-elections"
                                    className="text-sm"
                                >
                                    {isSpanish
                                        ? "Me gustaría votar por correo en todas las elecciones futuras hasta que indique lo contrario."
                                        : "I'd like to vote by mail for all future elections until I instruct otherwise."}
                                </label>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                                {isSpanish
                                    ? "Si desea enviar su boleta a una dirección diferente, desmarque esta casilla."
                                    : "If you want to send your ballot to a different address, uncheck this box."}
                            </div>
                        </div>

                        {/* Election Selection */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">
                                {isSpanish
                                    ? "¿Para qué elección le gustaría solicitar una boleta por correo?"
                                    : "Which election would you like to request a mail-in ballot for?"}
                            </h2>
                            <div className="mb-2">
                                <Link
                                    href="https://www.sos.nm.gov/voting-and-elections/upcoming-elections/"
                                    className="text-[#005cf0] underline"
                                    target="_blank"
                                >
                                    {isSpanish
                                        ? "Ver la lista de elecciones próximas"
                                        : "View the list of upcoming elections"}
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="general-special"
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor="general-special"
                                        className="text-sm"
                                    >
                                        {isSpanish
                                            ? "Estoy solicitando votar por correo en la elección general o especial"
                                            : "I'm applying to vote by mail in the general or special election"}
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label
                                        htmlFor="election-date"
                                        className="text-sm"
                                    >
                                        {isSpanish
                                            ? "Fecha de la elección:"
                                            : "Election Date:"}
                                    </label>
                                    <select
                                        id="election-date"
                                        className="border border-gray-300 rounded px-4 py-2"
                                    >
                                        <option value="">
                                            {isSpanish
                                                ? "Seleccione una fecha"
                                                : "Select a date"}
                                        </option>
                                        <option value="2025-11-04">
                                            {isSpanish
                                                ? "Elección local regular - 4 de noviembre de 2025"
                                                : "Regular Local Election - November 4, 2025"}
                                        </option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="different-address"
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor="different-address"
                                        className="text-sm"
                                    >
                                        {isSpanish
                                            ? "Me gustaría que mi boleta por correo se entregara a una dirección diferente a la dirección donde estoy registrado para votar."
                                            : "I'd like for my mail-in ballot to be delivered to a different address than the address where I'm registered to vote."}
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="assistance"
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor="assistance"
                                        className="text-sm"
                                    >
                                        {isSpanish
                                            ? "Necesito ayuda para completar mi boleta debido a una discapacidad, ceguera o incapacidad para leer o escribir. Si se marca, se proporcionará un formulario de asistencia con su boleta."
                                            : "I will need assistance in completing my ballot due to a disability, blindness, or inability to read or write. If checked, an assistance form will be provided with your ballot."}
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="changed-info"
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor="changed-info"
                                        className="text-sm"
                                    >
                                        {isSpanish
                                            ? "He cambiado mi residencia o nombre legal desde la última vez que voté."
                                            : "I have changed my residence or legal name since the last time I voted."}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">
                                {isSpanish ? "Información de contacto" : "Contact Info"}
                            </h2>
                            <div className="mb-2 text-xs text-gray-500">
                                {isSpanish
                                    ? "Se requiere su dirección de correo electrónico para enviarle una copia de su solicitud."
                                    : "Your email address is required to send you a copy of your application."}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="email"
                                    >
                                        {isSpanish
                                            ? "Dirección de correo electrónico"
                                            : "Email Address"}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder={
                                            isSpanish
                                                ? "Dirección de correo electrónico"
                                                : "Email Address"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="phone"
                                    >
                                        {isSpanish ? "Número de teléfono" : "Phone Number"}
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder={
                                            isSpanish
                                                ? "Número de teléfono"
                                                : "Phone Number"
                                        }
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Voter Signature */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">
                                {isSpanish ? "Firma del votante" : "Voter Signature"}
                            </h2>
                            <div className="mb-2 text-xs text-gray-500">
                                {isSpanish
                                    ? "Al firmar a continuación, afirmo bajo pena de un delito menor de cuarto grado (según NMSA §§ 3-8-75 y 1-20-8) que:"
                                    : "By signing below, I affirm under penalty of a fourth-degree felony (per NMSA §§ 3-8-75 & 1-20-8) that:"}
                                <ol className="list-decimal ml-6">
                                    <li>
                                        {isSpanish
                                            ? "La información proporcionada en este formulario es verdadera."
                                            : "The information provided in this form is true."}
                                    </li>
                                    <li>
                                        {isSpanish
                                            ? "No estoy solicitando una boleta ni votando en ninguna otra jurisdicción de los Estados Unidos."
                                            : "I am not requesting a ballot or voting in any other jurisdictions in the United States."}
                                    </li>
                                    <li>
                                        {isSpanish
                                            ? "Estoy registrado para votar en la ciudad/condado donde estoy solicitando votar."
                                            : "I am registered to vote in the city/county where I am applying to vote."}
                                    </li>
                                </ol>
                            </div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="voter-name"
                            >
                                {isSpanish ? "Nombre del votante" : "Voter Name"}{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="voter-name"
                                type="text"
                                placeholder={
                                    isSpanish ? "Nombre del votante" : "Voter Name"
                                }
                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-[#005cf0] text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors"
                        >
                            {isSpanish
                                ? "Enviar solicitud"
                                : "Submit Application"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
