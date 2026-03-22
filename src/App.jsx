import { HashRouter, Routes, Route } from 'react-router-dom';
import { SalonProvider } from './context/SalonContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Gallery from './pages/Gallery/Gallery';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import PrivacyPolicy from './pages/Policy/PrivacyPolicy';
import TermsOfService from './pages/Policy/TermsOfService';
import CookiePolicy from './pages/Policy/CookiePolicy';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <SalonProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="booking" element={<Booking />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
          </Routes>
        </HashRouter>
      </SalonProvider>
    </AuthProvider>
  );
}

export default App;