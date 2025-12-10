'use client';
import React, { useState } from "react";
import { Box, Divider, Slider, Button, Chip } from "@mui/material";

export default function ShopSidebar({ topOffset = 8, width = 340 }) {
  const [filters, setFilters] = useState({
    special: false,
    inStock: false,
    brand: null,
    colors: {},
    price: [0, 10000],
  });

  const brands = [
    { id: "dior", name: "Dior", count: 10 },
    { id: "zara", name: "Zara", count: 14 },
  ];

  const colors = [
    { id: "titanium", name: "تیتانیوم", color: "#7d7d7d", count: 4 },
    { id: "gold", name: "طلایی", color: "#d4af37", count: 8 },
    { id: "copper", name: "مسی", color: "#b87333", count: 6 },
    { id: "silver", name: "نقره‌ای", color: "#c0c0c0", count: 6 },
  ];

  return (
    <Box sx={{ width }} className="text-right">
      {/* این div بیرونی حتماً باید marginTop بگیره و هیچ mx یا padding بیرونی نداشته باشد */}
      <div style={{ marginTop: `${topOffset}px` }} className="p-5 rounded-xl ">
        {/* وضعیت */}
        <div className="mb-6">
          <h4 className="text-base font-semibold mb-3">فیلتر بر اساس وضعیت</h4>
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-sm">
              <span>فروش ویژه</span>
              <input type="checkbox" className="w-4 h-4 accent-amber-500"
                checked={filters.special}
                onChange={() => setFilters(p => ({ ...p, special: !p.special }))}
              />
            </label>

            <label className="flex items-center justify-between text-sm">
              <span>موجود در انبار</span>
              <input type="checkbox" className="w-4 h-4 accent-amber-500"
                checked={filters.inStock}
                onChange={() => setFilters(p => ({ ...p, inStock: !p.inStock }))}
              />
            </label>
          </div>
        </div>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} className="my-4" />

        {/* برند */}
        <div className="mb-6">
          <h4 className="text-base font-semibold mb-3">فیلتر بر اساس برند</h4>
          <div className="flex flex-col gap-2">
            {brands.map(b => (
              <button key={b.id}
                onClick={() => setFilters(p => ({ ...p, brand: p.brand === b.id ? null : b.id }))}
                className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm transition ${
                  filters.brand === b.id ? "bg-[#FFB81C] text-black" : "bg-white/10 text-white"
                }`}
              >
                <span>{b.name}</span>
                <Chip label={b.count} size="small" sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white", height: 22 }} />
              </button>
            ))}
          </div>
        </div>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} className="my-4" />

        {/* رنگ */}
        <div className="mb-6">
          <h4 className="text-base font-semibold mb-3">فیلتر بر اساس رنگ</h4>
          <div className="flex flex-col gap-2">
            {colors.map(c => {
              const active = Boolean(filters.colors[c.id]);
              return (
                <button key={c.id}
                  onClick={() => setFilters(p => ({ ...p, colors: { ...p.colors, [c.id]: !active } }))}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm transition ${active ? "bg-[#FFB81C] text-black" : "bg-white/10 text-white"}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: c.color, borderColor: "rgba(255,255,255,0.2)" }} />
                    {c.name}
                  </span>
                  <Chip label={c.count} size="small" sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white", height: 22 }} />
                </button>
              );
            })}
          </div>
        </div>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} className="my-4" />

        {/* قیمت */}
        <div className="mb-6">
          <h4 className="text-base font-semibold mb-3">فیلتر بر اساس قیمت</h4>
          <Slider value={filters.price} onChange={(e, v) => setFilters(p => ({ ...p, price: v }))} min={0} max={10000} valueLabelDisplay="auto" sx={{ color: "#FFB81C" }} />
          <div className="flex justify-between text-sm text-white/60 mt-2">
            <span>{filters.price[0].toLocaleString()}</span>
            <span>{filters.price[1].toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outlined" fullWidth onClick={() => setFilters({ special: false, inStock: false, brand: null, colors: {}, price: [0,10000] })} sx={{ color: "white", borderColor: "rgba(255,255,255,0.12)", textTransform: "none" }}>
            پاکسازی
          </Button>

          <Button variant="contained" fullWidth onClick={() => console.log("apply filters:", filters)} sx={{ backgroundColor: "#FFB81C", color: "black", textTransform: "none", "&:hover": { backgroundColor: "#FFB81C" } }}>
            نمایش نتایج
          </Button>
        </div>
      </div>
    </Box>
  );
}
