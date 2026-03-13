'use client';

import { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function SettingsClient({ user }) {
  const [form, setForm] = useState({
    name: user.name || '',
    username: user.username || '',
    bio: user.bio || '',
    bkashNumber: user.bkashNumber || '',
    nagadNumber: user.nagadNumber || '',
  });
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [avatar, setAvatar] = useState(user.image || '');
  const [preview, setPreview] = useState(user.image || '');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef(null);

  const profileUrl = 'https://getme-achai-vert.vercel.app/profile/' + form.username;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) { setPreview(ev.target.result); };
    reader.readAsDataURL(file);
    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setUploadLoading(false);
    if (res.ok) {
      setAvatar(data.url);
      toast.success('ছবি আপলোড হয়েছে! ✅');
    } else {
      toast.error(data.message || 'আপলোড ব্যর্থ হয়েছে');
      setPreview(user.image || '');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, image: avatar }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      toast.success('প্রোফাইল আপডেট হয়েছে! 🎉');
    } else {
      toast.error(data.message || 'কিছু একটা ভুল হয়েছে!');
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success('লিংক কপি হয়েছে! 🔗');
    setTimeout(function () { setCopied(false); }, 2000);
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '8px',
  };

  const cardStyle = {
    padding: '1.5rem',
    borderRadius: '20px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
  };

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '42rem' }}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          },
        }}
      />

      {/* Header */}
      <div style={{ marginBottom: '2rem', animation: 'fadeInDown 0.5s ease' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>
          প্রোফাইল{' '}
          <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>সেটিংস</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>আপনার প্রোফাইল এবং পেমেন্ট তথ্য আপডেট করুন</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Avatar Upload */}
        <div style={{ ...cardStyle, animation: 'fadeInUp 0.5s ease 0.1s both' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', marginBottom: '1.25rem', fontSize: '1rem' }}>
            📸 প্রোফাইল ছবি
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '18px', overflow: 'hidden', border: '3px solid var(--border)', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, color: 'white', fontFamily: 'var(--font-heading)' }}>
                {preview ? (
                  <img src={preview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : user.name?.charAt(0).toUpperCase()}
              </div>
              {uploadLoading && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '24px', height: '24px', border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                </div>
              )}
            </div>
            <div>
              <button type="button" onClick={function () { fileRef.current?.click(); }} disabled={uploadLoading}
                style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, background: 'var(--accent-light)', border: '1px solid var(--accent-border)', color: 'var(--accent)', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '8px', display: 'block' }}
                onMouseEnter={function (e) { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={function (e) { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}>
                {uploadLoading ? '⏳ আপলোড হচ্ছে...' : '📁 ছবি পরিবর্তন করুন'}
              </button>
              <p style={{ fontSize: '12px', color: 'var(--text-faint)' }}>JPG, PNG বা WebP • সর্বোচ্চ ২MB</p>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div style={{ ...cardStyle, animation: 'fadeInUp 0.5s ease 0.2s both' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', marginBottom: '1.25rem', fontSize: '1rem' }}>
            👤 প্রোফাইল তথ্য
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>নাম</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম" style={inputStyle}
                onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <div>
              <label style={labelStyle}>ইউজারনেম</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)', fontWeight: 700, fontSize: '14px' }}>@</span>
                <input name="username" value={form.username} onChange={handleChange} placeholder="your_username" style={{ ...inputStyle, paddingLeft: '32px' }}
                  onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                  onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-faint)', marginTop: '6px' }}>
                🔗 প্রোফাইল লিংক: <span style={{ color: 'var(--accent)' }}>.../{form.username}</span>
              </p>
            </div>
            <div>
              <label style={labelStyle}>বায়ো</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="আপনার সম্পর্কে কিছু লিখুন..." rows={3} style={{ ...inputStyle, resize: 'none' }}
                onFocus={function (e) { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                onBlur={function (e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
              <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '4px', textAlign: 'right' }}>{form.bio.length} / 200</p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div style={{ ...cardStyle, animation: 'fadeInUp 0.5s ease 0.3s both' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', marginBottom: '4px', fontSize: '1rem' }}>
            💳 পেমেন্ট তথ্য
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>সাপোর্টাররা এই নম্বরে পেমেন্ট পাঠাবেন</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>📱 bKash নম্বর</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>📱</span>
                <input name="bkashNumber" value={form.bkashNumber} onChange={handleChange} placeholder="01XXXXXXXXX" style={{ ...inputStyle, paddingLeft: '40px', borderColor: form.bkashNumber ? '#ec489940' : 'var(--border)' }}
                  onFocus={function (e) { e.target.style.borderColor = '#ec4899'; e.target.style.boxShadow = '0 0 0 3px #ec489920'; }}
                  onBlur={function (e) { e.target.style.borderColor = form.bkashNumber ? '#ec489940' : 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>💳 Nagad নম্বর</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>💳</span>
                <input name="nagadNumber" value={form.nagadNumber} onChange={handleChange} placeholder="01XXXXXXXXX" style={{ ...inputStyle, paddingLeft: '40px', borderColor: form.nagadNumber ? '#f9731640' : 'var(--border)' }}
                  onFocus={function (e) { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px #f9731620'; }}
                  onBlur={function (e) { e.target.style.borderColor = form.nagadNumber ? '#f9731640' : 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Link */}
        <div style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', background: 'var(--accent-light)', border: '1px solid var(--accent-border)', animation: 'fadeInUp 0.5s ease 0.4s both' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.75rem', fontSize: '14px' }}>
            🔗 আপনার প্রোফাইল লিংক
          </h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <code style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '10px', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
              {profileUrl}
            </code>
            <button type="button" onClick={copyLink}
              style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, background: copied ? 'var(--green)' : 'var(--gradient)', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {copied ? '✅ কপি হয়েছে!' : '📋 কপি করুন'}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button type="submit" disabled={loading}
          style={{ padding: '16px', borderRadius: '14px', background: loading ? 'var(--border)' : 'var(--gradient)', color: 'white', fontWeight: 800, fontSize: '15px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1, fontFamily: 'var(--font-body)', animation: 'fadeInUp 0.5s ease 0.5s both' }}
          onMouseEnter={function (e) { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; } }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          {loading ? '⏳ সেভ হচ্ছে...' : '💾 পরিবর্তন সেভ করুন'}
        </button>

      </form>
    </div>
  );
}