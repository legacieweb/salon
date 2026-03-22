import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { staffData, servicesData, testimonialsData, offersData } from '../../data';
import './Dashboard.css';

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

const mockRevenue = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15200 },
  { month: 'Mar', revenue: 14800 },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'clients', label: 'Clients' },
    { id: 'staff', label: 'Staff' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'offers', label: 'Offers' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-number">156</p>
                <span className="stat-label">This month</span>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-number">$42,500</p>
                <span className="stat-label">This month</span>
              </div>
              <div className="stat-card">
                <h3>Total Clients</h3>
                <p className="stat-number">89</p>
                <span className="stat-label">Registered</span>
              </div>
              <div className="stat-card">
                <h3>Avg. Rating</h3>
                <p className="stat-number">4.9</p>
                <span className="stat-label">From 156 reviews</span>
              </div>
            </div>
            
            <div className="dashboard-section">
              <h3>Recent Bookings</h3>
              <div className="table-container">
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
                        <td>{booking.service}</td>
                        <td>{booking.client}</td>
                        <td>{booking.staff}</td>
                        <td>{booking.date}</td>
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
            </div>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>All Bookings</h3>
              <div className="table-container">
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
                        <td>#{booking.id}</td>
                        <td>{booking.service}</td>
                        <td>{booking.client}</td>
                        <td>{booking.staff}</td>
                        <td>{booking.date} {booking.time}</td>
                        <td>${booking.price}</td>
                        <td>
                          <span className={`status status-${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn">Edit</button>
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
            <div className="dashboard-section">
              <h3>Client Management</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Visits</th>
                      <th>Total Spent</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockClients.map(client => (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>{client.visits}</td>
                        <td>${client.totalSpent}</td>
                        <td>
                          <button className="action-btn">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'staff':
        return (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>Staff Management</h3>
              <div className="staff-grid">
                {staffData.map(staff => (
                  <div key={staff.id} className="staff-card">
                    <img src={staff.image} alt={staff.name} />
                    <div className="staff-info">
                      <h4>{staff.name}</h4>
                      <span>{staff.role}</span>
                      <p className="staff-services">
                        {staff.services.length} services
                      </p>
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
            <div className="dashboard-section">
              <h3>Services Management</h3>
              <div className="services-admin-grid">
                {Object.entries(servicesData).map(([category, services]) => (
                  <div key={category} className="service-category">
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    {services.map(service => (
                      <div key={service.id} className="service-row">
                        <span>{service.name}</span>
                        <span>${service.price}</span>
                        <span>{service.duration}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>Client Reviews</h3>
              <div className="reviews-list">
                {testimonialsData.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <img src={review.image} alt={review.name} />
                      <div>
                        <h4>{review.name}</h4>
                        <span>{review.role}</span>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                    </div>
                    <p>"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'offers':
        return (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>Special Offers Management</h3>
              <div className="offers-list">
                {offersData.map(offer => (
                  <div key={offer.id} className="offer-card-admin">
                    <h4>{offer.title}</h4>
                    <p>{offer.description}</p>
                    <div className="offer-meta">
                      <span className="offer-code">Code: {offer.code}</span>
                      <span className="offer-valid">Valid until: {offer.validUntil}</span>
                    </div>
                    <div className="offer-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn danger">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: '20px' }}>
                Add New Offer
              </button>
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
          <h2>Luxe Admin</h2>
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

export default AdminDashboard;