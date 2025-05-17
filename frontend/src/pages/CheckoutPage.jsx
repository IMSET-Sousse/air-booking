
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

import ShippingInformationForm from '@/components/checkout/ShippingInformationForm';
import PaymentDetailsForm from '@/components/checkout/PaymentDetailsForm';
import OrderSummaryPreviewCheckout from '@/components/checkout/OrderSummaryPreviewCheckout';
import { validateCheckoutForm } from '@/lib/checkoutValidation';

const CheckoutPage = () => {
  const { currentBookingItems, getBookingTotal, clearBooking } = useBooking();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Tunisia', 
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
    }

    const currentFormData = { ...formData, paymentMethod };
    const errors = validateCheckoutForm(currentFormData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your booking.",
        variant: "destructive",
      });
      navigate('/login?redirect=/checkout');
      return;
    }
    
    if (currentBookingItems.length === 0) {
        toast({
            title: "Empty Booking",
            description: "Your booking is empty. Please add services.",
            variant: "destructive",
        });
        navigate('/services');
        return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    
    toast({
      title: "Booking Confirmed!",
      description: "Thank you for your booking. Details have been sent to your email.",
      className: "bg-green-500 text-white",
    });
    clearBooking();
    navigate('/booking-confirmation');
  };

  if (currentBookingItems.length === 0 && !isProcessing) {
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Booking is Empty</h1>
        <p className="text-gray-600 mb-8">Add some services to your booking before proceeding.</p>
        <Button asChild size="lg">
          <Link to="/services">Explore Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <h1 className="text-3xl md:text-4xl font-bold">Confirm & Pay</h1>
        <Button variant="outline" asChild>
          <Link to="/booking-summary"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Summary</Link>
        </Button>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ShippingInformationForm
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
            />
            <PaymentDetailsForm
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OrderSummaryPreviewCheckout
              bookingItems={currentBookingItems}
              getBookingTotal={getBookingTotal}
              handleSubmit={handleSubmit}
              isProcessing={isProcessing}
              isAuthenticated={isAuthenticated}
            />
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
