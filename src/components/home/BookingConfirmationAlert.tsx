import React from 'react';
import { X } from 'lucide-react';

interface BookingConfirmationAlertProps {
  message: string;
  onClose: () => void;
}

const BookingConfirmationAlert: React.FC<BookingConfirmationAlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-8 left-1/2 z-50 -translate-x-1/2 bg-white border border-primary-200 shadow-xl rounded-xl px-6 py-5 flex items-start gap-4 min-w-[320px] max-w-[90vw] animate-fade-in">
      <div className="flex-1">
        <div className="font-bold text-primary-700 text-lg mb-1">Booking Confirmed!</div>
        <div className="text-gray-700 text-base">{message}</div>
      </div>
      <button onClick={onClose} className="ml-4 mt-1 text-gray-400 hover:text-primary-600 transition-colors" aria-label="Close alert">
        <X size={22} />
      </button>
    </div>
  );
};

export default BookingConfirmationAlert; 