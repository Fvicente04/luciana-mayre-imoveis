import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function removerFoto(url: string): Promise<void> {
  // public_id está embutido na URL do Cloudinary entre /upload/ e a extensão
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  if (!match) return;
  await cloudinary.uploader.destroy(match[1]);
}

export { cloudinary };
