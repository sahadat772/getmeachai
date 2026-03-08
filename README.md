# ☕ Get Me a Chai

> The easiest creator support platform for Bangladesh

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://getme-achai-vert.vercel.app/)

---

## 🌐 Live Demo

**[https://getme-achai-vert.vercel.app](https://getme-achai-vert.vercel.app)**

---

## 📖 About The Project

**Get Me a Chai** is a full-stack web application that allows Bangladeshi creators to receive financial support directly from their fans via **bKash** and **Nagad** — the two most popular mobile payment platforms in Bangladesh.

This is essentially a Bangladeshi alternative to [Buy Me a Coffee](https://buymeacoffee.com), built with a fully local payment system in mind.

---

## ✨ Features

- 🔐 **Authentication** — Email/Password and Google OAuth via NextAuth.js v5
- 👤 **Dynamic Profile Pages** — Unique public URL for each creator (`/profile/username`)
- 💰 **Payment System** — bKash and Nagad payment integration
- 📊 **Creator Dashboard** — Earnings chart, supporters list, and transaction history
- 📧 **Email Notifications** — Creators get notified via email on every new support
- ⚙️ **Settings Page** — Update profile info and payment numbers
- 🖼️ **Profile Picture Upload** — Cloudinary-powered image upload
- 🛡️ **Admin Panel** — Manage users, view all transactions, platform statistics
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| Frontend | React 19, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB + Mongoose |
| Authentication | NextAuth.js v5 (Auth.js) |
| Image Upload | Cloudinary |
| Email | Nodemailer |
| Charts | Recharts |
| Deployment | Vercel |

---

## 📁 Project Structure

```
getmeachai/
├── app/
│   ├── (public)/
│   │   ├── layout.js
│   │   ├── page.js                     # Homepage
│   │   ├── about/page.js
│   │   └── profile/[username]/page.js  # Dynamic Creator Profile
│   ├── admin/
│   │   ├── layout.js                   # Admin-only protected layout
│   │   ├── page.js                     # Admin Overview
│   │   ├── users/page.js               # Manage Users
│   │   ├── transactions/page.js        # All Transactions
│   │   └── settings/page.js            # Platform Settings
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
│   │   ├── profile/route.js
│   │   ├── upload/route.js
│   │   └── admin/users/route.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── SessionWrapper.js
│   │   │   ├── DashboardClient.js
│   │   │   ├── AdminOverviewClient.js
│   │   │   └── AdminUsersClient.js
│   │   ├── forms/
│   │   │   ├── SettingsClient.js
│   │   │   ├── LoginForm.js
│   │   │   └── RegisterForm.js
│   │   └── payment/
│   │       └── PaymentSection.js
│   ├── lib/
│   │   ├── mongodb.js
│   │   ├── auth.js
│   │   ├── cloudinary.js
│   │   └── mail.js
│   └── models/
│       ├── User.js
│       ├── Transaction.js
│       └── Subscription.js
├── proxy.js                            # Route protection middleware
├── next.config.mjs
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sahadat772/getmeachai.git
cd getmeachai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/getmechai

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

EMAIL_USER=your@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

### 4. Run the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string (local or Atlas) |
| `NEXTAUTH_URL` | Your app URL |
| `NEXTAUTH_SECRET` | Random secret key for NextAuth |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_USER` | Gmail address for notifications |
| `EMAIL_PASS` | Gmail App Password (16 digits) |

---

## 🛡️ Admin Panel

To access the admin panel at `/admin`, set `isAdmin: true` on your user document in MongoDB Atlas:

```json
{
  "isAdmin": true
}
```

Then log out and log back in.

---

## 📦 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add all environment variables in **Settings → Environment Variables**
4. Deploy!

> ⚠️ Make sure to use a **MongoDB Atlas** URI (not localhost) for production.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Sahadat Hossain**
MERN Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-sahadat772-black?style=flat&logo=github)](https://github.com/sahadat772)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sahadat_Hossain-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/sahadat-hossain-350208209/)

---

## 🙏 Acknowledgements

This project was built with passion for the creator community of Bangladesh. ☕🇧🇩




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