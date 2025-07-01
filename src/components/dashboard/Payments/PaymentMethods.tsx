import React, { useState } from 'react';

const mockMethods = [
  { id: '1', type: 'Credit Card', last4: '1234', brand: 'Visa', isDefault: true },
  { id: '2', type: 'PayPal', email: 'user@email.com', isDefault: false },
];

const PaymentMethods: React.FC = () => {
  const [methods, setMethods] = useState(mockMethods);

  const setDefault = (id: string) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
  };

  const removeMethod = (id: string) => {
    setMethods(methods.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
      <ul className="space-y-4 mb-6">
        {methods.map((m) => (
          <li key={m.id} className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">
                {m.type === 'Credit Card' ? `${m.brand} ****${m.last4}` : `PayPal (${m.email})`}
                {m.isDefault && <span className="ml-2 text-xs text-green-600">Default</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {!m.isDefault && (
                <button className="text-primary-600 hover:underline" onClick={() => setDefault(m.id)}>Set Default</button>
              )}
              <button className="text-red-600 hover:underline" onClick={() => removeMethod(m.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="bg-primary-600 text-white px-4 py-2 rounded">Add Payment Method</button>
    </div>
  );
};

export default PaymentMethods; 