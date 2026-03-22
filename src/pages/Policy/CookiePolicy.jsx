import { Link } from 'react-router-dom';
import './Policy.css';

const CookiePolicy = () => {
  return (
    <div className="policy-page">
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Cookie Policy</h1>
          <p className="animate-fadeInUp delay-1">How we use cookies</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="policy-content">
            <div className="policy-section">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile 
                device when you visit a website. They help the website recognize your 
                device and remember information about your visit.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies for the following purposes:
              </p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to provide relevant content</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. Types of Cookies We Use</h2>
              <p>
                <strong>Session Cookies:</strong> These are temporary and deleted when you 
                close your browser. They help maintain your session while using the site.
              </p>
              <p>
                <strong>Persistent Cookies:</strong> These remain on your device for a set 
                period or until you delete them. They help remember your preferences.
              </p>
            </div>

            <div className="policy-section">
              <h2>4. Third-Party Cookies</h2>
              <p>
                We may use third-party services that set their own cookies:
              </p>
              <ul>
                <li>Google Analytics for site analytics</li>
                <li>Social media buttons for sharing functionality</li>
                <li>Payment processors for transaction handling</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>5. Managing Cookies</h2>
              <p>
                You can control or delete cookies at any time through your browser settings:
              </p>
              <ul>
                <li>Chrome: Settings → Privacy → Clear browsing data</li>
                <li>Safari: Preferences → Privacy → Manage website data</li>
                <li>Firefox: Options → Privacy → Clear Data</li>
                <li>Edge: Settings → Privacy & security → Clear browsing data</li>
              </ul>
              <p>
                Note: Disabling essential cookies may affect the functionality of our website.
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be 
                posted on this page with an updated date.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please{' '}
                <Link to="/contact">contact us</Link>.
              </p>
            </div>

            <div className="policy-section">
              <p className="last-updated">Last updated: March 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;