import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Register request body:', body);

    const { name, email, username, password } = body;

    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: 'সব তথ্য পূরণ করুন' },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connected!');

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে' },
        { status: 400 }
      );
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { message: 'এই ইউজারনেম নেওয়া হয়ে গেছে' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    console.log('User created:', user._id);

    return NextResponse.json(
      { message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: error.message || 'সার্ভার এরর' },
      { status: 500 }
    );
  }
}