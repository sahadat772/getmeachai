'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(function () {
    function onScroll() { setScrolled(window.scrollY > 20); }
    function onResize() { setIsMobile(window.innerWidth < 768); }
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '0.75rem 1.5rem' : '1rem 1.5rem',
      background: scrolled ? 'var(--surface)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: 'var(--shadow)' }}>☕</div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>
            Get Me a <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Chai</span>
          </span>
        </Link>

        {/* Desktop Nav — only on large screens */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link href="/about" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={function (e) { e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={function (e) { e.currentTarget.style.color = 'var(--text-muted)'; }}>
              Explore
            </Link>

            {session ? (
              <>
                <Link href="/dashboard" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={function (e) { e.currentTarget.style.color = 'var(--text)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  Dashboard
                </Link>
                <Link href={'/profile/' + session.user.username} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent-border)', textDecoration: 'none' }}>
                  {session.user.image ? (
                    <img src={session.user.image} alt="avatar" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white' }}>
                      {session.user.name?.charAt(0)}
                    </div>
                  )}
                  {session.user.name?.split(' ')[0]}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Login
                </Link>
                <Link href="/signup" style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, background: 'var(--gradient)', color: 'white', textDecoration: 'none' }}>
                  Start my page →
                </Link>
              </>
            )}

            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s ease', color: 'var(--text-muted)' }}
              onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        )}

        {/* Mobile buttons — only on small screens */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={toggleTheme}
              style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', cursor: 'pointer' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={function () { setMenuOpen(function (o) { return !o; }); }}
              style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}>
              <span style={{ width: '16px', height: '2px', background: 'var(--text-muted)', borderRadius: '2px' }} />
              <span style={{ width: '16px', height: '2px', background: 'var(--text-muted)', borderRadius: '2px' }} />
              <span style={{ width: '16px', height: '2px', background: 'var(--text-muted)', borderRadius: '2px' }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          marginTop: '0.5rem', padding: '1rem',
          background: 'var(--surface)', borderRadius: '16px',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: '8px',
          animation: 'fadeInDown 0.2s ease',
        }}>
          <Link href="/about" onClick={function () { setMenuOpen(false); }} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Explore</Link>
          {session ? (
            <>
              <Link href="/dashboard" onClick={function () { setMenuOpen(false); }} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Dashboard</Link>
              <Link href={'/profile/' + session.user.username} onClick={function () { setMenuOpen(false); }} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-light)', border: '1px solid var(--accent-border)', textDecoration: 'none' }}>My Page</Link>
              <button onClick={function () { signOut(); setMenuOpen(false); }} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--red)', background: 'var(--red-light)', border: '1px solid var(--red-border)', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={function () { setMenuOpen(false); }} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Login</Link>
              <Link href="/signup" onClick={function () { setMenuOpen(false); }} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, background: 'var(--gradient)', color: 'white', textAlign: 'center', textDecoration: 'none' }}>Start my page →</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
