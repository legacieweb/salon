import { teamData, awardsData, productsData } from '../../data';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">About Us</h1>
          <p className="animate-fadeInUp delay-1">Our story of elegance and excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>Founded in 2010, Luxe Salon began as a small boutique salon with a vision to bring luxury salon experiences to our community. Over the years, we've grown into one of the most sought-after salons in Beverly Hills.</p>
              <p>Our philosophy is simple: every client deserves to feel like royalty. From the moment you step through our doors, you'll be greeted with warmth and professionalism that sets the tone for your entire experience.</p>
              <p>We believe in continuous education and staying ahead of the latest trends and techniques. Our team regularly attends workshops and training sessions worldwide to bring you the best in beauty and wellness.</p>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop" alt="Luxe Salon Interior" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">Ex</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in every service we provide</p>
            </div>
            <div className="value-card">
              <div className="value-icon">Tu</div>
              <h3>Trust</h3>
              <p>Building lasting relationships with our clients</p>
            </div>
            <div className="value-card">
              <div className="value-icon">Cr</div>
              <h3>Creativity</h3>
              <p>Innovative solutions for your unique beauty needs</p>
            </div>
            <div className="value-card">
              <div className="value-icon">Ca</div>
              <h3>Care</h3>
              <p>Genuine care for each client's wellbeing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p>Our talented professionals are dedicated to your beauty</p>
          </div>
          <div className="team-grid">
            {teamData.map((member, index) => (
              <div key={member.id} className="team-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-specialties">
                    {member.specialties.map((specialty, i) => (
                      <span key={i} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section awards-section">
        <div className="container">
          <div className="section-title">
            <h2>Awards & Recognition</h2>
          </div>
          <div className="awards-grid">
            {awardsData.map((award, index) => (
              <div key={index} className="award-card">
                <span className="award-year">{award.year}</span>
                <h3>{award.title}</h3>
                <span className="award-org">{award.organization}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section products-section">
        <div className="container">
          <div className="section-title">
            <h2>Premium Products We Use</h2>
            <p>We only use the finest products for your beauty</p>
          </div>
          <div className="products-grid">
            {productsData.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-logo">
                  <span>{product.name}</span>
                </div>
                <span className="product-category">{product.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;