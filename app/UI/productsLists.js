"use client";

export default function ProductLists({
  activeCategory,
  allProducts,
  productsByCategory,
  handleViewAllProducts,
  router,
}) {
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "AOA",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black">
            {activeCategory === "All" ? "Featured Products" : activeCategory}
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            {activeCategory === "All"
              ? "Discover our most popular items"
              : `Best ${activeCategory} products`}
          </p>
        </div>
        <button
          onClick={handleViewAllProducts}
          className="flex items-center text-[#00b1a5] font-medium hover:text-[#008a80] transition-colors text-sm group"
        >
          View all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1
                   0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1
                   0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {(activeCategory === "All"
          ? allProducts
          : productsByCategory[activeCategory] || []
        ).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b1a5]/20 transition-all duration-300 group"
          >
            {/* Image Container */}
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs text-white font-medium px-2 py-1 bg-[#00b1a5] rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Quick Action Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => router.push(`/Pages/Products/${product.id}`)}
                  className="bg-[#00b1a5] hover:bg-[#008a80] text-white p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-3">
              <h3 className="font-semibold text-xs sm:text-sm text-black mb-1 line-clamp-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-1 truncate">
                {product.vendor}
              </p>

              {/* Rating and Delivery */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                {/* <span className="text-xs text-gray-500">{product.deliveryTime}</span> */}
              </div>

              {/* Price and CTA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm sm:text-base text-black">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="w-full bg-[#00b1a5] hover:bg-[#008a80] text-white py-1.5 sm:py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#00b1a5]/25 active:scale-95"
                >
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      {(activeCategory === "All"
        ? allProducts
        : productsByCategory[activeCategory] || []
      ).length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllProducts}
            className="inline-flex items-center px-6 py-3 bg-[#00b1a5] hover:bg-[#008a80] text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00b1a5]/25 active:scale-95"
          >
            View All Products
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
