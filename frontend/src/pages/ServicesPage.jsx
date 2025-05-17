import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceGrid from '@/components/services/ServiceGrid'; // Updated
import ServiceFilter from '@/components/services/ServiceFilter'; // Updated
import { useServices } from '@/hooks/useServices'; // Updated
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServicesPage = () => {
  const location = useLocation();
  const { services, serviceTypes, loading } = useServices();
  
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]); // Default price for services
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('search') || params.get('destination');
    const typeParam = params.get('type');
    const guestsParam = params.get('guests'); // Placeholder for guest filtering
    const datesParam = params.get('dates'); // Placeholder for date filtering

    if (queryParam) setSearchQuery(queryParam);
    if (typeParam) setSelectedServiceTypes([typeParam]);
    // TODO: Parse datesParam and guestsParam if using them directly for filtering
  }, [location.search]);

  useEffect(() => {
    let tempServices = [...services];

    if (searchQuery) {
      tempServices = tempServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (locationFilter) {
        tempServices = tempServices.filter(service => 
            service.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
    }

    if (selectedServiceTypes.length > 0) {
      tempServices = tempServices.filter(service =>
        selectedServiceTypes.includes(service.type)
      );
    }
    
    // Basic date filtering (highly simplified, needs robust date logic)
    if (dateFilter.startDate) {
        tempServices = tempServices.filter(service => {
            // This is a mock, real availability check would be complex
            if(service.availability.daily) return true; // For tours etc.
            return service.availability[dateFilter.startDate]; // Check first date for now
        });
    }


    tempServices = tempServices.filter(service =>
      service.pricePerNight >= priceRange[0] && service.pricePerNight <= priceRange[1]
    );

    if (sortOption === 'price-asc') {
      tempServices.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOption === 'price-desc') {
      tempServices.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortOption === 'name-asc') {
      tempServices.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      tempServices.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredServices(tempServices);
  }, [services, searchQuery, selectedServiceTypes, priceRange, sortOption, locationFilter, dateFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterApply = () => {
    // This function is called from ServiceFilter, main logic is in useEffect
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setDateFilter({ startDate: '', endDate: '' });
    setSelectedServiceTypes([]);
    setPriceRange([0, 500]);
    setSortOption('default');
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Explore Our Services</h1>
        <p className="text-gray-600 text-lg">Find accommodations, events, tours, and more.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4 lg:w-1/5">
          <ServiceFilter
            serviceTypes={serviceTypes}
            selectedServiceTypes={selectedServiceTypes}
            setSelectedServiceTypes={setSelectedServiceTypes}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            onFilterApply={handleFilterApply}
          />
        </aside>

        <main className="md:w-3/4 lg:w-4/5">
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services, locations..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full"
                />
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleResetFilters} className="w-full sm:w-auto">
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>

          <ServiceGrid services={filteredServices} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default ServicesPage;