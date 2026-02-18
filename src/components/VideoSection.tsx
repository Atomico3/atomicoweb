import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './VideoSection.css';

export const VideoSection = () => {
  const [t] = useTranslation("global");
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Video ID extracted from the URL for proper embedding
  const videoId = "1D48M03COO8";
  
  // Check if element is in viewport for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Function to handle click on the video thumbnail
  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <section ref={sectionRef} className="video-section">
      {/* Decorative background elements */}
      <div className="video-bg-elements">
        <div className="video-bg-gradient"></div>
        <div className="video-grid-lines">
          {[...Array(20)].map((_, i) => (
            <div key={`h-${i}`} className="video-grid-line" style={{
              top: `${i * 5}%`,
            }}></div>
          ))}
          
          {[...Array(20)].map((_, i) => (
            <div key={`v-${i}`} className="video-grid-line vertical" style={{
              left: `${i * 5}%`,
            }}></div>
          ))}
        </div>
        
        <div className="video-shapes">
          <div className="video-shape shape-circle"></div>
          <div className="video-shape shape-dots"></div>
          <div className="video-shape shape-ring"></div>
          <div className="video-shape shape-wave"></div>
        </div>
      </div>
      
      <div className="container">
        <div className={`video-header ${isVisible ? 'visible' : ''}`}>
          <div className="section-badge">Descubre</div>
          <h2 className="video-title">
            {"NUESTROS PROYECTOS"}
          </h2>
          <p className="video-description">
            {"SALAR DE MOGNA"}
          </p>
        </div>
        
        <div className={`video-content ${isVisible ? 'visible' : ''}`}>
          <div className="video-player-container">
            <div className="video-player-wrapper">
              <div className="video-frame-decoration">
                <div className="frame-corner top-left"></div>
                <div className="frame-corner top-right"></div>
                <div className="frame-corner bottom-left"></div>
                <div className="frame-corner bottom-right"></div>
                <div className="frame-edge top"></div>
                <div className="frame-edge right"></div>
                <div className="frame-edge bottom"></div>
                <div className="frame-edge left"></div>
              </div>
              
              <div className="video-player">
                {/* Show thumbnail with play button if video isn't loaded yet */}
                {!showVideo ? (
                  <div 
                    className="video-thumbnail" 
                    onClick={handlePlayClick}
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="thumbnail-overlay"></div>
                    <div 
                      className="play-button"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(0, 144, 255, 0.9)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        position: 'absolute',
                        zIndex: 5
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  // Only show iframe when the play button is clicked
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Atomico 3 Video"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    onLoad={() => setVideoLoaded(true)}
                  ></iframe>
                )}
                <div className="video-glow"></div>
              </div>
            </div>
            
            <div className="video-player-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="stat-details">
                  <div className="stat-value">300</div>
                  <div className="stat-label">Inversores</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="stat-details">
                  <div className="stat-value">$45K</div>
                  <div className="stat-label">Capitalización</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="video-features-container">
            <div className="video-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Tokenización de Litio</h3>
                  <p>Activos mineros respaldados por reservas certificadas</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Tecnología Blockchain</h3>
                  <p>Cardano proporciona seguridad y escalabilidad</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Comunidad Global</h3>
                  <p>Une a inversores y entusiastas alrededor del mundo</p>
                </div>
              </div>
            </div>
            
            <div className="video-cta">
              <a href="https://at3selling.vercel.app/" className="cta-button primary">
                <span>Invertir en AT3</span>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              
              <a href="#/comoInvertir" className="cta-button secondary">
                <span>Más Información</span>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated particles */}
      <div className="video-particles">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

