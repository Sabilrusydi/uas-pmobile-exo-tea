import { cloudinary } from '../../lib/cloudinary';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Form parsing error' });
      }

      try {
        const result = await cloudinary.uploader.upload(files.file.filepath, {
          folder: 'exo-tea-products',
        });
        res.status(200).json({ url: result.secure_url });
      } catch (error) {
        res.status(500).json({ error: 'Cloudinary upload error' });
      }
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}