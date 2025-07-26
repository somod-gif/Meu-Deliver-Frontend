// app/Portal/Vendor/Dashboard/orders/components/StatusBadge.js
export default function StatusBadge({ status }) {
  const statusColors = {
    Confirmed: 'bg-blue-100 text-blue-800',
    Preparing: 'bg-yellow-100 text-yellow-800',
    Ready: 'bg-purple-100 text-purple-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}