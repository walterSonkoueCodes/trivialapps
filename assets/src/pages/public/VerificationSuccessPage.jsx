import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function VerificationSuccessPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <CheckCircle className="mx-auto mb-4 text-green-600" size={56} />
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">Email successfully verified 🎉</h1>
                <p className="text-gray-600 mb-6">
                    Your account is now active. You can log in and start using our services.
                </p>
                <a
                    href="/login"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Go to Login
                </a>
            </div>
        </div>
    );
}
