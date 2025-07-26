// app/Portal/Vendor/Dashboard/earnings/components/WithdrawForm.js
'use client';
import { useState } from 'react';

export default function WithdrawForm({ availableBalance }) {
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('primary');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankAccounts = [
    { id: 'primary', name: 'Primary Bank (****4532)', balance: availableBalance },
    { id: 'secondary', name: 'Secondary Bank (****6718)', balance: 0 }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Withdrawal request for $${amount} submitted successfully!`);
      setAmount('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount to Withdraw
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            min="10"
            max={availableBalance}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="focus:ring-[#00b1a5] focus:border-[#00b1a5] block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md"
            placeholder="0.00"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              Max: ${availableBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700">
          Bank Account
        </label>
        <select
          id="bankAccount"
          name="bankAccount"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
        >
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.id} disabled={account.balance <= 0}>
              {account.name} {account.balance <= 0 && '(No funds available)'}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || availableBalance <= 0}
          className={`w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            availableBalance <= 0 ? 'bg-gray-400 cursor-not-allowed' : 
            isSubmitting ? 'bg-[#00897b]' : 'bg-[#00b1a5] hover:bg-[#00897b]'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00b1a5]`}
        >
          {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
        </button>
      </div>

      <div className="text-xs text-gray-500 pt-2">
        <p>Withdrawals typically take 2-3 business days to process.</p>
        <p>Minimum withdrawal amount: $10.00</p>
      </div>
    </form>
  );
}