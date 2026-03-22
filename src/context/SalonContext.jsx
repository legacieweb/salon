import { createContext, useContext, useState, useEffect } from 'react';

const SalonContext = createContext();

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};

export const SalonProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    service: null,
    staff: null,
    date: null,
    time: null,
    customerInfo: null
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update booking
  const updateBooking = (key, value) => {
    setBooking(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Clear booking
  const clearBooking = () => {
    setBooking({
      service: null,
      staff: null,
      date: null,
      time: null,
      customerInfo: null
    });
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = {
    booking,
    updateBooking,
    clearBooking,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    isScrolled,
    isLoading,
    setIsLoading,
    scrollToTop
  };

  return (
    <SalonContext.Provider value={value}>
      {children}
    </SalonContext.Provider>
  );
};

export default SalonContext;