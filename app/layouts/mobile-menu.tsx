"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/app/providers/auth-context";
import { useCart } from "@/app/hooks";
import { useRouter } from "next/navigation";

// Dữ liệu cho các mục menu
interface MenuItem {
  name: string;
  href: string;
  dropdown: { name: string; href: string }[] | null;
}

const menuItems: MenuItem[] = [
  { name: 'Home', href: '/', dropdown: null },
  /*{
    name: 'Men',
    href: '/shop',
    dropdown: [
      { name: 'Shop Men', href: '/shop' },
      { name: 'Men item 1', href: '/single-product-page' },
      { name: 'Men item 2', href: '/single-product-page' },
      { name: 'Men item 3', href: '/single-product-page' },
    ]
  },
  {
    name: 'Women',
    href: '/shop',
    dropdown: [
      { name: 'Shop Women', href: '/shop' },
      { name: 'Women item 1', href: '/single-product-page' },
      { name: 'Women item 2', href: '/single-product-page' },
      { name: 'Women item 3', href: '/single-product-page' },
    ]
  },*/
  { name: 'Shop', href: '/shop', dropdown: null },
  /*{ name: 'Product', href: '/single-product-page', dropdown: null },*/
  { name: '404 page', href: '/404', dropdown: null },
  { name: 'Checkout', href: '/checkout', dropdown: null },
];

export default function MobileMenu({
  isOpen,
  onClose,
  buttonRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}) {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { cart } = useCart(1);
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleLogout = useCallback(() => {
    logout();
    setOpenDropdown(null);
    onClose();
    router.push('/');
  }, [logout, onClose]);

  // 👇 Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Nếu click vào menu hoặc vào button -> bỏ qua
      if (
        (menuRef.current && menuRef.current.contains(target)) ||
        (buttonRef?.current && buttonRef.current.contains(target))
      ) {
        return;
      }

      // Ngược lại -> đóng menu
      onClose();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const menuClass = isOpen ? "translate-x-0" : "translate-x-full";

  return (
    <nav
      ref={menuRef}
      id="mobile-menu-placeholder"
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-dark text-white z-40 
                        transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto ${menuClass} lg:hidden`}
    >
      <div className="flex flex-col h-full">
        {/* 1. Menu Chính */}
        <ul className="w-full text-center">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative border-b border-gray-700 last:border-b-0"
            >
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => handleDropdownToggle(item.name.toLowerCase())}
                    className="hover:text-secondary font-bold block py-3 w-full flex justify-between items-center px-4 focus:outline-none"
                  >
                    <span>{item.name}</span>
                    <span>
                      <i
                        className={`${
                          openDropdown === item.name.toLowerCase()
                            ? "fas fa-chevron-up"
                            : "fas fa-chevron-down"
                        } text-xs ml-2`}
                      ></i>
                    </span>
                  </button>

                  {openDropdown === item.name.toLowerCase() && (
                    <ul className="mobile-dropdown-menu space-y-1 bg-gray-800 p-2 rounded-lg">
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            onClick={onClose} // 🔥 Đóng menu khi click link
                            className="hover:text-secondary font-medium block py-2 px-4 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose} // 🔥 Đóng menu khi click link
                  className="hover:text-secondary font-bold block py-3 px-4 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* 2. Authentication / User Section */}
        <div className="flex flex-col space-y-4 pt-6 border-t border-gray-700">
          {isAuthenticated && currentUser ? (
            <div className="w-full">
              <button
                onClick={() => handleDropdownToggle("user")}
                className="bg-primary text-white border border-primary hover:bg-transparent hover:text-primary font-semibold px-4 py-3 rounded-full w-full text-center flex items-center justify-center space-x-2 transition-colors focus:outline-none"
              >
                <Image
                  src={currentUser.image || "/images/default-avatar.svg"}
                  alt="Avatar"
                  width={24}
                  height={24}
                  className="rounded-full h-6 w-6 object-cover border border-white"
                />
                <span>Hello, {currentUser.firstName}</span>
                <span>
                  <i
                    className={`${
                      openDropdown === "user"
                        ? "fas fa-chevron-up"
                        : "fas fa-chevron-down"
                    } text-xs ml-2`}
                  ></i>
                </span>
              </button>

              {openDropdown === "user" && (
                <ul className="mt-2 space-y-1 bg-gray-800 p-3 rounded-lg">
                  <li>
                    <Link
                      href="/my-profile"
                      onClick={onClose} // 🔥 Đóng menu khi click link
                      className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="pt-2 border-t border-gray-600 mt-2">
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose} // 🔥 Đóng menu khi click link
              className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-3 rounded-full inline-block w-full text-center transition-colors"
            >
              Login
            </Link>
          )}

          {/* Cart Button */}
          {isAuthenticated ? (
            <Link
              href="/cart"
              onClick={onClose} // 🔥 Đóng menu khi click link
              className="bg-transparent text-white hover:text-secondary border border-gray-500 font-semibold px-4 py-3 rounded-full inline-block w-full text-center transition-colors"
            >
              {cart && cart.products.length > 0 ? (
                <>
                  Cart - <span>{cart.products.length}</span> items
                </>
              ) : (
                <>Your cart is empty</>
              )}
            </Link>
          ) : null}
        </div>

        {/* 3. Search field */}
        <div className="top-full right-0 mt-2 w-full shadow-lg p-2 rounded">
          <input
            type="text"
            className="w-full p-2 border rounded placeholder-gray-500 text-gray-800"
            placeholder="Search for products..."
          />
        </div>
      </div>
    </nav>
  );
}
