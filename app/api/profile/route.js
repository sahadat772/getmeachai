import { NextResponse } from 'next/server';
import { auth } from '../../lib/auth';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

export async function PUT(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'অনুমতি নেই' }, { status: 401 });
    }

    const { name, username, bio, bkashNumber, nagadNumber, image } = await req.json();

    await connectDB();

    

    // username unique check
    const existing = await User.findOne({
      username,
      email: { $ne: session.user.email },
    });
    if (existing) {
      return NextResponse.json(
        { message: 'এই ইউজারনেম নেওয়া হয়ে গেছে' },
        { status: 400 }
      );
    }

    await User.findOneAndUpdate(
      { email: session.user.email },
      { name, username, bio, bkashNumber, nagadNumber, coverImage }
    );

    return NextResponse.json({ message: 'প্রোফাইল আপডেট হয়েছে' });
  } catch (error) {
    return NextResponse.json({ message: 'সার্ভার এরর' }, { status: 500 });
  }
}