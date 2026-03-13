"use client"

import Link from "next/link"

const team = [
  {
    name: "Sahadat Hossain",
    role: "Founder & Developer",
    avatar: "👨‍💻",
    desc: "Full-stack developer, বাংলাদেশের ক্রিয়েটরদের জন্য কিছু করার স্বপ্ন থেকে এই প্ল্যাটফর্ম তৈরি।",
  },
]

const values = [
  {
    icon: "🇧🇩",
    title: "বাংলাদেশ ফার্স্ট",
    desc: "আমরা বাংলাদেশি ক্রিয়েটরদের কথা মাথায় রেখে সব কিছু তৈরি করি — ভাষা, পেমেন্ট, সব কিছু।",
    color: "var(--green)",
  },
  {
    icon: "💸",
    title: "কম কমিশন",
    desc: "আমরা বিশ্বাস করি ক্রিয়েটররা তাদের সাপোর্টের সর্বোচ্চ অংশ পাওয়ার যোগ্য।",
    color: "var(--amber)",
  },
  {
    icon: "🔒",
    title: "নিরাপত্তা",
    desc: "আপনার ডেটা এবং লেনদেন সম্পূর্ণ নিরাপদ।",
    color: "var(--cyan)",
  },
  {
    icon: "🚀",
    title: "সহজ ব্যবহার",
    desc: "টেক জ্ঞান ছাড়াও যে কেউ মিনিটের মধ্যে তাদের পেজ চালু করতে পারবেন।",
    color: "var(--accent)",
  },
]

const stats = [
  { num: "২,৪০০+", label: "ক্রিয়েটর", icon: "🎨", color: "var(--accent)" },
  { num: "৫৮,০০০+", label: "সাপোর্টার", icon: "❤️", color: "var(--red)" },
  { num: "৳১.২ কোটি+", label: "মোট সাপোর্ট", icon: "💰", color: "var(--amber)" },
  { num: "৯৯.৯%", label: "আপটাইম", icon: "⚡", color: "var(--green)" },
]

const faqs = [
  {
    q: "Get Me a Chai কি সম্পূর্ণ ফ্রি?",
    a: "হ্যাঁ! অ্যাকাউন্ট তৈরি করা সম্পূর্ণ বিনামূল্যে। প্রতিটি সফল ট্রানজেকশনে ছোট কমিশন নেওয়া হয়।",
  },
  {
    q: "পেমেন্ট কিভাবে পাবো?",
    a: "সাপোর্টাররা আপনার bKash বা Nagad নম্বরে সরাসরি পেমেন্ট করবে।",
  },
  {
    q: "কোন কোন ডিভাইসে কাজ করে?",
    a: "সব ডিভাইসে — মোবাইল, ট্যাবলেট, কম্পিউটার।",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">

      {/* HERO */}
      <section className="text-center px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-6">
            বাংলাদেশের ক্রিয়েটরদের জন্য
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}তৈরি একটি প্ল্যাটফর্ম
            </span>
          </h1>

          <p className="text-gray-500 leading-8">
            আমরা বিশ্বাস করি প্রতিটি ক্রিয়েটর তার কাজের মূল্য পাওয়ার যোগ্য।
            Get Me a Chai সেই বিশ্বাস থেকেই জন্ম নিয়েছে।
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border rounded-xl p-6 text-center transition hover:-translate-y-1 hover:shadow"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>
                {s.num}
              </div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-3xl font-black mb-6">
              কেন Get Me a Chai?
            </h2>

            <p className="text-gray-500 mb-4">
              বাংলাদেশে হাজার হাজার ক্রিয়েটর আছেন যারা প্রতিদিন অসাধারণ কন্টেন্ট তৈরি করছেন।
            </p>

            <p className="text-gray-500 mb-4">
              বিদেশি প্ল্যাটফর্মগুলো বাংলাদেশে ঠিকমতো কাজ করে না।
            </p>

            <p className="text-gray-500">
              তাই আমরা তৈরি করেছি সম্পূর্ণ বাংলাদেশি প্ল্যাটফর্ম।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🚀", label: "২০২৪ সালে যাত্রা শুরু" },
              { icon: "💳", label: "bKash ও Nagad সাপোর্ট" },
              { icon: "🌐", label: "১০০% বাংলাদেশি" },
              { icon: "❤️", label: "Creator First" },
            ].map((item) => (
              <div
                key={item.label}
                className="border rounded-xl p-6 text-center bg-white transition hover:-translate-y-1 hover:shadow"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-3xl font-black mb-12">
            আমাদের মূল্যবোধ
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border rounded-xl p-6 transition hover:-translate-y-1 hover:shadow"
              >
                <div className="text-3xl mb-3">{v.icon}</div>

                <h3 className="font-bold mb-2">{v.title}</h3>

                <p className="text-sm text-gray-500">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-black mb-12">
            যারা এটি তৈরি করেছে
          </h2>

          {team.map((member) => (
            <div
              key={member.name}
              className="max-w-sm mx-auto border rounded-2xl p-8 bg-white transition hover:-translate-y-1 hover:shadow"
            >
              <div className="text-4xl mb-3">{member.avatar}</div>

              <h3 className="font-bold text-lg">{member.name}</h3>

              <p className="text-purple-500 text-sm mb-3">
                {member.role}
              </p>

              <p className="text-gray-500 text-sm">
                {member.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-center text-3xl font-black mb-12">
            FAQ
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-xl p-6 bg-white"
              >
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">

        <h2 className="text-3xl font-black mb-6">
          আজই আপনার পেজ তৈরি করুন
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">

          <Link
            href="/signup"
            className="px-8 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
          >
            ফ্রি পেজ তৈরি করুন
          </Link>

          <Link
            href="/login"
            className="px-8 py-3 rounded-lg border font-semibold hover:border-purple-500"
          >
            লগ ইন
          </Link>

        </div>

      </section>

    </div>
  )
}