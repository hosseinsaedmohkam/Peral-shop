'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// /////داده‌های اسلاید
const slides = [
  { id: 1, img: '/w1.webp', title: 'عیار طلا چیست؟' },
  { id: 2, img: '/w2.webp', title: 'راهنمای انتخاب انگشتر مردانه' },
  { id: 3, img: '/w3.webp', title: 'فرق طلای سفید و زرد' },
  { id: 4, img: '/w1.webp', title: 'سنگ های متولید هر ماه' },
  { id: 5, img: '/w2.webp', title: 'راهنمای انتخاب انگشتر مردانه' }
];

/////// متن‌های مودال بر اساس عنوان
const DETAILS = {
  'عیار طلا چیست؟': `عیار طلا نشان‌دهندهٔ میزان خلوص طلا در آلیاژ است. به‌عنوان مثال 18K یعنی 75% طلا و 25% فلزات دیگر.
این اطلاعات برای خریداران بسیار مهم است چون روی ارزش، رنگ، سختی و نگهداری طلا تأثیر می‌گذارد.
برای مثال طلای 24 عیار تقریباً خالص است اما نرم‌تر است و برای قطعات ظریف کمتر مناسب است؛ درحالی‌که 14 یا 18 عیار ترکیبی مناسب‌تری از استحکام و زیبایی ارائه می‌دهد.
نکات نگهداری، تشخیص عیار و روش‌های تست (اسید، دستگاه XRF یا بررسی نشان مشخصه) را همیشه مدنظر داشته باشید.`,

  'راهنمای انتخاب انگشتر مردانه': `انتخاب انگشتر مردانه به چند عامل کلیدی بستگی دارد: اندازه و راحتی، سبک زندگی، نوع فلز و در نهایت طراحی.
انگشترهای با پهنای بیشتر جلوه‌ی مردانه‌تری دارند و فلزاتی مثل تیتانیوم، استیل ضدزنگ و طلای 14/18 عیار رایج‌اند.
اگر سنگی انتخاب می‌کنید، از سختی و دوام آن اطمینان حاصل کنید (برای مثال الماس و یاقوت سختی بالایی دارند).
در زمان خرید، اندازه‌گیری دقیق انگشت و در نظر گرفتن تورم روزانه نیز مهم است. نگهداری، تمیزکاری و سرویس دوره‌ای را فراموش نکنید.`,

  'فرق طلای سفید و زرد': `طلای سفید در اصل آلیاژی از طلاست که با فلزات سفیدرنگ ترکیب شده و معمولاً با روکش رودیوم برای سفیدتر و براق‌تر شدن پوشانده می‌شود.
طلای زرد رنگ گرم و سنتی دارد و بدون روکش براق است. تفاوت اصلی کاربردی در ظاهر، نگهداری و دوام روکش‌هاست:
طلای سفید ممکن است با گذشت زمان نیاز به روکش رودیوم داشته باشد تا رنگ و براقی حفظ شود؛
در مقابل طلای زرد نیاز به این‌گونه روکش ندارد ولی رنگ سنتی‌اش همیشه ثابت است.`,

  'سنگ های متولید هر ماه': `هر ماه یک یا چند سنگ تولد (birthstone) برای نمادگرایی و تزئینات وجود دارد. برای مثال:
ژانویه — گرنت، فوریه — آمتیست، مارس — آکوامارین، آوریل — الماس، مه — زمرد، و غیره.
این سنگ‌ها در فرهنگ‌ها معانی متفاوتی دارند و انتخاب آنها می‌تواند نمایانگر شخصیت، خوش‌شانسی یا سلیقه باشد.
قبل از خرید سنگ، از اصالت و برش مناسب آن اطمینان حاصل کنید و در صورت نیاز گواهان معتبر بخواهید.`
};

// /////کارت هر اسلاید
function HeroCard({ slide, onClick }) {
  return (
    <div
      className="relative w-full rounded-[20px] overflow-hidden shadow-lg cursor-pointer group"
      onClick={() => onClick(slide)}
    >
      {/* تصویر */}
      <div className="w-full h-[370px] relative overflow-hidden rounded-t-[20px]">
        <Image
          src={slide.img}
          alt={slide.title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          className="rounded-t-[20px]"
        />

        {/* سه نقطه وسط عکس (ظاهر با هاور، انیمیشن از CSS خارجی یا global) */}
        <div className="absolute inset-0 flex items-center justify-center space-x-3 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="dot w-3 h-3 bg-white rounded-full opacity-0 transform translate-y-2"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* عنوان زیر عکس */}
      <div className="bg-black/80 h-[76px] px-4 flex items-center justify-center text-center rounded-b-[20px]">
        <h2 className="text-sm md:text-base font-bold text-yellow-400">{slide.title}</h2>
      </div>
    </div>
  );
}

// /////مودال (نمایش جزئیات، بسته شدن با Esc یا کلیک روی بک‌دراپ)
function Modal({ slide, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!slide) return null;

  const detailText = slide.detail ?? DETAILS[slide.title] ?? `در این بخش توضیحاتی دربارهٔ "${slide.title}" نمایش داده می‌شود.`;

  return (
    <div
      className="fixed inset-0 bg-black/92 backdrop-blur-sm flex items-center justify-center z-50"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-[94%] md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-3/4 max-h-[94vh] overflow-y-auto
                   rounded-[20px] bg-white/5 backdrop-blur-2xl border border-amber-200/20
                   shadow-[0_30px_60px_rgba(0,0,0,0.7)] p-6 md:p-10 transform transition-all duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label={slide.title}
        style={{ animation: 'modalIn 260ms ease-out' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* تصویر داخل مودال (contain برای نمایش کامل) */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 w-full h-64 md:h-[480px] relative rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>

          {/* متن و دکمه‌ها */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#B8860B] mb-4">{slide.title}</h3>
              <div className="text-white/90 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {detailText}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-black font-semibold rounded-full shadow hover:scale-[1.02] transition"
              >
                مطالعه بیشتر
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ///////////////////////////کامپوننت اصلی Section6//////////////////////////////

export default function Section6() {
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);

  useEffect(() => {
    setMounted(true); // //جلوگیری از مشکلات SSR/Hydration
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto py-14 md:py-20  px-4 relative">
      {/* عنوان و توضیح بالای اسلایدر */}
      <div className="mb-8 text-right">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">مقالات جدید پیرل</h2>
        <p className="text-white/90 mt-2 text-lg">برای تغییر این متن بر روی دکمه ویرایش کلیک کنید.</p>
      </div>

      {/* اسلایدر */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={18}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="group">
              <HeroCard slide={slide} onClick={setActiveSlide} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* مودال */}
      <Modal slide={activeSlide} onClose={() => setActiveSlide(null)} />
    </div>
  );
}
