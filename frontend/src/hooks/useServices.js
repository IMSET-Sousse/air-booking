
import { useState, useEffect, useCallback } from 'react';

const allServicesData = [
  { 
    id: '1', 
    name: 'Beachfront Resort Hammamet', 
    type: 'accommodation',
    location: 'Hammamet, Tunisia',
    description: 'Luxurious room with sea view, king-size bed, and private balcony. Includes breakfast and spa access.', 
    pricePerNight: 180,
    availability: { 
      '2025-06-01': true, '2025-06-02': true, '2025-06-03': false, '2025-06-04': true,
      '2025-07-10': true, '2025-07-11': true, '2025-07-12': true,
    },
    minGuests: 1,
    maxGuests: 3,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', 
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2glMjByZXNvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=800&q=60'
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    stock: 8, 
    rating: 4.9, 
    reviews: 150, 
    featured: true 
  },
  { 
    id: '2', 
    name: 'Medina Charm Boutique Hotel', 
    type: 'accommodation',
    location: 'Tunis, Tunisia',
    description: 'Authentic hotel in the heart of Tunis Medina, close to souks and historical sites. Queen bed, traditional decor.', 
    pricePerNight: 130,
    availability: { '2025-06-15': true, '2025-06-16': true, '2025-08-01': true },
    minGuests: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Air Conditioning', 'Courtyard Cafe', 'Rooftop Terrace'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    ],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    stock: 12, 
    rating: 4.6, 
    reviews: 280, 
    featured: true 
  },
  { 
    id: '3', 
    name: 'Carthage International Festival Pass', 
    type: 'event',
    location: 'Roman Theatre of Carthage, Tunis',
    description: 'Experience world-class performances at the historic Carthage festival. Full pass.', 
    pricePerNight: 75, 
    availability: { '2025-07-15': true, '2025-07-20': true, '2025-07-25': true }, 
    minGuests: 1,
    maxGuests: 5,
    amenities: ['Live Music', 'Theatre', 'Cultural Shows'],
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    stock: 150, 
    rating: 4.8, 
    reviews: 450, 
    featured: true
  },
  { 
    id: '4', 
    name: 'Sahara Desert Safari (2 Days)', 
    type: 'tour',
    location: 'Douz, Tunisia (Gateway to Sahara)',
    description: 'An unforgettable 2-day guided camel trek and overnight stay in a desert camp under the stars.', 
    pricePerNight: 250, 
    availability: { 'weekly_departs_fri': true }, 
    minGuests: 2,
    maxGuests: 8,
    amenities: ['Guided tour', 'Camel ride', 'Camp accommodation', 'Meals included'],
    images: ['https://images.unsplash.com/photo-1542801706-653595000910?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FoYXJhJTIwZGVzZXJ0JTIwdG91cnxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=800&q=60'],
    image: 'https://images.unsplash.com/photo-1542801706-653595000910?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FoYXJhJTIwZGVzZXJ0JTIwdG91cnxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=800&q=60',
    stock: 20, 
    rating: 4.9, 
    reviews: 210 
  },
   { 
    id: '5', 
    name: 'Tunisian Cuisine Cooking Class', 
    type: 'appointment',
    location: 'Sidi Bou Said, Tunisia',
    description: 'Learn to prepare authentic Tunisian dishes in a hands-on cooking class with a local chef.', 
    pricePerNight: 60, 
    availability: { 'weekdays_10_to_1_and_3_to_6': true }, 
    minGuests: 1,
    maxGuests: 6,
    amenities: ['Expert Instruction', 'Ingredients included', 'Tasting session'],
    images: ['https://images.unsplash.com/photo-1556910108-f3600389005a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMGNsYXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'],
    image: 'https://images.unsplash.com/photo-1556910108-f3600389005a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMGNsYXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    stock: 15, 
    rating: 4.7, 
    reviews: 110,
    featured: true
  },
];

const serviceTypes = [
  { id: 'accommodation', name: 'Accommodation' },
  { id: 'event', name: 'Events' },
  { id: 'tour', name: 'Tours' },
  { id: 'appointment', name: 'Appointments' },
];

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(allServicesData);
      setFeaturedServices(allServicesData.filter(s => s.featured));
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  const getServiceById = useCallback(async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); 
    const service = allServicesData.find(s => s.id === id);
    setLoading(false);
    return service;
  }, []);

  const getRelatedServices = useCallback(async (type, currentServiceId) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const related = allServicesData.filter(s => s.type === type && s.id !== currentServiceId).slice(0, 4);
    setLoading(false);
    return related;
  }, []);

  const checkAvailability = useCallback(async (serviceId, startDate, durationDays) => {
    const service = allServicesData.find(s => s.id === serviceId);
    if (!service) return false;
    if (service.availability.daily || service.availability.weekly_departs_fri || service.availability.weekdays_10_to_1_and_3_to_6) return true;

    for (let i = 0; i < durationDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      if (!service.availability[dateString]) {
        return false;
      }
    }
    return true;
  }, []);


  return { 
    services, 
    featuredServices, 
    serviceTypes,
    loading, 
    getServiceById, 
    getRelatedServices,
    checkAvailability
  };
};
