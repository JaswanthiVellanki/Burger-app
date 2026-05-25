import { Product } from '@/types';

// The menu never changes so there's no point hitting the network on every request.
// force-cache tells Next.js to fetch once at build time and serve that forever.
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    'https://mcd-burger-api.github.io/data/products.json',
    { cache: 'force-cache' }
  );

  if (!res.ok) {
    throw new Error(`Could not load the menu. Status: ${res.status}`);
  }

  const data: { products: Product[] } = await res.json();
  return data.products;
}

// Reuses getProducts() so we get the cached result — no extra network call needed.
export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}