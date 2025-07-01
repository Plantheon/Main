import React, { useState } from 'react';

const PrivacySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'Private',
    shareBookingHistory: false,
    allowReviews: true,
    dataCollection: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    let newValue: string | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }
    setSettings((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleDelete = () => {
    // TODO: Delete account logic
    alert('Account deleted!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save privacy preferences to backend
    alert('Privacy preferences updated!');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl divide-y divide-gray-200">
        {/* Profile Visibility */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="font-medium">Profile Visibility</div>
            <div className="text-gray-500 text-sm">Control who can see your profile information</div>
          </div>
          <select
            name="profileVisibility"
            value={settings.profileVisibility}
            onChange={handleChange}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        {/* Share Booking History */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="font-medium">Share Booking History</div>
            <div className="text-gray-500 text-sm">Allow others to see your booking history</div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" name="shareBookingHistory" checked={settings.shareBookingHistory} onChange={handleChange} className="sr-only" />
            <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.shareBookingHistory ? 'bg-green-500' : ''}`}>
              <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.shareBookingHistory ? 'translate-x-4' : ''}`}></span>
            </span>
          </label>
        </div>
        {/* Allow Reviews */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="font-medium">Allow Reviews</div>
            <div className="text-gray-500 text-sm">Let other users leave reviews about shared experiences</div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" name="allowReviews" checked={settings.allowReviews} onChange={handleChange} className="sr-only" />
            <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.allowReviews ? 'bg-green-500' : ''}`}>
              <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.allowReviews ? 'translate-x-4' : ''}`}></span>
            </span>
          </label>
        </div>
        {/* Data Collection */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="font-medium">Data Collection</div>
            <div className="text-gray-500 text-sm">Allow us to collect usage data to improve our service</div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" name="dataCollection" checked={settings.dataCollection} onChange={handleChange} className="sr-only" />
            <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.dataCollection ? 'bg-green-500' : ''}`}>
              <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.dataCollection ? 'translate-x-4' : ''}`}></span>
            </span>
          </label>
        </div>
      </div>
      {/* Delete Account */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="font-semibold text-red-700 mb-2">Delete Account</div>
        <div className="text-red-700 text-sm mb-4">Permanently delete your account and all associated data. This action cannot be undone.</div>
        <button className="bg-red-600 text-white px-6 py-2 rounded font-semibold" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
};

export default PrivacySettings; 