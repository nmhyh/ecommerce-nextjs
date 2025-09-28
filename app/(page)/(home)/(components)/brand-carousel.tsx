"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface BrandCarouselProps {
  logos: string[];
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({ logos }) => {
  const brandSwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 30 },
      1024: { slidesPerView: 6, spaceBetween: 40 },
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.brands-swiper-button-next',
      prevEl: '.brands-swiper-button-prev',
    }
  };

  return (
    <section id="brands" className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
            Discover <span className="text-primary">Our Brands</span>
          </h2>
          <p className="my-4 text-lg text-gray-600">Explore the top brands we feature in our store</p>
        </div>

        <div className="relative">
          <Swiper
            {...brandSwiperOptions}
            className="brands-swiper-slider"
            modules={[Autoplay]}
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="h-24 p-4 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-full w-full max-h-16 max-w-[80%]">
                    <Image
                      src={logo}
                      alt={`Brand Logo ${index + 1}`}
                      fill
                      sizes="20vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
