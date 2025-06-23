import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect based on role
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      if (session?.user?.role === 'admin') {
         router.push('/admin/dashboard');
      } else {
         router.push('/produk');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        
        {/* Box Info untuk Ujian Dosen */}
        <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">Info Login untuk Pengujian</p>
          <div className="mt-2 text-sm">
            <p><strong>Role Admin:</strong></p>
            <ul className="list-disc list-inside">
              <li>Email: <code>admin@example.com</code></li>
              <li>Password: <code>password123</code></li>
            </ul>
          </div>
          <div className="mt-2 text-sm">
            <p><strong>Role User :</strong></p>
            <ul className="list-disc list-inside">
              <li>Email: <code>user@example.com</code></li>
              <li>Password: <code>password123</code></li>
            </ul>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}