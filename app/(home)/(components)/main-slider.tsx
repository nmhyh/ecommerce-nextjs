"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface MainSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonStyle: 'primary' | 'white';
}

interface MainSliderProps {
  slides: MainSlide[];
}

const MainSlider: React.FC<MainSliderProps> = ({ slides }) => {
  return (
    <section id="product-slider" className="relative">
      <Swiper
        className="main-slider"
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[60vh] md:h-screen w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                priority={slide.id === 1}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay */}
              <div className="swiper-slide-content absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-3xl md:text-7xl font-extrabold text-white mb-2 md:mb-6 leading-tight">
                  {slide.title}
                </h2>
                <p className="mb-8 text-white text-base md:text-2xl max-w-xl">
                  {slide.subtitle.replace(/<br>/g, '\n')} {/* Handle <br> as newline if necessary */}
                </p>
                <Link
                  href="/shop"
                  className={`font-semibold px-6 py-3 rounded-full inline-block transition duration-300 
                                        ${slide.buttonStyle === 'primary' ?
                    'bg-primary hover:bg-transparent text-white border border-primary hover:border-white' :
                    'bg-white hover:bg-transparent text-gray-900 border border-white hover:text-white'
                  }`
                  }
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MainSlider;
