import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { servicesData } from '../../data';
import './Services.css';

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const urlHash = window.location.hash;
  const [activeCategory, setActiveCategory] = useState(urlCategory || 'hair');

  // Scroll to category section when URL changes
  useEffect(() => {
    if (urlHash === '#services-tabs') {
      const element = document.getElementById('services-tabs');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [urlCategory, urlHash]);

  useEffect(() => {
    if (urlCategory && ['hair', 'nails', 'spa', 'makeup'].includes(urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'hair') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const categories = [
    { id: 'hair', name: 'Hair', icon: 'Scissors' },
    { id: 'nails', name: 'Nails', icon: 'Polish' },
    { id: 'spa', name: 'Spa', icon: 'Spa' },
    { id: 'makeup', name: 'Makeup', icon: 'Brush' }
  ];

  const services = servicesData[activeCategory] || [];

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Our Services</h1>
          <p className="animate-fadeInUp delay-1">Discover our comprehensive range of luxury treatments</p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="services-tabs-section" id="services-tabs">
        <div className="container">
          <div className="services-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section services-list-section">
        <div className="container">
          <div className="services-list-grid">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="service-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-item-image">
                  <img src={service.image} alt={service.name} loading="lazy" />
                </div>
                <div className="service-item-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-item-details">
                    <div className="service-item-meta">
                      <span className="price">${service.price}</span>
                      <span className="duration">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {service.duration}
                      </span>
                    </div>
                    <Link to={`/booking?service=${service.id}`} className="btn btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section services-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Need Help Choosing?</h2>
            <p>Our expert team is here to help you find the perfect treatment</p>
            <Link to="/contact" className="btn btn-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;