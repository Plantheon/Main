import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, CreditCard, Settings, User, LogOut, Plus, Heart, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: User, path: '/dashboard' },
  { id: 'bookings', label: 'My Bookings', icon: Calendar, path: '/dashboard/bookings' },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard, path: '/dashboard/payments' },
  { id: 'settings', label: 'Account Settings', icon: Settings, path: '/dashboard/settings' },
];

const DashboardLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* User Profile Header */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={user?.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{user?.name}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <a href="/booking" className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md">
                    <Plus size={18} />
                    <span className="text-sm">New Booking</span>
                  </a>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md">
                    <Heart size={18} />
                    <span className="text-sm">Favorites</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md">
                    <HelpCircle size={18} />
                    <span className="text-sm">Help & Support</span>
                  </button>
                </div>
              </div>

              {/* Logout */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 