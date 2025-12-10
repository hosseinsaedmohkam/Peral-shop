import React from "react";
import Image from "next/image";

const testimonials = [
  { id: 1, img: "/imgi_19_Ellipse-12-1.png", title: "لیلا شاملو", text: "این یک متن نمونه فارسی برای نمایش دیدگاه مشتریان است. هدف از این متن پر کردن فضا و نمایش نحوه نمایش محتواست." },
  { id: 2, img: "/imgi_19_Ellipse-12-1.png", title: "سارا رضایی", text: "لورم ایپسوم فارسی: این متن نمونه برای بررسی ظاهر و طراحی کارت‌های نظرات مشتریان استفاده می‌شود." },
  { id: 3, img: "/imgi_19_Ellipse-12-1.png", title: "مینا موسوی", text: "نمونه متن فارسی برای تست ظاهر کارت‌ها و بررسی فاصله‌ها و چینش عناصر درون کارت‌ها." },
];

export default function Section5() {
  return (
    <section className=" text-white py-18">
      <div className="max-w-7xl mx-auto px-4">
        {/* عنوان بخش */}
        <div className="text-start mb-20">
          <h2 className="text-4xl font-bold">نظرات مشتریان</h2>
          <p className="text-gray-400 text-sm mt-2">برای تغییر این متن روی دکمه ویرایش کلیک کنید.</p>
        </div>

        {/* کارت‌ها */}
        <div className="flex justify-center gap-8 flex-wrap md:flex-nowrap">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative bg-black rounded-t-full overflow-hidden flex flex-col items-center justify-center p-6 border-2 border-amber-200 shadow-2xl"
              style={{ width: "400px", height: "280px", minWidth: "300px" }}
            >
              {/* خط زیر نیم‌دایره */}
              <div className="absolute bottom-0 w-full h-1 bg-amber-200"></div>

              {/* تصویر */}
              <Image
                src={t.img}
                alt={t.title}
                width={100}
                height={100}
                className="rounded-full mb-4 z-10"
              />

              {/* متن اصلی */}
              <p className="text-white mt-2 text-sm z-10 text-center">{t.text}</p>

              {/* اسم کاربر زیر متن */}
              <h3 className="font-bold text-xl text-white mt-3 z-10">{t.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
