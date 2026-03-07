'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        platformFee: 5,
        minPayment: 10,
        maxPayment: 10000,
        maintenanceMode: false,
        platformName: 'Get Me a Chai',
    });

    const handleSave = async () => {
        toast.success('সেটিংস সেভ হয়েছে!');
    };

    return (
        <div>
            <Toaster />
            <h1 className="text-2xl font-bold mb-1 text-amber-600">প্ল্যাটফর্ম সেটিংস ⚙️</h1>
            <p className="text-gray-300 text-sm mb-8">প্ল্যাটফর্মের গ্লোবাল কনফিগারেশন</p>

            <div className="max-w-2xl flex flex-col gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h2 className="text-base font-semibold mb-5 text-rose-700">পেমেন্ট সেটিংস</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-gray-300 mb-2 block">প্ল্যাটফর্ম ফি (%)</label>
                            <input
                                type="number"
                                value={settings.platformFee}
                                onChange={e => setSettings({ ...settings, platformFee: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 focus:border-red-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-300 mb-2 block">সর্বনিম্ন পেমেন্ট (৳)</label>
                            <input
                                type="number"
                                value={settings.minPayment}
                                onChange={e => setSettings({ ...settings, minPayment: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 focus:border-red-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-300 mb-2 block">সর্বোচ্চ পেমেন্ট (৳)</label>
                            <input
                                type="number"
                                value={settings.maxPayment}
                                onChange={e => setSettings({ ...settings, maxPayment: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 focus:border-red-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h2 className="text-base text-amber-200 font-semibold mb-5">প্ল্যাটফর্ম সেটিংস</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-gray-300 mb-2 block">প্ল্যাটফর্মের নাম</label>
                            <input
                                value={settings.platformName}
                                onChange={e => setSettings({ ...settings, platformName: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 focus:border-red-400 outline-none text-gray-100 px-4 py-3 rounded-xl text-sm transition"
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                            <div>
                                <div className="text-sm font-medium text-indigo-800">Maintenance Mode</div>
                                <div className="text-xs text-gray-300 mt-1">চালু করলে সাইট সাময়িকভাবে বন্ধ থাকবে</div>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                                className={`w-12 h-6 rounded-full transition-colors ${settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-600'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full transition-transform mx-0.5 ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition"
                >
                    সেটিংস সেভ করুন
                </button>
            </div>
        </div>
    );
}