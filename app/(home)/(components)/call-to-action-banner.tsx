"use client";

import React from 'react';
import Link from 'next/link';

const CallToActionBanner: React.FC = () => {
  return (
    <section id="banner" className="relative my-16 px-4">
      <div className="container mx-auto py-20 rounded-xl relative bg-cover bg-center overflow-hidden"
           style={{ backgroundImage: "url('/images/banner1.jpg')" }}>

        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>

        <div className="relative flex flex-col items-center justify-center h-full text-center text-white py-10 md:py-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Welcome to Our Shop</h2>
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-4">
            <Link href="/shop" className="bg-primary hover:bg-transparent text-white hover:text-white border border-transparent hover:border-white font-semibold px-5 py-2.5 rounded-full inline-block mb-2 transition-colors">Shop Now</Link>
            <Link href="/shop" className="bg-primary hover:bg-transparent text-white hover:text-white border border-transparent hover:border-white font-semibold px-5 py-2.5 rounded-full inline-block mb-2 transition-colors">New Arrivals</Link>
            <Link href="/shop" className="bg-primary hover:bg-transparent text-white hover:text-white border border-transparent hover:border-white font-semibold px-5 py-2.5 rounded-full inline-block mb-2 transition-colors">Sale</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
