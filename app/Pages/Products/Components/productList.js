import React from "react";
import { Star, Eye, Heart } from "lucide-react";
import Button from "@/app/Components/UI/Button";

const ProductList = ({
  product,
  handleViewProduct,
  toggleFavorite,
  favorites,
}) => {
  const {
    id,
    name,
    image,
    discount = 0,
    vendor,
    rating,
    price = 0,
    inStock = true,
    badge,
  } = product;
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "AOA",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b1a5]/20 transition-all duration-300">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={image || "/placeholder.jpg"}
          alt={name || "Product image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badge && typeof badge === "string" && (
            <span className="px-2 py-1 text-[10px] font-bold text-white rounded-full bg-[#00b1a5]">
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 text-[10px] font-bold text-white rounded-full bg-red-500">
              -{discount}%
            </span>
          )}
        </div>

        <div
          onClick={() => handleViewProduct(id)}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <div className="bg-[#00b1a5] hover:bg-[#008a80] text-white p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-200">
            <Eye className="w-3 h-3" />
          </div>
        </div>

        <div className="absolute bottom-2 right-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
            className={`${
              favorites.has(id)
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
            icon={Heart}
            text=""
          />
        </div>
      </div>

      <div className="p-2 sm:p-3">
        <h3 className="font-semibold text-xs sm:text-sm text-black mb-1 line-clamp-2 leading-tight">
          {name}
        </h3>

        {vendor && (
          <p className="text-xs text-gray-500 mb-1 truncate">
            {typeof vendor === "string"
              ? vendor
              : vendor?.businessName || "Unknown Vendor"}
          </p>
        )}

        {rating > 0 && (
          <div className="flex items-center mb-2">
            <Star className="w-3 h-3 text-[#c6d90d] fill-current" />
            <span className="text-xs text-gray-600 ml-1">{rating}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-sm text-black">
            {formatPrice(price * (discount ? 1 - discount / 100 : 1))}
          </span>

          {discount > 0 && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <Button
          onClick={() => handleViewProduct(id)}
          className="w-full bg-[#00b1a5] hover:bg-[#008a80]"
          text="View"
        />
      </div>
    </div>
  );
};

export default ProductList;
