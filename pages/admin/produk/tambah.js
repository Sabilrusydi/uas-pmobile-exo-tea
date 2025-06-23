import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TambahProduk() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        // 1. Upload image to Cloudinary
        let imageUrl = '';
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const uploadData = await uploadRes.json();
            if(uploadData.url) {
                imageUrl = uploadData.url;
            } else {
                alert('Upload gambar gagal!');
                setUploading(false);
                return;
            }
        }

        // 2. Save product data to Firebase
        const productData = { name, description, price: Number(price), imageUrl };
        await fetch('/api/produk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        setUploading(false);
        router.push('/admin/produk');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nama Produk</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Deskripsi</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Harga</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Gambar Produk</label>
                    <input type="file" onChange={e => setImage(e.target.files[0])} required className="w-full p-2 border rounded" />
                </div>
                <button type="submit" disabled={uploading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
                    {uploading ? 'Menyimpan...' : 'Simpan Produk'}
                </button>
            </form>
        </div>
    );
}
