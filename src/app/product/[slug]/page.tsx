import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

// Tells Next.js to pre-build a page for every product slug at build time.
// This way each product page is already rendered before anyone visits it.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamic = 'force-static';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // If someone hits a URL that doesn't match any product, show 404
  if (!product) notFound();

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', backgroundColor: '#1c1c1c', borderRadius: '16px', padding: '24px' }}>
      <Link
        href="/"
        style={{ color: '#fff', fontSize: '16px', marginBottom: '16px', display: 'inline-block', textDecoration: 'none' }}
      >
        ← Go Back
      </Link>

      <div style={{ position: 'relative', height: '260px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="520px"
          priority
        />
      </div>

      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 12px' }}>
        {product.name}
      </h1>
      <p style={{ color: '#fff', margin: '0 0 8px' }}>
        ${(product.price / 100).toFixed(2)}
      </p>
      <p style={{ color: '#9ca3af', margin: '0 0 8px' }}>
        {product.description}
      </p>
      <p style={{ color: '#9ca3af', margin: 0 }}>
        Nutrition: {product.calorie} calories
      </p>

      {/* Splitting this into its own client component keeps the rest of this
          page fully server-rendered — only the button ships any client JS */}
      <AddToCartButton product={product} />
    </div>
  );
}