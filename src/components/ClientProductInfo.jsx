'use client';
import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/app/stores/cartStores';

export default function ClientProductInfo({ product }) {
  const [priceText, setPriceText] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setPriceText(product.price.toLocaleString('fa-IR') + ' تومان');
  }, [product.price]);

  return (
    <div className="px-4 py-3 bg-white/10 rounded-b-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm md:text-base font-semibold text-gray-100">
          {product.title}
        </h3>
        <div className="text-amber-300 font-bold text-sm md:text-base">
          {priceText}
        </div>
      </div>
      <button
        onClick={() => addItem(product, 1)}
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-3 py-2 rounded-md shadow-sm transition-colors"
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
}
