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
    title: "Gardening",
    type: "gardening-gardens",
    image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg",
    location: "Downtown",
    rating: 4.9,
    amenities: ["Garden Beds", "Harvest Area", "Herb Garden"]
  },
  {
    id: 2,
    title: "BBQ",
    type: "social-gardens",
    image: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg",
    location: "Midtown",
    rating: 4.8,
    amenities: ["BBQ Grill", "Lounge Area", "Bar Setup"]
  },
  {
    id: 3,
    title: "Pet's Garden",
    type: "pet-friendly-gardens",
    image: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg",
    location: "East Side",
    rating: 4.7,
    amenities: ["Pet Play Area", "Shaded Spots"]
  },
  {
    id: 4,
    title: "Activity Parc",
    type: "sports-activity-gardens",
    image: "https://images.pexels.com/photos/13993576/pexels-photo-13993576.jpeg",
    location: "West Side",
    rating: 4.8,
    amenities: ["Calisthenics", "Stretching Area"]
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
    <section className="section bg-gradient-to-b from-primary-50 via-white to-white py-20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-primary-800">Find Your Perfect Garden Space</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover a variety of rooftop gardens designed for wellness, socializing, pets, and activity. Explore and book your ideal space today.
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
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 w-full">
                    <img 
                      src={garden.image} 
                      alt={garden.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-primary-600 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                      {garden.rating}★
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1 text-primary-800">{garden.title}</h3>
                    <p className="text-gray-500 mb-3 font-medium">{garden.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {garden.amenities.map((amenity, index) => (
                        <span key={index} className="inline-block bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/garden-types/${garden.type}`} 
                      className="btn-primary btn-sm w-full mt-auto flex items-center justify-center gap-2"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/garden-types" className="btn-outline btn-lg">
            View All Garden Spaces
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGardens;