import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin, Filter, Search, ArrowLeft, Star, Check, Zap, Calendar as CalendarIcon, Repeat } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { loadUserData, saveUserData, Booking as UserBooking, UserData } from '../utils/userData';
import { v4 as uuidv4 } from 'uuid';
import BookingConfirmationAlert from '../components/home/BookingConfirmationAlert';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Garden {
  id: number;
  name: string;
  type: string;
  location: string;
  image: string;
  oneTimePrice: number;
  subscriptionPrice: number;
  rating: number;
  availableTimes: string[];
  subscriptionBenefit: string;
}

const sampleGardens: Garden[] = [
  {
    id: 1,
    name: "Gardening",
    type: "Gardening Garden",
    location: "Downtown",
    image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg", 
    oneTimePrice: 40,
    subscriptionPrice: 99,
    rating: 4.9,
    availableTimes: ["9:00 AM", "11:00 AM", "1:00 PM", "5:00 PM"],
    subscriptionBenefit: "Unlimited visits + priority booking"
  },
  {
    id: 2,
    name: "BBQ",
    type: "Social Garden",
    location: "Midtown",
    image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg",
    oneTimePrice: 60,
    subscriptionPrice: 99,
    rating: 4.8,
    availableTimes: ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
    subscriptionBenefit: "8 visits/month + guest passes"
  },
  {
    id: 3,
    name: "Pet's Garden",
    type: "Pet-Friendly Garden",
    location: "East Side",
    image: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg",
    oneTimePrice: 25,
    subscriptionPrice: 49,
    rating: 4.7,
    availableTimes: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
    subscriptionBenefit: "Unlimited visits + pet amenities"
  }, 
  {
    id: 4,
    name: "Activity Parc",
    type: "Sports & Activity Garden",
    location: "West Side",
    image: "https://images.pexels.com/photos/13993576/pexels-photo-13993576.jpeg",
    oneTimePrice: 60,
    subscriptionPrice: 99,
    rating: 4.8,
    availableTimes: ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
    subscriptionBenefit: "8 visits/month + guest passes"
  },
];

const locations = ["All Locations", "Downtown", "Midtown", "East Side", "West Side", "Uptown", "Financial District"];
const gardenTypes = ["All Types", "Gardening Garden", "Social Garden", "Pet-Friendly Garden", "Sports & Activity Garden"];

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    description: 'Perfect for occasional garden visits and solo relaxation.',
    highlight: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    description: 'Great for regular garden use with variety and premium features.',
    highlight: true,
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: 199,
    description: 'For true garden enthusiasts with unlimited access and priority.',
    highlight: false,
  },
];

const Booking: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [location, setLocation] = useState("All Locations");
  const [gardenType, setGardenType] = useState("All Types");
  const [selectedGarden, setSelectedGarden] = useState<Garden | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentModel, setPaymentModel] = useState<'one-time' | 'subscription' | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]); // Default to Premium
  const [confirmationAlert, setConfirmationAlert] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const filteredGardens = sampleGardens.filter(garden => {
    const locationMatch = location === "All Locations" || garden.location === location;
    const typeMatch = gardenType === "All Types" || garden.type === gardenType;
    return locationMatch && typeMatch;
  });

  const handleGardenSelect = (garden: Garden) => {
    setSelectedGarden(garden);
    setSelectedTime(null);
    setPaymentModel(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePaymentModelSelect = (model: 'one-time' | 'subscription') => {
    setPaymentModel(model);
  };

  const handleBooking = () => {
    if (!user || !user.email) {
      setConfirmationAlert({ open: true, message: 'Please log in to make a booking.' });
      return;
    }
    if (selectedGarden && selectedTime && paymentModel) {
      let price = paymentModel === 'one-time' ? selectedGarden.oneTimePrice : selectedPlan.price;
      const booking: UserBooking = {
        id: uuidv4(),
        garden: selectedGarden.name,
        type: paymentModel === 'subscription' ? selectedPlan.name : selectedGarden.type,
        date: format(date as Date, 'yyyy-MM-dd'),
        time: selectedTime,
        status: 'upcoming',
        cost: price,
        image: selectedGarden.image,
        paymentType: paymentModel,
      };
      // Load existing user data or create new
      let userData: UserData = loadUserData(user.email) || {
        bookings: [],
        paymentMethods: [],
        paymentHistory: [],
        profile: { name: user.name, email: user.email, image: user.image },
      };
      userData.bookings = [booking, ...userData.bookings];
      saveUserData(user.email, userData);
      setConfirmationAlert({
        open: true,
        message: `Booking confirmed for ${selectedGarden.name} on ${format(date as Date, 'MMMM dd, yyyy')} at ${selectedTime} - ${paymentModel === 'one-time' ? 'One-time payment' : selectedPlan.name + ' Subscription'}: $${price}`
      });
      setSelectedGarden(null);
      setSelectedTime(null);
      setPaymentModel(null);
    }
  };

  const calculateSavings = (garden: Garden) => {
    const monthlyOneTime = garden.oneTimePrice * 4; // Assuming 4 visits per month
    const savings = monthlyOneTime - garden.subscriptionPrice;
    return savings > 0 ? savings : 0;
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
              Find and book the perfect garden space for your needs. Choose between one-time visits or subscription plans for better value.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Search and Filter Column */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1 h-full">
            <div className="bg-white rounded-lg shadow-medium p-6 h-full flex flex-col">
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

                <button className="btn-primary btn-lg w-full flex items-center justify-center gap-2">
                  <Search size={18} />
                  Search Gardens
                </button>
              </div>
            </div>
          </div>

          {/* Garden Results Column */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2 h-full">
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
                          <div className="text-right">
                            <div className="text-sm text-gray-500">From</div>
                            <div className="font-bold text-primary-600">${garden.oneTimePrice}/visit</div>
                          </div>
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
                  <div className="flex justify-between items-start mb-6">
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
                  </div>
                  
                  {/* Time Selection */}
                  <div className="mb-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Clock size={18} />
                      Select a Time
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {selectedGarden.availableTimes.map((time) => (
                        <button
                          key={time}
                          className={`px-4 py-3 border rounded-md text-center transition-colors ${
                            selectedTime === time
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 hover:bg-primary-50 hover:border-primary-300'
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Model Selection (Tabbed UI) */}
                  {selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <CalendarIcon size={18} />
                        Choose Your Payment Option
                      </h3>
                      {/* Tab Switcher */}
                      <div className="flex mb-6 gap-2">
                        <button
                          className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold text-base transition-all border-b-4 shadow-sm focus:outline-none duration-150
                            ${paymentModel === 'subscription'
                              ? 'bg-primary-100 border-primary-600 text-primary-800 shadow-md scale-105'
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-400'}
                          `}
                          onClick={() => setPaymentModel('subscription')}
                          type="button"
                          style={{ minWidth: '140px', cursor: 'pointer' }}
                        >
                          <span><Repeat size={18} className={paymentModel === 'subscription' ? 'text-primary-600' : 'text-gray-400'} /></span>
                          Recurring
                        </button>
                        <button
                          className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold text-base transition-all border-b-4 shadow-sm focus:outline-none duration-150
                            ${paymentModel === 'one-time'
                              ? 'bg-primary-100 border-primary-600 text-primary-800 shadow-md scale-105'
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-400'}
                          `}
                          onClick={() => setPaymentModel('one-time')}
                          type="button"
                          style={{ minWidth: '140px', cursor: 'pointer' }}
                        >
                          <span><Zap size={18} className={paymentModel === 'one-time' ? 'text-primary-600' : 'text-gray-400'} /></span>
                          One-Time
                        </button>
                      </div>
                      {/* Payment Option Content */}
                      <div className="rounded-b-lg bg-white shadow p-6">
                        {paymentModel === 'one-time' && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold text-lg mb-1">One-Time Visit</h4>
                                <p className="text-gray-600 text-sm mb-2">Perfect for trying out</p>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li className="flex items-center gap-2">
                                    <Check size={14} className="text-green-500" />
                                    2-hour garden access
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <Check size={14} className="text-green-500" />
                                    All basic amenities
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <Check size={14} className="text-green-500" />
                                    No commitment
                                  </li>
                                </ul>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-4xl font-bold text-gray-900">${selectedGarden.oneTimePrice}</span>
                                <span className="text-gray-600 ml-1">/2 hours</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {paymentModel === 'subscription' && (
                          <div className="space-y-6">
                            <div className="mb-2">
                              <h4 className="font-bold text-lg mb-1">Choose Your Plan</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {subscriptionPlans.map((plan) => (
                                  <div
                                    key={plan.id}
                                    className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all flex flex-col items-start space-y-2 ${selectedPlan.id === plan.id ? 'border-primary-500 bg-primary-50 shadow-lg' : 'border-gray-200 hover:border-primary-200'}`}
                                    onClick={() => setSelectedPlan(plan)}
                                  >
                                    {plan.highlight && (
                                      <div className="absolute top-3 right-3 bg-primary-500 text-white rounded-full px-3 py-1 text-xs font-bold">Most Popular</div>
                                    )}
                                    <div className="font-bold text-xl mb-1">{plan.name}</div>
                                    <div className="text-3xl font-bold mb-1">${plan.price}/month</div>
                                    <div className="text-gray-600 text-sm mb-2">{plan.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                Unlimited visits
                              </div>
                              <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                Priority booking
                              </div>
                              <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                Guest passes included
                              </div>
                              <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                Cancel anytime
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Booking Summary & Confirmation */}
                  {selectedTime && paymentModel && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 pt-6"
                    >
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="font-bold mb-2">Booking Summary</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Garden:</span>
                            <span className="font-medium">{selectedGarden.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span className="font-medium">{date ? format(date as Date, 'MMMM dd, yyyy') : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="font-medium">{selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment:</span>
                            <span className="font-medium">
                              {paymentModel === 'one-time' ? 'One-time payment' : selectedPlan.name + ' Subscription'}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-bold">
                            <span>Total:</span>
                            <span>${paymentModel === 'one-time' ? selectedGarden.oneTimePrice : selectedPlan.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        className="btn-primary btn-lg w-full"
                        onClick={handleBooking}
                      >
                        Confirm Booking - ${paymentModel === 'one-time' ? selectedGarden.oneTimePrice : selectedPlan.price}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {confirmationAlert.open && (
        <BookingConfirmationAlert
          message={confirmationAlert.message}
          onClose={() => setConfirmationAlert({ open: false, message: '' })}
        />
      )}
    </>
  );
};

export default Booking;