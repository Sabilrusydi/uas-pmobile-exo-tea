import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import AdminLayout from '../components/AdminLayout';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Gunakan layout yang berbeda berdasarkan halaman
  const getLayout = () => {
    if (Component.getLayout) {
      return Component.getLayout(<Component {...pageProps} />);
    }

    if (pageProps.isAdminPage) {
      return (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      );
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <SessionProvider session={session}>
      {getLayout()}
    </SessionProvider>
  );
}

export default MyApp;