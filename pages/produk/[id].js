import { useRouter } from 'next/router';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
      return <div>Produk tidak ditemukan.</div>
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-80">
          <Image
            src={product.imageUrl || 'https://placehold.co/600x400/E2E8F0/A0AEC0?text=EXO+TEA'}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-purple-600 font-semibold mb-4">Rp {Number(product.price).toLocaleString('id-ID')}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return {
            notFound: true,
        };
    }

    const product = { id: docSnap.id, ...docSnap.data() };
    
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}