
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, MapPin, CalendarDays, DollarSign, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';


const ServiceFilter = ({ 
  serviceTypes, 
  selectedServiceTypes, 
  priceRange, 
  setPriceRange, 
  setSelectedServiceTypes,
  locationFilter,
  setLocationFilter,
  dateFilter, 
  setDateFilter,
  onFilterApply
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSelectedServiceTypes, setLocalSelectedServiceTypes] = useState(selectedServiceTypes);
  const [localLocationFilter, setLocalLocationFilter] = useState(locationFilter);
  const [localDateFilter, setLocalDateFilter] = useState(dateFilter);

  useEffect(() => setLocalPriceRange(priceRange), [priceRange]);
  useEffect(() => setLocalSelectedServiceTypes(selectedServiceTypes), [selectedServiceTypes]);
  useEffect(() => setLocalLocationFilter(locationFilter), [locationFilter]);
  useEffect(() => setLocalDateFilter(dateFilter), [dateFilter]);

  const handlePriceChange = (value) => {
    setLocalPriceRange(value);
  };

  const handleServiceTypeChange = (typeId) => {
    setLocalSelectedServiceTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleLocationChange = (e) => {
    setLocalLocationFilter(e.target.value);
  };
  
  const handleDateChange = (e, field) => {
     setLocalDateFilter(prev => ({ ...prev, [field]: e.target.value }));
  };


  const handleApplyFilters = () => {
    setPriceRange(localPriceRange);
    setSelectedServiceTypes(localSelectedServiceTypes);
    setLocationFilter(localLocationFilter);
    setDateFilter(localDateFilter);
    onFilterApply(); 
    setIsOpen(false); 
  };

  const handleResetFilters = () => {
    setLocalPriceRange([0, 500]); 
    setLocalSelectedServiceTypes([]);
    setLocalLocationFilter('');
    setLocalDateFilter({ startDate: '', endDate: '' });
  };
  
  const filterContent = (isMobile = false) => (
    <div className="py-4">
      <div className="mb-6">
        <Label htmlFor={isMobile ? "mobile-location" : "desktop-location"} className="text-sm font-medium mb-1 flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-500"/>Location</Label>
        <Input 
            id={isMobile ? "mobile-location" : "desktop-location"}
            placeholder="e.g., Tunis, Sousse" 
            value={localLocationFilter} 
            onChange={handleLocationChange} 
        />
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium mb-1 flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-gray-500"/>Dates</Label>
        <div className="grid grid-cols-2 gap-2">
            <div>
                <Label htmlFor={isMobile ? "mobile-start-date" : "desktop-start-date"} className="text-xs text-gray-500">Start Date</Label>
                <Input id={isMobile ? "mobile-start-date" : "desktop-start-date"} type="date" value={localDateFilter.startDate} onChange={(e) => handleDateChange(e, 'startDate')} />
            </div>
            <div>
                <Label htmlFor={isMobile ? "mobile-end-date" : "desktop-end-date"} className="text-xs text-gray-500">End Date</Label>
                <Input id={isMobile ? "mobile-end-date" : "desktop-end-date"} type="date" value={localDateFilter.endDate} onChange={(e) => handleDateChange(e, 'endDate')} />
            </div>
        </div>
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center"><DollarSign className="h-4 w-4 mr-2 text-gray-500"/>Price Range (per night/event)</Label>
        <Slider
          value={localPriceRange}
          min={0}
          max={500} 
          step={10}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${localPriceRange[0]}</span>
          <span>${localPriceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center"><Tag className="h-4 w-4 mr-2 text-gray-500"/>Service Type</Label>
        <div className="space-y-2">
          {serviceTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`${isMobile ? 'mobile' : 'desktop'}-type-${type.id}`} 
                checked={localSelectedServiceTypes.includes(type.id)}
                onCheckedChange={() => handleServiceTypeChange(type.id)}
              />
              <label 
                htmlFor={`${isMobile ? 'mobile' : 'desktop'}-type-${type.id}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );


  return (
    <>
      <div className="md:hidden mb-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Services</DialogTitle>
            </DialogHeader>
            {filterContent(true)}
          </DialogContent>
        </Dialog>
      </div>

      <motion.div 
        className="hidden md:block w-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            {(localSelectedServiceTypes.length > 0 || localPriceRange[0] > 0 || localPriceRange[1] < 500 || localLocationFilter || localDateFilter.startDate || localDateFilter.endDate) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs"
                onClick={handleResetFilters}
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          {filterContent(false)}
        </div>
      </motion.div>
    </>
  );
};

export default ServiceFilter;
