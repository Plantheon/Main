import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanFeature {
  title: string;
  gardening: boolean | string;
  multiGarden: boolean | string;
}

const subscriptionFeatures: PlanFeature[] = [
  {
    title: "Monthly garden visits",
    gardening: false,
    multiGarden: "Unlimited",
  },
  {
    title: "Gardening Gardens access",
    gardening: true,
    multiGarden: false,
  },
  {
    title: "Pet's Garden access",
    gardening: false,
    multiGarden: true,
  },
  {
    title: "BBQ Gardens access",
    gardening: false,
    multiGarden: true,
  },
  {
    title: "Activity Parc access",
    gardening: false,
    multiGarden: true,
  },
  {
    title: "Priority booking",
    gardening: true,
    multiGarden: true,
  },
  {
    title: "Advanced booking window",
    gardening: "30 days",
    multiGarden: "30 days",
  },

];

const oneTimeRates = [
  {
    title: "BBQ",
    price: "€50",
    duration: "2 hours",
    features: ["BBQ grill", "Lounge furniture", "Bluetooth speakers", "Refrigerator", "Dining tables", "Up to 20 people"]
  },
  {
    title: "Pet's Garden",
    price: "€5",
    duration: "2 hours",
    features: ["Pet play equipment", "Water bowls", "Shade structures", "Waste stations", "Seating areas", "Up to 8 people with pets"]
  },
  {
    title: "Activity Parc",
    price: "€10",
    duration: "2 hours",
    features: ["Sports equipment", "Exercise mats", "Water station", "Towel service", "Shade structures", "Up to 12 people"]
  }
];

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  const subscriptionPlans = [
    {
      id: "gardening",
      name: "Gardening Plan",
      price: billingPeriod === 'monthly' ? 60 : 720,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: "Perfect for gardening enthusiasts. 12-month minimum commitment required.",
      highlight: false,
      commitment: "12-month minimum",
    },
    {
      id: "multiGarden",
      name: "Multi-Garden Plan",
      price: billingPeriod === 'monthly' ? 50 : 600,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: "Access to Pet's Garden, BBQ, and Activity Parc. Great for variety and social activities.",
      highlight: true,
      commitment: "Monthly commitment",
    }
  ];

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
            <h1 className="heading-lg mb-6">Pricing & Plans</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Choose the perfect plan for your urban garden experience. Whether you want to focus on gardening 
              or enjoy multiple garden types, we have options to suit your lifestyle.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-white shadow-sm text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'annual'
                    ? 'bg-white shadow-sm text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg shadow-medium overflow-hidden `}
              >
                
                
                <div className={`p-6 ${plan.highlight ? 'pt-8' : ''}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">€{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 font-medium">{plan.commitment}</span>
                  </div>
                  
                  <button className={`w-full ${plan.highlight ? 'btn-primary' : 'btn-outline'} btn-md mb-4`}>
                    Choose {plan.name}
                  </button>
                </div>
                
                <div className="px-6 pb-6">
                  <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-4">
                    Plan includes:
                  </h4>
                  <ul className="space-y-3">
                    {subscriptionFeatures.map((feature) => {
                      const value = feature[plan.id as keyof typeof feature];
                      return (
                        <li key={feature.title} className="flex items-start">
                          {value !== false ? (
                            <Check size={18} className="text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X size={18} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className="text-gray-700">
                            {feature.title}
                            {typeof value === 'string' && (
                              <span className="ml-1 text-gray-500">({value})</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-md mb-6 text-center">One-Time Bookings</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Not ready for a subscription? Book individual garden sessions whenever you need them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oneTimeRates.map((rate, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{rate.title}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">{rate.price}</span>
                    <span className="text-gray-600 ml-1">/{rate.duration}</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {rate.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={16} className="text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/booking" className="w-full btn-outline btn-md inline-block text-center">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 bg-primary-50 rounded-lg p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-md mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-6">
              We offer corporate packages, event bookings, and special arrangements.
              Contact our team to discuss your specific requirements.
            </p>
            <button className="btn-primary btn-lg">
              Contact For Custom Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;