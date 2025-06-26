"use client";
import React, { useEffect, useState } from "react";
import { fillAbsenteeForm, AbsenteeFormData, getRegistrarEmail, sendPdfToUserEmail } from "@/lib/fillAbsenteeForm";
import { useRouter } from "next/navigation";

interface PdfPreviewProps {
    formData: AbsenteeFormData;
    onDone: () => void;
}

export default function PdfPreview({ formData }: PdfPreviewProps) {
    const router = useRouter();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [sendOnBehalf, setSendOnBehalf] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendResult, setSendResult] = useState<string | null>(null);
    const registrarEmail = getRegistrarEmail(formData.county);

    useEffect(() => {
        let url: string | null = null;
        fillAbsenteeForm(formData).then((blob) => {
            url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setPdfBlob(blob);
        });
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [formData]);

    useEffect(() => {
        if (sendOnBehalf && pdfBlob && formData.email && registrarEmail) {
            setSending(true);
            sendPdfToUserEmail(pdfBlob, formData.email, formData, registrarEmail).then((res) => {
                setSendResult(res.message);
                setSending(false);
            });
        } else {
            setSendResult(null);
        }
    }, [sendOnBehalf, pdfBlob, formData, registrarEmail]);

    return (
        <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded shadow text-center">
            <h2 className="text-xl font-bold mb-4">Preview Your Absentee Ballot Application</h2>
            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    title="PDF Preview"
                    className="w-full rounded border mb-4"
                    style={{ height: 600 }}
                />
            ) : (
                <div className="text-gray-500 mb-4">Generating PDF preview...</div>
            )}
            <div className="flex flex-col items-center gap-4 mt-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={sendOnBehalf}
                        onChange={e => setSendOnBehalf(e.target.checked)}
                        className="accent-blue-600"
                    />
                    Do you want us to send this on your behalf?
                </label>
                {sendOnBehalf && registrarEmail && (
                    <div className="text-xs bg-gray-100 text-gray-700 rounded-md px-3 py-2 mb-2 w-full max-w-md mx-auto">
                        This form would be sent to: <span className="font-mono text-blue-700">{registrarEmail}</span>
                    </div>
                )}
                {sendOnBehalf && (
                    <div className="text-xs text-gray-500 mb-2">
                        {sending ? "Sending email..." : sendResult}
                    </div>
                )}
                <a
                    href={pdfUrl || undefined}
                    download="NM-Absentee-Ballot-Application.pdf"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded shadow"
                >
                    Download PDF
                </a>
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded shadow mt-2"
                >
                    Done
                </button>
            </div>
        </div>
    );
}
