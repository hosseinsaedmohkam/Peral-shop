import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";

import FooterActive from "./FooterActive.client";

export default function Footer() {
  const navLinks = [
    { href: "/", title: "صفحه اصلی" },
    { href: "/shop", title: "فروشگاه" },
    { href: "/contact", title: "ارتباط با ما" },
    { href: "/about", title: "درباره ما" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaWhatsapp />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
  ];

  return (
    <footer className="w-full pt-8 pb-12 text-white ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-4">
          <Link href="/" aria-label="home" className="inline-block">
            <Image src="/imgi_1_Group.png" alt="logo" width={120} height={48} priority />
          </Link>
        </div>

        <p className="text-center text-gray-300 px-4 max-w-2xl mb-6">
          اینجا می‌توانید متن توضیحی یا شعار سایت خود را قرار دهید. متن باید کوتاه و خوانا باشد.
        </p>

        <nav className="mb-6" role="navigation" aria-label="Footer navigation" data-footer-nav>
          <ul className="flex flex-wrap gap-6 justify-center items-center">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="footer-link text-gray-300 transition-colors hover:text-white"
                  data-href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4 mt-4 mb-6">
          {socialLinks.map((s, idx) => (
            <Link
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full
                         border-2 border-[#F2C98A] text-[#F2C98A] text-xl
                         transition-transform transform hover:scale-105 hover:bg-[#F2C98A] hover:text-black"
              aria-label={`social-${idx}`}
            >
              {s.icon}
            </Link>
          ))}
        </div>

        {/* client helper — اگر وجود ندارد، stub پایین را بساز */}
        <FooterActive />
      </div>
    </footer>
  );
}
