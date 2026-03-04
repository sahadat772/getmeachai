import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/ui/Navbar";
import Link from "next/link";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-900 border-r border-gray-800 min-h-[calc(100vh-64px)] p-4 hidden md:block sticky top-16">
          <div className="mb-6 p-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold text-sm font-mono mb-3">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm font-semibold text-gray-100">
              {session.user.name}
            </div>
            <div className="text-xs text-gray-500">
              @{session.user.username}
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { href: "/dashboard", icon: "📊", label: "ওভারভিউ" },
              {
                href: "/dashboard/supporters",
                icon: "👥",
                label: "সাপোর্টারস",
              },
              { href: "/dashboard/settings", icon: "⚙️", label: "সেটিংস" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-amber-400 hover:bg-amber-400/8 transition"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
