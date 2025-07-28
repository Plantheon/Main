import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Star, Tag } from 'lucide-react';

interface GardenData {
  [key: string]: {
    title: string;
    description: string;
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
  };
}

const gardenData: GardenData = {
  "gardening-gardens": {
    title: "Gardening",
    description: "Productive spaces where users can plant, grow, and harvest their own vegetables, herbs, and flowers with stunning city views.",
    features: [
      "Raised garden beds for vegetables",
      "Herb garden sections",
      "Irrigation systems",
      "Garden tools and equipment",
      "Composting areas",
      "Harvest storage facilities"
    ],
    pricing: {
      oneTime: "$40/2 hours",
      subscription: "Included in Premium ($99/month) and Ultimate ($199/month) plans"
    },
    images: [
      "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg",
      "https://images.pexels.com/photos/5962054/pexels-photo-5962054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7319097/pexels-photo-7319097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7319172/pexels-photo-7319172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Multiple locations throughout the city",
    capacity: "Up to 10 people",
    rating: 4.9,
    reviews: 128,
    amenities: ["Garden tools", "Seeds and seedlings", "Watering cans", "Harvest baskets", "Garden gloves"]
  },
  "social-gardens": {
    title: "BBQ",
    description: "Perfect for gatherings and entertainment with BBQ areas, comfortable seating, and ambient lighting.",
    features: [
      "Premium BBQ grilling stations",
      "Comfortable lounge seating areas",
      "Ambient lighting for evening gatherings",
      "Weatherproof sound systems",
      "Dining areas with tables and chairs",
      "Optional bar setup service"
    ],
    pricing: {
      oneTime: "$60/2 hours",
      subscription: "Included in Ultimate ($199/month) plan, 4 visits/month in Premium ($99/month)"
    },
    images: [
      "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5490917/pexels-photo-5490917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/174938/pexels-photo-174938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Premium downtown and midtown locations",
    capacity: "Up to 20 people",
    rating: 4.8,
    reviews: 95,
    amenities: ["BBQ grill", "Lounge furniture", "Bluetooth speakers", "Refrigerator", "Dining tables"]
  },
  "pet-friendly-gardens": {
    title: "Pet's Garden",
    description: "Specially designed gardens where you and your furry friends can enjoy safe outdoor spaces together.",
    features: [
      "Secure, enclosed areas for off-leash playtime",
      "Pet-safe plants and landscaping",
      "Shaded resting areas",
      "Fresh water stations",
      "Waste disposal stations",
      "Comfortable seating for pet owners"
    ],
    pricing: {
      oneTime: "$25/2 hours",
      subscription: "Included in all subscription plans"
    },
    images: [
      "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg",
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Available in most neighborhoods",
    capacity: "Up to 8 people with pets",
    rating: 4.7,
    reviews: 84,
    amenities: ["Pet play equipment", "Water bowls", "Shade structures", "Waste stations", "Seating areas"]
  },
  "sports-activity-gardens": {
    title: "Activity Parc",
    description: "Active spaces featuring mini-golf, stretching areas, and recreational activities for fitness enthusiasts.",
    features: [
      "Mini-golf courses with challenging holes",
      "Dedicated stretching and exercise areas",
      "Table tennis and recreational games",
      "Open spaces for bodyweight workouts",
      "Balance and agility training sections",
      "Cool-down relaxation zones"
    ],
    pricing: {
      oneTime: "$40/2 hours",
      subscription: "Included in Premium ($99/month) and Ultimate ($199/month) plans"
    },
    images: [
      "https://images.pexels.com/photos/13993576/pexels-photo-13993576.jpeg",
      "https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6635276/pexels-photo-6635276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    location: "Select locations with suitable space",
    capacity: "Up to 12 people",
    rating: 4.8,
    reviews: 76,
    amenities: ["Sports equipment", "Exercise mats", "Water station", "Towel service", "Shade structures"]
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

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Header Section */}
      <div className="w-full bg-white py-10 px-4 mb-10">
        <div className="max-w-5xl mx-auto">
          <Link to="/garden-types" className="inline-flex items-center text-primary-600 font-medium mb-4 gap-2">
            <ArrowLeft size={18} />
            Back to Garden Types
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{garden.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{garden.description}</p>
          <div className="flex flex-wrap gap-6 text-gray-700 text-base items-center">
            <span className="flex items-center gap-2"><MapPin size={18} className="text-primary-600" />{garden.location}</span>
            <span className="flex items-center gap-2"><Users size={18} className="text-primary-600" />{garden.capacity}</span>
            <span className="flex items-center gap-2"><Star size={18} className="text-accent-500" />{garden.rating} ({garden.reviews} reviews)</span>
            <span className="flex items-center gap-2"><Tag size={18} className="text-primary-600" />From {garden.pricing.oneTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden shadow mb-8">
            <img
              src={garden.images[0]}
              alt={garden.title}
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {garden.features.map((feature, idx) => (
                <div key={idx} className="flex items-start text-gray-800">
                  <span className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Available Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {garden.amenities.map((amenity, idx) => (
                <span key={idx} className="bg-white px-3 py-2 rounded-md text-sm shadow-sm border border-gray-200">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column: Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
            <p className="text-gray-600 mb-8">
              Experience this beautiful garden space and create unforgettable memories.
            </p>
            <Link to="/booking" className="btn-primary btn-lg w-full">
              Book This Garden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenDetail;