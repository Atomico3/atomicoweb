import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import energy from '../assets/energy.png';
import investors from '../assets/Investors.png';
import platform from '../assets/platform.png';
import at3 from '../assets/pruebas/p1.jpeg';
import partner1 from '../assets/partners/partner1.png';
import partner2 from '../assets/partners/partner2.png';
import migration1 from '../assets/migration/migration1.png';
import migration2 from '../assets/migration/migration2.png';
import './AtomicInfo.css';

// Welcome Popup
const WelcomePopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 500);
    };
    
    // Add popup animation on mousemove
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (popupRef.current) {
                const rect = popupRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const moveX = (e.clientX - centerX) / 30;
                const moveY = (e.clientY - centerY) / 30;
                
                popupRef.current.style.transform = `translateY(0) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="welcome-popup-overlay" style={{ opacity: isClosing ? 0 : 1 }}>
            <div 
                ref={popupRef}
                className={`welcome-popup ${isClosing ? 'closing' : ''}`}
            >
                <div className="popup-glow"></div>
                <div className="popup-particles">
                    {[...Array(15)].map((_, i) => (
                        <div 
                            key={i}
                            className="popup-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                animationDuration: `${Math.random() * 8 + 4}s`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        ></div>
                    ))}
                </div>
                <button onClick={handleClose} className="welcome-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className="welcome-title">BIENVENIDO A ATOMICO 3</h2>

                <div className="welcome-section">
                    <div className="welcome-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#64caff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M16 12l-4 4-4-4"></path>
                            <path d="M12 8v8"></path>
                        </svg>
                    </div>
                    <p>PREPARATE PARA LA MIGRACIÓN A CARDANO</p>
                    <a href="#/comoInvertir" className="welcome-button">
                        MIGRACIÓN A CARDANO
                        <span className="button-shine"></span>
                    </a>
                </div>
				
                <div className="welcome-section">
                    <div className="welcome-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#64caff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                    <p>ÚLTIMA OPORTUNIDAD DE ADQUIRIR ATOMICO 3</p>
                    <a href="https://at3selling.vercel.app/" className="welcome-button">
                        COMPRAR ATOMICO 3
                        <span className="button-shine"></span>
                    </a>
                </div>
            </div>
        </div>
    );
};

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
        <>
            <WelcomePopup />
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
                                    <h3 className="contract-title">Nuestra billetera oficial es la</h3>
                                    <div className="contract-address">
                                        <span>0xAfF655c15c943121Dea79B67c47ac9BD2253FD65</span>
                                        <button 
                                            className="copy-btn" 
                                            onClick={() => copyToClipboard('0xAfF655c15c943121Dea79B67c47ac9BD2253FD65')}
                                            aria-label="Copiar dirección de billetera"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    <h3 className="contract-title">Nuestro contrato POLYGON es</h3>
                                    <div className="contract-address">
                                        <span>0x22a79a08ddb74A9F1A4eBE5da75300Ad9f1AED76</span>
                                        <button 
                                            className="copy-btn" 
                                            onClick={() => copyToClipboard('0x22a79a08ddb74A9F1A4eBE5da75300Ad9f1AED76')}
                                            aria-label="Copiar contrato de Polygon"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    <h3 className="contract-title">Nuestro contrato CARDANO</h3>
                                    <div className="contract-address cardano">
                                        <span>asset10n0du9x28k3weydqsx9204vteyzg7j09qdpq67</span>
                                        <button 
                                            className="copy-btn" 
                                            onClick={() => copyToClipboard('asset10n0du9x28k3weydqsx9204vteyzg7j09qdpq67')}
                                            aria-label="Copiar contrato de Cardano"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="info-cta">
                                <h3>COMPRA ATOMICO 3</h3>
                                <div className="cta-glow"></div>
                                <div className="purchase-options">
                                    <a href="https://at3selling.vercel.app/" className="buy-button">
                                        <div className="button-content">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            <span>Comprar AT3</span>
                                        </div>
                                        <div className="button-shine"></div>
                                    </a>
                                    <a href="#/comoInvertir" className="info-button">
                                        <div className="button-content">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                            <span>Más Información</span>
                                        </div>
                                    </a>
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
                                        <img src={migration1} alt="Polygon" />
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
        </>
    );
};
