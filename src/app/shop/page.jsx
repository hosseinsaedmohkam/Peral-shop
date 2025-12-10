"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useCartStore } from "../stores/cartStores";

import ShopSidebar from "@/components/ShopSidebar";
import ShopControls from "@/components/ShopControls";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import CartSidebar from "@/components/CartSidebar";
import { FiFilter } from "react-icons/fi";



export default function ShopPage() {
  ////// داده‌ها و وضعیت بارگذاری
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  ////// کنترل‌های نمایش
  const [viewCount, setViewCount] = useState(12); // چند محصول نمایش داده شود
  const [columns, setColumns] = useState(3); // تعداد ستون‌ها در گرید
  const [sortBy, setSortBy] = useState("جدیدترین"); // مرتب‌سازی

  ////// QuickView (پیش‌نمایش سریع)
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewLoading, setQuickViewLoading] = useState(false);
  const [quickViewImages, setQuickViewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  /////// وضعیت افزودن به سبد (برای افکت)
  const [addingId, setAddingId] = useState(0);

  // حالت نمایش فیلتر در موبایل
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* ------------------ Zustand (سبد خرید) ------------------ */
  const items = useCartStore((s) => (Array.isArray(s.items) ? s.items : []));
  const totalItems = useMemo(() => items.reduce((acc, it) => acc + (it.qty || 0), 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((acc, it) => acc + (it.qty || 0) * (it.price || 0), 0),
    [items]
  );
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const cartOpen = useCartStore((s) => s.cartOpen);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  /* ------------------ بارگذاری محصولات (fetch) ------------------ */
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/data/products.json");

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("فرمت داده غیرمنتظره است");

        if (mounted) setProducts(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err?.message || "خطا در دریافت محصولات");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    // cleanup در صورت unmount شدن
    return () => {
      mounted = false;
    };
  }, []);

  /* ------------------ مرتب‌سازی و محدود کردن تعداد نمایش ------------------ */
  const sortedProducts = useMemo(() => {
    const copy = [...products];

    if (sortBy === "گرانترین") {
      copy.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "ارزانترین") {
      copy.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else {
      // پیش‌فرض: جدیدترین
      copy.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    // فقط تا viewCount محصول برگردانده می‌شود
    return copy.slice(0, viewCount);
  }, [products, viewCount, sortBy]);

  /* ------------------ کلاس‌های ستون گرید ------------------ */
  const columnsClass = useMemo(() => {
    switch (columns) {
      case 2:
        return "grid-cols-2 md:grid-cols-2 lg:grid-cols-2";
      case 4:
        return "grid-cols-2 md:grid-cols-4 lg:grid-cols-4";
      case 3:
      default:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
    }
  }, [columns]);

  /* ------------------ افزودن به سبد خرید (با افکت) ------------------ */
  const handleAddToCart = (product) => {
    setAddingId(product.id);

    // افکت کوچک قبل از اضافه شدن (مثلاً انیمیشن)
    setTimeout(() => {
      addItem(product, 1);
      setAddingId(0);
      setCartOpen(true); // باز کردن سایدبار سبد
      toast.success(`${product.title} به سبد اضافه شد.`, { duration: 2000 });
    }, 500);
  };

  /* ------------------ QuickView helpers ------------------ */
  const buildGalleryForProduct = (product) => [product?.img || "/placeholder.png"];

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewLoading(true);
    setSelectedImageIndex(0);
    setQuickViewImages(buildGalleryForProduct(product));
    setTimeout(() => setQuickViewLoading(false), 250); // شبیه‌سازی لود
  };

  const closeQuickView = () => {
    setQuickViewLoading(false);
    setTimeout(() => setQuickViewProduct(null), 100);
  };

  /* ------------------ حالات لود و خطا ------------------ */
  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!products.length) return <p className="text-center mt-10">محصولی یافت نشد.</p>;

  /* ------------------ رندر صفحه ------------------ */
  return (
    <div className="min-h-screen bg-neutral-900 text-amber-50">
      <Toaster position="top-right" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* هدر صفحه: عنوان و breadcrumbs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="mr-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">فروشگاه</h1>
            <div className="text-sm text-white/60 mt-2 flex gap-2 items-center">
              <Link href="/" className="hover:text-[#FFB81C]">
                خانه
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#FFB81C]">
                فروشگاه
              </Link>
            </div>
          </div>

          {/* کنترل‌های بالای صفحه: فیلتر موبایل و دکمه سبد */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="sm:hidden p-2 bg-black/70 rounded-md border border-[#FFB81C] flex items-center gap-2"
              aria-label="باز کردن فیلترها"
            >
              <FiFilter size={20} />
              فیلترها
            </button>

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCartOpen(true)}
              role="button"
              aria-label="مشاهده سبد خرید"
            >
              <div className="bg-black/80 px-3 py-2 rounded-full flex items-center gap-2 border border-[#FFB81C]">
                <span className="text-[#FFB81C] font-semibold">{totalItems}</span>
                <span className="text-white/80 hidden sm:inline">سبد خرید</span>
              </div>
            </div>
          </div>
        </div>

        {/* لایه اصلی: سایدبار + محصولات */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* سایدبار دسکتاپ */}
          <aside className="hidden lg:block lg:col-span-1">
            <ShopSidebar topOffset={8} width={340} />
          </aside>

          {/* بخش محصولات */}
          <main className="lg:col-span-3 flex flex-col gap-6">
            <ShopControls
              viewCount={viewCount}
              setViewCount={setViewCount}
              columns={columns}
              setColumns={setColumns}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className={`grid gap-6 ${columnsClass}`}>
              {sortedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  handleAddToCart={handleAddToCart}
                  openQuickView={openQuickView}
                  addingId={addingId}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* فیلتر موبایل (پاپ‌آپ) */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 w-3/4 max-w-xs bg-black text-white p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#FFB81C]">فیلترها</h3>
              <button onClick={() => setFiltersOpen(false)} className="p-2 text-white">
                بستن
              </button>
            </div>
            <ShopSidebar topOffset={0} width={340} />
          </div>
        </div>
      )}

      {/* QuickView modal (در صورت باز بودن محصول) */}
      {quickViewProduct && (
        <QuickViewModal
          quickViewProduct={quickViewProduct}
          quickViewLoading={quickViewLoading}
          quickViewImages={quickViewImages}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
          closeQuickView={closeQuickView}
          handleAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        items={items}
        removeItem={removeItem}
        totalPrice={totalPrice}
      />
    </div>
  );
}
