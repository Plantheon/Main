import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GardenType {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
}

const gardenTypes: GardenType[] = [
  {
    id: "wellness-gardens",
    title: "Wellness Gardens",
    description: "Peaceful spaces designed for yoga, meditation, and mindfulness practices. These gardens feature comfortable meditation areas, yoga decks, and tranquil water features.",
    image: "https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: ["Stress reduction", "Mindfulness practice", "Mental clarity", "Yoga and meditation"]
  },
  {
    id: "social-gardens",
    title: "Social Gardens",
    description: "Perfect for gatherings and entertainment, these spaces include BBQ areas, comfortable seating, and ambient lighting for evening socializing.",
    image: "https://images.pexels.com/photos/3637585/pexels-photo-3637585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: ["Social gatherings", "BBQ facilities", "Entertainment areas", "Evening ambiance"]
  },
  {
    id: "pet-friendly-gardens",
    title: "Pet-Friendly Gardens",
    description: "Specially designed gardens where you can bring your furry friends. These spaces include pet play areas, shaded spots, and water stations.",
    image: "https://images.pexels.com/photos/3296546/pexels-photo-3296546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: ["Pet exercise area", "Safe environment", "Pet-friendly features", "Water stations"]
  },
  {
    id: "sports-activity-gardens",
    title: "Sports & Activity Gardens",
    description: "Active spaces featuring mini-golf, stretching areas, and other recreational activities. Perfect for those looking to stay active while enjoying the outdoors.",
    image: "https://images.pexels.com/photos/6208089/pexels-photo-6208089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: ["Active recreation", "Exercise space", "Sport facilities", "Fun activities"]
  },
];

const GardenTypes: React.FC = () => {
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
            <h1 className="heading-lg mb-6">Discover Our Garden Types</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We offer a variety of rooftop garden spaces designed for different purposes and activities.
              Explore our garden types and find the perfect space for your needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-16">
          {gardenTypes.map((garden, index) => (
            <motion.div 
              key={garden.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-medium">
                  <img 
                    src={garden.image} 
                    alt={garden.title} 
                    className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h2 className="heading-md mb-4 text-primary-700">{garden.title}</h2>
                <p className="text-gray-600 mb-6 text-lg">{garden.description}</p>
                
                <h3 className="font-bold text-lg mb-3">Key Benefits:</h3>
                <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {garden.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/garden-types/${garden.id}`}
                  className="btn-primary btn-lg inline-flex items-center gap-2"
                >
                  Explore {garden.title}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GardenTypes;