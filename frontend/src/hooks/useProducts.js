import { useState, useEffect, useCallback } from 'react';

const allProducts = [
  { id: '1', name: 'Smartphone Pro X', description: 'Latest generation smartphone with AI camera.', price: 699.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', stock: 15, rating: 4.8, reviews: 120, discount: 10, oldPrice: 777.77, featured: true, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30', 'https://images.unsplash.com/photo-1580910051074-3eb694886505', 'https://images.unsplash.com/photo-1603829469693-c915dd476049'] },
  { id: '2', name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones.', price: 199.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', stock: 30, rating: 4.5, reviews: 250, featured: true, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b'] },
  { id: '3', name: 'Men\'s Casual Shirt', description: 'Comfortable cotton shirt for everyday wear.', price: 49.99, category: 'fashion', image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf23', stock: 50, rating: 4.2, reviews: 80 },
  { id: '4', name: 'Women\'s Summer Dress', description: 'Light and airy dress perfect for summer.', price: 79.99, category: 'fashion', image: 'https://images.unsplash.com/photo-1595777457583-46e05b5c1668', stock: 40, rating: 4.6, reviews: 150, discount: 15, oldPrice: 94.11, featured: true, images: ['https://images.unsplash.com/photo-1595777457583-46e05b5c1668', 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217'] },
  { id: '5', name: 'Modern Coffee Table', description: 'Stylish wooden coffee table for your living room.', price: 129.99, category: 'home', image: 'https://images.unsplash.com/photo-1532372429992-661139a95359', stock: 20, rating: 4.7, reviews: 95 },
  { id: '6', name: 'Organic Green Tea', description: 'Premium quality organic green tea leaves.', price: 19.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1576092762791-d07c15900948', stock: 100, rating: 4.9, reviews: 300, featured: false },
  { id: '7', name: 'Yoga Mat Pro', description: 'Eco-friendly non-slip yoga mat.', price: 39.99, category: 'sports', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', stock: 60, rating: 4.4, reviews: 110 },
  { id: '8', name: 'Smartwatch Series 7', description: 'Feature-rich smartwatch with health tracking.', price: 349.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1544890225-2fde0e66692c', stock: 25, rating: 4.7, reviews: 180, featured: true },
  { id: '9', name: 'Leather Wallet', description: 'Genuine leather wallet with multiple compartments.', price: 59.99, category: 'fashion', image: 'https://images.unsplash.com/photo-1609003912038-1612ae1546a3', stock: 70, rating: 4.3, reviews: 60 },
  { id: '10', name: 'Bookshelf Organizer', description: 'Wooden bookshelf for home or office.', price: 89.99, category: 'home', image: 'https://images.unsplash.com/photo-1533421993053-aff63406a435', stock: 35, rating: 4.5, reviews: 75 },
  { id: '11', name: 'Vitamin C Serum', description: 'Brightening and anti-aging facial serum.', price: 29.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1620916566398-39f16927f844', stock: 80, rating: 4.8, reviews: 220, discount: 5, oldPrice: 31.57 },
  { id: '12', name: 'Dumbbell Set', description: 'Adjustable dumbbell set for home workouts.', price: 149.99, category: 'sports', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e', stock: 20, rating: 4.6, reviews: 130 },
];

const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Living' },
  { id: 'beauty', name: 'Beauty & Health' },
  { id: 'sports', name: 'Sports & Outdoors' },
];

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(allProducts);
      setFeaturedProducts(allProducts.filter(p => p.featured));
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  const getProductById = useCallback(async (id) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300)); 
    const product = allProducts.find(p => p.id === id);
    setLoading(false);
    return product;
  }, []);

  const getRelatedProducts = useCallback(async (category, currentProductId) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const related = allProducts.filter(p => p.category === category && p.id !== currentProductId).slice(0, 4);
    setLoading(false);
    return related;
  }, []);

  return { products, featuredProducts, categories, loading, getProductById, getRelatedProducts };
};