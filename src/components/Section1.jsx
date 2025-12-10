import React from "react";
import Image from "next/image";

export default function Section1() {
  //////////// کلاس‌ها و استایل‌ها به متغیرهای خوانا تبدیل شدند
  const sectionCls = "relative text-white min-h-screen flex items-center";
  const containerCls = "container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12";
  const textColCls = "md:w-1/2 space-y-4 md:space-y-5 pr-6 md:pr-12 text-right";
  const smallTitleCls = "text-2xl text-white";
  const bigTitleCls = "text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 leading-snug";
  const descCls = "text-white w-full font-extralight sm:text-base leading-relaxed";
  const actionsWrapCls = "flex justify-start items-center gap-6 mt-8";
  const goldButtonCls = `px-6 py-3 font-semibold border-2 border-amber-400 text-amber-200 bg-[#1c1b1b]
    shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)]
    transition-all duration-300 ease-in-out cursor-pointer`;
  const badgeWrapperCls = "w-[250px] h-[60px] rounded-full overflow-hidden";
  const imageColCls = "md:w-1/2 relative w-full h-96 md:h-[500px] flex items-center justify-center";
  const starStyle = { position: "absolute", top: "50px", right: "64px" };
  const imageInnerCls = "w-full h-full md:-mr-12 flex items-center justify-center";

  return (
    <section className={sectionCls}>
      <div className={containerCls}>

        {/* سمت متن */}
        <div className={textColCls} dir="rtl">
          <p className={smallTitleCls}>
            ما جواهرات را بر اساس زندگی شما می‌سازیم
          </p>

          <h1 className={bigTitleCls}>
            قصه خودتان را برای ما تعریف کنید
            <br />
            تا ما آن را به جواهر تبدیل کنیم.
          </h1>

          <p className={descCls}>
            ما برآنیم که با ارائه بهترین محصولات به مشتریان گرامی خود، پاسخ اعتماد شما بزرگواران را به بهترین صورت داده باشیم. و از شما عالیجنابان و مشتریان گرامی که در واقع مالکان حقیقی این برند هستید.
          </p>

          {/* دکمه + عکس */}
          <div className={actionsWrapCls}>

            {/* دکمه طلایی داخل لینک (بدون نیاز به use client) */}
            <div className="mt-6 flex justify-start">
              <a href="#section4" aria-label="مشاهده جواهرات — رفتن به بخش محصولات">
                <button className={goldButtonCls}>
                  مشاهده جواهرات
                </button>
              </a>
            </div>

            {/* عکس */}
            <div
              className={badgeWrapperCls}
              style={{ boxShadow: "0 0 10px rgba(255,215,100,0.4)" }}
            >
              <Image
                src="/imgi_3_Frame-2.png"
                alt="badge"
                width={250}
                height={50}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* سمت تصویر اصلی */}
        <div className={imageColCls}>
          <Image
            src="/imgi_5_Star-1.png"
            alt="star"
            width={40}
            height={40}
            className="absolute"
            style={starStyle}
          />

          <div className={imageInnerCls}>
            <Image
              src="/d1.webp"
              alt="main"
              width={700}
              height={700}
              className="mx-auto object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
