'use client'
const url = process.env.NEXT_PUBLIC_URL;
import React, { useEffect, useState } from 'react'

export default function ReturnPage() {
    const [status, setStatus] = useState<string | null>(null)
    const [customerEmail, setCustomerEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const sessionId = params.get('session_id')
        if (!sessionId) {
            setStatus('missing_session')
            setLoading(false)
            return
        }

        fetch(`${url}/strip/session-status?session_id=${encodeURIComponent(sessionId)}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status)
                setCustomerEmail(data.customer_email ?? null)
            })
            .catch((err) => {
                console.error('session-status error', err)
                setStatus('error')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-center text-lg text-teal-700 font-semibold animate-pulse">
                    Vérification du paiement…
                </p>
            </div>
        )

    if (status === 'open') {
        if (typeof window !== 'undefined') window.location.href = '/checkout'
        return null
    }

    if (status === 'complete') {
        
        return (
            <section
                id="success"
                className="max-w-md mx-auto mt-20 bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border border-teal-100"
            >
                <svg className="w-16 h-16 text-teal-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 className="text-2xl font-extrabold text-teal-700 mb-3">Paiement confirmé</h1>
                <p className="text-gray-700 text-center mb-6">
                    Merci ! Un email de confirmation a été envoyé à <span className="font-semibold">{customerEmail}</span>.
                </p>
                <button
                    className="mt-2 px-6 py-2 bg-teal-600 text-white rounded-full text-lg font-semibold shadow hover:bg-teal-700 transition"
                    onClick={() => window.location.href = '/'}
                >
                    Retour à l&apos;accueil
                </button>
            </section>
        )
    }

    if (status === 'missing_session') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-center text-red-600 text-lg font-semibold mt-8">
                    session_id manquant dans l&apos;URL.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-yellow-600 text-lg font-semibold mt-8">
                Statut du paiement : {status}
            </p>
        </div>
    )
}