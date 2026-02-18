import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import padlock from '../assets/padlock.png';
import technology from '../assets/technology.png';
import support from '../assets/support.png';
import './Invest.css';

export const Invest = () => {
  const [t] = useTranslation("global");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Animation on scroll into view
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

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current && isVisible) {
        const moveX = (window.innerWidth / 2 - e.clientX) / 70;
        const moveY = (window.innerHeight / 2 - e.clientY) / 70;
        
        // Apply subtle parallax to background elements
        const bgPatterns = document.querySelectorAll('.invest-bg-element');
        bgPatterns.forEach((pattern, index) => {
          const depth = index % 3 === 0 ? 2 : 1;
          (pattern as HTMLElement).style.transform = `translateX(${moveX * depth}px) translateY(${moveY * depth}px)`;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);
  
  const benefits = [
    {
      id: 1,
      icon: padlock,
      title: t("InvestSection.Seguridad") || "Seguridad",
      description: t("InvestSection.Seguridad descripcion") || "Nuestros contratos inteligentes han sido auditados por expertos en seguridad blockchain, garantizando que tu inversión esté protegida."
    },
    {
      id: 2,
      icon: technology,
      title: t("InvestSection.tecnologia y beneficios") || "Tecnología y beneficios",
      description: t("InvestSection.tecnologia y beneficios descripcion") || "Utilizamos la tecnología más avanzada de Cardano para proporcionar transacciones rápidas, seguras y con bajas comisiones."
    },
    {
      id: 3,
      icon: support,
      title: t("InvestSection.soporte") || "Soporte",
      description: t("InvestSection.soporte descripcion") || "Nuestro equipo de soporte está disponible para ayudarte en cada paso del proceso de inversión y responder a todas tus preguntas."
    }
  ];

  return (
    <section ref={sectionRef} className="invest-section">
      {/* Enhanced background patterns */}
      <div className="invest-bg-pattern"></div>
      <div className="invest-bg-elements">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="invest-bg-element"
            style={{
              top: `${i % 2 === 0 ? 20 + (i * 10) : 60 - (i * 8)}%`,
              left: `${i % 3 === 0 ? 5 + (i * 15) : 80 - (i * 12)}%`,
              opacity: 0.05 + (i * 0.01),
              transform: `rotate(${i * 15}deg)`
            }}
          ></div>
        ))}
        <div className="invest-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="invest-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container">
        <div className={`invest-content ${isVisible ? 'visible' : ''}`}>
          <div className="invest-header">
            <div className="section-badge">Invertir</div>
            <h2 className="invest-title">{t("InvestSection.¿Por qué invertir en Atómico3?") || "¿Por qué invertir en Atómico3?"}</h2>
            <p className="invest-subtitle">
              Descubre las ventajas únicas que Atomico 3 ofrece para inversores
            </p>
            <div className="title-decoration">
              <div className="title-line"></div>
              <div className="title-dot"></div>
              <div className="title-line"></div>
            </div>
          </div>
          
          <div className="invest-grid">
            {benefits.map((benefit) => (
              <div 
                className={`invest-card ${activeCard === benefit.id ? 'active' : ''}`} 
                key={benefit.id}
                onMouseEnter={() => setActiveCard(benefit.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="card-content">
                  <div className="card-icon">
                    <img src={benefit.icon} alt={benefit.title} />
                    <div className="icon-glow"></div>
                  </div>
                  <h3 className="card-title">{benefit.title}</h3>
                  <p className="card-description">{benefit.description}</p>
                </div>
                <div className="card-decoration"></div>
                <div className="card-shine"></div>
                <div className="card-border"></div>
              </div>
            ))}
          </div>
          
          <div className="invest-stats">
            <div className="stat-item">
              <div className="stat-value"><span className="counter">300</span>+</div>
              <div className="stat-label">Inversores</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">$<span className="counter">45</span>k</div>
              <div className="stat-label">Capitalización</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value"><span className="counter">100</span>%</div>
              <div className="stat-label">Transparencia</div>
            </div>
          </div>
          
          <div className="invest-cta">
            <a href="/" className="invest-button primary">
              <span>Invertir ahora</span>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div className="button-shine"></div>
            </a>
            <a href="#/comoInvertir" className="invest-button secondary">
              <span>Más información</span>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
