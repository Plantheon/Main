import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Image as ImageIcon } from 'lucide-react';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy' },
];

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save profile changes to backend
    alert('Profile updated!');
  };

  // For demo, use a static member since date
  const memberSince = '01/07/2025';

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-2 font-medium flex items-center gap-2 border-b-2 transition-colors text-gray-700 ${
              activeTab === tab.id ? 'border-primary-600 text-primary-700' : 'border-transparent hover:text-primary-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Profile image and name */}
          <div className="flex flex-col items-center md:items-start gap-4 col-span-1">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt={form.name} className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-gray-400" />
              )}
            </div>
            <div className="text-lg font-semibold">{form.name}</div>
            <div className="text-gray-500 text-sm">Member since {memberSince}</div>
            <button type="button" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:underline">
              <ImageIcon size={16} /> Change Profile Picture
            </button>
          </div>
          {/* Editable fields */}
          <div className="grid grid-cols-1 gap-6 col-span-1">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <div className="relative">
                <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 pl-10" />
                <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <div className="relative">
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2 pl-10" placeholder="+1 (555) 123-4567" />
                <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <div className="relative">
                <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 pl-10" />
                <Mail size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <div className="relative">
                <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2 pl-10" placeholder="Your address" />
                <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-semibold mt-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Save Changes
            </button>
          </div>
        </form>
      )}
      {activeTab === 'security' && <SecuritySettings />}
      {activeTab === 'notifications' && <NotificationSettings />}
      {activeTab === 'privacy' && <PrivacySettings />}
    </div>
  );
};

export default ProfileSettings; 