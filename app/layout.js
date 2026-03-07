import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/ui/SessionWrapper";
// import Navbar from "./components/ui/Navbar";
// import Footer from "./components/ui/Footer";

const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Get Me a Chai",
  description: "বাংলাদেশের ক্রিয়েটরদের সাপোর্ট প্ল্যাটফর্ম",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${hind.className} bg-gray-950 text-gray-100 min-h-screen flex flex-col`}
      >
        <SessionWrapper>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
