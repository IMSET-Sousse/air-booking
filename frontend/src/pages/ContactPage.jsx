import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
      className: "bg-green-500 text-white",
    });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
  };

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            We're here to help! Whether you have a question , an order, or just want to say hello, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'border-red-500' : ''} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} className={errors.email ? 'border-red-500' : ''} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Regarding..." value={formData.subject} onChange={handleInputChange} className={errors.subject ? 'border-red-500' : ''} />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" name="message" placeholder="Type your message here..." rows={5} value={formData.message} onChange={handleInputChange} className={errors.message ? 'border-red-500' : ''} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full btn-hover-effect" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (<><Send className="mr-2 h-5 w-5" /> Send Message</>)}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Information</h2>
              <ul className="space-y-6 text-gray-600">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Address:</span>
                    <p>Sousse, Tunisia</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Phone:</span>
                    <p>+221 44699892</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Email:</span>
                    <p>irad.hasnaoui@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Business Hours</h2>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium text-gray-800">Monday - Friday:</span> 9:00 AM - 6:00 PM</li>
                <li><span className="font-medium text-gray-800">Saturday:</span> 10:00 AM - 4:00 PM</li>
                <li><span className="font-medium text-gray-800">Sunday:</span> Closed</li>
              </ul>
            </div>
             {/* Placeholder for Map - Could use OpenStreetMap iframe if needed */}
            <div className="bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Location</h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img  alt="Map showing Dakar, Senegal" className="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1605003839935-27e55a8196e3"/>
                </div>
                <p className="text-xs text-gray-500 mt-2">Map image is for illustrative purposes.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;