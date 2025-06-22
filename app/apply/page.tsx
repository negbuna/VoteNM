"use client";
import SiteLayout from "../components/SiteLayout";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
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

    // State for checkboxes and dynamic sections
    const [showDifferentAddress, setShowDifferentAddress] = useState(false);
    const [showFutureElections, setShowFutureElections] = useState(false);
    const [futureParty, setFutureParty] = useState("");
    const [showFutureAssistance, setShowFutureAssistance] = useState(false);
    const [showChangedInfo, setShowChangedInfo] = useState(false);

    // New state for reorganized checkboxes and affirmation
    const [needAssistance, setNeedAssistance] = useState(false);
    const [assistantAffirm, setAssistantAffirm] = useState(false);

    // Remove nested assistance logic from other checkboxes
    // Only use needAssistance for the main assistance section

    return (
        <SiteLayout>
            <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDFAEC" }}>
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
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">
                                    {isSpanish
                                        ? "Tu información"
                                        : "Your Information"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="first-name">
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
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="suffix">
                                            {isSpanish ? "Sufijo" : "Suffix"}
                                        </label>
                                        <input
                                            id="suffix"
                                            type="text"
                                            placeholder={
                                                isSpanish ? "Sufijo" : "Suffix"
                                            }
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="middle-name">
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
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="last-name">
                                            {isSpanish ? "Apellido" : "Last Name"}{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="last-name"
                                            type="text"
                                            placeholder={
                                                isSpanish ? "Apellido" : "Last Name"
                                            }
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="ssn">
                                            {isSpanish ? "Últimos 4 dígitos del SSN" : "Last 4 digits of SSN"} <span className="text-red-500">*</span>
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
                                                isSpanish ? "Últimos 4 dígitos del SSN" : "Last 4 digits of SSN"
                                            }
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="birth-year">
                                            {isSpanish ? "Año de nacimiento (AAAA)" : "Birth Year (YYYY)"}{" "}
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
                                                isSpanish ? "Año de nacimiento (AAAA)" : "Birth Year (YYYY)"
                                            }
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Where are you registered to vote? */}
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">
                                    {isSpanish
                                        ? "¿Dónde estás registrado para votar en Nuevo México?"
                                        : "Where are you registered to vote in New Mexico?"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="street-address">
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
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="apt-unit">
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
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="city">
                                            {isSpanish ? "Ciudad" : "City"}{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            placeholder={
                                                isSpanish ? "Ciudad" : "City"
                                            }
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="zip-code">
                                            {isSpanish ? "Código postal" : "ZIP Code"}{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="zip-code"
                                            type="text"
                                            placeholder={
                                                isSpanish ? "Código postal" : "ZIP Code"
                                            }
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="county">
                                            {isSpanish
                                                ? "Condado (Localidad)"
                                                : "County (Locality)"}{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="county"
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white text-black text-xs text-gray-500"
                                            required
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                {isSpanish
                                                    ? "Seleccione un condado (localidad)"
                                                    : "Select County (Locality)"}
                                            </option>
                                            {counties.map((county) => (
                                                <option key={county} value={county} className="text-black">
                                                    {county}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* Main Checkboxes Section */}
                                <div className="flex flex-col gap-4 mt-6">
                                    {/* Future Elections Checkbox and Section */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="future-elections"
                                                className="mr-2"
                                                checked={showFutureElections}
                                                onChange={e => setShowFutureElections(e.target.checked)}
                                            />
                                            <label htmlFor="future-elections" className="text-xs text-gray-500">
                                                {isSpanish ? "Me gustaría votar por correo en todas las elecciones futuras hasta que indique lo contrario." : "I'd like to vote by mail for all future elections until I instruct otherwise."}
                                            </label>
                                        </div>
                                        {showFutureElections && (
                                            <div className="mt-4 space-y-2">
                                                <span className="block mb-2 text-xs text-gray-500 font-semibold">
                                                    {isSpanish ? "¿Qué boletas de primaria de partido le gustaría recibir?" : "Which party primary ballots would you like to receive?"}
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    <label className="inline-flex items-center text-xs text-gray-500">
                                                        <input type="radio" name="future-party" value="dem" checked={futureParty === "dem"} onChange={() => setFutureParty("dem")} />
                                                        <span className="ml-2">{isSpanish ? "Partido Demócrata" : "Democratic Party"}</span>
                                                    </label>
                                                    <label className="inline-flex items-center text-xs text-gray-500">
                                                        <input type="radio" name="future-party" value="rep" checked={futureParty === "rep"} onChange={() => setFutureParty("rep")} />
                                                        <span className="ml-2">{isSpanish ? "Partido Republicano" : "Republican Party"}</span>
                                                    </label>
                                                    <label className="inline-flex items-center text-xs text-gray-500">
                                                        <input type="radio" name="future-party" value="none" checked={futureParty === "none"} onChange={() => setFutureParty("none")} />
                                                        <span className="ml-2">{isSpanish ? "No deseo recibir boletas de primaria" : "I do not wish to receive primary ballots"}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Different Address Checkbox and Section */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="different-address"
                                                className="mr-2"
                                                checked={showDifferentAddress}
                                                onChange={e => setShowDifferentAddress(e.target.checked)}
                                            />
                                            <label htmlFor="different-address" className="text-xs text-gray-500">
                                                {isSpanish ? "Me gustaría que mi boleta por correo se entregara a una dirección diferente a la dirección donde estoy registrado para votar." : "I'd like for my mail-in ballot to be delivered to a different address than the address where I'm registered to vote."}
                                            </label>
                                        </div>
                                        {showDifferentAddress && (
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="diff-street">{isSpanish ? "Dirección" : "Street Address"}</label>
                                                    <input id="diff-street" type="text" placeholder={isSpanish ? "Dirección" : "Street Address"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="diff-apt">{isSpanish ? "Apartamento" : "Apartment"}</label>
                                                    <input id="diff-apt" type="text" placeholder={isSpanish ? "Apartamento" : "Assistant Apartment"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="diff-city">{isSpanish ? "Ciudad" : "City"}</label>
                                                    <input id="diff-city" type="text" placeholder={isSpanish ? "Ciudad" : "City"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="diff-state">{isSpanish ? "Estado" : "State"}</label>
                                                    <input id="diff-state" type="text" placeholder={isSpanish ? "Estado" : "State"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="diff-zip">{isSpanish ? "Código postal" : "Zip Code"}</label>
                                                    <input id="diff-zip" type="text" placeholder={isSpanish ? "Código postal" : "Zip Code"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="diff-country">{isSpanish ? "País" : "Country"}</label>
                                                    <input id="diff-country" type="text" placeholder={isSpanish ? "País" : "Country"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Need Assistance Checkbox and Section */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="need-assistance"
                                                className="mr-2"
                                                checked={needAssistance}
                                                onChange={e => setNeedAssistance(e.target.checked)}
                                            />
                                            <label htmlFor="need-assistance" className="text-xs text-gray-500">
                                                {isSpanish ? "Necesitaré ayuda para completar mi boleta debido a una discapacidad, ceguera o incapacidad para leer o escribir. Si se marca, se proporcionará un formulario de asistencia con su boleta." : "I will need assistance in completing my ballot due to a disability, blindness, or inability to read or write. If checked, an assistance form will be provided with your ballot."}
                                            </label>
                                        </div>
                                        {needAssistance && (
                                            <div className="mt-4 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-name">{isSpanish ? "Nombre completo del asistente" : "Assistant Full Name"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-name" type="text" required placeholder={isSpanish ? "Nombre completo del asistente" : "Assistant Full Name"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-address">{isSpanish ? "Dirección del asistente" : "Assistant Street Address"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-address" type="text" required placeholder={isSpanish ? "Dirección del asistente" : "Assistant Street Address"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-apt">{isSpanish ? "Apartamento del asistente" : "Assistant Apartment"}</label>
                                                        <input id="assistant-apt" type="text" placeholder={isSpanish ? "Apartamento del asistente" : "Assistant Apartment"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-city">{isSpanish ? "Ciudad del asistente" : "Assistant City"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-city" type="text" required placeholder={isSpanish ? "Ciudad del asistente" : "Assistant City"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-state">{isSpanish ? "Estado del asistente" : "Assistant State"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-state" type="text" required placeholder={isSpanish ? "Estado del asistente" : "Assistant State"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-zip">{isSpanish ? "Código postal del asistente" : "Assistant Zip Code"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-zip" type="text" required placeholder={isSpanish ? "Código postal del asistente" : "Assistant Zip Code"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-phone">{isSpanish ? "Número de teléfono del asistente" : "Assistant Phone Number"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-phone" type="tel" required placeholder={isSpanish ? "Número de teléfono del asistente" : "Assistant Phone Number"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="assistant-signature">{isSpanish ? "Firma del asistente" : "Assistant Signature"} <span className="text-red-500">*</span></label>
                                                        <input id="assistant-signature" type="text" required placeholder={isSpanish ? "Firma del asistente" : "Assistant Signature"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="assistant-affirm"
                                                        className="mr-2"
                                                        checked={assistantAffirm}
                                                        onChange={e => setAssistantAffirm(e.target.checked)}
                                                        required
                                                    />
                                                    <label htmlFor="assistant-affirm" className="text-xs text-gray-500">
                                                        {isSpanish
                                                            ? "Afirmo, bajo pena por hacer declaraciones materiales falsas a sabiendas, que la información que proporcioné en este formulario es verdadera, y he escrito en la línea del nombre del solicitante, 'Solicitante incapaz de firmar'."
                                                            : "I affirm, under penalty for making willfully false material statements, that the information I provided on this form is true, and I have written on the applicant’s name line, 'Applicant Unable to Sign.'"}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Changed Info Checkbox and Section */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="changed-info"
                                                className="mr-2"
                                                checked={showChangedInfo}
                                                onChange={e => setShowChangedInfo(e.target.checked)}
                                            />
                                            <label htmlFor="changed-info" className="text-xs text-gray-500">
                                                {isSpanish ? "He cambiado mi residencia o nombre legal desde la última vez que voté." : "I have changed my residence or legal name since the last time I voted."}
                                            </label>
                                        </div>
                                        {showChangedInfo && (
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="former-name">{isSpanish ? "Nombre completo anterior" : "Former Full Name"}</label>
                                                    <input id="former-name" type="text" placeholder={isSpanish ? "Nombre completo anterior" : "Former Full Name"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="former-street">{isSpanish ? "Dirección anterior" : "Former Street Address"}</label>
                                                    <input id="former-street" type="text" placeholder={isSpanish ? "Dirección anterior" : "Former Street Address"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="former-city">{isSpanish ? "Ciudad anterior" : "Former City"}</label>
                                                    <input id="former-city" type="text" placeholder={isSpanish ? "Ciudad anterior" : "Former City"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="former-state">{isSpanish ? "Estado anterior" : "Former State"}</label>
                                                    <input id="former-state" type="text" value={isSpanish ? "Nuevo México" : "New Mexico"} readOnly className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-100 text-gray-900" />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="former-zip">{isSpanish ? "Código postal anterior" : "Former Zip Code"}</label>
                                                    <input id="former-zip" type="text" placeholder={isSpanish ? "Código postal anterior" : "Former Zip Code"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                                </div>
                                                <div className="relative">
                                                    <label className="block mb-2 text-xs text-gray-500" htmlFor="date-moved">{isSpanish ? "Fecha de mudanza" : "Date Moved"}</label>
                                                    <input id="date-moved" type="text" placeholder={isSpanish ? "MM/DD/AAAA" : "MM/DD/YYYY"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 pr-10" />
                                                    <span className="absolute right-3 top-9 transform -translate-y-1/2 pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Election Selection */}
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">
                                    {isSpanish ? "¿Para qué elección le gustaría solicitar una boleta por correo?" : "Which election would you like to request a mail-in ballot for?"}
                                    <span className="ml-2 text-base font-normal">
                                        <a href="https://www.sos.nm.gov/voting-and-elections/upcoming-elections/" className="text-[#005cf0] underline" target="_blank" rel="noopener">
                                            {isSpanish ? "Puede ver la lista de próximas elecciones aquí." : "You can view the list of upcoming elections here."}
                                        </a>
                                    </span>
                                </h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <label htmlFor="election-date" className="text-xs text-gray-500">
                                        {isSpanish ? "Fecha de la elección:" : "Election Date:"}
                                    </label>
                                    <select
                                        id="election-date"
                                        className="border border-gray-300 rounded px-4 py-2 bg-white text-black text-xs"
                                    >
                                        <option value="">
                                            {isSpanish ? "Seleccione una fecha" : "Select a date"}
                                        </option>
                                        <option value="2025-11-04">
                                            {isSpanish ? "Elección local regular - 4 de noviembre de 2025" : "Regular Local Election - November 4, 2025"}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {/* Contact Info */}
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">
                                    {isSpanish ? "Información de contacto" : "Contact Info"}
                                </h2>
                                <div className="mb-2 text-xs text-gray-500">
                                    {isSpanish ? "Se requiere su dirección de correo electrónico para enviarle una copia de su solicitud." : "Your email address is required to send you a copy of your application."}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="email">
                                            {isSpanish ? "Dirección de correo electrónico" : "Email Address"} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder={isSpanish ? "Dirección de correo electrónico" : "Email Address"}
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="phone">
                                            {isSpanish ? "Número de teléfono" : "Phone Number"} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder={isSpanish ? "Número de teléfono" : "Phone Number"}
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Voter Signature */}
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">
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
                                <label className="block mb-2 text-xs text-gray-500" htmlFor="voter-name">
                                    {isSpanish ? "Nombre del votante" : "Voter Name"}{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="voter-name"
                                    type="text"
                                    placeholder={
                                        isSpanish ? "Nombre del votante" : "Voter Name"
                                    }
                                    className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder-gray-400 text-gray-900"
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
        </SiteLayout>
    );
}
