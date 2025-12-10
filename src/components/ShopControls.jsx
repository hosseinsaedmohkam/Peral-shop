'use client';
import React, { useState, useRef, useEffect } from "react";

export default function ShopControls({ viewCount, setViewCount, columns, setColumns, sortBy, setSortBy }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef(null);

  /////// بستن پنل موبایل هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  /////// مقادیر ثابت برای نمایش و ستون‌ها
  const viewOptions = [9, 12, 18, 24];
  const columnOptions = [2, 3, 4];
  const sortOptions = [
    { value: "گرانترین", label: "گران‌ترین" },
    { value: "ارزانترین", label: "ارزان‌ترین" },
    { value: "محبوبیت", label: "محبوبیت" },
    { value: "امتیاز", label: "امتیاز" },
    { value: "جدیدترین", label: "جدیدترین" },
  ];

  ////// رندر دکمه‌ها
  const renderViewButtons = () =>
    viewOptions.map((n) => (
      <button
        key={n}
        className={`px-3 py-1 rounded transition-colors ${viewCount === n ? "bg-[#FFB81C] text-black" : "bg-white/10 hover:bg-white/20"}`}
        onClick={() => setViewCount(n)}
      >
        {n}
      </button>
    ));

  const renderColumnButtons = () =>
    columnOptions.map((c) => (
      <button
        key={c}
        className={`p-1 rounded border border-white/20 flex gap-0.5 transition-all hover:border-[#FFB81C] ${columns === c ? "bg-[#FFB81C] border-[#FFB81C]" : "bg-white/10"}`}
        onClick={() => setColumns(c)}
        title={`${c} ستون`}
      >
        <div className="grid gap-0.5 w-6 h-4" style={{ gridTemplateColumns: `repeat(${c},1fr)` }}>
          {Array.from({ length: c }).map((_, i) => <div key={i} className="bg-white w-full h-full" />)}
        </div>
      </button>
    ));

  return (
    <div className="-mb-2 text-white">
      {/* دسکتاپ */}
      <div className="hidden md:flex justify-between items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <span>نمایش:</span>
          {renderViewButtons()}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>ستون‌ها:</span>
          {renderColumnButtons()}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 text-white text-sm px-2 py-1 rounded hover:bg-black"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* موبایل */}
      <div className="md:hidden">
        <button
          className="flex items-center justify-between w-full bg-white/10 px-4 py-2 rounded text-sm font-medium"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          فیلترها و مرتب‌سازی
          <span>{mobileOpen ? "✕" : "☰"}</span>
        </button>

        <div
          ref={panelRef}
          className={`fixed top-0 left-0 w-full h-full bg-black/95 z-50 p-6 overflow-y-auto transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* دکمه بستن */}
          <div className="flex justify-end mb-4">
            <button onClick={() => setMobileOpen(false)} className="text-white text-2xl">✕</button>
          </div>

          {/* نمایش */}
          <div className="flex items-center gap-2 text-sm flex-wrap mb-4">
            <span>نمایش:</span>
            {renderViewButtons()}
          </div>

          {/* ستون‌ها */}
          <div className="flex items-center gap-2 text-sm flex-wrap mb-4">
            <span>ستون‌ها:</span>
            {renderColumnButtons()}
          </div>

          {/* مرتب‌سازی */}
          <div className="flex items-center gap-2 text-sm">
            <span>مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 text-white text-sm px-2 py-1 rounded hover:bg-black"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
