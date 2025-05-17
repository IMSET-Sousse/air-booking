import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext'; // Updated context
import { Button } from '@/components/ui/button';
import { Trash2, Edit3, CalendarCheck, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const BookingSummaryPage = () => {
  const { currentBookingItems, removeServiceFromBooking, getBookingTotal, clearBooking } = useBooking();
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/checkout');
  };
  
  // Example: Update functionality to navigate to service detail page for editing
  const handleEditBookingItem = (serviceId) => {
    navigate(`/services/${serviceId}`); // User can re-configure and re-add
  };

  if (currentBookingItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <CalendarCheck className="h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Booking is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't selected any services yet.</p>
        <Button asChild size="lg" className="btn-hover-effect">
          <Link to="/services">Explore Services</Link>
        </Button>
      </div>
    );
  }

  const serviceFeeRate = 0.05; 
  const taxRate = 0.10; 
  
  const subtotal = getBookingTotal();
  const serviceFee = subtotal * serviceFeeRate;
  const taxes = (subtotal + serviceFee) * taxRate;
  const totalAmount = subtotal + serviceFee + taxes;


  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Booking Summary</h1>
        <p className="text-gray-600">Review your selected services and proceed to payment.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {currentBookingItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-md overflow-hidden border">
                  <img  src={item.image} alt={item.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/services/${item.id}`}>
                    <h2 className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 mb-1 capitalize">{item.type} - {item.location}</p>
                  <p className="text-sm text-gray-500">Date: {item.startDate} for {item.durationDays} day(s)</p>
                  <p className="text-sm text-gray-500">Guests: {item.guests}</p>
                  <p className="text-lg font-bold text-primary">${item.totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
                   <Button variant="outline" size="sm" onClick={() => handleEditBookingItem(item.id)} className="w-full sm:w-auto">
                    <Edit3 className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeServiceFromBooking(item.id)} className="text-red-500 hover:text-red-700 w-full sm:w-auto">
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/services">
                <ChevronLeft className="mr-2 h-4 w-4" /> Add More Services
              </Link>
            </Button>
            {currentBookingItems.length > 0 && (
              <Button variant="destructive" onClick={clearBooking}>
                Clear Entire Booking
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-xl sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl">Total Estimate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee (5%)</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (10%)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full btn-hover-effect" onClick={handleProceedToPayment}>
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSummaryPage;