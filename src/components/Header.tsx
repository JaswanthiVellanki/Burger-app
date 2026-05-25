'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  // Zustand reads from localStorage which only exists in the browser.
  // Without this mounted check we get a hydration mismatch because
  // the server renders 0 items but the client immediately sees the real count.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <header style={{
      backgroundColor: '#000',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #1f1f1f',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/" style={{
          color: '#4ade80',
          fontWeight: '800',
          fontSize: '22px',
          letterSpacing: '4px',
          textDecoration: 'none',
        }}>
          BURGER
        </Link>
        <Link href="/" style={{ fontSize: '18px', textDecoration: 'none', lineHeight: 1 }}>
          🏠
        </Link>
      </div>

      <Link href="/cart" style={{
        textDecoration: 'none',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
      }}>
        <span style={{ fontSize: '24px', lineHeight: 1 }}>🛒</span>
        {mounted && totalItems > 0 && (
          <span style={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#4ade80',
            color: '#000',
            fontSize: '10px',
            fontWeight: '800',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  );
}