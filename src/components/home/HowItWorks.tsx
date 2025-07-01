import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Key, Heart } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Find Your Garden",
    description: "Search through our network of rooftop gardens based on location, amenities, and garden type.",
    icon: <Search className="h-8 w-8 text-white" />,
    color: "bg-primary-600",
  },
  {
    id: 2,
    title: "Book Your Slot",
    description: "Select your preferred date and time from the available slots and complete your booking.",
    icon: <Calendar className="h-8 w-8 text-white" />,
    color: "bg-secondary-600",
  },
  {
    id: 3,
    title: "Access Your Oasis",
    description: "Receive a digital key to access the garden space at your scheduled time.",
    icon: <Key className="h-8 w-8 text-white" />,
    color: "bg-accent-500",
  },
  {
    id: 4,
    title: "Enjoy & Repeat",
    description: "Enjoy your time in nature, leave a review, and book your next visit.",
    icon: <Heart className="h-8 w-8 text-white" />,
    color: "bg-success-500",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="section bg-gradient-to-b from-white to-primary-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl text-primary-800 mb-6">How It Works</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            Urban Oasis makes it easy to discover and book your perfect rooftop retreat.
            Follow these simple steps to transform your urban experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center">
                <div className={`${step.color} h-20 w-20 rounded-2xl rotate-45 flex items-center justify-center mb-8 shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                  <div className="-rotate-45">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-display text-2xl text-primary-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent transform -translate-x-8" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative mt-20 bg-white rounded-2xl p-12 shadow-soft overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-texture-pattern bg-cover opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-display text-3xl text-primary-800 mb-3">Ready to Find Your Urban Oasis?</h3>
              <p className="text-primary-600 text-lg">Create an account and start booking your garden escapes today.</p>
            </div>
            <button className="btn-primary btn-lg text-lg px-10 py-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;