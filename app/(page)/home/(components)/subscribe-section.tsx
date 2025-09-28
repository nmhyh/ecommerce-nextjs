"use client";

import React from 'react';

const SubscribeSection: React.FC = () => {
  return (
    <section id="subscribe" className="py-6 lg:py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center p-4 sm:p-0 ">
          <div className="mb-8">
            <h2 className="text-center text-2xl font-bold sm:text-3xl lg:text-4xl text-gray-800">
              Join our newsletter and <span className="text-primary">get $50 discount</span> for your first order
            </h2>
          </div>
          <div className="flex flex-col items-center w-full max-w-lg">
            <form className="flex w-full gap-2">
              <input
                placeholder="Enter your email address"
                type="email"
                className="w-full flex-1 rounded-full px-5 py-3 border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-shadow"
              />
              <button
                type="submit"
                className="bg-primary border border-primary hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
