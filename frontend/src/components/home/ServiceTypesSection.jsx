import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hotel, CalendarCheck, Compass, UserCheck, ArrowRight } from 'lucide-react'; // Example icons

const serviceTypes = [
  {
    id: 'accommodation',
    name: 'Accommodations',
    icon: Hotel,
    description: 'Hotels, apartments, villas',
    imagePlaceholder: 'Modern hotel exterior',
    link: '/services?type=accommodation'
  },
  {
    id: 'event',
    name: 'Events',
    icon: CalendarCheck,
    description: 'Concerts, festivals, shows',
    imagePlaceholder: 'Crowd at a music festival',
    link: '/services?type=event'
  },
  {
    id: 'tour',
    name: 'Tours & Activities',
    icon: Compass,
    description: 'City tours, excursions, adventures',
    imagePlaceholder: 'Tourists exploring a landmark',
    link: '/services?type=tour'
  },
  {
    id: 'appointment',
    name: 'Appointments',
    icon: UserCheck,
    description: 'Consultations, wellness, classes',
    imagePlaceholder: 'Person in a professional setting',
    link: '/services?type=appointment'
  }
];

const ServiceTypesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore by Service Type</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for, from cozy stays to exciting events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={type.link} className="block">
                  <div className="category-card bg-white rounded-lg overflow-hidden shadow-md h-full group">
                    <div className="h-48 overflow-hidden relative">
                      <img  alt={type.imagePlaceholder} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded-full">
                        <IconComponent size={24} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{type.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        <span>Explore now</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceTypesSection;