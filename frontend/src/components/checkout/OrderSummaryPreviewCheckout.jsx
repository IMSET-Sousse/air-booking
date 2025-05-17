import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const OrderSummaryPreviewCheckout = ({ bookingItems, getBookingTotal, handleSubmit, isProcessing, isAuthenticated }) => {
  const serviceFeeRate = 0.05; // Example: 5% service fee
  const taxRate = 0.10; // Example: 10% tax on services
  
  const subtotal = getBookingTotal();
  const serviceFee = subtotal * serviceFeeRate;
  const taxes = (subtotal + serviceFee) * taxRate;
  const totalAmount = subtotal + serviceFee + taxes;

  return (
    <Card className="shadow-xl sticky top-24">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><ShoppingBag className="mr-3 h-6 w-6 text-primary" /> Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookingItems.map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <img  src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" src="https://images.unsplash.com/photo-1690721606848-ac5bdcde45ea" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">Guests: {item.guests}, Days: {item.durationDays}</p>
              </div>
            </div>
            <p>${(item.pricePerNight * item.durationDays * item.guests).toFixed(2)}</p>
          </div>
        ))}
        <hr />
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee (5%)</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes (10%)</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" size="lg" className="w-full btn-hover-effect" disabled={isProcessing || bookingItems.length === 0}>
              {isProcessing ? 'Processing...' : `Confirm & Pay ${totalAmount.toFixed(2)}`}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Your Booking</AlertDialogTitle>
              <AlertDialogDescription>
                Please review your booking details. By clicking "Confirm & Pay", you agree to our terms and conditions and that your payment method will be charged.
                Total amount: <span className="font-bold">${totalAmount.toFixed(2)}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Confirm & Pay'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        {!isAuthenticated && bookingItems.length > 0 && (
          <div className="flex items-center p-3 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-700 text-sm">
            <AlertCircle className="h-5 w-5 mr-2" />
            You are not logged in. Please <Link to="/login?redirect=/checkout" className="font-bold underline hover:text-yellow-800">log in</Link> or <Link to="/register?redirect=/checkout" className="font-bold underline hover:text-yellow-800">create an account</Link> to save your booking details.
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummaryPreviewCheckout;