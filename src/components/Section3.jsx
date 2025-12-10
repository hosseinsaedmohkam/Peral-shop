import React from "react";
import Image from "next/image";
import Link from "next/link";  

export default function Section3() {
  const sectionCls = "relative text-white min-h-screen flex items-center py-20 bg-[#1a1a1a]";
  const containerCls = "container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-center gap-10";
  const imageWrapperCls = "md:w-1/2 w-full flex items-center justify-center relative h-96 md:h-[500px]";
  const textWrapperCls = "md:w-1/2 w-full text-right space-y-4 md:space-y-6 pr-4 md:pr-24";
  const titleSmallCls = "text-2xl md:text-3xl text-white font-semibold";
  const titleBigCls = "text-3xl sm:text-4xl md:text-4xl font-extrabold text-yellow-400 leading-snug";
  const descCls = "text-white w-11/12 font-light sm:text-base md:text-lg leading-relaxed";
  const buttonBase = "px-12 py-3 font-semibold border-2 border-amber-400 text-amber-200 bg-[#1c1b1b]";
  const buttonGlow = "shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] transition-all duration-300 ease-in-out cursor-pointer";

  return (
    <section className={sectionCls} >
      <div className={containerCls}>

        {/* سمت تصویر */}
        <div className={imageWrapperCls}>
          <Image
            src="/imgi_23_Group-49.webp"
            alt="main"
            width={700}
            height={700}
            className="mx-auto object-contain"
            priority
          />
        </div>

        {/* سمت متن */}
        <div className={textWrapperCls} dir="rtl">
          <p className={titleSmallCls}>درباره ما</p>

          <h1 className={titleBigCls}>
            با 12 سال سابقه کار در زمینه
            <br />
            جواهرات مدرن در کنار شماییم.
          </h1>

          <p className={descCls}>
            ما برآنیم که با ارائه بهترین محصولات به مشتریان گرامی خود، پاسخ اعتماد شما بزرگواران را به بهترین صورت داده باشیم. و از شما عالیجنابان و مشتریان گرامی که در واقع مالکان حقیقی این برند هستید.
          </p>

          {/* دکمه لینک‌دار */}
          <div className="mt-6 flex justify-start">
            <Link href="/about">
              <button className={`${buttonBase} ${buttonGlow}`}>
                درباره ما
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
