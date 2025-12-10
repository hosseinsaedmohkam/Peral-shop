"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiLogIn } from "react-icons/fi";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCartStore } from "@/app/stores/cartStores";

/////////////// dynamic import برای جلوگیری از مشکلات SSR با فایل Login
const Login = dynamic(() => import("@/components/Login"), { ssr: false });

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  ///////////// Zustand store//////////////
  const items = useCartStore((s) => (Array.isArray(s.items) ? s.items : []));
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const totalItems = useMemo(() => items.reduce((acc, i) => acc + (i.qty || 0), 0), [items]);

  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null); ////// برای مدیریت فوکوس
  const lastTriggerRef = useRef(null); /////// برای بازگرداندن فوکوس پس از بستن مودال

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  ////// قفل اسکرول وقتی مودال بازه
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = authOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [authOpen, mounted]);

  /////// بستن با Escape و مدیریت فوکوس
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setAuthOpen(false);
      }
      
    };
    if (authOpen) {
      window.addEventListener("keydown", onKey);
      /////////// وقتی مودال باز میشه، فوکوس را روی closeButton بذار
      setTimeout(() => closeButtonRef.current?.focus?.(), 10);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [authOpen, mounted]);

  /////// کلیک روی بکدراپ
  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setAuthOpen(false);
    }
  };

  /////// وقتی مودال باز میشه، ذخیرهٔ المان تریگر برای بازگرداندن فوکوس
  const openAuth = (triggerEl = null) => {
    lastTriggerRef.current = triggerEl || document.activeElement;
    setAuthOpen(true);
  };
  const closeAuth = () => {
    setAuthOpen(false);
    /////// بازگرداندن فوکوس به عنصر تریگر (اگر موجود باشد)
    setTimeout(() => {
      try {
        lastTriggerRef.current?.focus?.();
      } catch (e) {
        /* ignore */
      }
    }, 50);
  };

  if (!mounted) return null; ////// جلوگیری از Hydration mismatch

  const navLinks = [
    { href: "/", title: "خانه" },
    { href: "/shop", title: "فروشگاه" },
    { href: "/about", title: "درباره ما" },
    { href: "/contact", title: "تماس با ما" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-colors duration-300 ${
          scrolled ? "backdrop-blur bg-black/70 text-white shadow-lg" : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between relative">
          {/* موبایل همبرگر */}
          <div className="sm:hidden flex items-center">
            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 transition"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

          {/* لوگو */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <Link href="/" aria-label="homepage" className="flex items-center gap-2">
              <Image src="/imgi_1_Group.png" alt="Pearl" width={60} height={20} priority />
            </Link>
          </div>

          {/* لینک‌های دسکتاپ */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors ${
                  pathname === l.href ? "text-amber-300 font-semibold" : "text-white/90 hover:text-white"
                }`}
              >
                {l.title}
              </Link>
            ))}
          </div>

          {/* ابزارک‌ها */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center bg-neutral-800 rounded-md overflow-hidden h-9">
              <input
                type="text"
                placeholder="جستجوی محصول..."
                className="px-3 py-1 text-sm text-black focus:outline-none w-36"
              />
              <button className="px-2 text-gray-600 hover:text-amber-500" aria-label="search">
                <FiSearch size={18} />
              </button>
            </div>

            <button
              aria-label="Cart"
              className="relative p-2 rounded-md hover:bg-white/5 transition"
              onClick={() => setCartOpen(true)}
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -left-2 bg-amber-400 text-black rounded-full text-xs px-1">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={(e) => openAuth(e.currentTarget)}
              className="flex items-center gap-2 text-sm bg-amber-500 text-black px-3 py-1 rounded-md hover:opacity-95 transition"
              aria-haspopup="dialog"
            >
              <FiLogIn />
              <span>ورود / ثبت‌نام</span>
            </button>
          </div>
        </div>
      </nav>

      {/* موبایل منو */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 w-3/4 max-w-xs bg-neutral-900 text-white p-6">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <FiX />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="py-2">
                  {l.title}
                </Link>
              ))}

              <div className="mt-4">
                <button
                  onClick={() => {
                    openAuth();
                    setMobileOpen(false);
                  }}
                  className="w-full bg-amber-500 text-black py-2 rounded"
                >
                  ورود / ثبت‌نام
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* مودال ورود */}
      {authOpen && (
        <div
          ref={overlayRef}
          onClick={onOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Login dialog"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-3xl mx-auto transform transition-all">
            <div className="bg-neutral-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-amber-300">ورود / ثبت‌نام</h3>
                <button
                  ref={closeButtonRef}
                  onClick={closeAuth}
                  aria-label="close"
                  className="p-2 rounded hover:bg-white/5"
                >
                  <FiX />
                </button>
              </div>

              <div className="p-6">
                <Login
                  onSuccess={() => {
                    //////// اگر Login موفق بود، مودال بسته می‌شود
                    closeAuth();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
