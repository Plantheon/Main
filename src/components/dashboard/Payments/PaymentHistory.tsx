import React from 'react';

const mockPayments = [
  { id: '1', date: '2024-06-10', amount: 120, method: 'Visa ****1234', status: 'Paid', receipt: 'INV-001' },
  { id: '2', date: '2024-05-20', amount: 60, method: 'PayPal', status: 'Paid', receipt: 'INV-002' },
];

const PaymentHistory: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Method</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {mockPayments.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.date}</td>
              <td className="p-3">${p.amount}</td>
              <td className="p-3">{p.method}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3">
                <a href="#" className="text-primary-600 hover:underline">{p.receipt}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory; 