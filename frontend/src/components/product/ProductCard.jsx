
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="product-card group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden h-64">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.discount && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              {product.discount}% OFF
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5"
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          </Button>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              {product.oldPrice ? (
                <>
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
