"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

export default function Login({ onSuccess } = {}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validate = () => {
    if (!email || !password || (!isLogin && !confirmPassword)) {
      toast.error("لطفاً همه فیلدها را تکمیل کنید.");
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      //////// شبیه‌سازی درخواست به سرور — جایگزین با API خودت کن
      await new Promise((r) => setTimeout(r, 700));

      toast.success(isLogin ? "ورود موفق!" : "ثبت‌نام موفق!");
      reset();

      /////// اگر والد callback داد، فراخوانی کن (Navbar مودال را می‌بندد)
      if (typeof onSuccess === "function") {
        //////// تاخیر کوتاه برای UX بهتر
        setTimeout(() => onSuccess(), 200);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-0">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center">
        {/* تصویری/توضیحی (نمایش روی دسکتاپ) */}
        <div className="hidden md:flex flex-col justify-center px-6 py-8 bg-amber-400 from-amber-500 to-amber-400 rounded-xl">
          <h3 className="text-2xl font-extrabold text-black mb-2">خوش آمدی</h3>
          <p className="text-sm text-black/80">
            تجربه‌ای امن و سریع از خرید آنلاین. وارد شوید یا حساب جدید بسازید.
          </p>
        </div>

        {/* فرم */}
        <div className="col-span-1 px-6 py-6 bg-neutral-900 rounded-xl shadow-inner">
          <h2 className="text-xl font-bold text-amber-400 mb-3">
            {isLogin ? "ورود به حساب" : "ایجاد حساب جدید"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <label className="block text-sm text-white/80">
              <span className="text-xs text-white/70">ایمیل</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                aria-label="email"
              />
            </label>

            <label className="block text-sm text-white/80 relative">
              <span className="text-xs text-white/70">رمز عبور</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10"
                required
                aria-label="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-[38px] right-3 text-white/60 hover:text-amber-300"
                aria-label={showPassword ? "پنهان کردن پسورد" : "نمایش پسورد"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </label>

            {!isLogin && (
              <label className="block text-sm text-white/80">
                <span className="text-xs text-white/70">تکرار رمز عبور</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 w-full px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                  aria-label="confirm-password"
                />
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                loading
                  ? "bg-amber-300/70 text-black cursor-wait"
                  : "bg-amber-400 text-black hover:bg-amber-500"
              }`}
              aria-busy={loading}
            >
              {loading ? (isLogin ? "در حال ورود..." : "در حال ثبت‌نام...") : isLogin ? "ورود" : "ثبت‌نام"}
            </button>
          </form>

          <div className="mt-4 text-sm text-white/60 flex items-center justify-between">
            <button
              onClick={() => setIsLogin((s) => !s)}
              className="text-amber-300 font-semibold hover:underline"
              type="button"
            >
              {isLogin ? "حساب ندارید؟ ثبت‌نام" : "قبلاً عضو شده‌اید؟ ورود"}
            </button>

            <Link href="/" className="text-white/50 hover:text-white text-xs">
              شرایط و قوانین
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
