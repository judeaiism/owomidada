import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Our Marketplace</h1>
      <p className="text-xl mb-12">Discover amazing products and connect with sellers</p>
      <Link href="/home" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors">
        Enter Site
      </Link>
    </div>
  );
}