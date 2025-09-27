"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  { title: "Latest Shirt Trends for 2024", category: "Fashion Trends", text: "Explore the hottest shirt trends of 2024. From bold prints to classic styles, stay ahead of the fashion curve with our expert insights.", image: "/images/fashion-trends.jpg" },
  { title: "How to Style Your Shirt for Any Occasion", category: "Styling Tips", text: "Learn how to style your shirt for different occasions, whether it's a casual day out or a formal event. Get tips from fashion experts.", image: "/images/stylisng-tips.jpg" },
  { title: "Real Stories from Our Happy Customers", category: "Customer Stories", text: "Read about the experiences of our customers. Discover how our shirts have made a difference in their lives and their personal style.", image: "/images/customer-stories.jpg" },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12 lg:mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Discover <span className="text-primary">Our</span> Blog
        </h2>
        <p className="my-4 text-lg text-gray-600">Stay updated with the latest trends, tips, and stories in the world of fashion</p>
      </div>
      <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={index} className="flex flex-col p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="relative h-56 w-full mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-xl"
                />
              </div>
              <h2 className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">{post.category}</h2>
              <h1 className="mb-4 text-xl md:text-2xl font-semibold leading-none tracking-tight text-gray-dark hover:text-primary transition-colors">
                <Link href="#">{post.title}</Link>
              </h1>
              <p className="flex-grow text-base leading-relaxed text-gray-600 mb-6">{post.text}</p>
              <div className="mt-auto">
                <Link href="#" className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full inline-block transition-colors">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
