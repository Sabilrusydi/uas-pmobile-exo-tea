import Image from 'next/image';

export default function Kontak() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Kontak & Biodata</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:mr-8 mb-6 md:mb-0">
          <Image
            src="/foto-saya.jpg" // Ganti dengan path foto Anda di folder /public
            alt="Foto Profil"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sabil Rusydi Ilahi</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>NPM:</strong> 43...</li>
            <li><strong>Kelas:</strong> S1-SI-B-R-SM4-20242</li>
            <li><strong>Mata Kuliah:</strong> Pemrograman Mobile (Web)</li>
            <li><strong>Email:</strong> sabil@example.com</li>
            <li><strong>GitHub:</strong> <a href="https://github.com/sabil" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">sabilrusydi</a></li>
            <li><strong>Proyek:</strong> Aplikasi Pemesanan Online EXO TEA Cipedung</li>
          </ul>
        </div>
      </div>
    </div>
  );
}