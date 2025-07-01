import React from 'react';
import Hero from '../components/home/Hero';
import QuickBooking from '../components/home/QuickBooking';
import FeaturedGardens from '../components/home/FeaturedGardens';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Urban Oasis | Rooftop Garden Retreats</title>
        <meta name="description" content="Transform urban living with your personal rooftop retreat. Urban Oasis connects city dwellers with beautiful garden spaces." />
      </Helmet>
      
      <Hero />
      <QuickBooking />
      <FeaturedGardens />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;