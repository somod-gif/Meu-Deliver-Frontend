// app/Portal/Vendor/Dashboard/earnings/components/SummaryCard.js
export default function SummaryCard({ title, amount, change, isPositive, isPrimary, description }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${isPrimary ? 'border-t-4 border-[#00b1a5]' : ''}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-black mt-1">${amount.toFixed(2)}</p>
      
      {change !== undefined && (
        <p className={`text-sm mt-2 ${isPositive ? 'text-[#a3d900]' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last week
        </p>
      )}
      
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
}