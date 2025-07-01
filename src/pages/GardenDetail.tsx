import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, Tag, MapPin, Star } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { format } from 'date-fns';

interface GardenData {
  [key: string]: {
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    pricing: {
      oneTime: string;
      subscription: string;
    };
    images: string[];
    location: string;
    capacity: string;
    rating: number;
    reviews: number;
    amenities: string[];
    availableTimes: string[];
  };
}

const gardenData: GardenData = {
  "wellness-gardens": {
    title: "Wellness Gardens",
    description: "Peaceful spaces designed for yoga, meditation, and mindfulness practices.",
    longDescription: "Our Wellness Gardens are designed to provide a tranquil escape from the hustle and bustle of city life. These carefully curated spaces feature comfortable meditation areas, yoga decks, and soothing water features that create the perfect environment for mindfulness practices. Surrounded by aromatic herbs and calming plants, these gardens provide a natural sanctuary for mental well-being and personal growth.",
    features: [
      "Dedicated yoga platforms with stunning views",
      "Meditation zones with comfortable seating",
      "Aromatic herb gardens for sensory stimulation",
      "Sound-insulated spaces for guided meditation sessions",
      "Soothing water features to create a peaceful atmosphere",
      "Shade structures for comfortable practice regardless of weather"
    ],
    pricing: {
      oneTime: "$40/2 hours",
      subscription: "Included in Premium ($99/month) and Ultimate ($199/month) plans"
    },
    images: [
      "https://images.pexels.com/photos/2409629/pexels-photo-2409629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5962054/pexels-photo-5962054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7319097/pexels-photo-7319097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7319172/pexels-photo-7319172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Multiple locations throughout the city",
    capacity: "Up to 10 people",
    rating: 4.9,
    reviews: 128,
    amenities: ["Yoga mats", "Meditation cushions", "Bluetooth speakers", "Water station", "Shade sails"],
    availableTimes: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"]
  },
  "social-gardens": {
    title: "Social Gardens",
    description: "Perfect for gatherings and entertainment with BBQ areas and comfortable seating.",
    longDescription: "Our Social Gardens are the perfect venue for gatherings and entertainment in the heart of the city. These vibrant rooftop spaces feature comfortable seating arrangements, BBQ facilities, and ambient lighting that creates a magical atmosphere as the sun sets. Whether you're hosting friends for a casual get-together or planning a special celebration, these gardens provide the ideal backdrop for creating memorable social experiences.",
    features: [
      "Premium BBQ grilling stations with tools provided",
      "Comfortable lounge seating areas for conversation",
      "Ambient lighting for evening gatherings",
      "Weatherproof sound systems for music",
      "Dining areas with tables and chairs",
      "Optional bar setup service available"
    ],
    pricing: {
      oneTime: "$60/2 hours",
      subscription: "Included in Ultimate ($199/month) plan, 4 visits/month in Premium ($99/month)"
    },
    images: [
      "https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5490917/pexels-photo-5490917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/174938/pexels-photo-174938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Premium downtown and midtown locations",
    capacity: "Up to 20 people",
    rating: 4.8,
    reviews: 95,
    amenities: ["BBQ grill", "Lounge furniture", "Bluetooth speakers", "Refrigerator", "Dining tables"],
    availableTimes: ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]
  },
  "pet-friendly-gardens": {
    title: "Pet-Friendly Gardens",
    description: "Specially designed gardens where you can bring your furry friends.",
    longDescription: "Our Pet-Friendly Gardens are a paradise for both you and your furry companions. These thoughtfully designed spaces feature pet play areas, comfortable resting spots, and water stations to keep your pets happy and hydrated. The secure environment allows your pets to roam freely while you enjoy the beautiful surroundings. It's the perfect solution for urban pet owners looking for safe outdoor spaces to spend quality time with their animal friends.",
    features: [
      "Secure, enclosed areas for off-leash playtime",
      "Pet-safe plants and landscaping",
      "Shaded resting areas for pets and owners",
      "Fresh water stations throughout the garden",
      "Waste disposal stations for convenience",
      "Comfortable seating for pet owners"
    ],
    pricing: {
      oneTime: "$25/2 hours",
      subscription: "Included in all subscription plans"
    },
    images: [
      "https://images.pexels.com/photos/3296546/pexels-photo-3296546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Available in most neighborhoods",
    capacity: "Up to 8 people with pets",
    rating: 4.7,
    reviews: 84,
    amenities: ["Pet play equipment", "Water bowls", "Shade structures", "Waste stations", "Seating areas"],
    availableTimes: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"]
  },
  "sports-activity-gardens": {
    title: "Sports & Activity Gardens",
    description: "Active spaces featuring mini-golf, stretching areas, and recreational activities.",
    longDescription: "Our Sports & Activity Gardens are designed for those who want to stay active while enjoying the outdoors. These dynamic spaces feature a variety of recreational options including mini-golf courses, stretching areas, and other fun activities. Whether you're looking for a light workout or want to challenge friends to a friendly competition, these gardens provide the perfect blend of physical activity and natural surroundings for an energizing experience.",
    features: [
      "Mini-golf courses with challenging holes",
      "Dedicated stretching and exercise areas",
      "Table tennis and other recreational games",
      "Open spaces for bodyweight workouts",
      "Balance and agility training sections",
      "Cool-down relaxation zones with comfortable seating"
    ],
    pricing: {
      oneTime: "$40/2 hours",
      subscription: "Included in Premium ($99/month) and Ultimate ($199/month) plans"
    },
    images: [
      "https://images.pexels.com/photos/6208089/pexels-photo-6208089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6635276/pexels-photo-6635276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Select locations with suitable space",
    capacity: "Up to 12 people",
    rating: 4.8,
    reviews: 76,
    amenities: ["Sports equipment", "Exercise mats", "Water station", "Towel service", "Shade structures"],
    availableTimes: ["7:00 AM", "9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"]
  }
};

const GardenDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const garden = type ? gardenData[type] : null;
  
  if (!garden) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="heading-lg mb-6">Garden Type Not Found</h2>
        <p className="mb-8">Sorry, we couldn't find the garden type you're looking for.</p>
        <Link to="/garden-types" className="btn-primary btn-lg">
          View All Garden Types
        </Link>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM do');

  return (
    <>
      <div className="pt-20 bg-primary-50">
        <div className="container mx-auto px-4 py-12">
          <Link to="/garden-types" className="inline-flex items-center text-primary-600 font-medium mb-6 gap-2">
            <ArrowLeft size={18} />
            Back to Garden Types
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-lg mb-4">{garden.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{garden.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center text-gray-700 gap-2">
                <MapPin size={18} className="text-primary-600" />
                <span>{garden.location}</span>
              </div>
              <div className="flex items-center text-gray-700 gap-2">
                <Users size={18} className="text-primary-600" />
                <span>{garden.capacity}</span>
              </div>
              <div className="flex items-center text-gray-700 gap-2">
                <Star size={18} className="text-accent-500" />
                <span>{garden.rating} ({garden.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-gray-700 gap-2">
                <Tag size={18} className="text-primary-600" />
                <span>From {garden.pricing.oneTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Slider {...sliderSettings} className="mb-8 rounded-lg overflow-hidden shadow-medium">
                {garden.images.map((image, index) => (
                  <div key={index} className="h-96">
                    <img
                      src={image}
                      alt={`${garden.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="heading-sm mb-4">About {garden.title}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {garden.longDescription}
              </p>

              <h3 className="text-xl font-bold mb-3">Features & Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {garden.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-2 w-2 bg-primary-500 rounded-full mr-2 mt-2"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-3">Available Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {garden.amenities.map((amenity, index) => (
                    <span key={index} className="bg-white px-3 py-2 rounded-md text-sm shadow-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-lg shadow-medium p-6">
              <h3 className="text-xl font-bold mb-4">Book This Garden</h3>
              
              <div className="mb-4">
                <label className="label">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    readOnly
                    value={formattedDate}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="label">Available Time Slots</label>
                <div className="grid grid-cols-2 gap-2">
                  {garden.availableTimes.map((time, index) => (
                    <div key={index} className="relative">
                      <input
                        type="radio"
                        id={`time-${index}`}
                        name="timeSlot"
                        className="absolute opacity-0"
                      />
                      <label
                        htmlFor={`time-${index}`}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-center cursor-pointer hover:bg-primary-50 hover:border-primary-300 transition-colors gap-2"
                      >
                        <Clock size={16} />
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>One-time booking:</span>
                  <span className="font-bold">{garden.pricing.oneTime}</span>
                </div>
                <div className="flex justify-between text-primary-700">
                  <span>With subscription:</span>
                  <span className="font-bold">{garden.pricing.subscription}</span>
                </div>
              </div>
              
              <button className="btn-primary btn-lg w-full mb-3">Book Now</button>
              <Link to="/pricing" className="btn-outline btn-lg w-full">View Subscription Plans</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GardenDetail;