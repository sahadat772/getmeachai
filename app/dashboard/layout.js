'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import SessionWrapper from '../components/ui/SessionWrapper';
import Navbar from '../components/ui/Navbar';

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'ওভারভিউ' },
  { href: '/dashboard/supporters', icon: '❤️', label: 'সাপোর্টারস' },
  { href: '/dashboard/settings', icon: '⚙️', label: 'সেটিংস' },
];

function DashboardLayoutInner({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(function () {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (!session) return null;

  const initial = session.user.name?.charAt(0).toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ display: 'flex', paddingTop: '64px' }}>

        {/* SIDEBAR */}
        <aside style={{
          width: '240px',
          minHeight: 'calc(100vh - 64px)',
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          padding: '1.5rem 1rem',
          position: 'sticky',
          top: '64px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }} className="hidden md:flex">

          {/* User card */}
          <div style={{ padding: '1rem', borderRadius: '14px', background: 'var(--surface-2)', border: '1px solid var(--border)', marginBottom: '0.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: session.user.image ? 'transparent' : 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 900, color: 'white', marginBottom: '0.75rem', overflow: 'hidden' }}>
              {session.user.image ? (
                <img src={session.user.image} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : initial}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session.user.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>
              @{session.user.username}
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {navItems.map(function (item) {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '10px',
                    fontSize: '14px', fontWeight: 600,
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-border)' : 'transparent',
                    background: isActive ? 'var(--accent-light)' : 'transparent',
                  }}
                  onMouseEnter={function (e) {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--accent-light)';
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.borderColor = 'var(--accent-border)';
                    }
                  }}
                  onMouseLeave={function (e) {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}>
                  <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* View profile button */}
          <Link href={'/profile/' + session.user.username}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, color: 'white', background: 'var(--gradient)', textDecoration: 'none', transition: 'all 0.2s', marginTop: 'auto' }}
            onMouseEnter={function (e) { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={function (e) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            ☕ আমার পেজ দেখুন
          </Link>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
          {/* Mobile nav */}
          <div style={{ display: 'flex', gap: '4px', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', overflowX: 'auto' }} className="md:hidden">
            {navItems.map(function (item) {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: isActive ? 'var(--accent)' : 'var(--text-muted)', textDecoration: 'none', whiteSpace: 'nowrap', border: '1px solid', borderColor: isActive ? 'var(--accent-border)' : 'var(--border)', background: isActive ? 'var(--accent-light)' : 'var(--surface-2)', transition: 'all 0.2s' }}>
                  {item.icon} {item.label}
                </Link>
              );
            })}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <SessionWrapper>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SessionWrapper>
  );
}