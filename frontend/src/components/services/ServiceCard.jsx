import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, CalendarDays } from 'lucide-react'; // More relevant icons for services
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { useBooking } from '@/contexts/BookingContext'; // Not adding to booking from card directly in this version

const ServiceCard = ({ service }) => {
  // const { addServiceToBooking } = useBooking();

  // const handleBookNow = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // For a reservation system, "Book Now" usually goes to detail page for date/guest selection
  //   // Direct booking from card might be complex unless default parameters are assumed
  //   // For now, let's navigate to detail page. Actual booking logic is on ServiceDetailPage.
  //   // addServiceToBooking(service, { guests: 1, durationDays: 1, startDate: 'default_date' }); 
  // };

  const renderPrice = () => {
    if (service.type === 'event' || service.type === 'tour' || service.type === 'appointment') {
      return `$${service.pricePerNight.toFixed(2)} / person/ticket`;
    }
    return `$${service.pricePerNight.toFixed(2)} / night`;
  };
  
  const renderRating = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="product-card group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl h-full flex flex-col"
    >
      <Link to={`/services/${service.id}`} className="block flex flex-col flex-grow">
        <div className="relative overflow-hidden h-56"> {/* Adjusted height for service images */}
          <img  
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
           src="https://images.unsplash.com/photo-1602563673842-87d639cca88f" />
          {service.discount && ( // Assuming services can have discounts
            <Badge variant="destructive" className="absolute top-2 left-2">
              {service.discount}% OFF
            </Badge>
          )}
           <Badge variant="secondary" className="absolute top-2 right-2 capitalize">
              {service.type}
            </Badge>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-900 mb-1 text-lg truncate">{service.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{service.location}</span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{service.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t">
            <div className="flex flex-col">
                <span className="text-md font-bold text-primary">{renderPrice()}</span>
                 {renderRating(service.rating)}
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-primary border-primary hover:bg-primary/10"
              // onClick={handleBookNow} // Simplified: card click navigates to details
            >
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;