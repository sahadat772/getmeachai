'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SettingsClient({ user }) {
  const [form, setForm] = useState({
    name: user.name || '',
    username: user.username || '',
    bio: user.bio || '',
    bkashNumber: user.bkashNumber || '',
    nagadNumber: user.nagadNumber || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      toast.success('প্রোফাইল আপডেট হয়েছে!');
    } else {
      toast.error(data.message || 'কিছু একটা ভুল হয়েছে!');
    }
  };

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 focus:border-amber-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition';

  return (
    <div className="max-w-2xl">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Profile Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold mb-5">প্রোফাইল তথ্য</h2>
          <div className="flex flex-col gap-4">

            <div>
              <label className="text-xs text-gray-500 mb-2 block">নাম</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="আপনার নাম"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">ইউজারনেম</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">@</span>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="your_username"
                  className={`${inputClass} pl-8`}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                আপনার প্রোফাইল লিংক: getmeachai.com/profile/{form.username}
              </p>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">বায়ো</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold mb-2">পেমেন্ট তথ্য</h2>
          <p className="text-xs text-gray-500 mb-5">
            সাপোর্টাররা এই নম্বরে পেমেন্ট করবেন
          </p>
          <div className="flex flex-col gap-4">

            <div>
              <label className="text-xs text-gray-500 mb-2 block flex items-center gap-1">
                📱 bKash নম্বর
              </label>
              <input
                name="bkashNumber"
                value={form.bkashNumber}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">
                💳 Nagad নম্বর
              </label>
              <input
                name="nagadNumber"
                value={form.nagadNumber}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </div>

          </div>
        </div>

        {/* Profile Link */}
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-amber-400 mb-2">
            🔗 আপনার প্রোফাইল লিংক
          </h2>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-gray-800 px-4 py-2.5 rounded-xl text-sm text-gray-300 truncate">
              http://localhost:3000/profile/{form.username}
            </code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/profile/${form.username}`
                );
                toast.success('লিংক কপি হয়েছে!');
              }}
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-sm px-4 py-2.5 rounded-xl transition whitespace-nowrap"
            >
              কপি করুন
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-gray-900 font-bold py-3.5 rounded-xl transition text-base"
        >
          {loading ? 'সেভ হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
        </button>

      </form>
    </div>
  );
}