"use client";
import Link from "next/link";
import Image from "next/image";
import { Suspense, ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname } from "next/navigation";

const navLinks = [
    { href: "/", en: "Home", es: "Inicio" },
    { href: "#faq", en: "FAQ", es: "Preguntas" },
    { href: "/apply", en: "Apply", es: "Solicitar" },
];

function AuthNav({ isSpanish, langParam }: { isSpanish: boolean, langParam: string }) {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => { listener?.subscription.unsubscribe(); };
    }, []);
    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push(`/${langParam}`);
    };
    return user ? (
        <Button onClick={handleLogout} variant="outline" className="ml-6 text-black font-medium">{isSpanish ? "Cerrar sesión" : "Logout"}</Button>
    ) : (
        <Link href={`/auth/login${langParam}`} className="text-black font-medium hover:underline ml-6">
            {isSpanish ? "Iniciar sesión" : "Login"}
        </Link>
    );
}

function SiteLayoutContent({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isSpanish = searchParams.get("lang") === "es";
    const langParam = isSpanish ? "?lang=es" : "";
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Enable smooth scroll for anchor links
            document.documentElement.style.scrollBehavior = "smooth";
        }
        return () => {
            if (typeof window !== "undefined") {
                document.documentElement.style.scrollBehavior = "auto";
            }
        };
    }, []);
    return (
        <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDFAEC" }}>
            {/* Header */}
            <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 z-10" style={{ backgroundColor: "#FDFAEC" }}>
                <div className="flex items-center gap-6">
                    <a
                        href={`/${langParam}`}
                        className="w-16 h-16 bg-[#FDFAEC] rounded-md flex items-center justify-center overflow-hidden"
                        onClick={e => {
                            if (pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                    >
                        <Image
                            src="/logo.svg"
                            alt="VoteNM Logo"
                            width={64}
                            height={64}
                            className="object-cover object-center w-16 h-16"
                            priority
                        />
                    </a>
                    <span className="font-extrabold text-2xl text-black tracking-tight ml-2">VoteNM</span>
                    {navLinks.map((link, i) => {
                        if (link.href === "/") {
                            return (
                                <a
                                    key={link.href + i}
                                    href={`/${langParam}`}
                                    className="text-black font-medium hover:underline ml-6 cursor-pointer"
                                    onClick={e => {
                                        if (pathname === "/") {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }
                                    }}
                                >
                                    {isSpanish ? link.es : link.en}
                                </a>
                            );
                        }
                        return (
                            <a
                                key={link.href + i}
                                href={link.href.startsWith('#') ? `/${langParam}${link.href}` : `${link.href}${langParam}`}
                                className="text-black font-medium hover:underline ml-6 cursor-pointer"
                            >
                                {isSpanish ? link.es : link.en}
                            </a>
                        );
                    })}
                    <AuthNav isSpanish={isSpanish} langParam={langParam} />
                </div>
                <nav className="flex items-center gap-8 text-sm">
                    <Link href={`https://www.sos.nm.gov/${langParam}`} target="_blank" rel="noopener" className="hover:underline text-gray-700">{isSpanish ? "Secretaría de Estado de NM" : "NM Secretary of State"}</Link>
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
                    <Link href={`/about${langParam}`} className="hover:underline">{isSpanish ? "Acerca de" : "About"}</Link>
                    <Link href={`/contact${langParam}`} className="hover:underline">{isSpanish ? "Contacto" : "Contact"}</Link>
                </nav>
            </footer>
        </main>
    );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SiteLayoutContent>{children}</SiteLayoutContent>
        </Suspense>
    );
}
