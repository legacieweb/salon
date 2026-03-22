import { useState } from 'react';
import { galleryData } from '../../data';
import './Gallery.css';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'hair', name: 'Hair' },
    { id: 'nails', name: 'Nails' },
    { id: 'spa', name: 'Spa' },
    { id: 'makeup', name: 'Makeup' }
  ];

  const filteredGallery = activeFilter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="animate-fadeInUp">Our Gallery</h1>
          <p className="animate-fadeInUp delay-1">Explore our stunning transformations and happy clients</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="gallery-filters-section">
        <div className="container">
          <div className="gallery-filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredGallery.map((item, index) => (
              <div 
                key={item.id} 
                className="gallery-item"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="gallery-item-inner">
                  <img src={item.afterImage} alt={item.title} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span className="view-icon">View</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            <div className="lightbox-comparison">
              <div className="comparison-item">
                <span className="comparison-label">Before</span>
                <img src={selectedImage.beforeImage} alt="Before" />
              </div>
              <div className="comparison-item">
                <span className="comparison-label">After</span>
                <img src={selectedImage.afterImage} alt="After" />
              </div>
            </div>
            <h3>{selectedImage.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;