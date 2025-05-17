import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ChevronLeft, Heart, Share2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/product/ProductCard';
import { useToast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById, getRelatedProducts, loading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
      if (fetchedProduct) {
        setSelectedImage(fetchedProduct.image); // Main image initially
        const fetchedRelated = await getRelatedProducts(fetchedProduct.category, fetchedProduct.id);
        setRelatedProducts(fetchedRelated);
      }
    };
    fetchProduct();
  }, [id, getProductById, getRelatedProducts]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      })
      .then(() => toast({ title: "Shared successfully!"}))
      .catch((error) => toast({ title: "Share failed", description: error.message, variant: "destructive"}));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied!", description: "Product link copied to clipboard."});
    }
  };

  if (loading && !product) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products">
          <Button className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Go back to products
          </Button>
        </Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link to="/products">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </motion.div>

      {/* Product Details Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Gallery */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg mb-4 border">
            <img  alt={product.name} className="w-full h-full object-contain" src={selectedImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'} />
            {product.discount && (
              <Badge variant="destructive" className="absolute top-4 left-4 text-sm">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          {/* Thumbnail images (if product has multiple images) */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((imgSrc, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(imgSrc)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === imgSrc ? 'border-primary' : 'border-transparent'} hover:border-primary transition-all`}
                >
                  <img  alt={`Thumbnail ${index+1}`} className="w-full h-full object-cover" src={imgSrc} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {renderStars(product.rating || 4.5)}
            </div>
            <span className="text-sm text-gray-500">({product.reviews || 0} reviews)</span>
          </div>

          {product.oldPrice ? (
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <p className="text-xl text-gray-500 line-through">${product.oldPrice.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          )}

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="rounded-r-none">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 text-lg font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="rounded-l-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleAddToCart} className="flex-1 btn-hover-effect">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
            <Button size="lg" variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
          </div>

          {/* Availability and Category */}
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm">
              <span className="font-medium text-gray-600">Availability:</span> 
              <span className={`ml-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Category:</span> 
              <Link to={`/products?category=${product.category}`} className="ml-1 text-primary hover:underline">
                {product.category}
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <motion.div 
          className="mt-16 pt-12 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetailPage;