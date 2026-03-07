import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-b-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-3">
              <span className="bg-amber-400 text-lime-400 rounded-lg w-7 h-7 flex items-center justify-center">
                ☕
              </span>
              Get Me a Chai
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              বাংলাদেশ ক্রেয়েটরদের জন্য সবচেয়ে সহজ সাপোর্ট প্ল্যাটফর্ম ।
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">লিংক</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-amber-400 text-sm transition"
              >
                হোম
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-amber-400 text-sm transition"
              >
                আমাদের সম্পর্কে{" "}
              </Link>
              <Link
                href="/login"
                className="text-gray-400 hover:text-amber-400 text-sm transition"
              >
                লগ ইন
              </Link>
              <Link
                href="/signup"
                className="text-gray-400 hover:text-amber-400 text-sm transition"
              >
                সাইন আপ
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">পেমেন্ট</h4>
            <div className="flex gap-3">
              <span className="bg-pink-900/30 border border-pink-800 text-pink-400 text-xs px-3 py-1 rounded-full">
                📱 bKash
              </span>
              <span className="bg-orange-900/30 border border-orange-800 text-orange-400 text-xs px-3 py-1 rounded-full">
                💳 Nagad
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-l-cyan-400-800 mt-8 pt-6 text-center text-gray-300 text-sm">
          © ২০২৬ Get Me a Chai। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
