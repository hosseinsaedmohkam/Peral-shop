'use client';

import React, { useMemo } from "react";
import Image from "next/image";


export default function ProductCard({
  product = {},
  handleAddToCart = () => {},
  openQuickView = () => {},
  isAdding = false,
}) {
  const title = product.title ?? "بدون عنوان";
  const img = product.img || "/placeholder.png";
  const priceRaw = product.price ?? 0;

  const priceFormatted = useMemo(() => {
    try {
      const num = Number(priceRaw || 0);
      if (Number.isNaN(num)) return String(priceRaw);
      return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(num);
    } catch {
      return String(priceRaw);
    }
  }, [priceRaw]);

  return (
    <article className="bg-black rounded-2xl shadow-xl overflow-hidden relative w-full max-w-sm mx-auto group transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">

      {/* تصویر محصول بزرگ */}
      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-t-2xl border-b border-white/10 bg-black/5">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized
        />

        {/* دکمه‌ها - هاور شونده از پایین */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/70 backdrop-blur-md flex justify-between items-center gap-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => handleAddToCart(product)}
            type="button"
            className="flex-1 py-2 bg-[#FFB81C] text-black font-semibold rounded-lg shadow hover:brightness-110 transition-all text-sm"
          >
            {isAdding ? "در حال اضافه شدن..." : "افزودن به سبد"}
          </button>
          <button
            onClick={() => openQuickView(product)}
            type="button"
            className="px-3 py-2 bg-white/10 text-[#FFB81C] rounded-lg hover:bg-white/20 transition-colors text-sm"
          >
            مشاهده
          </button>
        </div>
      </div>

      {/* عنوان و قیمت */}
      <div className="px-4 py-3 flex flex-col justify-between gap-2 bg-black">
        <h3
          className="font-semibold text-[#FFB81C] truncate"
          title={title}
          style={{ fontSize: "1rem", lineHeight: 1.3 }}
        >
          {title}
        </h3>
        <p className="font-medium text-[#FFB81C] text-lg">
          {priceFormatted} تومان
        </p>
      </div>
    </article>
  );
}
