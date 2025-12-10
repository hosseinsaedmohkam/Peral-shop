'use client';
import React from "react";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";

export default function CartSidebar({ cartOpen, setCartOpen, items, removeItem, totalPrice }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-black/90 z-50 shadow-xl transform transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* هدر سبد خرید */}
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h3 className="text-lg font-semibold text-[#FFB81C]">سبد خرید</h3>
        <button onClick={() => setCartOpen(false)} className="p-2">
          <X size={20} />
        </button>
      </div>

      {/* لیست محصولات */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-white/60 text-sm">سبد خرید خالی است</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-2 bg-white/5 rounded"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={50}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <p className="text-sm text-[#FFB81C]">{item.title}</p>
                  <p className="text-xs text-white/70">
                    {item.qty} × {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 text-white/80 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* مجموع و دکمه پرداخت */}
      <div className="p-4 border-t border-white/20">
        <p className="text-white font-semibold mb-2">
          مجموع: {totalPrice.toLocaleString()} تومان
        </p>
        <button className="w-full bg-[#FFB81C] text-black py-2 rounded font-semibold">
          ادامه به پرداخت
        </button>
      </div>
    </div>
  );
}
