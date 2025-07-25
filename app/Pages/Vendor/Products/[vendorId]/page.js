"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, Grid, List } from "lucide-react";
import { batchRequests } from "@/app/hooks/fetch-hook";
import Header from "@/app/Components/UI/header";
import ProductList from "@/app/Pages/Products/Components/productList";
import LoadingErrorHandler from "@/app/Components/UI/LoadingErrorHandler";

export default function ModernProductsPage() {
  const router = useRouter();
  const { vendorId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [vendorRes, productRes] = await batchRequests([
        {
          url: `/Vendor/data.json`,
          options: { method: "GET", config: { showToast: false } },
        },
        {
          url: "/Products/data.json",
          options: { method: "GET", config: { showToast: false } },
        },
      ]);

      const vendorData = vendorRes?.data;
      const productData = productRes?.data;

      if (!Array.isArray(productData)) {
        throw new Error("Invalid product data format");
      }

      setVendor(vendorData);
      setProducts(productData);
    } catch (err) {
      console.error("Error fetching initial data:", err);
      setError("Failed to fetch Supplier products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const handleFilterClick = () => {
    console.log("Filter clicked", { sortBy, searchTerm });
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
        heading={vendor?.businessName || "Supplier Name"}
        subHeading={
          vendor?.city && vendor?.province
            ? `${vendor.city}, ${vendor.province}`
            : "Location unavailable"
        }
        paragraph={vendor?.description || "High-quality liquor supplier"}
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
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#00b1a5] text-white"
                      : "text-gray-600 hover:text-[#00b1a5]"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#00b1a5] text-white"
                      : "text-gray-600 hover:text-[#00b1a5]"
                  }`}
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

          {/* Products */}
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
  );
}
