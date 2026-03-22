import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { staffData, servicesData, testimonialsData, offersData } from '../../data';
import './Dashboard.css';

// Icons as functional components
const Icon = ({ name }) => {
  const icons = {
    overview: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
    bookings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    clients: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    staff: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    reviews: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    offers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    dollar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    star: <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  };
  return icons[name] || null;
};

// Mock data for admin dashboard
const mockBookings = [
  { id: 1, service: 'Signature Haircut', client: 'Sarah Johnson', staff: 'Victoria Sterling', date: '2026-03-23', time: '10:00 AM', status: 'confirmed', price: 75 },
  { id: 2, service: 'Gel Manicure', client: 'Emily Davis', staff: 'Isabella Martinez', date: '2026-03-23', time: '2:00 PM', status: 'pending', price: 55 },
  { id: 3, service: 'Swedish Massage', client: 'Michael Brown', staff: 'David Thompson', date: '2026-03-24', time: '11:00 AM', status: 'confirmed', price: 120 },
  { id: 4, service: 'Bridal Makeup', client: 'Jennifer White', staff: 'Sophia Williams', date: '2026-03-25', time: '9:00 AM', status: 'pending', price: 200 },
  { id: 5, service: 'Balayage & Highlights', client: 'Amanda Lee', staff: 'Marcus Chen', date: '2026-03-26', time: '1:00 PM', status: 'confirmed', price: 200 },
];

const mockClients = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '(555) 123-4567', visits: 12, totalSpent: 1250 },
  { id: 2, name: 'Emily Davis', email: 'emily@email.com', phone: '(555) 234-5678', visits: 8, totalSpent: 680 },
  { id: 3, name: 'Michael Brown', email: 'michael@email.com', phone: '(555) 345-6789', visits: 5, totalSpent: 450 },
  { id: 4, name: 'Jennifer White', email: 'jennifer@email.com', phone: '(555) 456-7890', visits: 15, totalSpent: 2100 },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    { id: 'overview', label: 'Overview', icon: 'overview' },
    { id: 'bookings', label: 'Bookings', icon: 'bookings' },
    { id: 'clients', label: 'Clients', icon: 'clients' },
    { id: 'staff', label: 'Staff', icon: 'staff' },
    { id: 'services', label: 'Services', icon: 'services' },
    { id: 'reviews', label: 'Reviews', icon: 'reviews' },
    { id: 'offers', label: 'Offers', icon: 'offers' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-content">
            <div className="stats-row">
              <div className="stat-card-new">
                <div className="stat-icon bookings-icon"><Icon name="calendar" /></div>
                <div className="stat-content">
                  <span className="stat-number">156</span>
                  <span className="stat-title">Total Bookings</span>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon revenue-icon"><Icon name="dollar" /></div>
                <div className="stat-content">
                  <span className="stat-number">$42,500</span>
                  <span className="stat-title">Total Revenue</span>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon clients-icon"><Icon name="users" /></div>
                <div className="stat-content">
                  <span className="stat-number">89</span>
                  <span className="stat-title">Total Clients</span>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon rating-icon"><Icon name="star" /></div>
                <div className="stat-content">
                  <span className="stat-number">4.9</span>
                  <span className="stat-title">Avg. Rating</span>
                </div>
              </div>
            </div>
            
            <div className="content-card">
              <div className="card-header">
                <h3>Recent Bookings</h3>
                <button className="btn btn-sm" onClick={() => setActiveTab('bookings')}>View All</button>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Client</th>
                      <th>Staff</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.slice(0, 5).map(booking => (
                      <tr key={booking.id}>
                        <td className="service-cell">{booking.service}</td>
                        <td>{booking.client}</td>
                        <td>{booking.staff}</td>
                        <td><span className="date-cell"><Icon name="calendar" />{booking.date}</span></td>
                        <td><span className={`status-pill status-${booking.status}`}>{booking.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>All Bookings</h3>
                <button className="btn btn-primary btn-sm"><Icon name="plus" />Add Booking</button>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Service</th>
                      <th>Client</th>
                      <th>Staff</th>
                      <th>Date & Time</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map(booking => (
                      <tr key={booking.id}>
                        <td className="id-cell">#{booking.id}</td>
                        <td className="service-cell">{booking.service}</td>
                        <td>{booking.client}</td>
                        <td>{booking.staff}</td>
                        <td><span className="datetime-cell">{booking.date}<span className="time">{booking.time}</span></span></td>
                        <td className="price-cell">${booking.price}</td>
                        <td><span className={`status-pill status-${booking.status}`}>{booking.status}</span></td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-icon-btn" title="Edit"><Icon name="edit" /></button>
                            <button className="action-icon-btn danger" title="Delete"><Icon name="trash" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'clients':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>Client Management</h3>
                <button className="btn btn-primary btn-sm"><Icon name="plus" />Add Client</button>
              </div>
              <div className="clients-grid">
                {mockClients.map(client => (
                  <div key={client.id} className="client-card">
                    <div className="client-avatar">{client.name.charAt(0)}</div>
                    <div className="client-info">
                      <h4>{client.name}</h4>
                      <p>{client.email}</p>
                      <p>{client.phone}</p>
                    </div>
                    <div className="client-stats">
                      <div className="client-stat">
                        <span className="value">{client.visits}</span>
                        <span className="label">Visits</span>
                      </div>
                      <div className="client-stat">
                        <span className="value">${client.totalSpent}</span>
                        <span className="label">Spent</span>
                      </div>
                    </div>
                    <div className="client-actions">
                      <button className="btn btn-sm"><Icon name="eye" />View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'staff':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>Staff Management</h3>
                <button className="btn btn-primary btn-sm"><Icon name="plus" />Add Staff</button>
              </div>
              <div className="staff-grid-new">
                {staffData.map(staff => (
                  <div key={staff.id} className="staff-card-new">
                    <div className="staff-image"><img src={staff.image} alt={staff.name} /></div>
                    <div className="staff-details">
                      <h4>{staff.name}</h4>
                      <span className="staff-role">{staff.role}</span>
                      <p className="staff-services">{staff.services.length} services assigned</p>
                    </div>
                    <div className="staff-actions">
                      <button className="btn btn-sm"><Icon name="edit" />Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'services':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>Services Management</h3>
                <button className="btn btn-primary btn-sm"><Icon name="plus" />Add Service</button>
              </div>
              <div className="services-admin-list">
                {Object.entries(servicesData).map(([category, services]) => (
                  <div key={category} className="service-category-block">
                    <div className="category-header">
                      <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                      <span className="service-count">{services.length} services</span>
                    </div>
                    <div className="services-table">
                      <div className="services-table-header">
                        <span>Service Name</span>
                        <span>Price</span>
                        <span>Duration</span>
                        <span>Actions</span>
                      </div>
                      {services.map(service => (
                        <div key={service.id} className="service-row-new">
                          <span className="service-name">{service.name}</span>
                          <span className="service-price">${service.price}</span>
                          <span className="service-duration">{service.duration}</span>
                          <div className="service-actions">
                            <button className="action-icon-btn"><Icon name="edit" /></button>
                            <button className="action-icon-btn danger"><Icon name="trash" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>Client Reviews</h3>
              </div>
              <div className="reviews-grid">
                {testimonialsData.map(review => (
                  <div key={review.id} className="review-card-new">
                    <div className="review-header-new">
                      <img src={review.image} alt={review.name} className="review-avatar" />
                      <div className="review-info">
                        <h4>{review.name}</h4>
                        <span>{review.role}</span>
                      </div>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (<span key={i} className="star filled">★</span>))}
                      </div>
                    </div>
                    <p className="review-text">"{review.text}"</p>
                    <div className="review-actions">
                      <button className="btn btn-sm">Reply</button>
                      <button className="btn btn-sm">Hide</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'offers':
        return (
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>Special Offers</h3>
                <button className="btn btn-primary btn-sm"><Icon name="plus" />Add Offer</button>
              </div>
              <div className="offers-grid">
                {offersData.map(offer => (
                  <div key={offer.id} className="offer-card-new">
                    <div className="offer-header">
                      <h4>{offer.title}</h4>
                      <span className="offer-code">{offer.code}</span>
                    </div>
                    <p className="offer-description">{offer.description}</p>
                    <div className="offer-footer">
                      <span className="offer-valid"><Icon name="calendar" />Valid until: {offer.validUntil}</span>
                      <div className="offer-actions">
                        <button className="action-icon-btn"><Icon name="edit" /></button>
                        <button className="action-icon-btn danger"><Icon name="trash" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page admin-dashboard">
      <header className="mobile-header admin-mobile-header">
        <button className="mobile-menu-btn" onClick={toggleSidebar}><Icon name="menu" /></button>
        <h1>Luxe Admin</h1>
        <div className="mobile-user">
          <div className="user-avatar-small admin">{user?.name?.charAt(0) || 'A'}</div>
        </div>
      </header>

      <aside className={`dashboard-sidebar admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header admin-sidebar-header">
          <div className="logo-section">
            <h2>Luxe</h2>
            <span className="logo-subtitle">Admin Panel</span>
          </div>
          {isMobile && <button className="close-sidebar-btn" onClick={toggleSidebar}><Icon name="close" /></button>}
        </div>
        
        <div className="user-welcome admin-user">
          <div className="user-avatar admin">{user?.name?.charAt(0) || 'A'}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">Administrator</span>
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

export default AdminDashboard;
