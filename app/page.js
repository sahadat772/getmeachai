import Link from "next/link";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

export default function HomePage() {
  return (
    <div className="bg-gray-950 text-gray-100">
      <Navbar />
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4 text-center bg-linear-to-r from-gray-900/40 to-purple-600/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 800px 500px at 50% -100px, rgba(251,191,36,0.12), transparent)",
          }}
        />
        <div className="max-w-3xl mx-auto relative ">
          <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm px-4 py-1.5 rounded-full mb-6">
            🇧🇩 বাংলাদেশের ক্রিয়েটরদের জন্য তৈরি
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            আপনার পছন্দের{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-500">
              ক্রিয়েটরকে সাপোর্ট করুন
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            bKash বা Nagad-এ মাত্র কয়েক সেকেন্ডে চা পাঠিয়ে দিন।
            <br />
            সরাসরি, সহজে, আনন্দের সাথে।
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/signup"
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-xl transition"
            >
              শুরু করুন ☕
            </Link>
            <Link
              href="/login"
              className="border border-gray-700 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-semibold text-lg px-8 py-4 rounded-xl transition"
            >
              লগ ইন করুন
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "২,৪০০+", label: "ক্রিয়েটর" },
            { num: "৫৮,০০০+", label: "সাপোর্টার" },
            { num: "৳১.২ কোটি+", label: "মোট সাপোর্ট" },
            { num: "৯৯.৯%", label: "আপটাইম" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-amber-400 font-mono">
                {s.num}
              </div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            কিভাবে <span className="text-amber-400">কাজ করে?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👤",
                title: "অ্যাকাউন্ট তৈরি করুন",
                desc: "ইমেইল বা Google দিয়ে সাইন আপ করুন এবং আপনার প্রোফাইল সাজান।",
              },
              {
                icon: "🔗",
                title: "লিংক শেয়ার করুন",
                desc: "আপনার ইউনিক প্রোফাইল লিংক সোশ্যাল মিডিয়ায় শেয়ার করুন।",
              },
              {
                icon: "💰",
                title: "সাপোর্ট পান",
                desc: "ভক্তরা bKash বা Nagad দিয়ে সরাসরি আপনাকে সাপোর্ট করতে পারবেন।",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-amber-400/40 transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="py-16 px-4 bg-linear-to-r from-blue-900/60 to-orange-500/45">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">সাপোর্টেড পেমেন্ট</h2>
          <p className="text-cyan-300 text-sm mb-8">
            বাংলাদেশের সবচেয়ে জনপ্রিয় মোবাইল পেমেন্ট সিস্টেম
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="bg-pink-900/20 border border-pink-800/50 text-pink-400 font-bold px-8 py-4 rounded-2xl text-lg">
              📱 bKash
            </div>
            <div className="bg-orange-900/20 border border-orange-800/50 text-orange-400 font-bold px-8 py-4 rounded-2xl text-lg">
              💳 Nagad
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto bg-linear-to-r from-amber-400/10 to-amber-600/40 border border-amber-400/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-purple-500">আজই শুরু করুন ☕</h2>
          <p className="text-gray-400 mb-8">
            বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আপনার ক্রিয়েটর জার্নি শুরু
            করুন।
          </p>
          <Link
            href="/signup"
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-lg px-10 py-4 rounded-xl transition inline-block"
          >
            ফ্রি অ্যাকাউন্ট তৈরি করুন
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
