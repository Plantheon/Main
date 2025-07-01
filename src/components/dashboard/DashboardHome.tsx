import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, MapPin, Star, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Bookings',
      value: '12',
      icon: Calendar,
      color: 'bg-primary-500',
      change: '+2 this month'
    },
    {
      label: 'Favorite Gardens',
      value: '5',
      icon: Star,
      color: 'bg-accent-500',
      change: '+1 this week'
    },
    {
      label: 'Hours Enjoyed',
      value: '48',
      icon: Clock,
      color: 'bg-secondary-500',
      change: '+8 this month'
    },
    {
      label: 'Money Saved',
      value: '$240',
      icon: TrendingUp,
      color: 'bg-success-500',
      change: 'vs. one-time bookings'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      garden: 'Skyline Serenity',
      type: 'Wellness Garden',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      garden: 'Social Heights',
      type: 'Social Garden',
      date: '2024-01-10',
      time: '6:00 PM',
      status: 'completed',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      garden: 'Paws Paradise',
      type: 'Pet-Friendly Garden',
      date: '2024-01-08',
      time: '10:00 AM',
      status: 'completed',
      image: 'https://images.pexels.com/photos/3296546/pexels-photo-3296546.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const favoriteGardens = [
    {
      id: 1,
      name: 'Skyline Serenity',
      location: 'Downtown',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Meditation Haven',
      location: 'Uptown',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/5962054/pexels-photo-5962054.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-primary-100">
          Ready to find your next urban oasis? Your garden sanctuary awaits.
        </p>
        <Link to="/booking" className="inline-block mt-4 bg-white text-primary-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
          Book New Garden
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
            <Link to="#" className="text-primary-600 hover:underline text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <img
                  src={booking.image}
                  alt={booking.garden}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{booking.garden}</h3>
                  <p className="text-sm text-gray-600">{booking.type}</p>
                  <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'upcoming' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Gardens */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Favorite Gardens</h2>
            <Link to="#" className="text-primary-600 hover:underline text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {favoriteGardens.map((garden) => (
              <div key={garden.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <img
                  src={garden.image}
                  alt={garden.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{garden.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    {garden.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-accent-500" />
                    {garden.rating}
                  </div>
                </div>
                <button className="text-primary-600 hover:bg-primary-50 px-3 py-1 rounded-md text-sm">
                  Book Again
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/booking" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors">
            <Calendar className="text-primary-600" size={24} />
            <div>
              <h3 className="font-medium">Book a Garden</h3>
              <p className="text-sm text-gray-600">Find your next oasis</p>
            </div>
          </Link>
          <Link to="/dashboard/bookings" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors">
            <CreditCard className="text-primary-600" size={24} />
            <div>
              <h3 className="font-medium">Manage Bookings</h3>
              <p className="text-sm text-gray-600">View and edit your bookings</p>
            </div>
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors">
            <Star className="text-primary-600" size={24} />
            <div>
              <h3 className="font-medium">Account Settings</h3>
              <p className="text-sm text-gray-600">Edit your profile and preferences</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 