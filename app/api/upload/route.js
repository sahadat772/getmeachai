import { NextResponse } from 'next/server';
import { auth } from '../../lib/auth';
import cloudinary from '../../lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'অনুমতি নেই' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'ফাইল দিন' }, { status: 400 });
    }

    // File size check (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ message: 'ফাইল সাইজ ২MB এর বেশি হবে না' }, { status: 400 });
    }

    // File type check
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ message: 'শুধু JPG, PNG বা WebP ফাইল দিন' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'getmeachai/avatars',
          transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'আপলোড ব্যর্থ হয়েছে' }, { status: 500 });
  }
}