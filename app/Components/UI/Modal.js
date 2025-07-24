"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90vw] h-[90vh] bg-white rounded-t-3xl shadow-lg p-6 relative animate-slideUp"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-teal-600 hover:text-teal-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="h-full overflow-y-auto pt-10">{children}</div>
      </div>
    </div>
  );
}
