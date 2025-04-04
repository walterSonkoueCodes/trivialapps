import React from 'react';
import { XCircle } from 'lucide-react';

export default function VerificationErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <XCircle className="mx-auto mb-4 text-red-600" size={56} />
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">Invalid or expired link ❌</h1>
                <p className="text-gray-600 mb-6">
                    The verification link is no longer valid. You can request a new one below.
                </p>
                <a
                    href="/resend-verification"
                    className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Resend Verification
                </a>
            </div>
        </div>
    );
}
