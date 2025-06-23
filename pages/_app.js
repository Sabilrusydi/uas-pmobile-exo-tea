import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminLayout from '../components/AdminLayout';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  // Jika path halaman dimulai dengan /admin, gunakan AdminLayout
  if (router.pathname.startsWith('/admin')) {
    return (
      <SessionProvider session={session}>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </SessionProvider>
    );
  }

  // Jika tidak, gunakan Layout standar untuk user
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
