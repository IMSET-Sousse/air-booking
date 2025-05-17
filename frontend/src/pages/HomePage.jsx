import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServiceTypesSection from '@/components/home/ServiceTypesSection'; // Updated
import FeaturedServices from '@/components/home/FeaturedServices'; // Updated
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ServiceTypesSection />
      <FeaturedServices />
      <Testimonials />
      <CallToAction />
    </motion.div>
  );
};

export default HomePage;