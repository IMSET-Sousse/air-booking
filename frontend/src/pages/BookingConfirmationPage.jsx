import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Placeholder for order details if passed via state or fetched
  // const orderDetails = location.state?.orderDetails;

  // Redirect if no order details are found (e.g., direct navigation)
  // This is a simple check; a real app might verify against a backend.
  // For now, as it's mock, we'll allow access but show generic message if no user.
  /*
  useEffect(() => {
    if (!orderDetails) {
      // navigate('/'); // Or to an orders page
    }
  }, [orderDetails, navigate]);
  */

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
        className="max-w-lg bg-white p-8 md:p-12 rounded-xl shadow-2xl"
      >
        <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Thank you {user ? `, ${user.name},` : ''} for your booking. Your reservation has been successfully processed. A confirmation email with all the details has been sent to {user ? user.email : 'your email address'}.
        </p>
        
        {/* Placeholder for actual order ID or details
        {orderDetails && (
          <div className="mb-8 text-left bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700 mb-2">Order ID: {orderDetails.id}</h3>
            <p className="text-sm text-gray-600">Total Amount: ${orderDetails.totalAmount.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
          </div>
        )}
        */}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
          {user && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/orders"> {/* Assuming an /orders page for booking history */}
                    <FileText className="mr-2 h-5 w-5" />
                    View My Bookings
                </Link>
                </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-sm text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        If you have any questions, please <Link to="/contact" className="text-primary hover:underline">contact support</Link>.
      </motion.div>
    </div>
  );
};

export default BookingConfirmationPage;