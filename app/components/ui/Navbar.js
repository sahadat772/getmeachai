"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-amber-400 font-bold text-xl"
        >
          <span className="bg-amber-400 text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center text-lg">
            ☕
          </span>
          Get Me a Chai
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {session?.user?.username ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-amber-400 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                ড্যাশবোর্ড
              </Link>
              <Link
                href={`/profile/${session.user.username}`}
                className="text-gray-300 hover:text-amber-400 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                প্রোফাইল
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-gray-800 text-gray-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition"
              >
                লগ আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-300 hover:text-amber-400 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                লগ ইন
              </Link>
              <Link
                href="/signup"
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-bold px-4 py-2 rounded-lg transition"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 flex flex-col gap-3">
          {session?.user?.username ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="text-gray-300 text-sm py-2"
                onClick={() => setMenuOpen(false)}
              >
                ড্যাশবোর্ড
              </Link>
              <Link
                href={`/profile/${session.user.username}`}
                className="text-gray-300 text-sm py-2"
                onClick={() => setMenuOpen(false)}
              >
                প্রোফাইল
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-300 text-sm py-2 text-left"
              >
                লগ আউট
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="text-gray-300 text-sm py-2"
                onClick={() => setMenuOpen(false)}
              >
                লগ ইন
              </Link>
              <Link
                href="/signup"
                className="text-amber-400 text-sm py-2 font-bold"
                onClick={() => setMenuOpen(false)}
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
