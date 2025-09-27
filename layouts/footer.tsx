import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-line">
      {/* Top part */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap -mx-4">
          {/* Menu 1 */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul>
              <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Women</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Men</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Shoes</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Accessories</Link></li>
            </ul>
          </div>

          {/* Menu 2 */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul>
              <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
              {/*<li><Link href="/product" className="hover:text-primary">Product</Link></li>
              <li><Link href="/checkout" className="hover:text-primary">Checkout</Link></li>
              <li><Link href="/404" className="hover:text-primary">404</Link></li>*/}
            </ul>
          </div>

          {/* Menu 3 */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul>
              <li><Link href="/cart" className="hover:text-primary">Cart</Link></li>
              {/*<li><Link href="/register" className="hover:text-primary">Registration</Link></li>*/}
              <li><Link href="/login" className="hover:text-primary">Login</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul>
              {[
                { name: "Facebook", icon: "facebook.svg" },
                { name: "Twitter", icon: "twitter.svg" },
                { name: "Instagram", icon: "instagram.svg" },
                { name: "Pinterest", icon: "pinterest.svg" },
                { name: "YouTube", icon: "youtube.svg" },
              ].map((item) => (
                <li key={item.name} className="flex items-center mb-2">
                  <Image
                    src={`/images/social_icons/${item.icon}`}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="transition-transform transform hover:scale-110 mr-2"
                  />
                  <Link href="#" className="hover:text-primary">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full sm:w-2/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>
              <Image
                src="/images/template-logo.png"
                alt="Logo"
                width={180}
                height={60}
                className="mb-4 h-[60px] w-auto"
              />
            </p>
            <p>123 Street Name, Paris, France</p>
            <p className="text-xl font-bold my-4">Phone: (123) 456-7890</p>
            <a href="mailto:info@company.com" className="underline">Email: info@company.com</a>
          </div>
        </div>
      </div>

      {/* Bottom part */}
      <div className="py-6 border-t border-gray-line">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          {/* Copyright */}
          <div className="w-full lg:w-3/4 text-center lg:text-left mb-4 lg:mb-0">
            <p className="mb-2 font-bold">&copy; 2024 Your Company. All rights reserved.</p>
            <ul className="flex justify-center lg:justify-start space-x-4 mb-4 lg:mb-0">
              <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
            <p className="text-sm mt-4">
              Your shop&apos;s description goes here. This is a brief introduction to your shop and what you offer.
            </p>
          </div>

          {/* Payment Icons */}
          <div className="w-full lg:w-1/4 text-center lg:text-right">
            <Image src="/images/social_icons/paypal.svg" alt="PayPal" width={32} height={32} className="inline-block mr-2" />
            <Image src="/images/social_icons/stripe.svg" alt="Stripe" width={32} height={32} className="inline-block mr-2" />
            <Image src="/images/social_icons/visa.svg" alt="Visa" width={32} height={32} className="inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
}
