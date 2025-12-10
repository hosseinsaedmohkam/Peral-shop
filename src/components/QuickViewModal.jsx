'use client';
import React from "react";
import Image from "next/image";

export default function QuickViewModal({
  quickViewProduct,
  quickViewLoading = false,
  quickViewImages = [],
  selectedImageIndex = 0,
  setSelectedImageIndex = () => { },
  handleAddToCart = () => { },
  closeQuickView = () => { },
}) {
  if (!quickViewProduct) return null;

  const galleryBgColors = ["#1e1e1e", "#2a2a2a", "#1f1f1f", "#262626"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={closeQuickView}
      aria-hidden={quickViewLoading ? "true" : "false"}
    >
      {/* پس‌زمینه تار و بلور */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* کانتینر مودال (کلیک روی این کانتینر نباید مودال را ببندد) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-5xl mx-auto transform transition-all duration-300
          ${quickViewLoading ? "opacity-0 scale-95 translate-y-6" : "opacity-100 scale-100 translate-y-0"}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            boxShadow: "0 20px 50px rgba(2,6,23,0.85)",
            backdropFilter: "blur(12px) saturate(120%)",
          }}
        >
          <div className="flex flex-col md:flex-row">
            {/* ---- سمت تصاویر (چپ) ---- */}
            <div
              className="md:w-1/2 p-6 flex flex-col items-center gap-4"
              /* برای اطمینان از نمایش گرادیانت از style inline استفاده می‌کنیم */
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.00))",
              }}
            >
              {/* تصویر بزرگ محصول */}
              <div
                className="w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center relative transition-transform duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
                }}
              >
                {quickViewLoading ? (
                  <div className="w-16 h-16 border-4 border-[#FFD36B] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Image
                    src={
                      quickViewImages?.[selectedImageIndex] ??
                      quickViewProduct?.img ??
                      "/placeholder.png"
                    }
                    alt={quickViewProduct?.title || "product image"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>

              {/* گالری تصاویر کوچک (اسکرول افقی) */}
              <div className="w-full flex gap-3 overflow-x-auto mt-3 pb-1">
                {quickViewImages && quickViewImages.length > 0 ? (
                  quickViewImages.map((src, idx) => {
                    const active = idx === selectedImageIndex;
                    const bg = galleryBgColors[idx % galleryBgColors.length];

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        ////////////// استفاده از flex-none تا هیچ‌وقت کوچک نشه
                        className={`flex-none w-20 h-20 rounded-lg overflow-hidden relative transition-all duration-300
                          ${active ? "ring-2 ring-[#FFD36B] scale-105 shadow-xl" : "opacity-80 hover:opacity-100"}
                        `}
                        style={{
                          backgroundColor: bg,
                        }}
                        aria-label={`نمایش تصویر ${idx + 1}`}
                      >
                        {/* parent (button) relative هست، پس Image fill درست کار می‌کنه */}
                        <Image src={src} alt={`img-${idx}`} fill className="object-cover" />
                      </button>
                    );
                  })
                ) : (
                  <div className="text-sm text-white/60">عکس دیگری موجود نیست</div>
                )}
              </div>
            </div>

            {/* ---- سمت اطلاعات محصول (راست) ---- */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-3xl font-extrabold text-white leading-tight">
                  {quickViewProduct.title}
                </h2>

                <div className="flex items-end gap-4">
                  <span className="text-2xl font-extrabold text-[#FFD36B]">
                    {quickViewProduct.price ? quickViewProduct.price.toLocaleString() : "0"} تومان
                  </span>
                  {quickViewProduct.compareAt && (
                    <span className="text-sm text-white/50 line-through">
                      {quickViewProduct.compareAt.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-sm text-white/60 leading-relaxed mt-2">
                  {quickViewProduct.description ||
                    "توضیح خلاصه محصول اینجا نمایش داده می‌شود — ویژگی‌ها و نکات مهم را بنویسید."}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleAddToCart(quickViewProduct)}
                  style={{
                    background: "linear-gradient(90deg, #FFD36B 0%, #FFB81C 100%)"
                  }}
                  className="flex-1 px-5 py-3 rounded-xl text-black font-semibold shadow-lg hover:brightness-110 transition"
                  aria-label="افزودن به سبد خرید"
                >
                  افزودن به سبد خرید
                </button>


                <button
                  onClick={closeQuickView}
                  className="px-5 py-3 rounded-xl border border-white/10 bg-white/10 text-white hover:bg-white/20 transition"
                  aria-label="بستن پنجره"
                >
                  بستن
                </button>
              </div>

              <div className="mt-4 text-xs text-white/50">
                ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان • بازگشت تا ۷ روز
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
