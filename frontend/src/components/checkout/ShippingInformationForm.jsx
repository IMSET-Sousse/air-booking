
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';

const ShippingInformationForm = ({ formData, handleInputChange, formErrors }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><Truck className="mr-3 h-6 w-6 text-primary" /> Shipping Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className={formErrors.name ? 'border-red-500' : ''} />
          {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className={formErrors.email ? 'border-red-500' : ''} />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Street Address</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St, Apt 4B" className={formErrors.address ? 'border-red-500' : ''} />
          {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="Tunis" className={formErrors.city ? 'border-red-500' : ''} />
          {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="1001" className={formErrors.postalCode ? 'border-red-500' : ''} />
          {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" value={formData.country} onChange={handleInputChange} disabled />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingInformationForm;
