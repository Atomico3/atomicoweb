import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import energy from '../assets/energy.png';
import investors from '../assets/Investors.png';
import platform from '../assets/platform.png';
import at3 from '../assets/pruebas/p1.jpeg';
import partner1 from '../assets/partners/partner1.png';
import partner2 from '../assets/partners/partner2.png';
import migration2 from '../assets/migration/migration2.png';
import './AtomicInfo.css';

// Replace custom SVG with external image component
const PolygonLogo = () => (
  <div style={{ 
    margin: '0 10px',
    boxShadow: '0 4px 10px rgba(130, 71, 229, 0.2)',
    borderRadius: '12px',
    overflow: 'hidden',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.05)'
  }}>
    <img 
      src="https://cdn.prod.website-files.com/6340702a42dd5b18eb404a68/66c3120655492f589c640858_MATIC%20Hero%20IMG-p-800.png" 
      alt="Polygon Logo" 
      style={{ 
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
      onError={(e) => {
        // Fallback in case image fails to load
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjODI0N0U1Ij48cGF0aCBkPSJNMTIgMkw1IDdMMTIgMTJMMTkgN0wxMiAyeiIvPjxwYXRoIGQ9Ik01IDE3TDEyIDIyTDE5IDE3TDE5IDdMMTIgMTJMNSA3TDUgMTd6IiBvcGFjaXR5PSIwLjgiLz48L3N2Zz4=';
      }}
    />
  </div>
);

export const AtomicInfo: React.FC = () => {
    const [t] = useTranslation("global");
    const [activeTab, setActiveTab] = useState('info');
    const [isVisible, setIsVisible] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
            if (contentRef.current && isVisible) {
                const moveX = (window.innerWidth / 2 - e.clientX) / 50;
                const moveY = (window.innerHeight / 2 - e.clientY) / 50;
                
                // Apply subtle parallax to grid lines
                const gridLines = document.querySelectorAll('.atomic-grid-line');
                gridLines.forEach((line, index) => {
                    const depth = index % 5 === 0 ? 2 : 1; // Varying depths for different lines
                    (line as HTMLElement).style.transform = `translateX(${moveX * depth}px) translateY(${moveY * depth}px)`;
                });
                
                // Apply parallax to orbs
                const orbs = document.querySelectorAll('.atomic-orb');
                orbs.forEach((orb, index) => {
                    const depth = index === 0 ? 3 : 2;
                    (orb as HTMLElement).style.transform = `translateX(${moveX * depth}px) translateY(${moveY * depth}px)`;
                });
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isVisible]);

    // Copy to clipboard function with feedback
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        
        // Show copy feedback (you could add a toast notification here)
        const button = document.activeElement as HTMLElement;
        if (button) {
            const originalColor = button.style.color;
            button.style.color = '#00ff88';
            
            setTimeout(() => {
                button.style.color = originalColor;
            }, 1000);
        }
    };

    return (
        <section ref={sectionRef} className={`atomic-info-section ${isVisible ? 'visible' : ''}`}>
            {/* Background elements */}
            <div className="atomic-bg-elements">
                <div className="atomic-bg-gradient"></div>
                <div className="atomic-grid-lines">
                    {[...Array(20)].map((_, i) => (
                        <div key={`h-${i}`} className="atomic-grid-line" style={{
                            top: `${i * 5}%`,
                        }}></div>
                    ))}
                    
                    {[...Array(20)].map((_, i) => (
                        <div key={`v-${i}`} className="atomic-grid-line vertical" style={{
                            left: `${i * 5}%`,
                        }}></div>
                    ))}
                </div>
                <div className="atomic-orbs">
                    <div className="atomic-orb" style={{
                        top: '20%',
                        left: '10%',
                        width: '400px',
                        height: '400px',
                    }}></div>
                    <div className="atomic-orb" style={{
                        bottom: '10%',
                        right: '5%',
                        width: '500px',
                        height: '500px',
                    }}></div>
                
                    {/* Floating elements */}
                    <div className="floating-elements">
                        {[...Array(10)].map((_, i) => (
                            <div 
                                key={i}
                                className="floating-element"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${Math.random() * 10 + 10}s`,
                                    animationDelay: `${Math.random() * 5}s`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="atomic-info-hero">
                <div className="container">
                    <div className="info-header">
                        <h2 className="section-title">{t("atomicInfo.que es atomico")}</h2>
                        <div className="title-underline">
                            <div className="title-underline-glow"></div>
                        </div>
                    </div>
                    
                    <div ref={contentRef} className="info-content">
                        <div className="info-text">
                            <p className="animated-text">{t("atomicInfo.p1")}</p>
                            <p className="animated-text delay-1">{t("atomicInfo.p2")}</p>
                            <p className="animated-text delay-2">{t("atomicInfo.p3")}</p>
                            
                            <div className="contract-info">
                                <h3 className="contract-title">Nuestro contrato CARDANO</h3>
                                <div className="contract-address cardano">
                                    <span>asset10n0du9x28k3weydqsx9204vteyzg7j09qdpq67</span>
                                    <div className="contract-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                                        <a 
                                            href="https://cardanoscan.io/token/asset10n0du9x28k3weydqsx9204vteyzg7j09qdpq67" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="explore-btn" 
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '10px 15px',
                                                backgroundColor: 'rgba(100, 202, 255, 0.15)',
                                                color: '#64caff',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(100, 202, 255, 0.3)',
                                                textDecoration: 'none',
                                                fontWeight: '500',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(100, 202, 255, 0.25)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(100, 202, 255, 0.15)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                            View on Explorer
                                        </a>
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>
                </div>
            </div>
            
            {/* Navigation for sections */}
            <div className="info-navigation">
                <div className="container">
                    <div className="info-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                            onClick={() => setActiveTab('info')}
                        >
                            Información
                            <span className="tab-indicator"></span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'migration' ? 'active' : ''}`}
                            onClick={() => setActiveTab('migration')}
                        >
                            Migración
                            <span className="tab-indicator"></span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
                            onClick={() => setActiveTab('partners')}
                        >
                            Partners
                            <span className="tab-indicator"></span>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Tab content */}
            <div className="tab-content">
                <div className="container">
                    {/* Info Tab */}
                    <div className={`tab-pane ${activeTab === 'info' ? 'active' : ''}`} id="info-tab">
                        <div className="features-grid">
                            <div 
                                className={`feature-card ${activeCard === 0 ? 'active' : ''}`}
                                onMouseEnter={() => setActiveCard(0)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                <div className="feature-card-background"></div>
                                <div className="feature-icon">
                                    <img src={energy} alt="Energy" />
                                </div>
                                <h3>{t("atomicInfo.criptoactivo responsable")}</h3>
                                <p>{t("atomicInfo.criptoactivo responsable descripcion")}</p>
                                <div className="feature-card-glow"></div>
                            </div>
                            
                            <div 
                                className={`feature-card ${activeCard === 1 ? 'active' : ''}`}
                                onMouseEnter={() => setActiveCard(1)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                <div className="feature-card-background"></div>
                                <div className="feature-icon">
                                    <img src={investors} alt="Investors" />
                                </div>
                                <h3>{t("atomicInfo.mercado objetivo")}</h3>
                                <p>{t("atomicInfo.mercado objetivo descripcion")}</p>
                                <div className="feature-card-glow"></div>
                            </div>
                            
                            <div 
                                className={`feature-card ${activeCard === 2 ? 'active' : ''}`}
                                onMouseEnter={() => setActiveCard(2)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                <div className="feature-card-background"></div>
                                <div className="feature-icon">
                                    <img src={platform} alt="Platform" />
                                </div>
                                <h3>{t("atomicInfo.plataformas utilizadas")}</h3>
                                <p>{t("atomicInfo.plataformas utilizadas descripcion")}</p>
                                <div className="feature-card-glow"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Migration Tab */}
                    <div className={`tab-pane ${activeTab === 'migration' ? 'active' : ''}`} id="migration-tab">
                        <div className="migration-content">
                            <div className="migration-header">
                                <div className="migration-header-glow"></div>
                                <h2>MIGRACIÓN A CARDANO</h2>
                                <div className="migration-logos">
                                    <PolygonLogo />
                                    <div className="arrow">→</div>
                                    <img src={migration2} alt="Cardano" />
                                </div>
                            </div>
                            
                            <div className="migration-text">
                                <p>
                                    Nos complace anunciar un paso fundamental para el ecosistema de Atómico3.
                                    Esta alianza estratégica nos va a permitir migrar y llevar a Atomico3 desde la red Polygon a la red Cardano.
                                </p>
                                <p>
                                    Este movimiento nos permite aprovechar sus capacidades avanzadas, para introducir la tokenizacion 
                                    (novedoso mecanismo de financiamiento para activos mineros), utilizando tecnología de tokens algorítmicos, 
                                    respaldada por reservas de litio certificadas ajustadas por el valor del litio.
                                </p>
                                
                                <div className="migration-cta">
                                    <a href="#/comoInvertir" className="migration-button">
                                        Aprende más sobre la migración
                                        <div className="button-shine"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Partners Tab */}
                    <div className={`tab-pane ${activeTab === 'partners' ? 'active' : ''}`} id="partners-tab">
                        <div className="partners-content">
                            <h2>PARTNERS ESTRATÉGICOS</h2>
                            
                            <div className="partners-grid">
                                <div className="partner-card">
                                    <div className="partner-card-glow"></div>
                                    <div className="partner-logo">
                                        <img src={partner1} alt="CAMARA LATINOAMERICANA DE LITIO" />
                                    </div>
                                    <h3>{t("CAMARA LATINOAMERICANA DE LITIO")}</h3>
                                    <p>
                                        Aliados estratégicos en el desarrollo y promoción de proyectos 
                                        relacionados con litio en Latinoamérica.
                                    </p>
                                </div>
                                
                                <div className="partner-card">
                                    <div className="partner-card-glow"></div>
                                    <div className="partner-logo">
                                        <img src={partner2} alt="MERCADO DE METALES" />
                                    </div>
                                    <h3>{t("MERCADO DE METALES")}</h3>
                                    <p>
                                        Colaboradores importantes que nos ayudan a mantener una conexión 
                                        directa con el mercado global de metales y minerales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
