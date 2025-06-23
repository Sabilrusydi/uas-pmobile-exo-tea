import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2024 EXO TEA Cipedung. Dibuat untuk UAS Pemrograman Mobile.</p>
      </footer>
    </div>
  );
}