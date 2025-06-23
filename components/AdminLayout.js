import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/admin/dashboard">
                <a className={`block p-2 rounded ${router.pathname === '/admin/dashboard' ? 'bg-gray-700' : ''}`}>Dashboard</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/produk">
                <a className={`block p-2 rounded ${router.pathname.startsWith('/admin/produk') ? 'bg-gray-700' : ''}`}>Manajemen Produk</a>
              </Link>
            </li>
             <li className="mt-auto">
               <Link href="/">
                <a className="block p-2 rounded hover:bg-gray-700">Kembali ke Toko</a>
               </Link>
            </li>
            <li>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left p-2 mt-4 rounded bg-red-600 hover:bg-red-700">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}