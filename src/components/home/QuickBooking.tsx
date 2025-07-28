import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Search } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const locations = [
  "Downtown",
  "Midtown",
  "East Side",
  "West Side",
  "Uptown",
  "Financial District"
];

const gardenTypes = [
  "All Gardens",
  "Gardening Gardens",
  "Social Gardens",
  "Pet-Friendly Gardens",
  "Sports & Activity Gardens"
];

const QuickBooking: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [location, setLocation] = useState('');
  const [gardenType, setGardenType] = useState('All Gardens');
  
  const handleDateChange = (value: Value) => {
    setDate(value);
    setShowCalendar(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically navigate to search results with these filters
    console.log({ date, location, gardenType });
  };

  return (
    <section className="relative -mt-24 z-10 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-lg shadow-medium p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Garden Space</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <label htmlFor="location" className="label">Location</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input pl-10"
                >
                  <option value="">Any Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="gardenType" className="label">Garden Type</label>
              <select
                id="gardenType"
                value={gardenType}
                onChange={(e) => setGardenType(e.target.value)}
                className="input"
              >
                {gardenTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <label htmlFor="date" className="label">Date</label>
              <div className="relative">
                <CalendarIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="date"
                  readOnly
                  value={date ? format(date as Date, 'MMMM dd, yyyy') : 'Select a date'}
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="input pl-10 cursor-pointer"
                />
                {showCalendar && (
                  <div className="absolute z-20 mt-2 bg-white shadow-lg rounded-md">
                    <Calendar onChange={handleDateChange} value={date} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit" 
                className="btn-primary btn-md w-full flex items-center justify-center"
              >
                <Search size={18} className="mr-2" />
                Find Gardens
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default QuickBooking;