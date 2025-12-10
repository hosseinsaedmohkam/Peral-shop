'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const slides = [
  { src: '/انشگتر طرح پریل.webp', title: 'انگشتر طرح پریل', subtitle: 'اطلاعات بیشتر', href: '#' },
  { src: '/دستبند طرح پریل.webp', title: 'دستبند طرح پریل', subtitle: 'اطلاعات بیشتر', href: '#' },
  { src: '/گوشواره طرح پریل.webp', title: 'گوشواره طرح پریل', subtitle: 'اطلاعات بیشتر', href: '#' },
  { src: '/گردنبند طرح پریل.webp', title: 'گردنبند طرح پریل', subtitle: 'اطلاعات بیشتر', href: '#' },
  { src: '/دستبند طرح پریل.webp', title: 'دستبند طرح پریل', subtitle: 'اطلاعات بیشتر', href: '#' },
  { src: '/گردنبند طرح پریل.webp', title: 'گردنبند طرح پریل', subtitle: 'اطلاعات بیشتر', href: '#' },
];

export default function Slider() {
  return (
    <div className="w-full max-w-7xl mx-auto py-20">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={16}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>

            {/* کارت جمع و جور بدون هاور */}
            <div className="flex flex-col w-full max-w-[320px] overflow-hidden shadow-md cursor-pointer">

              {/* عکس با لبه‌های چپ و راست منحنی و بالا/پایین صاف */}
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-[440px] object-cover rounded-l-[25px] rounded-r-[25px] rounded-t-none rounded-b-none"
              />

              {/* باکس متن شفاف */}
              <div className="p-4 text-center bg-black/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-yellow-400 mb-1">{slide.title}</h3>
                <a
                  href={slide.href}
                  className="text-sm text-white underline cursor-pointer hover:text-yellow-300 transition"
                >
                  {slide.subtitle}
                </a>
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
