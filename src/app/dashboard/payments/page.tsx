"use client";

import { useEffect, useState } from "react";
import { CreditCard, CheckCircle, Clock, XCircle, DollarSign } from "lucide-react";

interface Payment {
    id: string;
    amount: number;
    paymentMethod: string;
    status: string;
    transactionId?: string;
    createdAt: string;
}

export default function UserPaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/user/payments");
                if (res.ok) {
                    const data = await res.json();
                    setPayments(data);
                }
            } catch (err) {
                console.warn("Could not load payments");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const totalPaid = payments
        .filter(p => p.status === "COMPLETED")
        .reduce((sum, p) => sum + Number(p.amount), 0);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "COMPLETED": return <CheckCircle className="w-4 h-4" />;
            case "PENDING": return <Clock className="w-4 h-4" />;
            case "FAILED": return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED": return "bg-green-500/20 text-green-400";
            case "PENDING": return "bg-yellow-500/20 text-yellow-400";
            case "FAILED": return "bg-red-500/20 text-red-400";
            default: return "bg-gray-500/20 text-gray-400";
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Payment History</h1>
                <p className="text-gray-500 text-sm">View your payment transactions</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-400">Total Paid</span>
                    </div>
                    <p className="text-xl font-bold">₦{totalPaid.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-400">Transactions</span>
                    </div>
                    <p className="text-xl font-bold">{payments.length}</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : payments.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <CreditCard className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No payment history</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Date</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Transaction ID</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Method</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Amount</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 text-sm">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-sm font-mono text-gray-500">
                                        {payment.transactionId || payment.id.slice(0, 8)}
                                    </td>
                                    <td className="p-4 text-sm">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="p-4 text-sm font-semibold">
                                        ₦{Number(payment.amount).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(payment.status)}`}>
                                            {getStatusIcon(payment.status)}
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
