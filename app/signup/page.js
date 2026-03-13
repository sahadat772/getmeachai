'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      toast.error(data.message || 'কিছু একটা ভুল হয়েছে!');
    } else {
      toast.success('অ্যাকাউন্ট তৈরি হয়েছে! 🎉');
      await signIn('credentials', { email: form.email, password: form.password, callbackUrl: '/dashboard' });
    }
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: '12px',
    background: 'var(--surface-2)', border: '1px solid var(--border)',
    color: 'var(--text)', fontSize: '14px', fontFamily: 'var(--font-body)',
    outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 700,
    color: 'var(--text-muted)', textTransform: 'uppercase',
    letterSpacing: '0.06em', marginBottom: '8px',
  };

  const steps = ['নাম', 'ইউজারনেম', 'ইমেইল', 'পাসওয়ার্ড'];
  const filled = [form.name, form.username, form.email, form.password].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', paddingTop: '6rem' }}>
      <Toaster position="bottom-right" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '14px' } }} />

      <div style={{ width: '100%', maxWidth: '420px', animation: 'scaleIn 0.4s ease' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1rem', boxShadow: 'var(--shadow-lg)', animation: 'float 3s ease-in-out infinite' }}>☕</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--text)', marginBottom: '6px' }}>
            ক্রিয়েটর{' '}
            <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>হিসেবে যোগ দিন</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>বিনামূল্যে শুরু করুন — মাত্র ১ মিনিটে!</p>
        </div>

        {/* Card */}
        <div style={{ padding: '2rem', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>

          {/* Progress */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>প্রোফাইল সম্পূর্ণতা</span>
              <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 700 }}>{Math.round((filled / 4) * 100)}%</span>
            </div>
            <div style={{ height: '4px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '99px', background: 'var(--gradient)', width: ((filled / 4) * 100) + '%', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Google */}
          <button onClick={function () { signIn('google', { callbackUrl: '/dashboard' }); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '13px', borderRadius: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}
            onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-light)'; }}
            onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}>
            <span style={{ fontSize: '1.1rem' }}>🔵</span> Google দিয়ে সাইন আপ
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-faint)', fontWeight: 600 }}>অথবা</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>নাম</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম" required style={inputStyle}
                  onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                  onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={labelStyle}>ইউজারনেম</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)', fontWeight: 700, fontSize: '13px' }}>@</span>
                  <input name="username" value={form.username} onChange={handleChange} placeholder="username" required style={{ ...inputStyle, paddingLeft: '28px' }}
                    onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                    onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                </div>
              </div>
            </div>

            <div>
              <label style={labelStyle}>ইমেইল</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required style={inputStyle}
                onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div>
              <label style={labelStyle}>পাসওয়ার্ড</label>
              <div style={{ position: 'relative' }}>
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="কমপক্ষে ৬ অক্ষর" required style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                  onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                <button type="button" onClick={function () { setShowPass(function (s) { return !s; }); }}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-faint)' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {/* Password strength */}
              {form.password && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  {[1, 2, 3, 4].map(function (i) {
                    const strength = form.password.length >= i * 3 ? true : false;
                    return (
                      <div key={i} style={{ flex: 1, height: '3px', borderRadius: '99px', background: strength ? (i <= 2 ? 'var(--amber)' : 'var(--green)') : 'var(--border)', transition: 'background 0.3s' }} />
                    );
                  })}
                </div>
              )}
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', background: loading ? 'var(--border)' : 'var(--gradient)', color: 'white', fontWeight: 800, fontSize: '15px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1, fontFamily: 'var(--font-body)', marginTop: '4px' }}
              onMouseEnter={function (e) { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; } }}
              onMouseLeave={function (e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  তৈরি হচ্ছে...
                </span>
              ) : 'অ্যাকাউন্ট তৈরি করুন →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', marginTop: '1.5rem' }}>
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={function (e) { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={function (e) { e.currentTarget.style.textDecoration = 'none'; }}>
              লগ ইন করুন →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

}
