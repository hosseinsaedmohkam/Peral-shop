
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FooterActive() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      ////// پیدا کردن nav مربوط به footer
      const nav = document.querySelector('[data-footer-nav]');
      if (!nav) return;

      /////// ابتدا همه لینک‌ها را ریست کن (حذف کلاس active اگر وجود دارد)
      const links = nav.querySelectorAll('.footer-link');
      links.forEach((a) => {
        a.classList.remove('text-[#F2C98A]', 'border-b-2', 'border-[#F2C98A]', 'pb-1');
        a.removeAttribute('aria-current');
      });

      /////// سپس لینک مطابق pathname را پیدا کن
      //////// ما از attribute data-href استفاده کردیم که دقیقاً با href مقایسه می‌شود
      let matched = null;
      links.forEach((a) => {
        const href = a.getAttribute('data-href');
        if (!href) return;
        if (href === "/") {
          if (pathname === "/") matched = a;
        } else {
          ///////// پوشش صفحات زیرمجموعه مثل /shop/product/1
          if (pathname === href || pathname.startsWith(href + "/")) matched = a;
        }
      });

      if (matched) {
        matched.classList.add('text-[#F2C98A]', 'border-b-2', 'border-[#F2C98A]', 'pb-1');
        matched.setAttribute('aria-current', 'page');
      }
    } catch (e) {

    }
  }, [pathname]);

  return null; /////// این کامپوننت هیچ JSX ای تولید نمی‌کند؛ فقط side-effect دارد/
}
