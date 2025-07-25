"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { batchRequests } from "@/app/hooks/fetch-hook";
import LoadingErrorHandler from "@/app/Components/UI/LoadingErrorHandler";
import Header from "@/app/Components/UI/header";
import VendorCard from "./Components/vendorList";
import CategoriesList from "./Components/categoriesList";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await batchRequests([
          {
            url: `/Categories/data.json`,
            options: { method: "GET", config: { showToast: false } },
          },
          {
            url: `/Vendor/data.json`,
            options: { method: "GET", config: { showToast: false } },
          },
        ]);

        const [categoriesData, vendorsData] = result;
        const uniqueCategories = categoriesData.data.filter(
          (category, index, self) =>
            index === self.findIndex((c) => c.name === category.name)
        );

        setCategories(uniqueCategories);
        setVendors(vendorsData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const viewVendorProductsHandler = (id) => {
    console.log(id);
    router.push(`/Pages/Vendor/Products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        heading="Explore By Categories"
        subHeading="Diverse Categories & Trusted Suppliers"
        paragraph="Browse through a wide range of product categories curated from top-rated vendors across the region — your gateway to reliable services, specialty goods, and everyday essentials."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            All Categories
          </h2>

          <LoadingErrorHandler loading={loading} error={error} />

          <div className="overflow-x-auto scrollbar-hide p-3">
            <div className="flex gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
              {categories.map((category) => (
                <CategoriesList
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.name}
                  setSelectedCategory={setSelectedCategory}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black mb-6">
            {selectedCategory !== "All" &&
              `${categories.find((c) => c.id === selectedCategory)?.name} in`}{" "}
            Suppliers
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                viewVendorProductsHandler={() =>
                  viewVendorProductsHandler(vendor.id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
