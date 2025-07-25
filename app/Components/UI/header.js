// Header.jsx
import React from "react";

const Header = ({ heading, subHeading, paragraph, children }) => {
  return (
    <header>
      <div className="relative overflow-hidden bg-gradient-to-r from-[#00b1a5] via-[#00b1a5] to-[#a3d900] py-16 sm:py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            {heading}
            <span className="block bg-gradient-to-r from-[#c6d90d] to-[#a3d900] bg-clip-text text-transparent">
              {subHeading}
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {paragraph}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </div>

        {/* Floating decorative blobs */}
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
  );
};

export default Header;
