import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, MapPin, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Irad Hasnaoui', role: 'Founder & CEO', image: 'irad-hasnaoui'},
    { name: 'ines dhib', role: 'Head of Operations', image: 'awa-diallo' },
    { name: 'Maha hamdene', role: 'Lead Developer', image: 'moussa-faye' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24 hero-gradient text-white text-center"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Air-booking</h1>
  
        </div>
      </motion.section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
               Air-booking is dedicated to online booking in tunisia.
              </p>
          
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
               <img  alt="Diverse group of people collaborating in a modern office" className="w-full h-auto rounded-lg" src="https://images.unsplash.com/photo-1522071820081-009f0129c7da" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Customer First', description: 'We prioritize our customers\' needs and satisfaction above all.' },
              { icon: Package, title: 'Quality Products', description: 'We offer a curated selection of high-quality items from trusted suppliers.' },
              { icon: MapPin, title: 'Local Focus', description: 'We are committed to serving the Senegalese market and supporting local economy.' },
              { icon: Smile, title: 'Integrity & Trust', description: 'We operate with transparency and build lasting relationships based on trust.' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="inline-block p-4 bg-primary text-white rounded-full mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden text-center p-6"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary">
                  <img  alt={member.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Air-Booking Community</h2>
          <p className="text-lg max-w-xl mx-auto mb-8 opacity-90">
            Experience the best of online Booking in Tunisia. Sign up today for exclusive deals and updates!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;