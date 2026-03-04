'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentSection({ user }) {
  const [method, setMethod] = useState('bKash');
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const presets = [50, 100, 200, 500];
  const finalAmount = customAmount ? Number(customAmount) : amount;

  const handlePay = async () => {
    if (!name) return toast.error('আপনার নাম দিন');
    if (!finalAmount || finalAmount < 10) return toast.error('কমপক্ষে ১০ টাকা দিন');

    setLoading(true);
    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toUsername: user.username,
        fromName: name,
        amount: finalAmount,
        message,
        method,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success(`${user.name}-কে ৳${finalAmount} পাঠানো হয়েছে! ☕`);
      setName(''); setMessage(''); setCustomAmount(''); setAmount(50);
    } else {
      toast.error(data.message || 'পেমেন্ট ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <Toaster />
      <h2 className="text-blue-300 text-lg font-bold mb-5">☕ চা পাঠান</h2>

      {/* Payment Method */}
      <div className="flex gap-3 mb-5">
        {['bKash', 'Nagad'].map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition ${
              method === m
                ? m === 'bKash'
                  ? 'border-pink-500 bg-pink-900/20 text-pink-400'
                  : 'border-orange-500 bg-orange-900/20 text-orange-400'
                : 'border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            {m === 'bKash' ? '📱' : '💳'} {m}
          </button>
        ))}
      </div>

      {/* Amount Presets */}
      <div className="mb-1 text-xs text-gray-500">পরিমাণ (টাকা)</div>
      <div className="flex gap-2 mb-3 flex-wrap">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => { setAmount(p); setCustomAmount(''); }}
            className={`px-4 py-2 rounded-lg border text-sm font-mono font-bold transition ${
              amount === p && !customAmount
                ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                : 'border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            ৳{p}
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="কাস্টম পরিমাণ..."
        value={customAmount}
        onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
        className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-2.5 rounded-xl text-sm transition mb-4"
      />

      {/* Name */}
      <div className="mb-1 text-xs text-gray-500">আপনার নাম</div>
      <input
        placeholder="আপনার নাম"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-2.5 rounded-xl text-sm transition mb-4"
      />

      {/* Message */}
      <div className="mb-1 text-xs text-gray-500">বার্তা (ঐচ্ছিক)</div>
      <input
        placeholder="কিছু বলতে চান?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-2.5 rounded-xl text-sm transition mb-5"
      />

      <button
        onClick={handlePay}
        disabled={loading}
        className={`w-full py-3.5 rounded-xl font-bold text-white transition disabled:opacity-60 ${
          method === 'bKash' ? 'bg-pink-600 hover:bg-pink-500' : 'bg-orange-500 hover:bg-orange-400'
        }`}
      >
        {loading ? 'প্রসেস হচ্ছে...' : `${method} দিয়ে ৳${finalAmount || '?'} পাঠান`}
      </button>
    </div>
  );
}