import { auth } from "../../lib/auth";
import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import SettingsClient from "../../components/forms/SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  await connectDB();
  const user = await User.findOne({ email: session.user.email }).lean();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">সেটিংস ⚙️</h1>
      <p className="text-gray-500 text-sm mb-8">আপনার প্রোফাইল আপডেট করুন</p>
      <SettingsClient user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
}
