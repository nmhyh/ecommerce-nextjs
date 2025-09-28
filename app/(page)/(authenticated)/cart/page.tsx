"use client";

import { CartItem, ProductInCart } from "@/services/models";
import { useCart } from "@/app/hooks";
import { useAuth } from "@/app/providers/auth-context";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart: cartData, loading, error } = useCart(1);
  const { isAuthenticated } = useAuth(); // 🔥 Lấy Auth State và hàm logout
  const [cart, setCart] = useState<CartItem>();

  useEffect(() => {
    if (!cartData) return;
    setCart(cartData);
  }, [cartData]);

  // Tăng số lượng
  const handleIncrement = (productInCart: ProductInCart) => {
    setCart((prev) => {
      if (!prev) return prev;
      const updatedProducts = prev.products.map((p) =>
        p.id === productInCart.id
          ? { ...p, quantity: (p.quantity || 1) + 1 }
          : p
      );

      const totalQuantity = updatedProducts.reduce((sum, p) => sum + (p.quantity || 1), 0);
      const total = updatedProducts.reduce((sum, p) => sum + ((p.quantity || 1) * p.price), 0);

      return {
        ...prev,
        products: updatedProducts,
        total,
        totalQuantity,
      };
    });
  };

// Giảm số lượng
  const handleDecrement = (productInCart: ProductInCart) => {
    setCart((prev) => {
      if (!prev) return prev;
      const updatedProducts = prev.products.map((p) =>
        p.id === productInCart.id
          ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) }
          : p
      );

      const totalQuantity = updatedProducts.reduce((sum, p) => sum + (p.quantity || 1), 0);
      const total = updatedProducts.reduce((sum, p) => sum + ((p.quantity || 1) * p.price), 0);

      return {
        ...prev,
        products: updatedProducts,
        total,
        totalQuantity,
      };
    });
  };

  // Tính subtotal
  const subtotal = cart && cart.products ?
    cart.products.reduce((sum, p) => sum + (p.quantity || 1) * p.price, 0)
    : 0;

  const taxes = subtotal * 0.1; // giả lập 10% thuế
  const shipping = 0;

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section id="cart-page" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {isAuthenticated
          ? <>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Cart items */}
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
                  {(!cart || cart.products.length === 0) ? (
                    <p className="text-center py-10">Your cart is empty</p>
                  ) : (
                    <table className="w-full">
                      <thead>
                      <tr>
                        <th className="text-center md:text-left font-semibold">
                          Product
                        </th>
                        <th className="text-center font-semibold">Price</th>
                        <th className="text-center font-semibold">quantity</th>
                        <th className="text-center md:text-right font-semibold">
                          Total
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      {cart.products.map((product) => (
                        <tr
                          key={product.id}
                          className="pb-4 border-b border-gray-line"
                        >
                          <td className="px-1 py-4">
                            <div className="flex items-center flex-col sm:flex-row text-center sm:text-left">
                              <div className="relative w-16 h-16 md:w-24 md:h-24 sm:mr-8 mb-4 sm:mb-0 flex-shrink-0">
                                <Image
                                  src={product.thumbnail}
                                  alt={product.title}
                                  fill
                                  className="object-cover rounded-md border"
                                />
                              </div>
                              <p className="text-sm md:text-base md:font-semibold">
                                {product.title}
                              </p>
                            </div>
                          </td>
                          <td className="px-1 py-4 text-center">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-1 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleDecrement(product)}
                                className="cart-decrement border border-primary bg-primary text-white hover:bg-transparent hover:text-primary rounded-full w-10 h-10 flex items-center justify-center"
                              >
                                -
                              </button>
                              <p className="quantity text-center w-8">
                                {product.quantity || 1}
                              </p>
                              <button
                                onClick={() => handleIncrement(product)}
                                className="cart-increment border border-primary bg-primary text-white hover:bg-transparent hover:text-primary rounded-full w-10 h-10 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-1 py-4 text-right">
                            ${(
                            (product.quantity || 1) *
                            product.price
                          ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-4">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p>Taxes</p>
                    <p>${taxes.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-4 pb-4 border-b border-gray-line">
                    <p>Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">
                      ${(subtotal + taxes + shipping).toFixed(2)}
                    </p>
                  </div>
                  <a
                    href="/checkout"
                    className="bg-primary text-white border hover:border-primary hover:bg-transparent hover:text-primary py-2 px-4 rounded-full mt-4 w-full text-center block"
                  >
                    Proceed to checkout
                  </a>
                </div>
              </div>
            </div>
          </>
          : <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-gray-500">Please log in to start shopping.</p>
          </div>
        }
      </div>
    </section>
  );
}
