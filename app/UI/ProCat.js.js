// app/page.js
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation"; // Note: next/navigation for app directory
import CategoryLists from "./categoriesList";
import ProductLists from "./productsLists";
import { batchRequests } from "../hooks/fetch-hook";

export default function CategoriesAndProducts() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const ANGOLA_RATE = 850;

  // Fetch products data from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await batchRequests([
          {
            url: "/Categories/data.json",
          },
          {
            url:"/Products/products.json"
          }
        ]);
        const [categories, productsByCategory] = response;

        setCategories(categories.data || []);
        setProductsByCategory(productsByCategory.data.productsByCategory || {});

        // Create allProducts array from all categories
        const allProductsArray = Object.values(
          productsByCategory.data.productsByCategory || {}
        ).flat();
        setAllProducts(allProductsArray);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAllProducts = () => {
    router.push("/Pages/Products/");
  };

  const loadingSpinner = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b1a5]"></div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">Error loading products: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={loadingSpinner}>
        <CategoryLists
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
      </Suspense>
      <Suspense fallback={loadingSpinner}>
        <ProductLists
          activeCategory={activeCategory}
          productsByCategory={productsByCategory}
          allProducts={allProducts}
          handleViewAllProducts={handleViewAllProducts}
          router={router}
        />
      </Suspense>
      
    </div>
  );
}
