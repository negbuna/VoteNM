"use client";
import SiteLayout from "../components/SiteLayout";
import Link from "next/link";
import Image from "next/image";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fillAbsenteeForm } from "@/lib/fillAbsenteeForm";
import PdfPreview from "./PdfPreview";

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
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplyPageContent />
        </Suspense>
    );
}

function ApplyPageContent() {
    const searchParams = useSearchParams();
    const isSpanish = searchParams.get("lang") === "es";
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [yearOfBirth, setBirthYear] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [wantsPermanentAbsentee, setPermanent] = useState(false);
    const [signature, setSignature] = useState("");
    const [county, setCounty] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [wantsAlternateAddress, setWantsAlternateAddress] = useState(false);
    const [alternateStreet, setAlternateStreet] = useState("");
    const [alternateApartment, setAlternateApartment] = useState("");
    const [alternateCity, setAlternateCity] = useState("");
    const [alternateState, setAlternateState] = useState("");
    const [alternateZip, setAlternateZip] = useState("");
    const [alternateCountry, setAlternateCountry] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState<any>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!firstName || !lastName || !street || !city || !zip || !yearOfBirth || !signature || !county) {
            setError(isSpanish ? "Por favor complete todos los campos obligatorios." : "Please fill out all required fields.");
            return;
        }
        const today = new Date();
        const todayStr = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;
        const data = {
            firstName,
            lastName,
            street,
            city,
            state: "New Mexico",
            zip,
            yearOfBirth,
            email,
            phone,
            wantsPermanentAbsentee,
            todayDate: todayStr,
            signature,
            county,
            wantsAlternateAddress,
            alternateStreet,
            alternateApartment,
            alternateCity,
            alternateState,
            alternateZip,
            alternateCountry,
        };
        setPreviewData(data);
        setShowPreview(true);
    };

    if (showPreview && previewData) {
        return <PdfPreview formData={previewData} onDone={() => setShowPreview(false)} />;
    }

    return (
        <SiteLayout>
            <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDFAEC" }}>
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
                    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                            {isSpanish ? "Solicitud de boleta de voto ausente" : "Absentee Ballot Application"}
                        </h1>
                        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">{isSpanish ? "Información requerida" : "Required Information"}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="first-name">{isSpanish ? "Nombre" : "First Name"} <span className="text-red-500">*</span></label>
                                        <input id="first-name" type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={isSpanish ? "Nombre" : "First Name"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="last-name">{isSpanish ? "Apellido" : "Last Name"} <span className="text-red-500">*</span></label>
                                        <input id="last-name" type="text" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder={isSpanish ? "Apellido" : "Last Name"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="street">{isSpanish ? "Dirección registrada" : "Registered Address (Street)"} <span className="text-red-500">*</span></label>
                                        <input id="street" type="text" required value={street} onChange={e => setStreet(e.target.value)} placeholder={isSpanish ? "Dirección" : "Street Address"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="city">{isSpanish ? "Ciudad" : "City"} <span className="text-red-500">*</span></label>
                                        <input id="city" type="text" required value={city} onChange={e => setCity(e.target.value)} placeholder={isSpanish ? "Ciudad" : "City"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="state">{isSpanish ? "Estado" : "State"} <span className="text-red-500">*</span></label>
                                        <input id="state" type="text" value={isSpanish ? "Nuevo México" : "New Mexico"} readOnly className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-100 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="zip">{isSpanish ? "Código postal" : "Zip Code"} <span className="text-red-500">*</span></label>
                                        <input id="zip" type="text" required value={zip} onChange={e => setZip(e.target.value)} placeholder={isSpanish ? "Código postal" : "Zip Code"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="birth-year">{isSpanish ? "Año de nacimiento (AAAA)" : "Year of Birth (YYYY)"} <span className="text-red-500">*</span></label>
                                        <input id="birth-year" type="text" required value={yearOfBirth} onChange={e => setBirthYear(e.target.value)} placeholder={isSpanish ? "Año de nacimiento" : "Year of Birth"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="county">{isSpanish ? "Condado" : "County"} <span className="text-red-500">*</span></label>
                                        <select
                                            id="county"
                                            required
                                            value={county}
                                            onChange={e => setCounty(e.target.value)}
                                            className="border border-gray-300 rounded px-4 py-2 w-full bg-white text-gray-900"
                                        >
                                            <option value="" disabled>{isSpanish ? "Seleccione un condado" : "Select a county"}</option>
                                            {counties.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="email">{isSpanish ? "Correo electrónico" : "Email"} <span className="text-red-500">*</span></label>
                                        <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={isSpanish ? "Correo electrónico" : "Email"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xs text-gray-500" htmlFor="phone">{isSpanish ? "Número de teléfono" : "Phone Number"} <span className="text-red-500">*</span></label>
                                        <input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder={isSpanish ? "Número de teléfono" : "Phone Number"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                    </div>
                                    <div className="md:col-span-2 flex items-center mt-2">
                                        <input id="permanent" type="checkbox" checked={wantsPermanentAbsentee} onChange={e => setPermanent(e.target.checked)} className="mr-2" />
                                        <label htmlFor="permanent" className="text-xs text-gray-500 mb-0">{isSpanish ? "Agregarme a la Lista Permanente de Votantes Ausentes" : "Add me to the Permanent Absentee Voter List"}</label>
                                    </div>
                                    <div className="md:col-span-2 flex items-center mt-2">
                                        <input
                                            id="alternate-address-checkbox"
                                            type="checkbox"
                                            checked={wantsAlternateAddress}
                                            onChange={e => setWantsAlternateAddress(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="alternate-address-checkbox" className="text-xs text-gray-500 mb-0">
                                            {isSpanish ? "Quiero que mi boleta por correo se envíe a una dirección diferente a donde estoy registrado." : "I would like my mail-in ballot delivered to a different address than where I’m registered."}
                                        </label>
                                    </div>
                                    {wantsAlternateAddress && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <label className="block mb-2 text-xs text-gray-500" htmlFor="alternate-street">{isSpanish ? "Calle alternativa" : "Alternate Street"}</label>
                                                <input id="alternate-street" type="text" value={alternateStreet} onChange={e => setAlternateStreet(e.target.value)} placeholder={isSpanish ? "Calle" : "Street"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-xs text-gray-500" htmlFor="alternate-apartment">{isSpanish ? "Apartamento (opcional)" : "Apartment (optional)"}</label>
                                                <input id="alternate-apartment" type="text" value={alternateApartment} onChange={e => setAlternateApartment(e.target.value)} placeholder={isSpanish ? "Apartamento" : "Apartment"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-xs text-gray-500" htmlFor="alternate-city">{isSpanish ? "Ciudad alternativa" : "Alternate City"}</label>
                                                <input id="alternate-city" type="text" value={alternateCity} onChange={e => setAlternateCity(e.target.value)} placeholder={isSpanish ? "Ciudad" : "City"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-xs text-gray-500" htmlFor="alternate-state">{isSpanish ? "Estado alternativo" : "Alternate State"}</label>
                                                <input id="alternate-state" type="text" value={alternateState} onChange={e => setAlternateState(e.target.value)} placeholder={isSpanish ? "Estado" : "State"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-xs text-gray-500" htmlFor="alternate-zip">{isSpanish ? "Código postal alternativo" : "Alternate Zip"}</label>
                                                <input id="alternate-zip" type="text" value={alternateZip} onChange={e => setAlternateZip(e.target.value)} placeholder={isSpanish ? "Código postal" : "Zip Code"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-xs text-gray-500" htmlFor="alternate-country">{isSpanish ? "País alternativo" : "Alternate Country"}</label>
                                                <input id="alternate-country" type="text" value={alternateCountry} onChange={e => setAlternateCountry(e.target.value)} placeholder={isSpanish ? "País" : "Country"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-500">{isSpanish ? "Firma" : "Signature"}</h2>
                                <label className="block mb-2 text-xs text-gray-500" htmlFor="signature">{isSpanish ? "Escriba su nombre completo como firma" : "Type your full name as signature"} <span className="text-red-500">*</span></label>
                                <input id="signature" type="text" required value={signature} onChange={e => setSignature(e.target.value)} placeholder={isSpanish ? "Firma" : "Signature"} className="border border-gray-300 rounded px-4 py-2 w-full bg-white placeholder:text-gray-400 text-gray-900 font-signature" />
                            </div>
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                            <button type="submit" className="mt-4 bg-[#005cf0] text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors">
                                {isSpanish ? "Enviar solicitud" : "Submit Application"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </SiteLayout>
    );
}
