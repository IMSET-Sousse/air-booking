import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilter from '@/components/product/ProductFilter';
import { useProducts } from '@/hooks/useProducts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const ProductsPage = () => {
  const location = useLocation();
  const { products, categories, loading } = useProducts();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('default');

  // Parse search query from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('search');
    const categoryParam = params.get('category');

    if (queryParam) {
      setSearchQuery(queryParam);
    }
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);

  // Filter and sort products whenever dependencies change
  useEffect(() => {
    let tempProducts = [...products];

    // Apply search filter
    if (searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    tempProducts = tempProducts.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    if (sortOption === 'price-asc') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(tempProducts);
  }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterApply = () => {
    // This function is called from ProductFilter component when filters are applied
    // The actual filtering logic is in the useEffect hook above
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
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
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600 text-lg">Explore our collection of high-quality products.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar (Desktop) / Trigger (Mobile) */}
        <aside className="md:w-1/4">
          <ProductFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onFilterApply={handleFilterApply}
          />
        </aside>

        {/* Products Grid and Search/Sort */}
        <main className="md:w-3/4">
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
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

          <ProductGrid products={filteredProducts} loading={loading} />
          
          {/* Pagination (Implement if needed) */}
          {/* 
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button>Next</Button>
          </div> 
          */}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;