'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';

// This is the only client component on the product page.
// Keeping it isolated means everything else on the page stays server-rendered.
export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => {
        addItem(product);
        alert(`Added ${product.name} to cart`);
      }}
      style={{
        width: '100%',
        marginTop: '24px',
        backgroundColor: '#3f3f46',
        color: '#fff',
        padding: '14px',
        borderRadius: '999px',
        fontWeight: 'bold',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Add to cart
    </button>
  );
}