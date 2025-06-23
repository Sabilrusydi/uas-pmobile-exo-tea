import Link from 'next/link';
import Image from 'next/image';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ProdukPage({ products }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu Kami</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <Link href={`/produk/${product.id}`} key={product.id}>
            <a className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={product.imageUrl || 'https://placehold.co/400x300/E2E8F0/A0AEC0?text=EXO+TEA'}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-2">Rp {Number(product.price).toLocaleString('id-ID')}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
    try {
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);
        const products = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return {
            props: {
                products: JSON.parse(JSON.stringify(products)), 
            },
        };
    } catch (error) {
        console.error("Error fetching products: ", error);
        return {
            props: {
                products: [],
            },
        };
    }
}
