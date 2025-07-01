import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PlanFeature {
  title: string;
  basic: boolean | string;
  premium: boolean | string;
  ultimate: boolean | string;
}

const subscriptionFeatures: PlanFeature[] = [
  {
    title: "Monthly garden visits",
    basic: "4 visits",
    premium: "8 visits",
    ultimate: "Unlimited",
  },
  {
    title: "Wellness Gardens access",
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    title: "Social Gardens access",
    basic: false,
    premium: "4 visits/month",
    ultimate: true,
  },
  {
    title: "Pet-Friendly Gardens access",
    basic: true,
    premium: true,
    ultimate: true,
  },
  {
    title: "Sports & Activity Gardens access",
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    title: "Priority booking",
    basic: false,
    premium: false,
    ultimate: true,
  },
  {
    title: "Guest passes",
    basic: "1/month",
    premium: "2/month",
    ultimate: "4/month",
  },
  {
    title: "Advanced booking window",
    basic: "7 days",
    premium: "14 days",
    ultimate: "30 days",
  },
  {
    title: "Exclusive member events",
    basic: false,
    premium: true,
    ultimate: true,
  },
];

const oneTimeRates = [
  {
    title: "Basic Garden",
    price: "$25",
    duration: "2 hours",
    features: ["Pet-Friendly Gardens", "Small group sizes", "Basic amenities"]
  },
  {
    title: "Equipped Garden",
    price: "$40",
    duration: "2 hours",
    features: ["Wellness Gardens", "Sports & Activity Gardens", "Premium amenities", "Up to 10 people"]
  },
  {
    title: "Premium Garden",
    price: "$60",
    duration: "2 hours",
    features: ["Social Gardens", "Full equipment access", "Luxury amenities", "Up to 20 people"]
  }
];

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic",
      price: billingPeriod === 'monthly' ? 49 : 470,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      discount: billingPeriod === 'annual' ? 'Save 20%' : null,
      description: "Perfect for occasional garden visits and solo relaxation.",
      highlight: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: billingPeriod === 'monthly' ? 99 : 950,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      discount: billingPeriod === 'annual' ? 'Save 20%' : null,
      description: "Great for regular garden use with variety and premium features.",
      highlight: true,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: billingPeriod === 'monthly' ? 199 : 1910,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      discount: billingPeriod === 'annual' ? 'Save 20%' : null,
      description: "For true garden enthusiasts with unlimited access and priority.",
      highlight: false,
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
              Choose the perfect plan for your urban garden experience. Whether you need occasional 
              access or want unlimited visits, we have options to suit your lifestyle.
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
                Annual <span className="text-xs text-primary-600 font-bold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg shadow-medium overflow-hidden ${
                  plan.highlight ? 'ring-2 ring-primary-500 relative' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white text-center text-sm font-medium py-1">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-6 ${plan.highlight ? 'pt-8' : ''}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                    {plan.discount && (
                      <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                        {plan.discount}
                      </span>
                    )}
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
                      const value = feature[plan.id.toLowerCase() as keyof typeof feature];
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
                  <button className="w-full btn-outline btn-md">
                    Book Now
                  </button>
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