import React from "react"

const Button = ({ className, onClick, icon: Icon, name, text }) => {
  return (
    <div className="flex w-full justify-center">
      <button
        onClick={onClick}
        className={`flex items-center justify-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105
        bg-teal-600 hover:bg-teal-700 text-white text-center ${className}`}
      >
        {Icon && <Icon className="text-lg mr-2" />}
        {text && <span className="whitespace-nowrap">{text}</span>}
      </button>
    </div>
  );
}

export default Button;
