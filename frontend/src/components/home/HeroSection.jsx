
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, CalendarDays, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (destination) queryParams.append('destination', destination);
    if (dates) queryParams.append('dates', dates);
    if (guests) queryParams.append('guests', guests);
    navigate(`/services?${queryParams.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="text-center text-white mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Book Your Next Tunisian Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Discover and book amazing accommodations, events, and services across Tunisia easily and quickly.
          </motion.p>
        </div>
        
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div className="md:col-span-2">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination/Service</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="destination" 
                type="text" 
                placeholder="e.g., Tunis, Sousse, Hotel Name" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
            <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                    id="dates" 
                    type="text" 
                    placeholder="Select Dates" 
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="pl-10 w-full" 
                />
            </div>
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                    id="guests" 
                    type="number" 
                    min="1"
                    placeholder="2 Guests" 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10 w-full"
                />
            </div>
          </div>
          <Button type="submit" size="lg" className="md:col-start-4 btn-hover-effect w-full h-10 mt-3 md:mt-0">
            Search
          </Button>
        </motion.form>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12"
        >
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
                <Link to="/services">
                    Explore All Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
