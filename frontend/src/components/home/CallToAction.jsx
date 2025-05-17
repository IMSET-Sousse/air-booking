import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Gift, Bell } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-80 transform -skew-y-3 scale-110"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Elevate Your adventure Experience?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers in Tunisia. Discover exclusive deals, new arrivals, and enjoy fast.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex items-center text-gray-700">
              <Gift className="h-5 w-5 text-primary mr-2" />
              <span>Exclusive Deals Weekly</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-gray-300"></div>
            <div className="flex items-center text-gray-700">
              <Bell className="h-5 w-5 text-primary mr-2" />
              <span>New Arrival Notifications</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hover-effect text-lg px-8 py-3">
              <Link to="/products">Book now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-3">
              <Link to="/register">Create an Account</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;