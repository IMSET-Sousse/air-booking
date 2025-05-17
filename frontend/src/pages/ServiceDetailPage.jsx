import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BedDouble, Users, CalendarDays, Star, ChevronLeft, Share2, Plus, Minus, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useServices } from '@/hooks/useServices'; // Updated hook
import { useBooking } from '@/contexts/BookingContext'; // Updated context
import ServiceCard from '@/components/services/ServiceCard'; // Updated component
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const { getServiceById, getRelatedServices, checkAvailability, loading } = useServices();
  const { addServiceToBooking } = useBooking();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    startDate: new Date().toISOString().split('T')[0], // Default to today
    durationDays: 1,
    guests: 1,
  });
  const [isAvailable, setIsAvailable] = useState(null); // null, true, or false

  useEffect(() => {
    const fetchService = async () => {
      const fetchedService = await getServiceById(id);
      setService(fetchedService);
      if (fetchedService) {
        setSelectedImage(fetchedService.images ? fetchedService.images[0] : fetchedService.image);
        setBookingDetails(prev => ({ ...prev, guests: fetchedService.minGuests || 1}));
        const fetchedRelated = await getRelatedServices(fetchedService.type, fetchedService.id);
        setRelatedServices(fetchedRelated);
      }
    };
    fetchService();
  }, [id, getServiceById, getRelatedServices]);

  const handleBookingDetailChange = (e) => {
    const { name, value } = e.target;
    let val = name === 'guests' || name === 'durationDays' ? parseInt(value, 10) : value;
    if (name === 'guests' && service && val < service.minGuests) val = service.minGuests;
    if (name === 'guests' && service && val > service.maxGuests) val = service.maxGuests;
    if (name === 'durationDays' && val < 1) val = 1;
    
    setBookingDetails(prev => ({ ...prev, [name]: val }));
    setIsAvailable(null); // Reset availability check status
  };

  const handleCheckAvailability = async () => {
    if (!service) return;
    const available = await checkAvailability(service.id, bookingDetails.startDate, bookingDetails.durationDays);
    setIsAvailable(available);
    toast({
        title: available ? "Available!" : "Not Available",
        description: available ? `This service is available for the selected dates and guests.` : `This service is not available for the selected dates/guests. Please try other options.`,
        variant: available ? "default" : "destructive",
        className: available ? "bg-green-100 border-green-400 text-green-700" : "",
    });
  };

  const handleAddToBooking = () => {
    if (service && isAvailable) { // Only allow adding if availability confirmed and true
      addServiceToBooking(service, bookingDetails);
      navigate('/booking-summary');
    } else if (service && isAvailable === null) {
        toast({
            title: "Check Availability First",
            description: "Please check the availability before adding to booking.",
            variant: "destructive"
        });
    } else if (service && !isAvailable) {
         toast({
            title: "Service Not Available",
            description: "This service is not available for the selected criteria.",
            variant: "destructive"
        });
    }
  };
  
  const handleShare = () => {
    if (navigator.share && service) {
      navigator.share({
        title: service.name,
        text: `Check out this service: ${service.name}`,
        url: window.location.href,
      })
      .then(() => toast({ title: "Shared successfully!"}))
      .catch((error) => toast({ title: "Share failed", description: error.message, variant: "destructive"}));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied!", description: "Service link copied to clipboard."});
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading && !service) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-screen">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/services">
          <Button className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Go back to services
          </Button>
        </Link>
      </div>
    );
  }

  const totalPrice = (service.pricePerNight * bookingDetails.durationDays * bookingDetails.guests).toFixed(2);


  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link to="/services">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
        </Link>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-4 border">
            <img  alt={service.name} className="w-full h-full object-cover" src={selectedImage} src="https://images.unsplash.com/photo-1690721606848-ac5bdcde45ea" />
            <Badge variant="secondary" className="absolute top-4 left-4 text-sm capitalize">
              {service.type}
            </Badge>
          </div>
          {service.images && service.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto py-2">
              {service.images.map((imgSrc, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(imgSrc)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === imgSrc ? 'border-primary' : 'border-transparent'} hover:border-primary transition-all`}
                >
                  <img  alt={`Thumbnail ${index+1} for ${service.name}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold">{service.name}</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2 text-primary"/> {service.location}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {renderStars(service.rating || 0)}
            </div>
            <span className="text-sm text-gray-500">({service.reviews || 0} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-primary">${service.pricePerNight.toFixed(2)} <span className="text-base font-normal text-gray-500">/ night/person/ticket</span></p>
          
          <p className="text-gray-700 leading-relaxed">{service.description}</p>

          {service.amenities && service.amenities.length > 0 && (
            <div>
                <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {service.amenities.map(amenity => (
                        <li key={amenity} className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500"/>{amenity}</li>
                    ))}
                </ul>
            </div>
          )}

          {/* Booking Form */}
          <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h3 className="text-xl font-semibold">Book this Service</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input type="date" id="startDate" name="startDate" value={bookingDetails.startDate} onChange={handleBookingDetailChange} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                    <Label htmlFor="durationDays">{service.type === 'event' ? 'Tickets' : 'Duration (days)'}</Label>
                    <Input type="number" id="durationDays" name="durationDays" value={bookingDetails.durationDays} onChange={handleBookingDetailChange} min="1" />
                </div>
            </div>
            <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input type="number" id="guests" name="guests" value={bookingDetails.guests} onChange={handleBookingDetailChange} min={service.minGuests || 1} max={service.maxGuests || 10} />
            </div>
            <Button onClick={handleCheckAvailability} variant="outline" className="w-full">Check Availability</Button>
            {isAvailable === true && <p className="text-green-600 text-sm text-center">This service is available for your selection!</p>}
            {isAvailable === false && <p className="text-red-600 text-sm text-center">Sorry, this service is not available for your selection.</p>}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleAddToBooking} className="flex-1 btn-hover-effect" disabled={isAvailable !== true || loading}>
              <BedDouble className="mr-2 h-5 w-5" /> 
              {isAvailable !== true && !loading ? 'Check Availability First' : `Book Now ($${totalPrice})`}
            </Button>
            <Button size="lg" variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {relatedServices.length > 0 && (
        <motion.div 
          className="mt-16 pt-12 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedServices.map((relatedService) => (
              <ServiceCard key={relatedService.id} service={relatedService} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceDetailPage;