'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

// Cart has to be a client component since it reads live state from Zustand
export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#1c1c1c', borderRadius: '16px', padding: '24px' }}>
      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 24px' }}>
        Shopping Cart
      </h1>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ color: '#9ca3af', marginBottom: '16px' }}>Your cart is empty.</p>
          <Link href="/" style={{ color: '#4ade80', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to menu
          </Link>
        </div>
      )}

      {items.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid #3f3f46' }}>
          <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="48px"
            />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#fff', fontSize: '14px', margin: 0 }}>
              {item.name}{' '}
              <span style={{ color: '#888' }}>({item.quantity})</span>
            </p>
          </div>
          <p style={{ color: '#fff', fontSize: '14px', margin: 0 }}>
            ${((item.price * item.quantity) / 100).toFixed(2)}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9ca3af' }}
          >
            🗑
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#4ade80', textDecoration: 'none', fontSize: '14px' }}>
            ← Continue shopping
          </Link>
          <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
            Total: ${(total / 100).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}