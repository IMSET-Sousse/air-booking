import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Fatou Diop',
    role: 'Regular Customer',
    content: "I've been shopping with IradShop for over a year now. Their product quality and customer service are exceptional. Delivery is always on time!",
    avatar: 'fatou-diop',
    rating: 5
  },
  {
    id: 2,
    name: 'Mamadou Sow',
    role: 'Small Business Owner',
    content: "IradShop has been a game-changer for sourcing supplies for my business. The platform is user-friendly and the variety of products is great.",
    avatar: 'mamadou-sow',
    rating: 4
  },
  {
    id: 3,
    name: 'Aisha Ba',
    role: 'Tech Enthusiast',
    content: "Finding the latest gadgets in Senegal used to be tough, but IradShop makes it easy. Their electronics section is well-stocked and prices are competitive.",
    avatar: 'aisha-ba',
    rating: 5
  }
];

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from satisfied bookers experience in Air-booking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-6 flex-grow">
                  <Quote className="h-8 w-8 text-primary opacity-30 mb-4" />
                  <p className="text-gray-700 italic mb-6 leading-relaxed flex-grow">"{testimonial.content}"</p>
                </CardContent>
                <div className="bg-gray-50 p-6 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
                      <AvatarImage src={`https://source.unsplash.com/random/100x100/?portrait,${index}`} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;