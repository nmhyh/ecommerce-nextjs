// layouts/header.tsx

"use client";

import Link from 'next/link';
import Image from 'next/image'; // Sử dụng Image của Next.js cho tối ưu hóa
import { useState, useCallback } from 'react';
import MobileMenu from "@/layouts/mobile-menu";
import { useAuth } from "@/app/auth-context";

// Dữ liệu giỏ hàng mẫu
const cartItems = [
  { id: 1, name: 'Summer black dress', quantity: 1, price: 25.00, image: '/images/single-product/1.jpg' },
  { id: 2, name: 'Black suit', quantity: 1, price: 125.00, image: '/images/single-product/2.jpg' },
];

// Icon Menu (Được định nghĩa lại để sử dụng trong Next.js/TSX)
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

// Dữ liệu cho Dropdown Menu
const menDropdownItems = [
  { name: 'Men Item 1', href: '/shop' },
  { name: 'Men Item 2', href: '/shop' },
  { name: 'Men Item 3', href: '/shop' },
];

const womenDropdownItems = [
  { name: 'Women Item 1', href: '/shop' },
  { name: 'Women Item 2', href: '/shop' },
  { name: 'Women Item 3', href: '/shop' },
];


export default function Header() {
  const { isAuthenticated, currentUser, logout } = useAuth(); // 🔥 Lấy Auth State và hàm logout

  // Quản lý trạng thái cho các Dropdown
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false); // 🔥 State cho User Dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hàm chung để xử lý hover (cho Men/Women/Cart/User)
  const handleDropdown = (setter: React.Dispatch<React.SetStateAction<boolean>>, state: boolean) =>
    () => setter(state);

  const handleLogout = useCallback(() => {
    logout();
    setIsUserOpen(false); // Đóng dropdown sau khi logout
  }, [logout]);


  return (
    <>
      <header className="bg-gray-dark sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">

          {/* Left section: Logo */}
          <Link href="/" className="flex items-center">
            {/* Sử dụng Image component của Next.js */}
            <Image
              src="/images/template-white-logo.png"
              alt="Logo"
              width={150} // Cần width và height
              height={56} // Tương đương h-14
              className="h-14 w-auto mr-4"
            />
          </Link>

          {/* Hamburger menu (for mobile) */}
          <div className="flex lg:hidden">
            <button id="hamburger" className="text-white focus:outline-none" aria-label="Toggle menu"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon />
            </button>
          </div>

          {/* Center section: Menu (Desktop) */}
          <nav className="hidden lg:flex md:flex-grow justify-center">
            <ul className="flex justify-center space-x-4 text-white">
              {/* Menu items (giữ nguyên) */}
              <li><Link href="/" className="hover:text-secondary font-semibold">Home</Link></li>
              {/*<li className="relative group" onMouseEnter={handleDropdown(setIsMenOpen, true)} onMouseLeave={handleDropdown(setIsMenOpen, false)}>
                <Link href="/shop" className="hover:text-secondary font-semibold flex items-center">Men<i className={`${isMenOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'} ml-1 text-xs`}></i></Link>
                {isMenOpen && (<ul className="absolute left-0 bg-white text-black space-y-2 mt-1 p-2 rounded shadow-lg transition-all duration-100 ease-out origin-top min-w-40">
                  {menDropdownItems.map((item, index) => (<li key={index}><Link href={item.href} className="block px-4 py-2 hover:bg-primary hover:text-white rounded">{item.name}</Link></li>))}
                </ul>)}
              </li>
              <li className="relative group" onMouseEnter={handleDropdown(setIsWomenOpen, true)} onMouseLeave={handleDropdown(setIsWomenOpen, false)}>
                <Link href="/shop" className="hover:text-secondary font-semibold flex items-center">Women<i className={`${isWomenOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'} ml-1 text-xs`}></i></Link>
                {isWomenOpen && (<ul className="absolute left-0 bg-white text-black space-y-2 mt-1 p-2 rounded shadow-lg transition-all duration-100 ease-out origin-top min-w-40">
                  {womenDropdownItems.map((item, index) => (<li key={index}><Link href={item.href} className="block px-4 py-2 hover:bg-primary hover:text-white rounded">{item.name}</Link></li>))}
                </ul>)}
              </li>*/}
              <li><Link href="/shop" className="hover:text-secondary font-semibold">Shop</Link></li>
              {/*<li><Link href="/single-product-page" className="hover:text-secondary font-semibold">Product</Link></li>*/}
              <li><Link href="/404" className="hover:text-secondary font-semibold">404 page</Link></li>
              <li><Link href="/checkout" className="hover:text-secondary font-semibold">Checkout</Link></li>
            </ul>
          </nav>

          {/* Right section: Auth, Cart, Search (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4 relative">

            {/* 🔥 LOGIC XÁC THỰC: HIỂN THỊ ĐĂNG NHẬP HOẶC DROPDOWN USER */}
            {!isAuthenticated ? (
              <>
                <Link href="/register" className="bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block">Register</Link>
                <Link href="/login" className="bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block">Login</Link>
              </>
            ) : (
              // User Dropdown khi đã đăng nhập
              <div
                className="relative group user-wrapper"
                onMouseEnter={handleDropdown(setIsUserOpen, true)}
                onMouseLeave={handleDropdown(setIsUserOpen, false)}
              >
                <button
                  className="flex items-center text-white hover:text-secondary font-semibold focus:outline-none"
                  aria-label="User menu"
                >
                  {/* Hiển thị avatar hoặc tên */}
                  <Image
                    src={currentUser?.image || '/images/default-avatar.svg'} // Sử dụng ảnh người dùng từ Context
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full h-8 w-8 object-cover mr-2 border border-white"
                  />
                  {currentUser?.username}
                </button>

                {isUserOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-white shadow-lg p-3 rounded block text-black z-10">
                    <p className="font-bold border-b pb-2 mb-2">Welcome, {currentUser?.firstName}!</p>
                    <ul className="space-y-1">
                      <li><Link href="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded">Profile</Link></li>
                      <li><Link href="/orders" className="block px-3 py-2 hover:bg-gray-100 rounded">My Orders</Link></li>
                      <li className="pt-2 border-t mt-2">
                        <button
                          onClick={handleLogout}
                          className="cursor-pointer w-full bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}


            {/* Cart Dropdown (Giữ nguyên) */}
            <div
              className="relative group cart-wrapper"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link href="/cart" className="focus:outline-none">
                {/* Sử dụng Image component của Next.js */}
                <Image src="/images/cart-shopping.svg" alt="Cart" width={24} height={24} className="h-6 w-6 group-hover:scale-120" />
              </Link>
              {isCartOpen && (
                <div className="absolute right-0 mt-1 w-80 bg-white shadow-lg p-4 rounded block z-10">
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={item.id} className={`flex items-center justify-between ${index < cartItems.length - 1 ? 'pb-4 border-b border-gray-line' : ''}`}>
                        <div className="flex items-center">
                          <Image src={item.image} alt="Product" width={48} height={48} className="h-12 w-12 object-cover rounded mr-2" />
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/cart" className="block text-center mt-4 border border-primary bg-primary hover:bg-transparent text-white hover:text-primary py-2 rounded-full font-semibold transition-colors">
                    Go to Cart
                  </Link>
                </div>
              )}
            </div>

            {/* Search Icon and Field (Giữ nguyên) */}
            <div className="relative">
              <button
                id="search-icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-secondary group focus:outline-none"
                aria-label="Toggle search"
              >
                <Image src="/images/search-icon.svg" alt="Search" width={24} height={24} className="h-6 w-6 transition-transform transform group-hover:scale-120" />
              </button>

              <div
                id="search-field"
                className={`${isSearchOpen ? 'block' : 'hidden'} absolute top-full right-0 mt-2 w-full min-w-80 bg-white shadow-lg p-2 rounded z-10`}
              >
                <input type="text" className="w-full p-2 border border-gray-300 rounded text-gray-900" placeholder="Search for products..." />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu isOpen={mobileMenuOpen} />}
    </>
  );
}