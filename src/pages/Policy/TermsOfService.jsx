import { Link } from 'react-router-dom';
import './Policy.css';

const TermsOfService = () => {
  return (
    <div className="policy-page">
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Terms of Service</h1>
          <p className="animate-fadeInUp delay-1">Please read our terms carefully</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="policy-content">
            <div className="policy-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Luxe Salon website, you accept and agree to be 
                bound by the terms and provision of this agreement.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. Services Provided</h2>
              <p>
                Luxe Salon provides the following services:
              </p>
              <ul>
                <li>Hair styling and coloring services</li>
                <li>Nail services including manicures and pedicures</li>
                <li>Spa and massage treatments</li>
                <li>Makeup artistry for all occasions</li>
                <li>Bridal packages and special event styling</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. Booking and Cancellation Policy</h2>
              <p>
                When booking an appointment:
              </p>
              <ul>
                <li>Appointments must be confirmed with a valid contact</li>
                <li>Please arrive 10 minutes before your scheduled time</li>
                <li>Cancellations must be made at least 24 hours in advance</li>
                <li>No-shows may result in a fee or loss of booking privileges</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>4. Payment Terms</h2>
              <p>
                Payment is required at the time of service unless other arrangements have 
                been made. We accept:
              </p>
              <ul>
                <li>All major credit cards</li>
                <li>Cash</li>
                <li>Payment plans for large services (at management discretion)</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>5. Gift Cards and Vouchers</h2>
              <p>
                Gift cards are non-refundable and expire one year from the date of purchase. 
                Gift cards can be used for any service at Luxe Salon.
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Liability</h2>
              <p>
                Luxe Salon is not responsible for any loss or damage to personal property 
                during your visit. We are also not responsible for any allergic reactions to 
                products used during services - please inform us of any known allergies 
                before your appointment.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Intellectual Property</h2>
              <p>
                All content on this website, including logos, images, and text, is the 
                property of Luxe Salon and may not be reproduced without permission.
              </p>
            </div>

            <div className="policy-section">
              <h2>8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use 
                of the website after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="policy-section">
              <h2>9. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please{' '}
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

export default TermsOfService;