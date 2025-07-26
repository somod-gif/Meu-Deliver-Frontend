// app/Pages/Products/page.js
"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, Grid, List, Zap } from "lucide-react";
import { batchRequests, get } from "../../hooks/fetch-hook";
import Header from "@/app/Components/UI/header";
import ProductList from "./Components/productList";
import LoadingErrorHandler from "@/app/Components/UI/LoadingErrorHandler";

// Wrap the main component with Suspense
export default function ModernProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ModernProductsPageContent />
    </Suspense>
  );
}

function ModernProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await batchRequests([
        {
          url: `/Products/data.json`,
          options: { method: "GET", config: { showToast: false } },
        },
        {
          url: "/Categories/data.json",
          options: { method: "GET", config: { showToast: false } },
        },
      ]);

      const [productsResponse, categoriesResponse] = response;
      setCategories(categoriesResponse?.data || []);
      setProducts(productsResponse?.data || []);
      setAllProducts(productsResponse?.data || []);
    } catch (err) {
      console.error("Error fetching initial data:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFilteredProducts = useCallback(
    async ({ category, sort, search }) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (category && category !== "All") params.append("category", category);
        if (sort && sort !== "All") params.append("sort", sort);
        if (search) params.append("search", search);

        if (category && activeCategory !== "All") {
          params.append("category", category);
        }

        const response = await get(`/Products/data?${params.toString()}`, {
          method: "GET",
          config: { showToast: false },
        });

        setProducts(response[0]?.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch filtered products", err);
        setError("Error fetching filtered products.");
      } finally {
        setLoading(false);
      }
    },
    [activeCategory]
  );

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleCategoryChange = useCallback(
    (categoryId, categoryName) => {
      setActiveCategory(categoryName);
      fetchFilteredProducts({
        category: categoryId,
        sort: sortBy,
        search: searchTerm,
      });
    },
    [fetchFilteredProducts, sortBy, searchTerm]
  );

  const handleSortChange = useCallback((e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
  }, []);

  const handleFilterClick = () => {
    fetchFilteredProducts({
      category: activeCategory,
      sort: sortBy,
      search: searchTerm,
    });
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleViewProduct = (productId) => {
    router.push(`/Pages/Products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header
        heading="Discover Amazing"
        subHeading="Products"
        paragraph="Curated collection of premium products that blend innovation, sustainability, and style"
      >
        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border-0 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
            />
          </div>
        </div>
      </Header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              <Zap className="w-6 h-6 text-[#00b1a5] mr-2" />
              Shop by Category
            </h2>
            <div className="flex overflow-x-auto pb-2 -mx-2 sm:mx-0 sm:flex-wrap sm:gap-3">
              <button
                onClick={() => handleCategoryChange("", "All")}
                className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shrink-0 mx-2 sm:mx-0
                  ${
                    activeCategory === "All"
                      ? "bg-gradient-to-r from-[#00b1a5] to-[#a3d900] text-white shadow-lg shadow-[#00b1a5]/30"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                <span className="text-lg mr-2">🌟</span>
                <span>All</span>
              </button>

              {categories.map((category) => (
                <button
                  key={category.id || category.name}
                  onClick={() =>
                    handleCategoryChange(category.id, category.name)
                  }
                  className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shrink-0 mx-2 sm:mx-0
                    ${
                      activeCategory === category.name
                        ? "bg-gradient-to-r from-[#00b1a5] to-[#a3d900] text-white shadow-lg shadow-[#00b1a5]/30"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  <span className="text-lg mr-2">{category.icon || "📦"}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#00b1a5] text-white" : "text-gray-600 hover:text-[#00b1a5]"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#00b1a5] text-white" : "text-gray-600 hover:text-[#00b1a5]"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                {products.length} product{products.length !== 1 ? "s" : ""} found
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b1a5] bg-white"
              >
                <option value="All">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <button
                onClick={handleFilterClick}
                className="flex items-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div>
            <LoadingErrorHandler loading={loading} error={error} />

            {!loading && Array.isArray(products) && products.length === 0 && (
              <p className="text-center col-span-full text-gray-500">
                No products found.
              </p>
            )}

            {Array.isArray(products) && products.length > 0 && (
              <div
                className={`grid gap-4 sm:gap-6 mt-4 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product) => (
                  <ProductList
                    key={product.id}
                    product={product}
                    handleViewProduct={handleViewProduct}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}