"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      id="404-page"
      className="bg-white py-16 flex items-center justify-center min-h-screen"
    >
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* content - start */}
          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <h1 className="text-4xl font-bold text-primary mb-5">
              404 - Page Not Found
            </h1>
            <p className="text-gray-600 mb-5">
              The page you are looking for might have been removed, renamed, or
              is temporarily unavailable.
            </p>
            <Link
              href="/"
              className="bg-primary hover:bg-transparent border border-transparent hover:border-primary text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block transition"
            >
              Go back
            </Link>
          </div>
          {/* content - end */}

          {/* image - start */}
          <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
            <Image
              src="/images/404.jpg"
              alt="404 illustration"
              fill
              className="object-cover"
            />
          </div>
          {/* image - end */}
        </div>
      </div>
    </section>
  );
}
