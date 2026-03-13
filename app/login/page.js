'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      toast.error('ইমেইল বা পাসওয়ার্ড ভুল! ❌');
    } else {
      toast.success('লগইন সফল! 🎉');
      router.push('/dashboard');
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', paddingTop: '6rem' }}>
      <Toaster position="bottom-right" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '14px' } }} />

      <div style={{ width: '100%', maxWidth: '420px', animation: 'scaleIn 0.4s ease' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1rem', boxShadow: 'var(--shadow-lg)' }}>☕</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--text)', marginBottom: '6px' }}>
            স্বাগতম{' '}
            <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ফিরে!</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>আপনার অ্যাকাউন্টে লগ ইন করুন</p>
        </div>

        {/* Card */}
        <div style={{ padding: '2rem', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>

          {/* Google */}
          <button onClick={function () { signIn('google', { callbackUrl: '/dashboard' }); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '13px', borderRadius: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}
            onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-light)'; }}
            onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}>
            <span style={{ fontSize: '1.1rem' }}>🔵</span> Google দিয়ে লগ ইন
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-faint)', fontWeight: 600 }}>অথবা</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>ইমেইল</label>
              <input type="email" value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="you@example.com" required style={inputStyle}
                onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <div>
              <label style={labelStyle}>পাসওয়ার্ড</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                  onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                <button type="button" onClick={function () { setShowPass(function (s) { return !s; }); }}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-faint)' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', background: loading ? 'var(--border)' : 'var(--gradient)', color: 'white', fontWeight: 800, fontSize: '15px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1, fontFamily: 'var(--font-body)', marginTop: '4px' }}
              onMouseEnter={function (e) { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; } }}
              onMouseLeave={function (e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  লোড হচ্ছে...
                </span>
              ) : 'লগ ইন করুন →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', marginTop: '1.5rem' }}>
            অ্যাকাউন্ট নেই?{' '}
            <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={function (e) { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={function (e) { e.currentTarget.style.textDecoration = 'none'; }}>
              সাইন আপ করুন →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
