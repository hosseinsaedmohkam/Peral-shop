import Link from "next/link";

export default function ContactPage() {
  return (
    // باکس بیرونی: padding رسپانسیو و حداکثر عرض مرکزی
    <div className="text-white px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto">

        {/* عنوان اصلی */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-right mb-6">
          تماس با ما
        </h1>

        {/* مسیر صفحه (Breadcrumbs) */}
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-10">
          <Link href="/" className="hover:text-amber-400">
            خانه
          </Link>
          <span>/</span>
          <Link href="/contact" className="hover:text-amber-400">
            تماس با ما
          </Link>
        </div>

        {/* عنوان دوم */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-right mb-4">
          با ما در تماس باشید
        </h2>

        {/* متن توضیحی */}
        <p className="text-gray-300 text-right leading-7 mb-8 max-w-full md:max-w-2xl">
          اگر سوال یا ابهامی درباره خرید عینک آنلاین از بزرگترین فروشگاه عینک وودمارت دارید، از طریق اطلاعات زیر یا فرم زیر با ما در تماس باشید. تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات شماست.
        </p>

        {/* فرم وسط صفحه */}
        <div className="flex justify-center mt-6">
          <form
            className="bg-[#1A1A1A] p-5 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl"
            // اگر نخواستید ارسال صفحه انجام شود: onSubmit را مدیریت کنید
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* نام */}
              <div>
                <label className="block text-gray-300 mb-2">نام</label>
                <input
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* ایمیل */}
              <div>
                <label className="block text-gray-300 mb-2">ایمیل</label>
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* شماره تماس */}
              <div>
                <label className="block text-gray-300 mb-2">شماره تماس</label>
                <input
                  type="text"
                  placeholder="شماره تماس شما"
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* موضوع پیام */}
              <div>
                <label className="block text-gray-300 mb-2">موضوع پیام</label>
                <input
                  type="text"
                  placeholder="موضوع پیام"
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* پیام */}
            <div className="mt-4">
              <label className="block text-gray-300 mb-2">پیام</label>
              <textarea
                rows="5"
                placeholder="پیام خود را بنویسید..."
                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white
                           focus:outline-none focus:border-amber-400 transition-colors resize-none"
              ></textarea>
            </div>

            {/* دکمه ارسال */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg
                         transition-colors mt-5"
            >
              ارسال پیام
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
