import React, { useState } from 'react';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    bookingConfirmations: true,
    promotions: false,
    bookingUpdates: true,
    bookingReminders: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save notification preferences to backend
    alert('Notification preferences updated!');
  };

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Email Notifications</h3>
        <div className="divide-y divide-gray-200 bg-white rounded-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium">Booking Confirmations</div>
              <div className="text-gray-500 text-sm">Receive emails when you make or modify bookings</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" name="bookingConfirmations" checked={settings.bookingConfirmations} onChange={handleChange} className="sr-only" />
              <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.bookingConfirmations ? 'bg-green-500' : ''}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.bookingConfirmations ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium">Promotions & Offers</div>
              <div className="text-gray-500 text-sm">Receive emails about special offers and promotions</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" name="promotions" checked={settings.promotions} onChange={handleChange} className="sr-only" />
              <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.promotions ? 'bg-green-500' : ''}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.promotions ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
        </div>
      </div>
      {/* SMS Notifications */}
      <div>
        <h3 className="font-semibold text-lg mb-4">SMS Notifications</h3>
        <div className="divide-y divide-gray-200 bg-white rounded-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium">Booking Updates</div>
              <div className="text-gray-500 text-sm">Receive SMS for booking confirmations and changes</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" name="bookingUpdates" checked={settings.bookingUpdates} onChange={handleChange} className="sr-only" />
              <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.bookingUpdates ? 'bg-green-500' : ''}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.bookingUpdates ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium">Booking Reminders</div>
              <div className="text-gray-500 text-sm">Receive SMS reminders before your bookings</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" name="bookingReminders" checked={settings.bookingReminders} onChange={handleChange} className="sr-only" />
              <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${settings.bookingReminders ? 'bg-green-500' : ''}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.bookingReminders ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 