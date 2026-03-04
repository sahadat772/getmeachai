"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল!");
    } else {
      toast.success("লগইন সফল!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gray-950">
      <Toaster />
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">স্বাগতম ☕</h1>
        <p className="text-gray-400 text-sm mb-8">
          আপনার অ্যাকাউন্টে লগ ইন করুন
        </p>

        {/* Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 font-semibold py-3 rounded-xl transition mb-6"
        >
          <span>🔵</span> Google দিয়ে লগ ইন
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-600 text-xs">অথবা</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-gray-900 font-bold py-3 rounded-xl transition mt-2"
          >
            {loading ? "লোড হচ্ছে..." : "লগ ইন করুন"}
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-amber-400 hover:underline font-medium"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
