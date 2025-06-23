import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    const { id } = req.query;
    const docRef = doc(db, 'products', id);

    if (req.method === 'GET') {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.status(200).json({ id: docSnap.id, ...docSnap.data() });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } else if (req.method === 'PUT') {
        await updateDoc(docRef, req.body);
        res.status(200).json({ message: 'Product updated' });
    } else if (req.method === 'DELETE') {
        await deleteDoc(docRef);
        res.status(200).json({ message: 'Product deleted' });
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}