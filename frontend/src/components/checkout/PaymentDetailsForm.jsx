import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";


const PaymentDetailsForm = ({ formData, handleInputChange, formErrors, paymentMethod, setPaymentMethod }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><CreditCard className="mr-3 h-6 w-6 text-primary" /> Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Credit/Debit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">PayPal (Mock)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wave" id="wave" />
            <Label htmlFor="wave">Wave (Mock - Senegal Mobile Money)</Label>
          </div>
        </RadioGroup>

        {paymentMethod === 'card' && (
          <>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="•••• •••• •••• ••••" className={`pl-10 ${formErrors.cardNumber ? 'border-red-500' : ''}`} />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" className={formErrors.expiryDate ? 'border-red-500' : ''} />
                {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="•••" className={`pr-10 ${formErrors.cvv ? 'border-red-500' : ''}`} />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
              </div>
            </div>
          </>
        )}
        {paymentMethod === 'paypal' && (
            <div className="p-4 border rounded-md bg-blue-50 border-blue-200">
                 <p className="text-sm text-blue-700">You would be redirected to PayPal to complete your payment.</p>
            </div>
        )}
        {paymentMethod === 'wave' && (
            <div className="p-4 border rounded-md bg-sky-50 border-sky-200">
                 <p className="text-sm text-sky-700">Instructions for Wave payment would appear here or you'd be prompted on your phone.</p>
            </div>
        )}

        <div className="flex items-center space-x-2 pt-2">
          <Lock className="h-4 w-4 text-green-600" />
          <p className="text-xs text-gray-500">Your payment information is encrypted and secure.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDetailsForm;