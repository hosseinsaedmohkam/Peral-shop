'use client';

import React, { useState, memo } from "react";
import Image from "next/image";
import QuickViewModal from "./QuickViewModal";
import { useCartStore } from "@/app/stores/cartStores";
import productsData from "./dataPrc/products.json";

/* ---------- ProductCard: نمایش هر محصول  ---------- */
const ProductCard = memo(function ProductCard({ product, onAddToCart, onQuickView }) {
  return (
    <article
      role="article"
      aria-labelledby={`product-title-${product.id}`}
      className="group relative rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer bg-transparent"
      onClick={() => onQuickView(product)}
    >
      <figure className="relative w-full h-48 md:h-52 lg:h-56 overflow-hidden flex items-center justify-center">
        {/* پس‌زمینه سفید منحنی */}
        <div
          className="absolute top-0 w-full h-full bg-white rounded-t-[180px] z-0"
          aria-hidden="true"
        />

        {/* تصویر محصول  */}
        <Image
          src={product.img}
          alt={product.title}
          fill
          className="object-contain relative z-10"
          sizes="(max-width: 768px) 35vw, (max-width: 1200px) 30vw, 20vw"
          unoptimized
          style={{ transform: "scale(0.7)" }}
          priority={false}
        />

        {/* دکمه‌ها کنار هم (پنهان تا هاور) */}
        <div className="absolute bottom-2 right-2 flex flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            type="button"
            title={`افزودن ${product.title} به سبد خرید`}
            aria-label={`افزودن ${product.title} به سبد خرید`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, 1);
            }}
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black font-semibold px-3 py-1.5 rounded-md shadow-sm text-sm transition-colors"
          >
            افزودن به سبد
          </button>

          <button
            type="button"
            title={`مشاهده سریع ${product.title}`}
            aria-label={`مشاهده سریع ${product.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="inline-flex items-center justify-center bg-black/60 hover:bg-black/70 text-white font-medium px-3 py-1.5 rounded-md text-sm transition-colors"
          >
            مشاهده سریع
          </button>
        </div>
      </figure>

      <figcaption className="px-4 py-3 bg-white/10 rounded-b-lg flex flex-col gap-1">
        <h3
          id={`product-title-${product.id}`}
          className="text-sm md:text-base font-semibold text-gray-100 truncate"
        >
          {product.title}
        </h3>
        <div className="text-amber-300 font-bold text-sm md:text-base" aria-hidden="false">
          {product.price.toLocaleString("fa-IR")} تومان
        </div>
      </figcaption>
    </article>
  );
});

/* ---------- Section4: wrapper گرید و منطق quick view / cart ---------- */
export default function Section4() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewImages, setQuickViewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  ///////// Zustand store (افزودن به سبد)///
  const addItem = useCartStore((state) => state.addItem);

  ////// باز کردن QuickView
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewImages([product.img]);
    setSelectedImageIndex(0);
  };

   /////// بستن QuickView
  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    setQuickViewImages([]);
    setSelectedImageIndex(0);
  };

  const products = productsData || [];

  return (
    <section id="section4" className="text-white py-20" aria-labelledby="section4-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h2 id="section4-title" className="text-2xl md:text-3xl font-bold">
            محصولات منتخب
          </h2>
        </header>

        {/* گرید محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p, qty = 1) => addItem(p, qty)}
              onQuickView={(p) => handleOpenQuickView(p)}
            />
          ))}
        </div>
      </div>

      {/* QuickViewModal (در صورت نیاز باز می‌شود) */}
      <QuickViewModal
        quickViewProduct={quickViewProduct}
        quickViewImages={quickViewImages}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        handleAddToCart={(product) => addItem(product, 1)}
        closeQuickView={handleCloseQuickView}
      />
    </section>
  );
}
