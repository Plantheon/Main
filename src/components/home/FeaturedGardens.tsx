import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Garden {
  id: number;
  title: string;
  type: string;
  image: string;
  location: string;
  rating: number;
  amenities: string[];
}

const gardens: Garden[] = [
  {
    id: 1,
    title: "Skyline Serenity",
    type: "wellness-gardens",
    image: "https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "Downtown",
    rating: 4.9,
    amenities: ["Yoga Area", "Meditation Space", "Herb Garden"]
  },
  {
    id: 2,
    title: "Social Heights",
    type: "social-gardens",
    image: "https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "Midtown",
    rating: 4.8,
    amenities: ["BBQ Grill", "Lounge Area", "Bar Setup"]
  },
  {
    id: 3,
    title: "Paws Paradise",
    type: "pet-friendly-gardens",
    image: "https://images.pexels.com/photos/3296546/pexels-photo-3296546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "East Side",
    rating: 4.7,
    amenities: ["Pet Play Area", "Shaded Spots", "Water Station"]
  },
  {
    id: 4,
    title: "Active Terrace",
    type: "sports-activity-gardens",
    image: "https://images.pexels.com/photos/6208089/pexels-photo-6208089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "West Side",
    rating: 4.8,
    amenities: ["Mini Golf", "Stretching Area", "Climbing Wall"]
  },
];

const FeaturedGardens: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="heading-lg mb-4">Featured Garden Spaces</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our most popular rooftop retreats across the city. Each garden is uniquely designed 
            to provide the perfect environment for relaxation, socializing, or activities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Slider {...settings} className="featured-gardens-slider">
            {gardens.map((garden) => (
              <div key={garden.id} className="px-3 pb-6">
                <div className="card h-full transition-all duration-300 hover:shadow-medium">
                  <div className="relative h-64 w-full">
                    <img 
                      src={garden.image} 
                      alt={garden.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-sm font-medium text-primary-600">
                      {garden.rating}★
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{garden.title}</h3>
                    <p className="text-gray-500 mb-3">{garden.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {garden.amenities.map((amenity, index) => (
                        <span key={index} className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/garden-types/${garden.type}`} 
                      className="text-primary-600 font-medium flex items-center hover:underline"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/garden-types" className="btn-outline btn-md">
            View All Garden Spaces
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGardens;