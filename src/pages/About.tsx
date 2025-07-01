import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Leaf, Target, Compass, Lightbulb } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Emma Roberts",
    role: "Founder & CEO",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Former urban planner with a passion for creating green spaces in cities. Emma founded Urban Oasis after recognizing the need for accessible garden spaces in urban environments."
  },
  {
    name: "David Chen",
    role: "Head of Garden Design",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Landscape architect with 15 years of experience designing sustainable urban gardens. David leads our team in creating functional, beautiful rooftop spaces."
  },
  {
    name: "Sophia Martinez",
    role: "Community Manager",
    image: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Urban gardening enthusiast and community builder. Sophia manages our growing community of garden members and organizes special events."
  },
  {
    name: "Marcus Johnson",
    role: "Technology Director",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Tech innovator focused on creating seamless digital experiences. Marcus oversees our booking platform and digital access systems."
  }
];

const values = [
  {
    icon: <Leaf className="h-8 w-8 text-white" />,
    title: "Sustainability",
    description: "We create and maintain our gardens using sustainable practices, from rainwater collection to native plantings.",
    color: "bg-primary-600"
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Community",
    description: "We believe in the power of shared spaces to build connections between city dwellers with similar interests.",
    color: "bg-secondary-600"
  },
  {
    icon: <Heart className="h-8 w-8 text-white" />,
    title: "Well-being",
    description: "Our gardens are designed to promote physical, mental, and emotional health through connection with nature.",
    color: "bg-accent-500"
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Accessibility",
    description: "We strive to make green spaces accessible to all urban residents, regardless of living situation.",
    color: "bg-success-500"
  }
];

const About: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-800 mb-8">
              Breathing Life Into Cities
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We exist to elevate the quality of life and well-being of people in urban centers – 
              not just for today, but for generations to come.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Golden Circle Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              Our Golden Circle
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything we do starts with why we exist, guides how we operate, and defines what we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Why */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-xl">
                  <Heart className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
                  <span className="font-display text-2xl font-bold text-primary-700">Why</span>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary-800 mb-4">Our Purpose</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We exist to <strong>elevate the quality of life and well-being</strong> of people in urban centers – 
                not just for today, but for generations to come.
              </p>
            </motion.div>

            {/* How */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full flex items-center justify-center shadow-xl">
                  <Compass className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
                  <span className="font-display text-2xl font-bold text-secondary-700">How</span>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-secondary-800 mb-4">Our Process</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We create <strong>green sanctuaries</strong> where people need them most. 
                We fuse the vibrancy of the city with the healing power of nature – for a life that truly breathes.
              </p>
            </motion.div>

            {/* What */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent-500 to-accent-700 rounded-full flex items-center justify-center shadow-xl">
                  <Lightbulb className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
                  <span className="font-display text-2xl font-bold text-accent-700">What</span>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-accent-800 mb-4">Our Solution</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We <strong>unlock the potential</strong> of unused urban spaces and transform them into 
                rentable green oases that bring nature back to the city.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold text-primary-800 mb-8">
                From Vision to Reality
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Urban Oasis began in 2021 when our founder, Emma Roberts, recognized a critical gap in urban living: 
                  access to nature. As a former urban planner, she witnessed firsthand how the lack of green spaces 
                  affected city residents' well-being and quality of life.
                </p>
                <p className="text-lg">
                  The breakthrough came when Emma realized that cities were full of unused rooftop spaces – 
                  untapped potential waiting to be transformed. What if these forgotten spaces could become 
                  sanctuaries where urban dwellers could reconnect with nature?
                </p>
                <p className="text-lg">
                  Today, Urban Oasis is more than a business – it's a movement. We've transformed over 50 rooftop 
                  spaces into thriving green oases, creating a network of natural sanctuaries that serve thousands 
                  of urban residents seeking balance, peace, and connection with nature.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/5531066/pexels-photo-5531066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Urban Oasis rooftop garden transformation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-gray-600">Gardens Created</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Members</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-primary-800 mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every garden we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${value.color} h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-primary-800 mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Urban Oasis who work tirelessly to create and maintain 
              our garden spaces and community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
              Join Our Mission
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Be part of the movement to transform urban living. Whether you have a rooftop to share, 
              skills to contribute, or simply want to experience the healing power of nature in the city, 
              we invite you to join our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
                Become a Member
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;