import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { loadUserData, saveUserData, Booking } from '../../../utils/userData';
import { Calendar, MapPin, Star } from 'lucide-react';

const allowedStatuses = ['upcoming', 'completed', 'cancelled'] as const;
type BookingStatus = typeof allowedStatuses[number];

const statusColors: Record<BookingStatus, string> = {
  upcoming: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<BookingStatus, string> = {
  upcoming: 'upcoming',
  completed: 'completed',
  cancelled: 'cancelled',
};

const mockLocations = [
  'Downtown',
  'Midtown',
  'East Side',
  'West Side',
];

const BookingsList: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user?.email) {
      const data = loadUserData(user.email);
      const validBookings = (data?.bookings || []).filter(b => allowedStatuses.includes(b.status as BookingStatus));
      setBookings(validBookings);
    }
  }, [user]);

  const handleCancel = (id: string) => {
    if (!user?.email) return;
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b);
    setBookings(updated);
    const data = loadUserData(user.email);
    if (data) {
      saveUserData(user.email, { ...data, bookings: updated });
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.garden.toLowerCase().includes(search.toLowerCase()) || b.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-72"
        />
        <div className="flex gap-2 mt-2 md:mt-0">
          {['All', 'upcoming', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        {filteredBookings.length === 0 && (
          <div className="text-gray-500 text-center py-12">No bookings found.</div>
        )}
        {filteredBookings.map((b, i) => (
          <div
            key={b.id}
            className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-lg shadow p-5 gap-4 border border-gray-100"
          >
            {/* Image */}
            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                src={b.image || `https://source.unsplash.com/seed/garden${i}/120x120`}
                alt={b.garden}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div>
                  <div className="font-semibold text-lg leading-tight">{b.garden}</div>
                  <div className="text-gray-500 text-sm mb-1">{b.type}</div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 md:mt-0">
                  <Calendar size={16} className="mr-1" />
                  {b.date}
                  <span className="mx-2">|</span>
                  {b.time}
                  <span className="mx-2">|</span>
                  <MapPin size={16} className="mr-1" />
                  {mockLocations[i % mockLocations.length]}
                </div>
              </div>
              {/* Rating (if present) */}
              {b.status === 'completed' && (
                <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                  <Star size={16} fill="#facc15" className="mr-1" />
                  You rated this {typeof (b as any).rating === 'number' ? `${(b as any).rating}/5` : '5/5'}
                </div>
              )}
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-3 items-center">
                <Link to={`/dashboard/bookings/${b.id}`} className="text-primary-600 hover:underline font-medium">View Details</Link>
                {b.status === 'upcoming' && (
                  <>
                    <button className="text-gray-700 hover:underline font-medium">Modify</button>
                    <button className="text-red-600 hover:underline font-medium" onClick={() => handleCancel(b.id)}>Cancel</button>
                  </>
                )}
                {b.status === 'completed' && (
                  <button className="text-primary-600 hover:underline font-medium">Book Again</button>
                )}
              </div>
            </div>
            {/* Cost & Status */}
            <div className="flex flex-col items-end gap-2 min-w-[100px]">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[b.status as BookingStatus]}`}>{statusLabels[b.status as BookingStatus]}</div>
              <div className="font-semibold text-gray-700 text-lg">${b.cost.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList; 