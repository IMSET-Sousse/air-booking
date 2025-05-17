
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-bold mb-4 block">Air-Booking</span>
            <p className="text-gray-400 mb-4">
              Your premier online reservation platform in Tunisia. Book accommodations, events, and more with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Quick Links</span>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Service Types</span>
            <ul className="space-y-2">
              <li><Link to="/services?type=accommodation" className="text-gray-400 hover:text-white transition-colors">Accommodation</Link></li>
              <li><Link to="/services?type=event" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/services?type=tour" className="text-gray-400 hover:text-white transition-colors">Tours</Link></li>
              <li><Link to="/services?type=appointment" className="text-gray-400 hover:text-white transition-colors">Appointments</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Contact Us</span>
            <ul className="space-y-3">
              <li className="flex items-start"><MapPin className="mr-2 h-5 w-5 text-gray-400" /><span className="text-gray-400">Tunis, Tunisia</span></li>
              <li className="flex items-center"><Phone className="mr-2 h-5 w-5 text-gray-400" /><span className="text-gray-400">+216 12345678</span></li>
              <li className="flex items-center"><Mail className="mr-2 h-5 w-5 text-gray-400" /><span className="text-gray-400">contact@air-booking.tn</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Air-Booking. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/faq" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
