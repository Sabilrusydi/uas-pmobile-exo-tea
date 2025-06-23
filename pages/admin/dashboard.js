import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Selamat datang kembali, <span className="font-semibold">{session?.user?.email}</span>!</p>
      <p>Anda login sebagai <span className="font-semibold capitalize">{session?.user?.role}</span>.</p>
    </div>
  );
}
