import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const BookingContext = createContext(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [currentBookingItems, setCurrentBookingItems] = useState([]);
  const [bookingItemCount, setBookingItemCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const savedBooking = localStorage.getItem('currentBooking');
    if (savedBooking) {
      try {
        const parsedBooking = JSON.parse(savedBooking);
        setCurrentBookingItems(parsedBooking);
        updateBookingItemCount(parsedBooking);
      } catch (error) {
        console.error('Failed to parse booking from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentBooking', JSON.stringify(currentBookingItems));
    updateBookingItemCount(currentBookingItems);
  }, [currentBookingItems]);

  const updateBookingItemCount = (items) => {
    const count = items.reduce((total, item) => total + (item.guests || 1), 0); // Assuming each item represents a booking for one or more guests
    setBookingItemCount(count);
  };

  const addServiceToBooking = (service, details) => { // details = { guests: 2, durationDays: 3, startDate: '2025-06-01' }
    setCurrentBookingItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === service.id);
      
      const bookingItem = { 
        ...service, 
        guests: details.guests, 
        durationDays: details.durationDays,
        startDate: details.startDate,
        totalPrice: service.pricePerNight * details.durationDays * details.guests
      };

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = bookingItem; // Replace if re-booking same service
        return updatedItems;
      } else {
        return [...prevItems, bookingItem];
      }
    });

    toast({
      title: "Service Added to Booking",
      description: `${service.name} has been added to your current booking.`,
      duration: 2000,
    });
  };

  const removeServiceFromBooking = (serviceId) => {
    setCurrentBookingItems(prevItems => prevItems.filter(item => item.id !== serviceId));
    
    toast({
      title: "Service Removed",
      description: "Service has been removed from your booking.",
      duration: 2000,
    });
  };

  const updateBookingDetails = (serviceId, newDetails) => { // e.g. new number of guests or duration
    setCurrentBookingItems(prevItems => 
      prevItems.map(item => {
        if (item.id === serviceId) {
          const updatedItem = { ...item, ...newDetails };
          updatedItem.totalPrice = updatedItem.pricePerNight * updatedItem.durationDays * updatedItem.guests;
          return updatedItem;
        }
        return item;
      })
    );
     toast({
      title: "Booking Updated",
      description: "Booking details have been updated.",
      duration: 2000,
    });
  };

  const clearBooking = () => {
    setCurrentBookingItems([]);
    toast({
      title: "Booking Cleared",
      description: "All services have been removed from your current booking.",
      duration: 2000,
    });
  };

  const getBookingTotal = () => {
    return currentBookingItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <BookingContext.Provider value={{
      currentBookingItems,
      bookingItemCount,
      addServiceToBooking,
      removeServiceFromBooking,
      updateBookingDetails,
      clearBooking,
      getBookingTotal
    }}>
      {children}
    </BookingContext.Provider>
  );
};