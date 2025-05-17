
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // For demo purposes, we'll use a mock login
    // In a real app, this would make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email === 'demo@example.com' && password === 'password') {
          const userData = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          
          toast({
            title: "Login successful",
            description: "Welcome back!",
            duration: 2000,
          });
          
          resolve(userData);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
            duration: 3000,
          });
          
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    // For demo purposes, we'll use a mock registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock registration
        const userData = {
          id: Date.now().toString(),
          name,
          email,
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Registration successful",
          description: "Your account has been created",
          duration: 2000,
        });
        
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 2000,
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
