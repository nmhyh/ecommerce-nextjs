"use client";

import React, { useEffect, useState } from 'react';
import MainSlider, { MainSlide } from "@/app/(page)/(home)/(components)/main-slider";
import CategoryBanners, { CategoryBanner } from "@/app/(page)/(home)/(components)/category-banners";
import { Product } from "@/services/models";
import ProductSection from "@/app/(page)/(home)/(components)/product-section";
import BrandCarousel from "@/app/(page)/(home)/(components)/brand-carousel";
import CallToActionBanner from "@/app/(page)/(home)/(components)/call-to-action-banner";
import BlogSection from "@/app/(page)/(home)/(components)/blog-section";
import SubscribeSection from "@/app/(page)/(home)/(components)/subscribe-section";
import { useProducts } from "@/app/hooks";

// ----------------------------------------------------------------------
// MOCK DATA (Dữ liệu mẫu)
// ----------------------------------------------------------------------

const mainSlides: MainSlide[] = [
  {
    id: 1,
    image: '/images/main-slider/5.jpg',
    title: 'Women',
    subtitle: 'Experience the best in sportswear with our latest collection.',
    buttonText: 'Shop now',
    buttonStyle: 'primary'
  },
  {
    id: 2,
    image: '/images/main-slider/2.png',
    title: 'Men',
    subtitle: 'Discover the latest trends in Men`s sportswear and casual fashion.',
    buttonText: 'Shop now',
    buttonStyle: 'white'
  },
  {
    id: 3,
    image: '/images/main-slider/4.jpg',
    title: 'Accessories',
    subtitle: 'Elevate your style with our latest sportswear collection.',
    buttonText: 'Shop now',
    buttonStyle: 'primary'
  },
];

const categoryBanners: CategoryBanner[] = [
  { image: '/images/cat-image1.jpg', title: 'Men', href: '/shop' },
  { image: '/images/cat-image4.jpg', title: 'Women', href: '/shop' },
  { image: '/images/cat-image5.jpg', title: 'Accessories', href: '/shop' },
];

const brandLogos = [
  '/images/brands/html.svg',
  '/images/brands/js.svg',
  '/images/brands/laravel.svg',
  '/images/brands/php.svg',
  '/images/brands/react.svg',
  '/images/brands/tailwind.svg',
  '/images/brands/typescript.svg',
];

// ----------------------------------------------------------------------
// HOME PAGE COMPONENT
// ----------------------------------------------------------------------

export default function HomePage() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const { products, loading } = useProducts();

  useEffect(() => {
    setPopularProducts(products.slice(0, 4));
    setLatestProducts(products.slice(-4));
  }, [products]);

  return (
    <main>
      {/* 1. Main Slider Section */}
      <MainSlider slides={mainSlides} />

      {/* 2. Product Banner Section (Categories) */}
      <CategoryBanners banners={categoryBanners} />

      {!loading && (
        <>
          {/* 3. Popular Product Section */}
          <ProductSection title="Popular Products" products={popularProducts} bgColor="bg-gray-50" />

          {/* 4. Latest Product Section */}
          <ProductSection title="Latest Products" products={latestProducts} bgColor="bg-white" />
        </>
      )}

      {/* 5. Brand Section (Swiper Carousel) */}
      <BrandCarousel logos={brandLogos} />

      {/* 6. Banner Section (Call to Action) */}
      <CallToActionBanner />

      {/* 7. Blog Section */}
      <BlogSection />

      {/* 8. Subscribe Section */}
      <SubscribeSection />
    </main>
  );
}
