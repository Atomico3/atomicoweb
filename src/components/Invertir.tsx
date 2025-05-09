import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Invertir.css';

interface InvestStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tip: string;
  iconNum: number;
}

const Invertir: React.FC = () => {
  const [t] = useTranslation("global");
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current && isVisible) {
        const moveX = (window.innerWidth / 2 - e.clientX) / 70;
        const moveY = (window.innerHeight / 2 - e.clientY) / 70;
        
        // Apply parallax effect to background elements
        const particles = document.querySelectorAll('.invertir-particle');
        particles.forEach((particle, index) => {
          const depth = index % 3 === 0 ? 2 : 1;
          (particle as HTMLElement).style.transform = `translateX(${moveX * depth}px) translateY(${moveY * depth}px)`;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);
  
  // Handle tooltip display
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  // Navigation for steps
  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, investmentSteps.length - 1));
  };
  
  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  // Investment steps data
  const investmentSteps: InvestStep[] = [
    {
      id: 1,
      title: t("invertir.Crear billetera de Cardano"),
      subtitle: t("invertir.Paso 1"),
      description: t("invertir.Para invertir en Atómico3, necesitarás una billetera de Cardano. Te recomendamos usar Eternl, Nami o Yoroi, todas opciones seguras y fáciles de usar. Descarga la extensión para tu navegador y sigue las instrucciones para crear una nueva billetera."),
      tip: t("invertir.Asegúrate de guardar tu frase de recuperación en un lugar seguro. Nunca la compartas con nadie."),
      iconNum: 1
    },
    {
      id: 2,
      title: t("invertir.Configura tu cuenta"),
      subtitle: t("invertir.Paso 2"),
      description: t("invertir.Completa tu perfil y verifica tu identidad si es necesario. Este paso es importante para cumplir con las regulaciones financieras y garantizar la seguridad de tus inversiones. Proporciona la información requerida y sube los documentos solicitados."),
      tip: t("invertir.Utiliza un correo electrónico seguro y activa la autenticación de dos factores para mayor seguridad."),
      iconNum: 2
    },
    {
      id: 3,
      title: t("invertir.Adquiere ADA"),
      subtitle: t("invertir.Paso 3"),
      description: t("invertir.Necesitarás ADA (la criptomoneda nativa de Cardano) para comprar tokens AT3. Puedes comprar ADA en cualquier exchange reconocido como Binance, Coinbase o Kraken, y luego transferirlos a tu billetera de Cardano."),
      tip: t("invertir.Asegúrate de enviar tus ADA a la dirección correcta de tu billetera Cardano. Verifica siempre la dirección antes de confirmar la transacción."),
      iconNum: 3
    },
    {
      id: 4,
      title: t("invertir.Intercambia ADA por AT3"),
      subtitle: t("invertir.Paso 4"),
      description: t("invertir.Una vez que tengas ADA en tu billetera, puedes acceder a nuestra plataforma de intercambio integrada o usar DEXs (intercambios descentralizados) como Minswap. Conecta tu billetera, selecciona el par ADA/AT3 y completa el intercambio."),
      tip: t("invertir.Revisa el precio y las comisiones antes de confirmar la operación. Las transacciones en blockchain son irreversibles."),
      iconNum: 4
    },
    {
      id: 5,
      title: t("invertir.Gestiona tu inversión"),
      subtitle: t("invertir.Paso 5"),
      description: t("invertir.¡Felicidades! Ahora eres propietario de tokens AT3. Puedes ver tu balance en tu billetera Cardano. Considera las opciones de staking para obtener rendimientos adicionales y mantente informado sobre las actualizaciones del proyecto."),
      tip: t("invertir.Regístrate en nuestro newsletter para recibir actualizaciones importantes sobre Atómico3 y oportunidades exclusivas para inversores."),
      iconNum: 5
    }
  ];

  // Benefits of investing in Atomico
  const benefits = [
    {
      icon: '🛡️',
      title: t("invertir.Respaldo Real"),
      description: t("invertir.Cada token AT3 está respaldado por reservas certificadas de litio, garantizando un valor tangible a tu inversión.")
    },
    {
      icon: '📊',
      title: t("invertir.Potencial de Crecimiento"),
      description: t("invertir.El litio es un recurso estratégico para la transición energética global, con demanda creciente proyectada para las próximas décadas.")
    },
    {
      icon: '🔄',
      title: t("invertir.Liquidez"),
      description: t("invertir.Los tokens AT3 pueden comercializarse fácilmente en la blockchain de Cardano, brindando la flexibilidad que necesitas.")
    }
  ];

  return (
    <section ref={sectionRef} className="invertir-section">
      {/* Dynamic background elements */}
      <div className="invertir-background">
        <div className="invertir-bg-gradient"></div>
        <div className="invertir-bg-pattern"></div>
        <div className="invertir-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="invertir-particle"
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
        <div className={`invertir-content ${isVisible ? 'visible' : ''}`}>
          <div className="invertir-header">
            <div className="section-badge">
              {t("invertir.Guía de inversión")}
              <div 
                className="badge-info" 
                onClick={() => setShowTooltip(!showTooltip)}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                
                {showTooltip && (
                  <div 
                    ref={tooltipRef}
                    className="badge-tooltip"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '220px',
                      padding: '12px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      color: '#485065',
                      fontSize: '0.85rem',
                      zIndex: 10,
                      marginTop: '10px'
                    }}
                  >
                    {t("invertir.Sigue esta guía paso a paso para invertir en Atómico3 de forma segura y sencilla.")}
                  </div>
                )}
              </div>
            </div>
            <h1 className="invertir-title">{t("invertir.Cómo invertir en Atómico3")}</h1>
            <p className="invertir-subtitle">
              {t("invertir.Sigue estos sencillos pasos para comenzar tu inversión en el futuro del litio tokenizado")}
            </p>
            <div className="title-decoration">
              <div className="title-line"></div>
              <div className="title-dot"></div>
              <div className="title-line"></div>
            </div>
          </div>
          
          {/* Investment benefits section */}
          <div 
            className="process-container" 
            style={{ 
              marginBottom: '40px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(247,250,255,0.95))'
            }}
          >
            <div style={{ padding: '30px', textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '30px', 
                background: 'linear-gradient(to right, #003366, #0090ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                {t("invertir.Por qué invertir en AT3")}
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center'
              }}>
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    style={{
                      flex: '1 1 250px',
                      maxWidth: '350px',
                      padding: '25px',
                      borderRadius: '15px',
                      boxShadow: '0 10px 25px rgba(0, 144, 255, 0.08)',
                      border: '1px solid rgba(0, 144, 255, 0.1)',
                      background: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 144, 255, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(0, 144, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 144, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(0, 144, 255, 0.1)';
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{benefit.icon}</div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#003366' }}>{benefit.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: '#485065', lineHeight: '1.5' }}>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Step-by-step guide */}
          <div className="process-container">
            {/* Navigation tabs */}
            <nav className="process-nav">
              {investmentSteps.map((step, index) => (
                <button 
                  key={index}
                  className={`process-nav-item ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  aria-selected={activeStep === index}
                  aria-controls={`step-content-${index}`}
                >
                  <div className="step-number">{index + 1}</div>
                  <span>{step.title}</span>
                </button>
              ))}
            </nav>
            
            {/* Content for active step */}
            <div className="process-content">
              {investmentSteps.map((step, index) => (
                <div 
                  key={index}
                  id={`step-content-${index}`}
                  className={`process-step ${activeStep === index ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby={`step-tab-${index}`}
                >
                  <h2 className="step-heading">
                    <span className="step-indicator">{step.subtitle}</span>
                    {step.title}
                  </h2>
                  
                  <div className="step-visual">
                    <div className={`step-icon step-icon-${step.iconNum}`}></div>
                  </div>
                  
                  <p className="step-description">{step.description}</p>
                  
                  <div className="process-tips">
                    <div className="tip-header">
                      <div className="tip-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      {t("invertir.Consejo útil")}
                    </div>
                    <p className="tip-content">{step.tip}</p>
                  </div>
                  
                  {/* Special action for step 1 */}
                  {index === 0 && (
                    <div style={{ 
                      display: 'flex', 
                      gap: '15px', 
                      marginTop: '20px',
                      flexWrap: 'wrap'
                    }}>
                      <a 
                        href="https://eternl.io/app/mainnet/welcome" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          background: 'rgba(0, 144, 255, 0.1)',
                          color: '#0090ff',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 144, 255, 0.15)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 144, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Eternl Wallet
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      
                      <a 
                        href="https://namiwallet.io/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          background: 'rgba(0, 144, 255, 0.1)',
                          color: '#0090ff',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 144, 255, 0.15)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 144, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Nami Wallet
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      
                      <a 
                        href="https://yoroi-wallet.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          background: 'rgba(0, 144, 255, 0.1)',
                          color: '#0090ff',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 144, 255, 0.15)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 144, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Yoroi Wallet
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                  
                  <div className="process-actions">
                    <button 
                      className="process-prev" 
                      onClick={prevStep}
                      disabled={activeStep === 0}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      {t("invertir.Anterior")}
                    </button>
                    
                    <button 
                      className="process-next" 
                      onClick={nextStep}
                      disabled={activeStep === investmentSteps.length - 1}
                    >
                      {t("invertir.Siguiente")}
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Video tutorial section */}
          <div 
            className="process-container" 
            style={{ marginTop: '40px', overflow: 'hidden' }}
          >
            <div style={{ padding: '30px' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '20px', 
                textAlign: 'center',
                background: 'linear-gradient(to right, #003366, #0090ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                {t("invertir.Video Tutorial")}
              </h2>
              
              <div style={{ 
                position: 'relative',
                paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                borderRadius: '12px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 51, 102, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #0090ff, #0055ff)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0, 144, 255, 0.3)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <p style={{ textAlign: 'center', marginTop: '20px', color: '#485065' }}>
                {t("invertir.Mira nuestro video tutorial para una guía paso a paso visual sobre cómo invertir en Atómico3")}
              </p>
            </div>
          </div>
          
          {/* Enhanced CTA Section */}
          <div className="invertir-cta">
            <div className="cta-card">
              <div className="cta-content">
                <h3>{t("invertir.¿Listo para dar el siguiente paso?")}</h3>
                <p>{t("invertir.Comienza ahora tu inversión en Atómico3 y forma parte de la revolución del litio tokenizado en la blockchain de Cardano.")}</p>
              </div>
              
              <div className="cta-buttons">
                <Link to="https://at3selling.vercel.app/" className="cta-button primary">
                  {t("invertir.Invertir ahora")}
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                
                <Link to="/contacto" className="cta-button secondary">
                  {t("invertir.Contactar a un asesor")}
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invertir;
