import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        Selamat Datang di <span className="text-purple-600">EXO TEA</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Nikmati kesegaran teh berkualitas dengan berbagai pilihan rasa dan topping yang menggugah selera. Pesan sekarang juga!
      </p>
      <Link href="/produk">
        <a className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
          Lihat Menu
        </a>
      </Link>
    </div>
  );
}