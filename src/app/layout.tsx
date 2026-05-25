import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Burger App',
  description: 'Order burgers online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#000', minHeight: '100vh', margin: 0, padding: 0 }}>
        <Header />
        <main style={{ padding: '24px' }}>{children}</main>
      </body>
    </html>
  );
}