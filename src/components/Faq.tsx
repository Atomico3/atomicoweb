import React, { useRef, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import "./Faq.css"

export const Faq = React.forwardRef<HTMLDivElement>((_props, ref: any) => {
  const [t] = useTranslation("global")
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Toggle question
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
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

  // FAQ questions
  const questions = [
    {
      question: t("faq.que es atomico"),
      answer: t("faq.que es atomico descripcion")
    },
    {
      question: t("faq.¿Por qué no veo reflejado el precio de Atómico3 en mi billetera?"),
      answer: t("faq.El token se encuentra en lista de espera en CoinMarketCap")
    },
    {
      question: t("faq.¿Dónde puedo ver la valuación de Atómico3?"),
      answer: t("faq.Puedes ver la valuación actual de Atómico3 en Dex descentralizadas como Quickswap")
    },
    {
      question: t("faq.¿Por qué el token Atómico3 no tiene liquidez?"),
      answer: t("faq.El token fue lanzado el 12 de agosto y la liquidez formal será inyectada cuando éste sea listado en CoinMarketCap (para lo cual estamos trabajando)")
    },
    {
      question: t("faq.¿Cuál es el contrato de Atómico3?"),
      answer: t("faq.El contrato de token es el siguiente en la red Polygon")
    },
    {
      question: t("faq.¿Proyección del precio de Atómico3 en el futuro?"),
      answer: t("faq.Se comportará en relación al precio de carbonato de litio internacional (li2co3)")
    },
    {
      question: t("faq.¿Ya puedo hacer staking de los AT3 que adquirí?"),
      answer: t("faq.Si puedo")
    }
  ];

  return (
    <section ref={sectionRef} className={`faq-section ${isVisible ? 'visible' : ''}`}>
      <div ref={ref} id="faq" className="faq-anchor"></div>
      
      {/* Decorative Elements */}
      <div className="faq-decoration">
        <div className="faq-blob faq-blob-1"></div>
        <div className="faq-blob faq-blob-2"></div>
        <div className="faq-rings">
          <div className="faq-ring faq-ring-1"></div>
          <div className="faq-ring faq-ring-2"></div>
          <div className="faq-ring faq-ring-3"></div>
        </div>
        <div className="faq-dots">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="faq-dot"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container">
        <div className="faq-header">
          <div className="section-badge">FAQ</div>
          <h1 className="faq-title">{t("faq.preguntas frecuentes")}</h1>
          <p className="faq-subtitle">Todo lo que necesitas saber sobre Atomico 3</p>
        </div>
        
        <div className="faq-container">
          {questions.map((faq, index) => (
            <div 
              className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
              key={index}
            >
              <button 
                className="faq-question"
                onClick={() => toggleQuestion(index)}
                aria-expanded={activeQuestion === index}
              >
                <span>{faq.question}</span>
                <div className="faq-icon">
                  <span className="faq-icon-bar"></span>
                  <span className="faq-icon-bar"></span>
                </div>
              </button>
              <div 
                className="faq-answer"
                style={{
                  maxHeight: activeQuestion === index ? '500px' : '0'
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-contact">
          <div className="contact-content">
            <h3>¿Tienes más preguntas?</h3>
            <p>Nuestro equipo está disponible para resolver todas tus dudas.</p>
          </div>
          <div className="contact-button-container">
            <a href="#/contacto" className="contact-button">Contáctanos<span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
});
