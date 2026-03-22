import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    if (user) {
      const clients = JSON.parse(localStorage.getItem('luxe_clients') || '[]');
      const currentClient = clients.find(c => c.email === user.email);
      if (currentClient && currentClient.bookings) {
        setBookings(currentClient.bookings);
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'appointments', label: 'My Appointments' },
    { id: 'history', label: 'Booking History' },
    { id: 'profile', label: 'My Profile' },
  ];

  // Generate a future date for demo purposes if no real bookings
  const getDemoBooking = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7); // 7 days from now
    
    return {
      id: 999,
      services: 'Signature Haircut & Styling',
      staff: 'Victoria Sterling',
      date: futureDate.toISOString().split('T')[0],
      time: '10:00 AM',
      price: 120,
      originalPrice: 150,
      discount: 30,
      status: 'confirmed'
    };
  };

  // Get upcoming bookings and use demo if none
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const nextAppointment = upcomingBookings[0] || null;
  const displayBooking = nextAppointment || getDemoBooking();

  // Countdown timer hook
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!displayBooking) return;

    const calculateTimeLeft = () => {
      try {
        // Parse the date and time properly
        const dateStr = displayBooking.date;
        const timeStr = displayBooking.time;
        
        // Create appointment date
        let appointmentDate;
        if (timeStr) {
          // Handle time like "10:00 AM" or "2:00 PM"
          const timeParts = timeStr.split(' ');
          const time = timeParts[0];
          const period = timeParts[1] || '';
          let [hours, minutes] = time.split(':').map(Number);
          if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
          if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
          
          const today = new Date(dateStr);
          appointmentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
        } else {
          appointmentDate = new Date(dateStr);
        }
        
        const now = new Date();
        const diff = appointmentDate.getTime() - now.getTime();

        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60)
          });
        } else {
          // Appointment has passed
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } catch (e) {
        console.error('Error calculating time:', e);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [displayBooking]);

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="dashboard-content">
            {/* Hero Countdown Section */}
            {displayBooking ? (
              <div className="hero-appointment-section">
                <div className="hero-background">
                  <div className="hero-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                  </div>
                </div>
                
                <div className="hero-content">
                  <div className="hero-label">Your Next Appointment</div>
                  
                  <h2 className="hero-service">{displayBooking.services}</h2>
                  <p className="hero-specialist">with {displayBooking.staff}</p>
                  
                  <div className="hero-datetime">
                    <div className="date-badge">
                      <span className="date-day">{new Date(displayBooking.date).getDate()}</span>
                      <span className="date-month">{new Date(displayBooking.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    </div>
                    <span className="time-text">{displayBooking.time}</span>
                  </div>
                  
                  {/* Countdown Timer */}
                  <div className="countdown-container">
                    <div className="countdown-label">Appointment starts in</div>
                    <div className="countdown-timer">
                      <div className="time-unit">
                        <div className="time-value">{String(timeLeft.days).padStart(2, '0')}</div>
                        <div className="time-label">Days</div>
                      </div>
                      <div className="time-separator">:</div>
                      <div className="time-unit">
                        <div className="time-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="time-label">Hours</div>
                      </div>
                      <div className="time-separator">:</div>
                      <div className="time-unit">
                        <div className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="time-label">Minutes</div>
                      </div>
                      <div className="time-separator">:</div>
                      <div className="time-unit">
                        <div className="time-value highlight">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="time-label">Seconds</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hero-price">
                    <span className="price-label">Total</span>
                    <span className="price-value">${displayBooking.price.toFixed(2)}</span>
                    {displayBooking.discount > 0 && (
                      <span className="discount-badge">{((displayBooking.discount / displayBooking.originalPrice) * 100).toFixed(0)}% OFF</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-appointment-hero">
                <div className="empty-illustration">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
                  </svg>
                </div>
                <h3>No Upcoming Appointments</h3>
                <p>Book your next beauty experience with us</p>
                <Link to="/booking" className="btn btn-primary">Book Now</Link>
              </div>
            )}
            
            {/* Additional Upcoming Appointments */}
            {upcomingBookings.length > 1 && (
              <div className="additional-appointments">
                <h3>More Upcoming Appointments</h3>
                <div className="appointments-grid">
                  {upcomingBookings.slice(1).map((booking, index) => (
                    <div key={booking.id} className="appointment-card-modern">
                      <div className="card-index">#{index + 2}</div>
                      <div className="card-content">
                        <h4>{booking.services}</h4>
                        <p className="specialist">with {booking.staff}</p>
                        <div className="card-meta">
                          <span className="card-date">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                            </svg>
                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="card-time">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            {booking.time}
                          </span>
                          <span className="card-price">${booking.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="quick-actions">
              <Link to="/booking" className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
                <span>New Booking</span>
              </Link>
              <Link to="/services" className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <span>Our Services</span>
              </Link>
              <Link to="/gallery" className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span>Gallery</span>
              </Link>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>Booking History</h3>
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <p>You haven't made any bookings yet.</p>
                  <Link to="/booking" className="btn btn-primary">Book Your First Service</Link>
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Services</th>
                        <th>Specialist</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.services}</td>
                          <td>{booking.staff}</td>
                          <td>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td>
                            <span className="price-cell">
                              ${booking.price.toFixed(2)}
                              {booking.discount > 0 && (
                                <span className="discount-badge">-{((booking.discount / booking.originalPrice) * 100).toFixed(0)}%</span>
                              )}
                            </span>
                          </td>
                          <td>
                            <span className={`status status-${booking.status}`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>My Profile</h3>
              <div className="profile-card">
                <div className="profile-avatar-large">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="profile-info">
                  <div className="info-group">
                    <label>Name</label>
                    <p>{user?.name}</p>
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <p>{user?.email}</p>
                  </div>
                  <div className="info-group">
                    <label>Phone</label>
                    <p>{user?.phone || 'Not set'}</p>
                  </div>
                  <div className="info-group">
                    <label>Member Since</label>
                    <p>{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <div className="info-group">
                    <label>Total Bookings</label>
                    <p>{bookings.length}</p>
                  </div>
                </div>
                <button className="btn btn-secondary">Edit Profile</button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>My Account</h2>
          <p>Welcome, {user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="nav-item">Back to Website</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
          <div className="header-actions">
            <span>{user?.email}</span>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default ClientDashboard;