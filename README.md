# ☕ Get Me a Chai

> বাংলাদেশের ক্রিয়েটরদের জন্য সবচেয়ে সহজ সাপোর্ট প্ল্যাটফর্ম

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://getme-achai-vert.vercel.app/)

---

## 🌐 Live Demo

**[https://getme-achai-vert.vercel.app](https://getme-achai-vert.vercel.app)**

---

## 📖 প্রজেক্ট সম্পর্কে

**Get Me a Chai** হলো একটি ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন যেখানে বাংলাদেশের ক্রিয়েটররা তাদের ভক্তদের কাছ থেকে সরাসরি **bKash** ও **Nagad**-এর মাধ্যমে আর্থিক সাপোর্ট গ্রহণ করতে পারেন।

এটি মূলত [Buy Me a Coffee](https://buymeacoffee.com) এর বাংলাদেশি বিকল্প — সম্পূর্ণ দেশীয় পেমেন্ট সিস্টেম সহ।

---

## ✨ ফিচারসমূহ

- 🔐 **Authentication** — Email/Password ও Google OAuth (NextAuth.js v5)
- 👤 **Dynamic Profile Page** — প্রতিটি ক্রিয়েটরের জন্য unique URL (`/profile/username`)
- 💰 **Payment System** — bKash ও Nagad ইন্টিগ্রেশন
- 📊 **Creator Dashboard** — আয়ের চার্ট, সাপোর্টার লিস্ট, ট্রানজেকশন হিস্ট্রি
- 📧 **Email Notification** — নতুন সাপোর্ট পেলে ক্রিয়েটরকে ইমেইল
- ⚙️ **Settings** — প্রোফাইল ও পেমেন্ট নম্বর আপডেট
- 📱 **Responsive Design** — মোবাইল, ট্যাবলেট ও ডেস্কটপ সাপোর্ট

---

## 🛠️ টেকনোলজি

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| Frontend | React 19, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB + Mongoose |
| Authentication | NextAuth.js v5 (Auth.js) |
| Email | Nodemailer |
| Charts | Recharts |
| Deployment | Vercel |

---

## 📁 ফোল্ডার স্ট্রাকচার

```
getmeachai/
├── app/
│   ├── (public)/
│   │   ├── layout.js
│   │   ├── page.js                     # Homepage
│   │   ├── about/page.js
│   │   └── profile/[username]/page.js  # Dynamic Profile
│   ├── dashboard/
│   │   ├── layout.js
│   │   ├── page.js                     # Dashboard Overview
│   │   ├── supporters/page.js
│   │   └── settings/page.js
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.js
│   │   │   └── register/route.js
│   │   ├── payment/route.js
│   │   ├── transactions/route.js
│   │   └── profile/route.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── SessionWrapper.js
│   │   │   └── DashboardClient.js
│   │   ├── forms/
│   │   │   └── SettingsClient.js
│   │   └── payment/
│   │       └── PaymentSection.js
│   ├── lib/
│   │   ├── mongodb.js
│   │   ├── auth.js
│   │   └── mail.js
│   └── models/
│       ├── User.js
│       ├── Transaction.js
│       └── Subscription.js
├── proxy.js                            # Protected Routes
├── next.config.mjs
└── package.json
```

---

## 🚀 লোকালি রান করুন

### Prerequisites
- Node.js 18+
- MongoDB (local বা Atlas)
- Git

### ১. Repository Clone করুন

```bash
git clone https://github.com/sahadat772/getmeachai.git
cd getmeachai
```

### ২. Dependencies Install করুন

```bash
npm install mongoose next-auth@beta bcryptjs nodemailer@7 react-hook-form react-hot-toast recharts
```

### ৩. Environment Variables সেটআপ করুন

`.env.local` ফাইল তৈরি করুন:

```env
MONGODB_URI=mongodb://localhost:27017/getmechai

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password
```

### ৪. Development Server চালু করুন

```bash
npm run dev
```

Browser এ যান: **http://localhost:3000**

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_URL` | App URL (localhost বা production) |
| `NEXTAUTH_SECRET` | NextAuth secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `EMAIL_USER` | Gmail address for notifications |
| `EMAIL_PASS` | Gmail App Password |

---

## 📸 স্ক্রিনশট

### Homepage
> ক্রিয়েটরদের সাপোর্ট করার সহজ প্ল্যাটফর্ম

### Creator Dashboard
> আয়ের চার্ট, সাপোর্টার লিস্ট ও ট্রানজেকশন হিস্ট্রি

### Profile Page
> প্রতিটি ক্রিয়েটরের ইউনিক পাবলিক প্রোফাইল

---

## 🤝 Contribute করুন

১. Fork করুন
২. Feature branch তৈরি করুন (`git checkout -b feature/amazing-feature`)
३. Commit করুন (`git commit -m 'Add amazing feature'`)
৪. Push করুন (`git push origin feature/amazing-feature`)
৫. Pull Request খুলুন

---

## 📝 লাইসেন্স

এই প্রজেক্ট [MIT License](LICENSE) এর অধীনে।

---

## 👨‍💻 Developer

**Sahadat Hossain**

[![GitHub](https://img.shields.io/badge/GitHub-sahadat772-black?style=flat&logo=github)](https://github.com/sahadat772)

---

## 🙏 ধন্যবাদ

এই প্রজেক্টটি বাংলাদেশের সকল ক্রিয়েটরদের জন্য উৎসর্গ করা হলো। ☕🇧🇩