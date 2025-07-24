export default function Button({ className, onClick, icon: Icon, name, text }) {
  return (
   <div className="flex w-full align-center justify-around">
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shrink-0 mx-2 sm:mx-0
        bg-teal-600 hover:bg-teal-700 text-white ${className}`}
    >
      {Icon && <Icon className="text-lg mr-2" />}
      {text && <span>{text}</span>}
    </button>
    </div>
  );
}
