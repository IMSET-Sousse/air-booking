import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { BookingProvider } from '@/contexts/BookingContext'; // Updated from CartProvider
import { AuthProvider } from '@/contexts/AuthContext';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage.jsx';
import ServicesPage from '@/pages/ServicesPage.jsx'; // Updated from ProductsPage
import ServiceDetailPage from '@/pages/ServiceDetailPage.jsx'; // Updated from ProductDetailPage
import BookingSummaryPage from '@/pages/BookingSummaryPage.jsx'; // Updated from CartPage
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import BookingConfirmationPage from '@/pages/BookingConfirmationPage.jsx';

function App() {
  return (
    <AuthProvider>
      <BookingProvider> {/* Updated from CartProvider */}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} /> {/* Updated route */}
            <Route path="services/:id" element={<ServiceDetailPage />} /> {/* Updated route */}
            <Route path="booking-summary" element={<BookingSummaryPage />} /> {/* Updated route */}
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;