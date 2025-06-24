"use client";
import { useEffect } from "react";

export default function Notification({ show, message, onClose }: { show: boolean; message: string; onClose: () => void }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div
            className={`fixed left-1/2 bottom-8 z-50 transform -translate-x-1/2 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                }`}
        >
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-base font-semibold">
                {message}
            </div>
        </div>
    );
}
