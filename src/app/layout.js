

import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Pearl Shop",
  description: "فروشگاه جواهرات پیِرل",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} min-h-screen`}>
        <Navbar />
        <div className="h-16" />
        <main className="min-h-[calc(80vh-64px)]">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
