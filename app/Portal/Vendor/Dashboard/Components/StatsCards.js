// app/Portal/Vendor/Dashboard/components/StatsCards.js
export default function StatsCards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-[#a3d900]' : 'text-red-500'}`}>
            {stat.change} from yesterday
          </p>
        </div>
      ))}
    </div>
  );
}