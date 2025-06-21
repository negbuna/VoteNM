"use client";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const isSpanish = searchParams.get("lang") === "es";
    return (
        <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDFAEC" }}>
            {/* Header */}
            <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 z-10" style={{ backgroundColor: "#FDFAEC" }}>
                <div className="flex items-center gap-6">
                    <Link href="/" className="w-16 h-16 bg-[#FDFAEC] rounded-md flex items-center justify-center overflow-hidden">
                        <Image
                            src="/logo.svg"
                            alt="VoteNM Logo"
                            width={64}
                            height={64}
                            className="object-cover object-center w-16 h-16"
                            priority
                        />
                    </Link>
                    <span className="font-extrabold text-2xl text-black tracking-tight ml-2">VoteNM</span>
                    <Link href="/" className="text-black font-medium hover:underline ml-6">Home</Link>
                </div>
                <nav className="flex items-center gap-8 text-sm">
                    <Link href="https://www.sos.nm.gov/" target="_blank" rel="noopener" className="hover:underline text-gray-700">NM Secretary of State</Link>
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
                            <option value={isSpanish ? 'es' : 'en'}>{isSpanish ? 'Español' : 'English'}</option>
                            <option value={isSpanish ? 'en' : 'es'}>{isSpanish ? 'English' : 'Español'}</option>
                        </select>
                        <span className="ml-1 text-gray-400 pointer-events-none select-none">▼</span>
                    </div>
                </nav>
            </header>
            <div className="flex-1 flex flex-col">{children}</div>
            {/* Footer */}
            <footer className="w-full flex flex-col md:flex-row items-center justify-between border-t border-gray-200 px-6 py-6 text-xs text-gray-500 mt-auto" style={{ backgroundColor: "#FDFAEC" }}>
                <nav className="flex gap-8 text-sm">
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </nav>
            </footer>
        </main>
    );
}
