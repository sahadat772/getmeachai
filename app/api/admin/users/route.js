import { NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

async function checkAdmin(session) {
    if (!session?.user?.email) return false;
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    return user?.isAdmin || false;
}

export async function PUT(req) {
    try {
        const session = await auth();
        if (!await checkAdmin(session)) {
            return NextResponse.json({ message: 'অনুমতি নেই' }, { status: 403 });
        }
        const { userId, isBanned } = await req.json();
        await User.findByIdAndUpdate(userId, { isBanned });
        return NextResponse.json({ message: 'আপডেট হয়েছে' });
    } catch (error) {
        return NextResponse.json({ message: 'সার্ভার এরর' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await auth();
        if (!await checkAdmin(session)) {
            return NextResponse.json({ message: 'অনুমতি নেই' }, { status: 403 });
        }
        const { userId } = await req.json();
        await User.findByIdAndDelete(userId);
        return NextResponse.json({ message: 'ডিলিট হয়েছে' });
    } catch (error) {
        return NextResponse.json({ message: 'সার্ভার এরর' }, { status: 500 });
    }
}