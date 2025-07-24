"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Star, Heart } from "lucide-react";
import { batchRequests } from "@/app/hooks/fetch-hook";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  // State for filters and selections
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState(null);

  // Fetch data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // batch request to fetch all request together
        const result = await batchRequests([
          {
            url: `/Categories/data.json`,
            options: {
              method: "GET",
              config: { showToast: false },
            },
          },
        ]);

        // distructure result, results are aslo arrange in order at which requess are arrange
        const [categoriesData] = result;

        // Remove duplicates based on name
        const uniqueCategories = categoriesData.data.filter(
          (category, index, self) =>
            index === self.findIndex((c) => c.name === category.name)
        );

        setCategories(uniqueCategories);
        setVendors(categoriesData.vendors || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ batchRequests]);

  // Get vendors by category
  const getVendorsByCategory = (categoryName) => {
    if (categoryName === "all") return vendors;
    const categoryProducts = products.filter(
      (p) => p.categoryId === categoryName || p.category === categoryName
    );
    const vendorIds = [
      ...new Set(categoryProducts.map((p) => p.vendorId || p.vendor)),
    ];
    return vendors.filter(
      (v) => vendorIds.includes(v.id) || vendorIds.includes(v.businessName)
    );
  };

  // Toggle favorite
  const toggleFavoriteVendor = (vendorId) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(vendorId)) {
      newFavorites.delete(vendorId);
    } else {
      newFavorites.add(vendorId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <header>
        <div className="relative overflow-hidden bg-gradient-to-r from-[#00b1a5] via-[#00b1a5] to-[#a3d900] py-16 sm:py-24">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Categories
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover products from all our categories and vendors
            </p>
          </div>

          <div className="absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 bg-[#c6d90d]/30 rounded-full blur-xl"></div>
          </div>
          <div
            className="absolute bottom-20 right-10 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-24 h-24 bg-[#a3d900]/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories View */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">All Categories</h2>
          {categories ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-center">
              {categories.map((category) => (
                <div
                  key={category.id || category.name}
                  onClick={() => {
                    setSelectedCategory(category.id || category.name);
                  }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-[#a3d900]"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                      {category.icon || "🏷️"}
                    </div>
                    <h3 className="font-semibold text-black mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description || "Explore this category"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b1a5] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading categories...</p>
              </div>
            </div>
          ) : error ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg font-medium">{error}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Vendors View */}
        {viewMode === "vendors" && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">
              Vendors{" "}
              {selectedCategory !== "all" &&
                `in ${categories.find((c) => c.id === selectedCategory)?.name}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVendorsByCategory(selectedCategory).map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => {
                    setSelectedVendor(vendor.id);
                    setViewMode("products");
                  }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-[#a3d900]"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-[#00b1a5] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {(vendor.businessName || vendor.name).charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-lg">
                          {vendor.businessName || vendor.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {vendor.description ||
                            "Quality products and services"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">
                          {vendor.ratingAverage || "4.5"} (
                          {vendor.ratingCount || "0"} reviews)
                        </span>
                      </div>
                      <div className="bg-[#c6d90d] text-black text-xs px-3 py-1 rounded-full font-medium">
                        {
                          products.filter(
                            (p) =>
                              p.vendorId === vendor.id ||
                              p.vendor === vendor.businessName
                          ).length
                        }{" "}
                        products
                      </div>
                    </div>

                    {vendor.verified && (
                      <div className="mt-3 flex items-center space-x-1 text-[#00b1a5]">
                        <span className="text-sm">✓</span>
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
