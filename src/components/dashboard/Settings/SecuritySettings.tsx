import React, { useState } from 'react';

const SecuritySettings: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save new password to backend
    alert('Password changed!');
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Change Password</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-3 mt-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-semibold">Update Password</button>
          </div>
        </form>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-2">Two-Factor Authentication</h3>
        <p className="text-gray-600 mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
        <button className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-100">Enable 2FA</button>
      </div>
      {/* Login Sessions */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-2">Login Sessions</h3>
        <p className="text-gray-600 mb-4">Manage your active login sessions across different devices.</p>
        <button className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-100">View Active Sessions</button>
      </div>
    </div>
  );
};

export default SecuritySettings; 