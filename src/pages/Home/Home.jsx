import { Link } from 'react-router-dom';
import { servicesData, testimonialsData, offersData } from '../../data';
import './Home.css';

const Home = () => {
  const featuredServices = [...servicesData.hair, ...servicesData.nails, ...servicesData.spa, ...servicesData.makeup].slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle animate-fadeIn">Welcome to Luxe Salon</span>
          <h1 className="hero-title animate-fadeInUp">Where Beauty Meets Luxury</h1>
          <p className="hero-text animate-fadeInUp delay-1">Experience world-class salon services in an atmosphere of elegance and relaxation.</p>
          <div className="hero-buttons animate-fadeInUp delay-2">
            <Link to="/booking" className="btn btn-primary">Book Appointment</Link>
            <Link to="/services" className="btn btn-outline-white">Our Services</Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section featured-services">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Discover our range of luxurious treatments designed to enhance your natural beauty</p>
          </div>
          <div className="services-grid">
            {featuredServices.map((service, index) => (
              <div key={service.id} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-image">
                  <img src={service.image} alt={service.name} loading="lazy" />
                  <div className="service-overlay">
                    <Link to={`/booking?service=${service.id}`} className="btn btn-light">Book Now</Link>
                  </div>
                </div>
                <div className="service-info">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-meta">
                    <span className="service-price">${service.price}</span>
                    <span className="service-duration">{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section offers-section">
        <div className="container">
          <div className="section-title section-title-light">
            <h2>Special Offers</h2>
            <p>Exclusive deals and promotions for our valued clients</p>
          </div>
          <div className="offers-grid">
            {offersData.map((offer, index) => (
              <div key={offer.id} className="offer-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="offer-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer-code">
                  <span>Use code:</span>
                  <strong>{offer.code}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p>Hear from our satisfied clients about their Luxe Salon experience</p>
          </div>
          <div className="testimonials-slider">
            <div className="testimonials-track">
              {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (<span key={i} className="star">★</span>))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div>
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Luxury?</h2>
            <p>Book your appointment today and let us pamper you with our premium services</p>
            <Link to="/booking" className="btn btn-light">Book Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;