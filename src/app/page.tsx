import { getProducts } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

// No 'use client' here — this runs on the server at build time.
// The product list is static so there's no reason to fetch it on every visit.
export default async function HomePage() {
  const products = await getProducts();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#1c1c1c', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ position: 'relative', height: '180px' }}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div style={{ padding: '12px' }}>
              <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px' }}>
                {product.name}
              </h2>
              <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 6px' }}>
                ${(product.price / 100).toFixed(2)}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {product.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}