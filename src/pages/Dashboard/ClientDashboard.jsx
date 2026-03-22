import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

// Icons as functional components
const Icon = ({ name }) => {
  const icons = {
    appointments: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    image: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  };
  return icons[name] || null;
};

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [bookings, setBookings] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: 'appointments' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'profile', label: 'Profile', icon: 'profile' },
  ];

  const getDemoBooking = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
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

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const nextAppointment = upcomingBookings[0] || null;
  const displayBooking = nextAppointment || getDemoBooking();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!displayBooking) return;

    const calculateTimeLeft = () => {
      try {
        const dateStr = displayBooking.date;
        const timeStr = displayBooking.time;
        
        let appointmentDate;
        if (timeStr) {
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
            {displayBooking ? (
              <div className="appointment-hero-card">
                <div className="hero-card-header">
                  <span className="hero-badge"><Icon name="calendar" />Upcoming Appointment</span>
                  <span className={`status-badge status-${displayBooking.status}`}><Icon name="check" />Confirmed</span>
                </div>
                
                <div className="hero-card-body">
                  <h2 className="service-name">{displayBooking.services}</h2>
                  <p className="specialist-name">with {displayBooking.staff}</p>
                  
                  <div className="appointment-details">
                    <div className="detail-item">
                      <div className="detail-icon"><Icon name="calendar" /></div>
                      <div className="detail-text">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{new Date(displayBooking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-icon"><Icon name="clock" /></div>
                      <div className="detail-text">
                        <span className="detail-label">Time</span>
                        <span className="detail-value">{displayBooking.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="countdown-section">
                  <p className="countdown-title">Time until appointment</p>
                  <div className="countdown-grid">
                    <div className="countdown-unit">
                      <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                      <span className="countdown-label">Days</span>
                    </div>
                    <div className="countdown-unit">
                      <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="countdown-label">Hours</span>
                    </div>
                    <div className="countdown-unit">
                      <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="countdown-label">Mins</span>
                    </div>
                    <div className="countdown-unit highlight">
                      <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="countdown-label">Secs</span>
                    </div>
                  </div>
                </div>
                
                <div className="hero-card-footer">
                  <div className="price-info">
                    <span className="price-label">Total</span>
                    <span className="price-amount">${displayBooking.price}</span>
                    {displayBooking.originalPrice && displayBooking.originalPrice > displayBooking.price && (
                      <span className="original-price">${displayBooking.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-appointment-card">
                <div className="empty-icon"><Icon name="calendar" /></div>
                <h3>No Upcoming Appointments</h3>
                <p>Book your next beauty experience with us</p>
                <Link to="/booking" className="btn btn-primary"><Icon name="plus" />Book Now</Link>
              </div>
            )}
            
            {upcomingBookings.length > 1 && (
              <div className="appointments-section">
                <h3 className="section-title">More Appointments</h3>
                <div className="appointments-list">
                  {upcomingBookings.slice(1).map((booking) => (
                    <div key={booking.id} className="appointment-mini-card">
                      <div className="mini-card-content">
                        <h4>{booking.services}</h4>
                        <p>with {booking.staff}</p>
                      </div>
                      <div className="mini-card-meta">
                        <span><Icon name="calendar" />{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span><Icon name="clock" />{booking.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="quick-actions-section">
              <h3 className="section-title">Quick Actions</h3>
              <div className="actions-grid">
                <Link to="/booking" className="action-card-new">
                  <div className="action-icon-new"><Icon name="plus" /></div>
                  <span>New Booking</span>
                </Link>
                <Link to="/services" className="action-card-new">
                  <div className="action-icon-new"><Icon name="heart" /></div>
                  <span>Services</span>
                </Link>
                <Link to="/gallery" className="action-card-new">
                  <div className="action-icon-new"><Icon name="image" /></div>
                  <span>Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>Booking History</h3>
              </div>
              {bookings.length === 0 ? (
                <div className="empty-state-new">
                  <div className="empty-icon"><Icon name="history" /></div>
                  <h4>No Bookings Yet</h4>
                  <p>You haven't made any bookings yet.</p>
                  <Link to="/booking" className="btn btn-primary">Book Your First Service</Link>
                </div>
              ) : (
                <div className="history-list">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="history-item">
                      <div className="history-icon"><Icon name="appointments" /></div>
                      <div className="history-details">
                        <h4>{booking.services}</h4>
                        <p className="history-meta">with {booking.staff} • {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {booking.time}</p>
                      </div>
                      <div className="history-price">
                        <span className="amount">${booking.price}</span>
                        <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="dashboard-content">
            <div className="profile-card-new">
              <div className="profile-header-new">
                <div className="profile-avatar">{user?.name?.charAt(0) || 'U'}</div>
                <div className="profile-title">
                  <h2>{user?.name}</h2>
                  <p>{user?.email}</p>
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-value">{bookings.length}</span>
                  <span className="stat-label">Bookings</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">{bookings.filter(b => b.status === 'completed').length}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">${bookings.reduce((sum, b) => sum + (b.price || 0), 0)}</span>
                  <span className="stat-label">Total Spent</span>
                </div>
              </div>
              
              <div className="profile-info-list">
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user?.phone || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">{new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
              
              <button className="btn btn-secondary btn-full">Edit Profile</button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <header className="mobile-header">
        <button className="mobile-menu-btn" onClick={toggleSidebar}><Icon name="menu" /></button>
        <h1>Luxe Salon</h1>
        <div className="mobile-user">
          <div className="user-avatar-small">{user?.name?.charAt(0) || 'U'}</div>
        </div>
      </header>

      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <h2>Luxe</h2>
            <span className="logo-subtitle">My Account</span>
          </div>
          {isMobile && <button className="close-sidebar-btn" onClick={toggleSidebar}><Icon name="close" /></button>}
        </div>
        
        <div className="user-welcome">
          <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); handleNavClick(); }}
            >
              <span className="nav-icon"><Icon name={tab.icon} /></span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/" className="nav-item" onClick={handleNavClick}>
            <span className="nav-icon"><Icon name="home" /></span>
            <span className="nav-label">Back to Website</span>
          </Link>
          <button onClick={handleLogout} className="logout-btn-new">
            <span className="nav-icon"><Icon name="logout" /></span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>
      
      <main className="dashboard-main">
        {renderContent()}
      </main>
      
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default ClientDashboard;
