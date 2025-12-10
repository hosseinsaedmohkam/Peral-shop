import React from 'react'
import Link from 'next/link'
import { FaGem, FaStar, FaHeart, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function About() {
  const team = [
    {
      name: 'شکیبا قاسمی',
      role: 'متخصص سنگ‌های قیمتی',
      img: '/1.jpg',
      experience: '۷ سال تجربه',
      specialty: 'شناخت سنگ‌های قیمتی و نیمه‌قیمتی',
      description:
        'مسئول انتخاب بهترین سنگ‌ها با بالاترین درجه شفافیت و کیفیت؛ دقت در رنگ و برش جزو اولویت‌های اوست.',
      socials: { instagram: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'حسین ساعدمحکم',
      role: 'طراح جواهرات',
      img: '/khodaam.jpg',
      experience: '۵ سال تجربه',
      specialty: 'طراحی انگشتر و گردنبند دست‌ساز',
      description:
        'طراح اصلی مجموعه که با تمرکز بر جزئیات هنری و سبک‌های روز، آثاری ماندگار خلق می‌کند.',
      socials: { instagram: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'علی نهاوندی',
      role: 'مدیر کیفیت',
      img: '/ali.png',
      experience: '۱۰ سال تجربه',
      specialty: 'کنترل کیفیت و تولید نهایی',
      description:
        'ناظر کیفیت نهایی محصولات؛ تضمین می‌کند هر قطعه مطابق استانداردهای ما تولید و عرضه شود.',
      socials: { instagram: '#', linkedin: '#', twitter: '#' }
    }
  ]

  return (
    <div className="text-white min-h-screen w-full  px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* عنوان */}
        <h1 className="text-5xl font-extrabold text-right mb-6">درباره ما</h1>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-10 justify-start">
          <Link href="/" className="hover:text-amber-400">خانه</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-amber-400">درباره ما</Link>
        </div>

        {/* معرفی */}
        <p className="text-gray-300 text-right leading-7 mb-12 w-full">
          فروشگاه تخصصی جواهرات ما ارائه‌دهندهٔ انگشترها و گردنبندهای دست‌ساز با سنگ‌های اصیل و طراحی‌های
          منحصر به فرد است. هر قطعه با دقت و عشق ساخته می‌شود تا لحظات خاص زندگی شما را درخشان کند.
        </p>

        {/* ویژگی‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <FaGem className="text-amber-400 text-4xl mb-4" />
            <h2 className="text-xl font-bold mb-2">جواهرات اصیل</h2>
            <p className="text-gray-300 text-sm">سنگ‌ها و فلزات با کیفیت که ارزش و دوام بالایی دارند.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <FaStar className="text-amber-400 text-4xl mb-4" />
            <h2 className="text-xl font-bold mb-2">طراحی منحصر به فرد</h2>
            <p className="text-gray-300 text-sm">آثاری با امضای اختصاصی که شما را از دیگران متمایز می‌کند.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <FaHeart className="text-amber-400 text-4xl mb-4" />
            <h2 className="text-xl font-bold mb-2">خدمات مشتریان ویژه</h2>
            <p className="text-gray-300 text-sm">پشتیبانی و خدمات پس از فروش برای رضایت کامل شما.</p>
          </div>
        </div>

{/* تیم — تصاویر مینیمال و دایره‌ای */}
<div className="mb-12">
  <h2 className="text-3xl font-bold text-right mb-6">تیم طراحی ما</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {team.map((member) => (
      <div
        key={member.name}
        className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:bg-gray-800"
      >
        {/* دایره عکس */}
        <div className="flex justify-center mb-4">
          <div className="
            w-32 h-32 md:w-36 md:h-36
            rounded-full overflow-hidden bg-gray-700
            flex items-center justify-center
          ">
            <img
              src={member.img}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover scale-100"
            />
          </div>
        </div>

        {/* اطلاعات */}
        <div className="text-right">
          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
          <p className="text-gray-400 text-sm mb-3">{member.role}</p>

          <div className="flex flex-col gap-1 text-gray-300 text-sm">
            <p><span className="font-medium">تجربه:</span> {member.experience}</p>
            <p><span className="font-medium">تخصص:</span> {member.specialty}</p>
            <p className="text-gray-400 text-xs mt-2 leading-6">{member.description}</p>
          </div>

          {/* آیکون‌ها */}
          <div className="mt-4 flex items-center justify-start gap-4">
            <a href={member.socials.instagram} className="opacity-70 hover:opacity-100 transition-opacity">
              <FaInstagram className="text-amber-400 text-lg" />
            </a>
            <a href={member.socials.linkedin} className="opacity-70 hover:opacity-100 transition-opacity">
              <FaLinkedin className="text-gray-300 text-lg" />
            </a>
            <a href={member.socials.twitter} className="opacity-70 hover:opacity-100 transition-opacity">
              <FaTwitter className="text-gray-300 text-lg" />
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/contact" className="inline-block bg-amber-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors">
            تماس با ما
          </Link>
        </div>
      </div>
    </div>
  )
}
