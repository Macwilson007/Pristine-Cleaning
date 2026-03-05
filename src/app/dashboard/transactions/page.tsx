"use client";

import { useEffect, useState } from "react";
import { History, Calendar, ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface Transaction {
    id: string;
    type: "BOOKING" | "PAYMENT" | "REFUND";
    description: string;
    amount: number;
    status: string;
    createdAt: string;
    referenceId?: string;
}

export default function UserTransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/user/transactions");
                if (res.ok) {
                    const data = await res.json();
                    setTransactions(data);
                }
            } catch (err) {
                console.warn("Could not load transactions");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case "BOOKING": return <Calendar className="w-4 h-4" />;
            case "PAYMENT": return <ArrowDownLeft className="w-4 h-4" />;
            case "REFUND": return <ArrowUpRight className="w-4 h-4" />;
            default: return <History className="w-4 h-4" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case "BOOKING": return "text-blue-400 bg-blue-400/20";
            case "PAYMENT": return "text-green-400 bg-green-400/20";
            case "REFUND": return "text-yellow-400 bg-yellow-400/20";
            default: return "text-gray-400 bg-gray-400/20";
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Transaction History</h1>
                <p className="text-gray-500 text-sm">Complete history of all activities</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : transactions.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <History className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No transactions yet</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Date</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Type</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Description</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Amount</th>
                                <th className="text-left p-4 text-xs font-medium text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 text-sm">
                                        {new Date(tx.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColor(tx.type)}`}>
                                            {getIcon(tx.type)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm">
                                        {tx.description}
                                    </td>
                                    <td className="p-4 text-sm font-semibold">
                                        {tx.type === "REFUND" ? "+" : ""}₦{Number(tx.amount).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            tx.status === "COMPLETED" || tx.status === "CONFIRMED" 
                                                ? "bg-green-500/20 text-green-400"
                                                : tx.status === "PENDING"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-gray-500/20 text-gray-400"
                                        }`}>
                                            {tx.status}
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
