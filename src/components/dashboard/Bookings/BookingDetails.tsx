import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockBookings = [
  {
    id: '1',
    date: '2024-07-01',
    service: 'Garden Consultation',
    status: 'Upcoming',
    cost: 120,
    details: 'A full garden consultation with our expert.'
  },
  {
    id: '2',
    date: '2024-06-15',
    service: 'Plant Delivery',
    status: 'Completed',
    cost: 60,
    details: 'Delivery of selected plants to your address.'
  },
  {
    id: '3',
    date: '2024-06-20',
    service: 'Garden Maintenance',
    status: 'Cancelled',
    cost: 90,
    details: 'Monthly maintenance service.'
  },
];

const BookingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = mockBookings.find(b => b.id === id);

  if (!booking) {
    return <div>Booking not found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <div className="mb-2"><strong>Date:</strong> {booking.date}</div>
      <div className="mb-2"><strong>Service:</strong> {booking.service}</div>
      <div className="mb-2"><strong>Status:</strong> {booking.status}</div>
      <div className="mb-2"><strong>Cost:</strong> ${booking.cost}</div>
      <div className="mb-4"><strong>Details:</strong> {booking.details}</div>
      {booking.status === 'Upcoming' && (
        <button className="bg-red-600 text-white px-4 py-2 rounded mr-2">Cancel Booking</button>
      )}
      <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default BookingDetails; 