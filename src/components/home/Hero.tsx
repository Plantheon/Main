import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494380963178-7e05eb8fe22c?q=80&w=3991&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white font-display mb-6">
            Transform urban living with your personal rooftop retreat
          </h1>
          
          <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
            Discover a network of beautiful rooftop gardens throughout the city. 
            Escape the concrete jungle and reconnect with nature whenever you need to.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/booking" 
              className="btn-primary btn-lg"
            >
              Book Your Oasis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              to="/garden-types" 
              className="btn-outline btn-lg border-white text-white hover:bg-white/10"
            >
              Explore Garden Types
            </Link>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;