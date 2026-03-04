export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">
        আমাদের <span className="text-amber-400">সম্পর্কে</span>
      </h1>
      <p className="text-gray-400 text-lg leading-relaxed mb-8">
        Get Me a Chai হলো বাংলাদেশের ক্রিয়েটরদের জন্য একটি সহজ সাপোর্ট প্ল্যাটফর্ম।
        আমরা বিশ্বাস করি প্রতিটি ক্রিয়েটর তার কাজের স্বীকৃতি ও আর্থিক সাপোর্ট পাওয়ার যোগ্য।
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          { icon: '🚀', title: 'আমাদের লক্ষ্য', desc: 'বাংলাদেশের ক্রিয়েটর ইকোনমিকে শক্তিশালী করা।' },
          { icon: '💚', title: 'আমাদের মূল্যবোধ', desc: 'স্বচ্ছতা, সরলতা ও ক্রিয়েটরদের সাফল্য।' },
          { icon: '🇧🇩', title: 'দেশীয় পেমেন্ট', desc: 'bKash ও Nagad-এর মাধ্যমে সহজ লেনদেন।' },
        ].map((item) => (
          <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}