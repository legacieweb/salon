import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return [];
    const strength = [];
    if (password.length >= 8) strength.push('strong');
    else if (password.length >= 6) strength.push('medium');
    else strength.push('weak');
    
    if (/[A-Z]/.test(password)) strength.push('strong');
    if (/[0-9]/.test(password)) strength.push('medium');
    if (/[^A-Za-z0-9]/.test(password)) strength.push('strong');
    
    // Return unique bars (max 4)
    return [...new Set(strength)].slice(0, 4);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setIsLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions to continue.');
      setIsLoading(false);
      return;
    }

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = signup(name, email, password, phone);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const strength = getPasswordStrength();

  return (
    <div className="auth-page">
      {/* Left Side - Decorative */}
      <div className="auth-decorative">
        <div className="auth-floating-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
        </div>
        <div className="auth-decorative-content">
          <div className="auth-logo-large">LUXE</div>
          <p className="auth-tagline">
            Join our community of beauty enthusiasts and enjoy exclusive benefits.
          </p>
          <div className="auth-decorative-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span>Loyalty Rewards</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <span>Priority Booking</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <span>Special Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-side">
        <div className="auth-floating-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
        </div>
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us and start your beauty journey today</p>
          </div>

          {error && (
            <div className="auth-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-modern">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className={name.length >= 2 ? 'valid' : ''}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'valid' : ''}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className={phone.length >= 10 ? 'valid' : ''}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className={password.length >= 6 ? 'valid' : ''}
              />
              {password && (
                <div className="password-strength">
                  {[1, 2, 3, 4].map((bar, index) => (
                    <div 
                      key={bar} 
                      className={`strength-bar ${strength[index] || ''}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className={confirmPassword && confirmPassword === password ? 'valid' : confirmPassword ? 'invalid' : ''}
              />
            </div>

            <div className="remember-row">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the <Link to="/terms" style={{color: 'var(--color-primary)'}}>Terms of Service</Link> and <Link to="/privacy" style={{color: 'var(--color-primary)'}}>Privacy Policy</Link></span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`auth-submit-btn ${isLoading ? 'auth-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? '' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">or continue with</div>

          <div className="social-login">
            <button type="button" className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <p className="auth-switch-link">
            Already have an account? <Link to="/login">Sign in now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;