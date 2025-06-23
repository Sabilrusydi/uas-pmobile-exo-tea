import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    const productsCol = collection(db, 'products');

    if (req.method === 'GET') {
        const productSnapshot = await getDocs(productsCol);
        const products = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(products);
    } else if (req.method === 'POST') {
        const newProduct = req.body;
        const docRef = await addDoc(productsCol, newProduct);
        res.status(201).json({ id: docRef.id, ...newProduct });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
