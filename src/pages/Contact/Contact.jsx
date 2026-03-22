import { useState } from 'react';
import { contactInfo } from '../../data';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Contact Us</h1>
          <p className="animate-fadeInUp delay-1">We'd love to hear from you</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              {isSubmitted ? (
                <div className="form-success">
                  <span className="success-icon">✓</span>
                  <h3>Thank You!</h3>
                  <p>We've received your message and will get back to you soon.</p>
                  <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={formErrors.name ? 'error' : ''}
                      />
                      {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? 'error' : ''}
                      />
                      {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service Interest</label>
                      <select id="service" name="service" value={formData.service} onChange={handleChange}>
                        <option value="">Select a service</option>
                        <option value="hair">Hair</option>
                        <option value="nails">Nails</option>
                        <option value="spa">Spa</option>
                        <option value="makeup">Makeup</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={formErrors.message ? 'error' : ''}
                    ></textarea>
                    {formErrors.message && <span className="form-error">{formErrors.message}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <div className="info-card">
                <h2>Get in Touch</h2>
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Address</h4>
                      <p>{contactInfo.address}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <p>{contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>{contactInfo.email}</p>
                    </div>
                  </div>
                </div>

                <div className="hours-section">
                  <h3>Operating Hours</h3>
                  <div className="hours-list">
                    {Object.entries(contactInfo.hours).map(([day, hours]) => (
                      <div key={day} className="hours-item">
                        <span className="day">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                        <span className="time">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="social-section">
                  <h3>Follow Us</h3>
                  <div className="social-links">
                    <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href={contactInfo.social.pinterest} target="_blank" rel="noopener noreferrer">Pinterest</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203615545!2d-118.40257468478516!3d34.07362098060603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147d9%3A0xc1e3df9a5c2e3d9!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1635959481234!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Salon Location"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;