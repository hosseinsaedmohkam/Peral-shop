'use client';

import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { useCartStore } from "@/stores/cartStores";

export default function ProductList({ openQuickView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingSet, setAddingSet] = useState(() => new Set());

  const addItem = useCartStore((s) => s.addItem);

  ////// فایل JSON محلی
  const apiUrl = "/data/products.json";

  ///////////// ---- fetch محصولات ----
  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        if (!Array.isArray(data)) {
          if (!mounted) return;
          setProducts([]);
          setError("دادهٔ دریافت‌شده غیرمنتظره است.");
        } else if (mounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(String(err.message || "خطا در دریافت اطلاعات"));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // ---- افزودن به سبد خرید با جلوگیری از چند کلیک سریع ----
  const handleAddToCart = useCallback(
    (product, qty = 1) => {
      const id = String(product.id ?? product._id ?? `${Date.now()}`);
      if (addingSet.has(id)) return;

      setAddingSet((prev) => new Set(prev).add(id));

      setTimeout(() => {
        setAddingSet((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 700);

      ////////// نرمال‌سازی محصول
      const normalized = {
        id,
        title: product.title ?? "بدون نام",
        price: Number(product.price ?? 0),
        img: product.img ?? "/placeholder.png",
      };

      addItem(normalized, qty);
    },
    [addItem, addingSet]
  );

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error)
    return (
      <div className="text-center mt-10">
        <p className="text-red-600">خطا: {error}</p>
        <button
          onClick={() => setError("")}
          className="mt-3 px-4 py-2 bg-yellow-400 text-black rounded"
        >
          تلاش مجدد
        </button>
      </div>
    );
  if (!products.length) return <p className="text-center mt-10">محصولی یافت نشد.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCart={() => handleAddToCart(product, 1)}
          openQuickView={() => openQuickView(product)}
          isAdding={addingSet.has(String(product.id ?? product._id ?? ""))}
        />
      ))}
    </div>
  );
}
