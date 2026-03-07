"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      toast.error(data.message || "কিছু একটা ভুল হয়েছে!");
    } else {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/dashboard",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gray-950">
      <Toaster />
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-white">অ্যাকাউন্ট তৈরি করুন ☕</h1>
        <p className="text-gray-300 text-sm mb-8">ক্রিয়েটর হিসেবে যোগ দিন</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 font-semibold py-3 rounded-xl transition mb-6"
        >
          <span>🔵</span> Google দিয়ে সাইন আপ
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-300 text-xs">অথবা</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">নাম</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="আপনার নাম"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">ইউজারনেম</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="your_username"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">ইমেইল</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
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
            {loading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="text-amber-400 hover:underline font-medium"
          >
            লগ ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
