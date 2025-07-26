// app/Portal/Vendor/Dashboard/earnings/page.js
'use client';
import SummaryCard from './components/SummaryCard';
import WithdrawForm from './components/WithdrawForm';
import Link from 'next/link';

export default function EarningsPage() {
  // Sample data converted to AOA (1 USD ≈ 100 AOA for demonstration)
  const earningsData = {
    balance: 284550,    // Total balance in AOA
    transactions: [
      { id: 1, date: '2023-11-15', amount: 32550, status: 'Completed', type: 'Sale' },
      { id: 2, date: '2023-11-14', amount: 21575, status: 'Completed', type: 'Sale' },
      { id: 3, date: '2023-11-13', amount: 18425, status: 'Pending', type: 'Sale' },
      { id: 4, date: '2023-11-12', amount: -20000, status: 'Completed', type: 'Withdrawal' },
      { id: 5, date: '2023-11-10', amount: 27580, status: 'Completed', type: 'Sale' }
    ]
  };

  // Format number as AOA currency with thousands separators
  const formatAOA = (amount) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount) + ' AOA';
  };

  // Calculate percentage change
  const weeklyChange = ((earningsData.thisWeek - earningsData.lastWeek) / earningsData.lastWeek * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">Earnings Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Available Balance" 
          amount={earningsData.available} 
          change={weeklyChange}
          isPositive={weeklyChange >= 0}
          formatCurrency={formatAOA}
        />
        <SummaryCard 
          title="Pending Clearance" 
          amount={earningsData.pending} 
          description="Will be available in 2-3 business days"
          formatCurrency={formatAOA}
        />
        <SummaryCard 
          title="Total Balance" 
          amount={earningsData.balance} 
          isPrimary={true}
          formatCurrency={formatAOA}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Recent Transactions</h2>
            <Link 
              href="/Portal/Vendor/Dashboard/earnings" 
              className="text-sm text-[#00b1a5] hover:text-[#00897b]"
            >
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earningsData.transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                      txn.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {txn.amount >= 0 ? '+' : ''}{formatAOA(txn.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-black mb-4">Withdraw Funds</h2>
          <WithdrawForm availableBalance={earningsData.available} formatCurrency={formatAOA} />
        </div>
      </div>
    </div>
  );
}