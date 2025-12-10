import React from 'react'
import Slider from './slider'

export default function Section2() {
  return (
    <main className="py-14 ">
      
      {/* باکس متن با فاصله از سمت راست */}
      <div className="pr-20"> 
        <h2 className="text-4xl font-bold text-white">
          کالکشن جدید پیرل
        </h2>

        <p className="text-lg text-white mt-4">
          طراحی زیبا و منحصر به فرد برای زیبایی شما با هر سلیقه ایی که دارید.
        </p>
      </div>

      <div className="mt-2">
        <Slider />
      </div>
    </main>
  )
}
