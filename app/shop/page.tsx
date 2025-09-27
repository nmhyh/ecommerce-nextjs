"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks";
import { Product } from "@/services/models";

const ITEMS_PER_PAGE = 12;
const sortOptions = [
  { value: 'latest', label: 'Sort by Latest' },
  { value: 'popular', label: 'Sort by Popularity' },
  { value: 'az', label: 'Sort by A-Z' },
];

export default function ShopPage () {
  const { products: productsOrigin, loading, error } = useProducts();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>('latest');
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  useEffect(() => {
    setTotalProducts(productsOrigin.length);
    setCategories([...new Set(productsOrigin.map((p: any) => p.category))]);
    setBrands([...new Set(productsOrigin.map((p: any) => p.brand))]);
    setProducts(productsOrigin.slice(0, ITEMS_PER_PAGE));
  }, [productsOrigin]);

  const handleSort = (
    option: string,
    currentPage: number,
    brandFilter: string[] = [],
    categoriesFilter: string[] = []
  ) => {
    let sortedProducts: Product[] = [];
    option = option || 'latest';
    if (option === "latest") {
      sortedProducts = productsOrigin;
    } else if (option === "popular") {
      sortedProducts = productsOrigin.reverse();
    } else if (option === "az") {
      sortedProducts = [...productsOrigin].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
    if (brandFilter.length > 0) {
      sortedProducts = sortedProducts.filter((p) => brandFilter.includes(p.brand));
    }
    if (categoriesFilter.length > 0) {
      sortedProducts = sortedProducts.filter((p) => categoriesFilter.includes(p.category));
    }
    setTotalProducts(sortedProducts.length);
    if (currentPage) {
      sortedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }
    setProducts(sortedProducts);
    setCurrentPage(currentPage);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading shop...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-bold">Error: {error}</div>;
  }

  return (<>
    <section id="shop">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex mt-5 md:mt-0 space-x-4">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  handleSort(e.target.value, 1, brandFilter, categoriesFilter);
                }}
                className="block appearance-none w-full bg-white border hover:border-primary px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2">
                <Image width={32} height={38} id="arrow-down" className="h-4 w-4" src="/images/filter-down-arrow.svg"
                     alt="filter arrow" />
                <Image width={32} height={38} id="arrow-up" className="h-4 w-4 hidden" src="/images/filter-up-arrow.svg"
                     alt="filter arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden text-center mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="bg-primary text-white py-2 px-4 rounded-full focus:outline-none"
          >
            {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div id="filters" className={`w-full md:w-1/4 p-4 ${isMobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
            <div className="mb-6 pb-8 border-b border-gray-line">
              <h3 className="text-lg font-semibold mb-6">Category</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (category && <label key={category + index} className="flex items-center">
                  <input value={category} type="checkbox"
                         onChange={() => {
                           let updated: string[];
                           if (categoriesFilter.includes(category)) {
                             // bỏ chọn
                             updated = categoriesFilter.filter((c) => c !== category);
                           } else {
                             // thêm chọn
                             updated = [...categoriesFilter, category];
                           }
                           setCategoriesFilter(updated);
                           handleSort(sortOption, 1, brandFilter, updated); // gọi handleSort với các category đã chọn
                         }}
                         className="form-checkbox custom-checkbox" />
                  <span className="ml-2 first-letter:uppercase">{category}</span>
                </label>))}
              </div>
            </div>
            <div className="mb-6 pb-8 border-b border-gray-line">
              <h3 className="text-lg font-semibold mb-6">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand, index) => (
                  brand && <label key={brand + index} className="flex items-center">
                    <input value={brand}
                           checked={brandFilter.includes(brand)}
                           onChange={() => {
                             let updated: string[];
                             if (brandFilter.includes(brand)) {
                               // bỏ chọn
                               updated = brandFilter.filter((c) => c !== brand);
                             } else {
                               // thêm chọn
                               updated = [...brandFilter, brand];
                             }
                             setBrandFilter(updated);
                             handleSort(sortOption, 1, updated, categoriesFilter); // gọi handleSort với các category đã chọn
                           }}
                           type="checkbox" className="form-checkbox custom-checkbox" />
                    <span className="ml-2">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4 p-4">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product}/>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Product not found</p>
            )}
            <div className="flex justify-center mt-8">
              <nav aria-label="Page navigation">
                <ul className="inline-flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .map(page => (
                      <li key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            handleSort(sortOption, page, brandFilter, categoriesFilter);
                          }}
                          className="cursor-pointer"
                      >
                        <span className={
                             currentPage === page
                               ? 'bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full'
                               : 'w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white'
                           }>{page}</span>
                      </li>
                    ))
                  }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="shop-category-description" className="py-8">
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shirts Category</h2>
          <p className="mb-4">
            Discover our wide range of shirts, perfect for any occasion. Whether you're looking for something
            casual
            or formal, we have the perfect shirt for you. Our collection includes a variety of styles, colors,
            and
            sizes to suit everyone's taste.
          </p>
          <p>
            Browse through our selection and find your new favorite shirt today. All our shirts are made from
            high-quality materials and are designed to provide both comfort and style. Shop now and elevate your
            wardrobe with our premium shirts.
          </p>
        </div>
      </div>
    </section>
  </>)
}