import { Link } from 'react-router-dom';
import './Policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Privacy Policy</h1>
          <p className="animate-fadeInUp delay-1">Your privacy is important to us</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="policy-content">
            <div className="policy-section">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul>
                <li>Personal information such as name, email address, and phone number</li>
                <li>Appointment preferences and booking history</li>
                <li>Payment information for booking transactions</li>
                <li>Communications and feedback you provide to us</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process your appointments and send confirmations</li>
                <li>Communicate with you about appointments, promotions, and events</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Protect against fraudulent or unauthorized transactions</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to 
                outside parties. We may share information with:
              </p>
              <ul>
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors, including accountants and lawyers</li>
                <li>Law enforcement or other government agencies when required by law</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 
                100% secure, so we cannot guarantee absolute security.
              </p>
            </div>

            <div className="policy-section">
              <h2>5. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications at any time</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <Link to="/contact">contact us page</Link>.
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

export default PrivacyPolicy;