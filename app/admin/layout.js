import { auth } from '../lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '../lib/mongodb';
import User from '../models/User';
import Link from 'next/link';
import SessionWrapper from '../components/ui/SessionWrapper';
import Navbar from '../components/ui/Navbar';

export default async function AdminLayout({ children }) {
    const session = await auth();
    if (!session?.user?.email) redirect('/login');

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user?.isAdmin) redirect('/dashboard');

    return (
        <SessionWrapper>
            <div className="bg-gray-950 min-h-screen">
                <Navbar />
                <div className="flex">
                    <aside className="w-56 bg-gray-900 border-r border-gray-800 min-h-[calc(100vh-64px)] p-4 hidden md:block sticky top-16">
                        <div className="mb-6 p-3">
                            <div className="text-xs text-red-400 font-bold uppercase tracking-widest mb-1">Admin Panel</div>
                            <div className="text-sm font-semibold text-gray-100">{session.user.name}</div>
                        </div>
                        <nav className="flex flex-col gap-1">
                            {[
                                { href: '/admin', icon: '📊', label: 'ওভারভিউ' },
                                { href: '/admin/users', icon: '👥', label: 'সব ইউজার' },
                                { href: '/admin/transactions', icon: '💰', label: 'সব ট্রানজেকশন' },
                                { href: '/admin/settings', icon: '⚙️', label: 'প্ল্যাটফর্ম সেটিংস' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-400/8 transition"
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                    <main className="flex-1 p-6 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </SessionWrapper>
    );
}