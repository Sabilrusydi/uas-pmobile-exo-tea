import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminProduk() {
    const [products, setProducts] = useState([]);
    
    async function fetchProducts() {
        const res = await fetch('/api/produk');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            await fetch(`/api/produk/${id}`, { method: 'DELETE' });
            fetchProducts();
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manajemen Produk</h1>
                <Link href="/admin/produk/tambah">
                    <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Tambah Produk</a>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">Nama</th>
                            <th className="py-2 px-4 text-left">Harga</th>
                            <th className="py-2 px-4 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product.id} className="border-b">
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4">Rp {Number(product.price).toLocaleString('id-ID')}</td>
                                <td className="py-2 px-4">
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
