import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { servicesData, staffData } from '../../data';
import './Booking.css';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login, signup } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  
  // Auth form in modal
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [authError, setAuthError] = useState('');
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Get all services
  const allServices = [
    ...servicesData.hair,
    ...servicesData.nails,
    ...servicesData.spa,
    ...servicesData.makeup
  ];

  // Check for service in URL
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const service = allServices.find(s => s.id === parseInt(serviceId));
      if (service) {
        addService(service);
      }
    }
  }, [searchParams]);

  // Calculate pricing
  const calculateTotal = () => {
    const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const discount = selectedServices.length > 3 ? total * 0.20 : 0;
    return { total, discount, final: total - discount };
  };

  const { total, discount, final } = calculateTotal();

  const addService = (service) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
      setShowAddServiceModal(true);
    }
  };

  const removeService = (serviceId) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const handleAddMoreServices = () => {
    setShowAddServiceModal(false);
    setStep(1);
  };

  const handleContinueToStaff = () => {
    setShowAddServiceModal(false);
    setStep(2);
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 2 && selectedServices.length === 0) newErrors.service = 'Please select at least one service';
    if (currentStep === 2 && !selectedStaff) newErrors.staff = 'Please select a staff member';
    if (currentStep === 3 && !selectedDate) newErrors.date = 'Please select a date';
    if (currentStep === 3 && !selectedTime) newErrors.time = 'Please select a time';
    if (currentStep === 4) {
      if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
      if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Invalid email';
      if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Save booking to user in localStorage
  const saveBooking = () => {
    const booking = {
      id: Date.now(),
      services: selectedServices.map(s => s.name).join(', '),
      staff: selectedStaff.name,
      date: selectedDate,
      time: selectedTime,
      price: final,
      originalPrice: total,
      discount: discount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Get existing clients
    const clients = JSON.parse(localStorage.getItem('luxe_clients') || '[]');
    const clientIndex = clients.findIndex(c => c.email === user.email);
    
    if (clientIndex !== -1) {
      if (!clients[clientIndex].bookings) {
        clients[clientIndex].bookings = [];
      }
      clients[clientIndex].bookings.push(booking);
      localStorage.setItem('luxe_clients', JSON.stringify(clients));
      
      // Update current user
      const updatedUser = { ...clients[clientIndex] };
      localStorage.setItem('luxe_user', JSON.stringify(updatedUser));
    }

    setIsConfirmed(true);
  };

  const handleBooking = () => {
    // Check if user is logged in
    if (!user) {
      // Pre-fill auth form with customer info
      setAuthForm({ ...authForm, name: customerInfo.name, email: customerInfo.email, phone: customerInfo.phone });
      setShowAuthModal(true);
      return;
    }

    if (validateStep(4)) {
      saveBooking();
    }
  };

  // Handle guest booking (no account needed)
  const handleGuestBooking = () => {
    // Show a quick guest form modal
    setShowAuthModal(true);
    setAuthMode('guest');
  };

  // Handle auth in modal
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const result = login(authForm.email, authForm.password);
      if (result.success) {
        setShowAuthModal(false);
        saveBooking();
      } else {
        setAuthError(result.message);
      }
    } else {
      const result = signup(authForm.name, authForm.email, authForm.password, authForm.phone);
      if (result.success) {
        setShowAuthModal(false);
        saveBooking();
      } else {
        setAuthError(result.message);
      }
    }
  };

  // Complete booking as guest
  const completeGuestBooking = () => {
    if (!authForm.name || !authForm.email || !authForm.phone) {
      setAuthError('Please fill in all fields');
      return;
    }
    
    // Save booking without account
    const booking = {
      id: Date.now(),
      services: selectedServices.map(s => s.name).join(', '),
      staff: selectedStaff.name,
      date: selectedDate,
      time: selectedTime,
      price: final,
      originalPrice: total,
      discount: discount,
      status: 'confirmed',
      guestName: authForm.name,
      guestEmail: authForm.email,
      createdAt: new Date().toISOString()
    };
    
    // Store guest booking separately (not linked to an account)
    const guestBookings = JSON.parse(localStorage.getItem('luxe_guest_bookings') || '[]');
    guestBookings.push(booking);
    localStorage.setItem('luxe_guest_bookings', JSON.stringify(guestBookings));
    
    setIsConfirmed(true);
  };

  const handleCustomerInfo = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Generate dates for next 30 days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
      }
    }
    return dates;
  };

  if (isConfirmed) {
    return (
      <div className="booking-page">
        <section className="page-header">
          <div className="container">
            <div className="confirmation">
              <div className="confirmation-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h1>Booking Confirmed!</h1>
              <p>Thank you for your booking{user ? '' : `, ${customerInfo.name}`}! We've sent a confirmation to {user?.email || customerInfo.email}</p>
              
              <div className="booking-summary">
                <div className="summary-item">
                  <span>Services:</span>
                  <strong>{selectedServices.map(s => s.name).join(', ')}</strong>
                </div>
                {discount > 0 && (
                  <div className="summary-item discount">
                    <span>Discount (20%):</span>
                    <strong>-${discount.toFixed(2)}</strong>
                  </div>
                )}
                <div className="summary-item">
                  <span>Total:</span>
                  <strong>${final.toFixed(2)}</strong>
                </div>
                <div className="summary-item">
                  <span>Specialist:</span>
                  <strong>{selectedStaff?.name}</strong>
                </div>
                <div className="summary-item">
                  <span>Date:</span>
                  <strong>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <strong>{selectedTime}</strong>
                </div>
              </div>
              
              {user ? (
                <div className="confirmation-actions">
                  <Link to="/dashboard" className="btn btn-primary">View My Bookings</Link>
                  <Link to="/" className="btn btn-secondary">Back to Home</Link>
                </div>
              ) : (
                <Link to="/" className="btn btn-primary">Back to Home</Link>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Book an Appointment</h1>
          <p className="animate-fadeInUp delay-1">
            {selectedServices.length > 0 
              ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected` 
              : 'Select your preferred services and time'}
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="booking-progress">
        <div className="container">
          <div className="progress-steps">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`step ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                <div className="step-number">{step > s ? '✓' : s}</div>
                <div className="step-label">
                  {s === 1 && 'Services'}
                  {s === 2 && 'Specialist'}
                  {s === 3 && 'Date & Time'}
                  {s === 4 && 'Confirm'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section booking-form-section">
        <div className="container">
          <div className="booking-content">
            {/* Step 1: Select Services */}
            {step === 1 && (
              <div className="booking-step">
                <h2>Select Your Services</h2>
                <p className="step-hint">Choose multiple services - Get 20% off when you book 4+ services!</p>
                <div className="services-select-grid">
                  {allServices.map((service) => (
                    <div
                      key={service.id}
                      className={`service-select-card ${selectedServices.find(s => s.id === service.id) ? 'selected' : ''}`}
                      onClick={() => addService(service)}
                    >
                      <img src={service.image} alt={service.name} />
                      <div className="service-select-info">
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <div className="service-select-meta">
                          <span className="price">${service.price}</span>
                          <span className="duration">{service.duration}</span>
                        </div>
                        {selectedServices.find(s => s.id === service.id) && (
                          <div className="selected-badge">Selected</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Selected Services Summary */}
                {selectedServices.length > 0 && (
                  <div className="selected-services-summary">
                    <h3>Your Selected Services</h3>
                    <div className="selected-services-list">
                      {selectedServices.map((service, index) => (
                        <div key={service.id} className="selected-service-item">
                          <span className="service-number">{index + 1}</span>
                          <div className="service-details">
                            <span className="service-name">{service.name}</span>
                            <span className="service-duration">{service.duration}</span>
                          </div>
                          <span className="service-price">${service.price}</span>
                          <button 
                            className="remove-service-btn"
                            onClick={(e) => { e.stopPropagation(); removeService(service.id); }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="pricing-summary">
                      <div className="price-row">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="price-row discount">
                          <span>Discount (20%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="price-row total">
                        <span>Total</span>
                        <span>${final.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Staff */}
            {step === 2 && (
              <div className="booking-step">
                <h2>Select a Specialist</h2>
                <div className="staff-select-grid">
                  {staffData.map((staff) => (
                    <div
                      key={staff.id}
                      className={`staff-select-card ${selectedStaff?.id === staff.id ? 'selected' : ''}`}
                      onClick={() => setSelectedStaff(staff)}
                    >
                      <img src={staff.image} alt={staff.name} />
                      <div className="staff-select-info">
                        <h3>{staff.name}</h3>
                        <span className="role">{staff.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.staff && <span className="error-message">{errors.staff}</span>}
              </div>
            )}

            {/* Step 3: Select Date & Time */}
            {step === 3 && (
              <div className="booking-step">
                <h2>Select Date & Time</h2>
                <div className="date-time-selection">
                  <div className="date-section">
                    <h3>Choose a Date</h3>
                    <div className="date-select-grid">
                      {getDates().map((date) => (
                        <button
                          key={date.value}
                          className={`date-select-btn ${selectedDate === date.value ? 'selected' : ''}`}
                          onClick={() => setSelectedDate(date.value)}
                        >
                          {date.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="time-section">
                    <h3>Choose a Time</h3>
                    <div className="time-select-grid">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          className={`time-select-btn ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {errors.date && <span className="error-message">{errors.date}</span>}
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="booking-step">
                <h2>Confirm Your Booking</h2>
                <div className="booking-summary-card">
                  <h3>Appointment Summary</h3>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Services:</span>
                      <strong>{selectedServices.map(s => s.name).join(', ')}</strong>
                    </div>
                    {discount > 0 && (
                      <div className="summary-row discount">
                        <span>Discount (20% off 4+ services):</span>
                        <strong>-${discount.toFixed(2)}</strong>
                      </div>
                    )}
                    <div className="summary-row total">
                      <span>Total:</span>
                      <strong>${final.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Specialist:</span>
                      <strong>{selectedStaff?.name}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Date:</span>
                      <strong>{selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Time:</span>
                      <strong>{selectedTime}</strong>
                    </div>
                  </div>
                </div>
                
                {/* Modern Auth Options */}
                {!user && (
                  <div className="auth-options-container">
                    <div className="auth-options-header">
                      <span className="auth-divider-line"></span>
                      <span className="auth-divider-text">Complete Your Booking</span>
                      <span className="auth-divider-line"></span>
                    </div>
                    <p className="auth-options-subtitle">Choose how you'd like to proceed</p>
                    
                    <div className="auth-options-grid">
                      <button 
                        className="auth-option-card guest"
                        onClick={() => handleGuestBooking()}
                      >
                        <div className="auth-option-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <h3>Continue as Guest</h3>
                        <p>No account needed - we'll send your confirmation via email</p>
                      </button>
                      
                      <button 
                        className="auth-option-card login"
                        onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                      >
                        <div className="auth-option-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                            <polyline points="10 17 15 12 10 7"/>
                            <line x1="15" y1="12" x2="3" y2="12"/>
                          </svg>
                        </div>
                        <h3>Sign In</h3>
                        <p>Access your bookings and earn loyalty rewards</p>
                      </button>
                      
                      <button 
                        className="auth-option-card signup"
                        onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                      >
                        <div className="auth-option-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="8.5" cy="7" r="4"/>
                            <line x1="20" y1="8" x2="20" y2="14"/>
                            <line x1="23" y1="11" x2="17" y2="11"/>
                          </svg>
                        </div>
                        <h3>Create Account</h3>
                        <p>Join us for exclusive offers and faster bookings</p>
                      </button>
                    </div>
                  </div>
                )}
                
                {user && (
                  <div className="logged-in-confirm">
                    <div className="logged-in-info">
                      <div className="user-avatar">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="user-details">
                        <p className="user-greeting">Welcome back, {user.name}!</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="booking-nav">
              {step > 1 && (
                <button className="btn btn-secondary" onClick={prevStep}>Back</button>
              )}
              {step < 4 ? (
                <button 
                  className="btn btn-primary" 
                  onClick={nextStep}
                  disabled={step === 1 && selectedServices.length === 0}
                >
                  Continue
                </button>
              ) : user ? (
                <button className="btn btn-primary" onClick={handleBooking}>
                  Confirm Booking
                </button>
              ) : (
                <div className="nav-hint">Select an option above to continue</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Add More Services Modal */}
      {showAddServiceModal && selectedServices.length > 0 && (
        <div className="modal-overlay" onClick={() => setShowAddServiceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Services Added!</h3>
            <p>You've added <strong>{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}</strong></p>
            {discount > 0 ? (
              <p className="discount-notice">Congratulations! You've unlocked 20% discount!</p>
            ) : (
              <p className="modal-hint">Add {4 - selectedServices.length} more service{4 - selectedServices.length === 1 ? '' : 's'} to get 20% off!</p>
            )}
            <div className="modal-price">
              {discount > 0 ? (
                <>
                  <span className="original-price">${total.toFixed(2)}</span>
                  <span className="discounted-price">${final.toFixed(2)}</span>
                </>
              ) : (
                <span>${total.toFixed(2)}</span>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleAddMoreServices}>
                Add More Services
              </button>
              <button className="btn btn-primary" onClick={handleContinueToStaff}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
            {authMode === 'guest' ? (
              <>
                <h3>Continue as Guest</h3>
                <p className="auth-modal-subtitle">Enter your details to complete the booking</p>
                
                {authError && <div className="auth-error">{authError}</div>}
                
                <form onSubmit={(e) => { e.preventDefault(); completeGuestBooking(); }} className="auth-form-modern">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn">
                    Complete Booking
                  </button>
                </form>
                
                <div className="auth-switch-link">
                  Or <button onClick={() => { setAuthMode('signup'); }}>create an account</button> for faster bookings next time
                </div>
              </>
            ) : (
              <>
                <h3>{authMode === 'login' ? 'Sign In to Complete Booking' : 'Create Account to Complete Booking'}</h3>
                <p className="auth-modal-subtitle">Your booking will be saved to your account</p>
                
                {authError && <div className="auth-error">{authError}</div>}
                
                <form onSubmit={handleAuthSubmit} className="auth-form-modern">
                  {authMode === 'signup' && (
                    <div className="input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  )}
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {authMode === 'signup' && (
                    <div className="input-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={authForm.phone}
                        onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                        placeholder="Enter your phone"
                        required
                      />
                    </div>
                  )}
                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      placeholder={authMode === 'login' ? 'Enter your password' : 'Create a password'}
                      required
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn">
                    {authMode === 'login' ? 'Sign In & Complete Booking' : 'Create Account & Complete Booking'}
                  </button>
                </form>
                
                <div className="auth-switch-link">
                  {authMode === 'login' ? (
                    <>
                      Don't have an account? <button onClick={() => { setAuthMode('signup'); setAuthError(''); }}>Sign up</button>
                    </>
                  ) : (
                    <>
                      Already have an account? <button onClick={() => { setAuthMode('login'); setAuthError(''); }}>Sign in</button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;