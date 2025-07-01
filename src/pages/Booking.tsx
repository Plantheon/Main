import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin, Filter, Search, ArrowLeft, Star } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { loadUserData, saveUserData, Booking as UserBooking } from '../utils/userData';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Garden {
  id: number;
  name: string;
  type: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  availableTimes: string[];
}

const sampleGardens: Garden[] = [
  {
    id: 1,
    name: "Skyline Serenity",
    type: "Wellness Garden",
    location: "Downtown",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    price: "$40/2hr",
    rating: 4.9,
    availableTimes: ["9:00 AM", "11:00 AM", "1:00 PM", "5:00 PM"]
  },
  {
    id: 2,
    name: "Social Heights",
    type: "Social Garden",
    location: "Midtown",
    image: "https://plus.unsplash.com/premium_photo-1675006717262-a8f9aed248a3?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$60/2hr",
    rating: 4.8,
    availableTimes: ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]
  },
  {
    id: 3,
    name: "Paws Paradise",
    type: "Pet-Friendly Garden",
    location: "East Side",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$25/2hr",
    rating: 4.7,
    availableTimes: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
  },
  {
    id: 4,
    name: "Active Terrace",
    type: "Sports & Activity Garden",
    location: "West Side",
    image: "https://images.pexels.com/photos/6208089/pexels-photo-6208089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: "$40/2hr",
    rating: 4.8,
    availableTimes: ["7:00 AM", "9:00 AM", "11:00 AM", "1:00 PM", "5:00 PM"]
  },
  {
    id: 5,
    name: "Meditation Haven",
    type: "Wellness Garden",
    location: "Uptown",
    image: "https://plus.unsplash.com/premium_photo-1666946131242-b2c5cc73892a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$40/2hr",
    rating: 4.9,
    availableTimes: ["8:00 AM", "10:00 AM", "12:00 PM", "4:00 PM", "6:00 PM"]
  },
  {
    id: 6,
    name: "Sunset Lounge",
    type: "Social Garden",
    location: "Financial District",
    image: "https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$60/2hr",
    rating: 4.8,
    availableTimes: ["4:00 PM", "6:00 PM", "8:00 PM"]
  }
];

const locations = ["All Locations", "Downtown", "Midtown", "East Side", "West Side", "Uptown", "Financial District"];
const gardenTypes = ["All Types", "Wellness Garden", "Social Garden", "Pet-Friendly Garden", "Sports & Activity Garden"];
const amenities = ["BBQ Grill", "Yoga Area", "Pet Play Area", "Meditation Space", "Exercise Equipment", "Lounge Seating", "Shade Structures", "Water Features"];

const Booking: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [location, setLocation] = useState("All Locations");
  const [gardenType, setGardenType] = useState("All Types");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedGarden, setSelectedGarden] = useState<Garden | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const filteredGardens = sampleGardens.filter(garden => {
    const locationMatch = location === "All Locations" || garden.location === location;
    const typeMatch = gardenType === "All Types" || garden.type === gardenType;
    return locationMatch && typeMatch;
  });

  const handleGardenSelect = (garden: Garden) => {
    setSelectedGarden(garden);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedGarden && selectedTime) {
      // Here you would typically process the booking
      alert(`Booking confirmed for ${selectedGarden.name} on ${format(date as Date, 'MMMM dd, yyyy')} at ${selectedTime}`);
      // Save booking to user dashboard
      if (user?.email) {
        const booking: UserBooking = {
          id: `${selectedGarden.id}-${(date as Date).toISOString()}-${selectedTime}`,
          garden: selectedGarden.name,
          type: selectedGarden.type,
          date: format(date as Date, 'yyyy-MM-dd'),
          time: selectedTime,
          status: 'upcoming',
          cost: Number(selectedGarden.price.replace(/[^0-9.]/g, '')),
          image: selectedGarden.image,
        };
        const data = loadUserData(user.email) || {
          bookings: [],
          paymentMethods: [],
          paymentHistory: [],
          profile: { name: user.name, email: user.email, image: user.image },
        };
        saveUserData(user.email, {
          ...data,
          bookings: [...data.bookings, booking],
        });
      }
      // Reset the selection
      setSelectedGarden(null);
      setSelectedTime(null);
    }
  };

  return (
    <>
      <div className="pt-20 bg-primary-50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="heading-lg mb-6">Book Your Urban Oasis</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Find and book the perfect garden space for your needs. Use our interactive
              calendar and filters to discover available gardens in your preferred location.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Search and Filter Column */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-medium p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Find Gardens</h2>
                <button 
                  className="lg:hidden flex items-center text-primary-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} className="mr-1" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="mb-6">
                  <label className="label">Date</label>
                  <Calendar onChange={setDate} value={date} className="w-full border-0 shadow-none" />
                </div>

                <div className="mb-4">
                  <label htmlFor="location" className="label">Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input pl-10"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
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

                <div className="mb-6">
                  <label className="label">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`amenity-${amenity}`}
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="mr-2"
                        />
                        <label htmlFor={`amenity-${amenity}`} className="text-sm">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-primary btn-lg w-full flex items-center justify-center gap-2">
                  <Search size={18} />
                  Search Gardens
                </button>
              </div>
            </div>
          </div>

          {/* Garden Results Column */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            {!selectedGarden ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Available Gardens ({filteredGardens.length})</h2>
                  <span className="text-gray-600">
                    {date ? format(date as Date, 'MMMM dd, yyyy') : 'Select a date'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredGardens.map((garden) => (
                    <motion.div
                      key={garden.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleGardenSelect(garden)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={garden.image}
                          alt={garden.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{garden.name}</h3>
                          <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-sm">
                            {garden.price}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <span className="bg-gray-100 px-2 py-1 rounded mr-2">{garden.type}</span>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {garden.location}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-accent-500">
                            {garden.rating}★
                          </div>
                          <div className="text-sm text-gray-600">
                            {garden.availableTimes.length} time slots available
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-medium overflow-hidden"
              >
                <div className="h-64 relative">
                  <img
                    src={selectedGarden.image}
                    alt={selectedGarden.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    onClick={() => setSelectedGarden(null)}
                  >
                    <ArrowLeft size={20} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{selectedGarden.name}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="inline-flex items-center">
                          <MapPin size={16} className="mr-1" /> {selectedGarden.location}
                        </span>
                        <span className="inline-flex items-center">
                          <Star size={16} className="mr-1 text-accent-500" /> {selectedGarden.rating}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {selectedGarden.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-primary-600">
                      {selectedGarden.price}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold mb-3">Select a Time</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {selectedGarden.availableTimes.map((time) => (
                        <button
                          key={time}
                          className={`flex items-center justify-center px-4 py-3 border rounded-md text-center transition-colors gap-2 ${
                            selectedTime === time
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 hover:bg-primary-50 hover:border-primary-300'
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          <Clock size={16} />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold">Booking Summary</h3>
                        <p className="text-gray-600 text-sm">
                          {date ? format(date as Date, 'MMMM dd, yyyy') : 'Select a date'} {selectedTime ? `at ${selectedTime}` : ''}
                        </p>
                      </div>
                      <div className="text-xl font-bold">{selectedGarden.price}</div>
                    </div>
                    
                    <button
                      className="btn-primary btn-lg w-full"
                      disabled={!selectedTime}
                      onClick={handleBooking}
                    >
                      {selectedTime ? 'Confirm Booking' : 'Select a Time'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;