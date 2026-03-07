'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminUsersClient({ users: initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(null);

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.username?.toLowerCase().includes(search.toLowerCase())
    );

    const handleBan = async (userId, isBanned) => {
        setLoading(userId);
        const res = await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, isBanned: !isBanned }),
        });
        setLoading(null);
        if (res.ok) {
            setUsers(users.map(u => u._id === userId ? { ...u, isBanned: !isBanned } : u));
            toast.success(!isBanned ? 'ইউজার ব্যান করা হয়েছে' : 'ব্যান তুলে নেওয়া হয়েছে');
        } else {
            toast.error('কিছু একটা ভুল হয়েছে');
        }
    };

    const handleDelete = async (userId) => {
        if (!confirm('আপনি কি নিশ্চিত?')) return;
        setLoading(userId);
        const res = await fetch('/api/admin/users', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        setLoading(null);
        if (res.ok) {
            setUsers(users.filter(u => u._id !== userId));
            toast.success('ইউজার ডিলিট করা হয়েছে');
        } else {
            toast.error('কিছু একটা ভুল হয়েছে');
        }
    };

    return (
        <div>
            <Toaster />
            <h1 className="text-2xl text-fuchsia-500 font-bold mb-1">সব ইউজার 👥</h1>
            <p className="text-gray-400 text-sm mb-6">মোট {users.length} জন ইউজার</p>

            <input
                placeholder="নাম, ইমেইল বা ইউজারনেম দিয়ে খুঁজুন..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-md bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-2.5 rounded-xl text-sm transition mb-6"
            />

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">ইউজার</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">ইমেইল</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">স্ট্যাটাস</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">যোগদান</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(u => (
                            <tr key={u._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold text-xs">
                                            {u.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium">{u.name}</div>
                                            <div className="text-xs text-gray-400">@{u.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400">{u.email}</td>
                                <td className="px-6 py-4">
                                    {u.isAdmin ? (
                                        <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded-full">Admin</span>
                                    ) : u.isBanned ? (
                                        <span className="text-xs bg-gray-800 text-gray-500 px-2 py-1 rounded-full">ব্যান</span>
                                    ) : (
                                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">Active</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {new Date(u.createdAt).toLocaleDateString('bn-BD')}
                                </td>
                                <td className="px-6 py-4">
                                    {!u.isAdmin && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleBan(u._id, u.isBanned)}
                                                disabled={loading === u._id}
                                                className={`text-xs px-3 py-1.5 rounded-lg transition ${u.isBanned ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' : 'bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50'}`}
                                            >
                                                {u.isBanned ? 'আনব্যান' : 'ব্যান'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u._id)}
                                                disabled={loading === u._id}
                                                className="text-xs px-3 py-1.5 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition"
                                            >
                                                ডিলিট
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}