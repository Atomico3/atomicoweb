import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const [t] = useTranslation("global");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const coinRef = useRef<HTMLDivElement>(null);

  // Initialize WebGL and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    let width = 0;
    let height = 0;
    let particles: any[] = [];
    let rafId: number;
    
    // Initialize dimensions and create particles
    const initializeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      // Clear existing particles
      particles = [];
      
      // Create new particles
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          originX: Math.random() * width,
          originY: Math.random() * height,
          color: `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50 + 200)}, ${Math.random() * 0.3 + 0.2})`,
        });
      }
    };
    
    // Resize handler
    const handleResize = () => {
      initializeCanvas();
    };

    // Initialize canvas
    initializeCanvas();
    window.addEventListener('resize', handleResize);
    
    // Animation function
    const animate = () => {
      if (!canvas || !gl) return;
      
      // Clear canvas
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.12, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Draw using 2D context for better particle effects
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Calculate distance to mouse
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Apply mouse repulsion effect
        if (dist < 120) {
          const force = 120 / dist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 0.02;
          p.vy -= Math.sin(angle) * force * 0.02;
        }
        
        // Update position
        p.x += p.vx;
        p.vy *= 0.99; // Add some drag
        p.y += p.vy;
        
        // Boundary check
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 202, 255, ${(1 - dist / 100) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      rafId = requestAnimationFrame(animate);
    };
    
    // Start animation
    rafId = requestAnimationFrame(animate);
    
    // Show content after a slight delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Tilt the coin based on mouse position
      if (coinRef.current) {
        const rect = coinRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const tiltX = ((e.clientX - centerX) / rect.width) * 20;
        const tiltY = ((e.clientY - centerY) / rect.height) * 20;
        
        coinRef.current.style.transform = `
          rotateY(${tiltX}deg) 
          rotateX(${-tiltY}deg) 
          translateZ(0)
        `;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero-futuristic" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      
      <div className="hero-overlay">
        {/* Animated gradient background */}
        <div className="gradient-bg"></div>
        
        {/* Grid lines */}
        <div className="grid-lines">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line" style={{
              top: `${i * 5}%`,
            }}></div>
          ))}
          
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line vertical" style={{
              left: `${i * 5}%`,
            }}></div>
          ))}
        </div>
      </div>
      
      <div className={`hero-content ${isLoaded ? 'visible' : ''}`}>
        <div className="hero-left-side">
          <div className="hero-badge">
            <div className="badge-dot"></div>
            <span>Migración a Cardano</span>
          </div>
          
          <h1 className="hero-title">ATOMICO 3</h1>
          
          <div className="hero-headline">La revolución blockchain para el litio</div>
          
          <p className="hero-description">
            Tokenización de activos mineros respaldada por reservas de litio certificadas.
            El puente entre el mundo blockchain y recursos naturales estratégicos.
          </p>
          
          <div className="hero-cta-group">
            <a href="#/comoInvertir" className="hero-cta primary">
              <span className="cta-text">Invertir en Atomico</span>
              <span className="cta-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">9K+</div>
              <div className="stat-label">Inversores</div>
            </div>
            
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <div className="stat-number">$2.3M</div>
              <div className="stat-label">Capitalización</div>
            </div>
            
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <div className="stat-number">Cardano</div>
              <div className="stat-label">Blockchain</div>
            </div>
          </div>
        </div>
        
        <div className="hero-right-side">
          <div className="coin-showcase" ref={coinRef}>
            {/* Holographic effect layers */}
            <div className="hologram-container">
              <div className="hologram-layer layer-1"></div>
              <div className="hologram-layer layer-2"></div>
              <div className="hologram-layer layer-3"></div>
              <div className="hologram-scan"></div>
              
              {/* AT3 Coin - Enhanced with more details and animations */}
              <div className="at3-coin">
                {/* Front face */}
                <div className="coin-face front">
                  <div className="coin-center">
                    <span>AT3</span>
                  </div>
                  {/* Circle markings for more detail */}
                  <div className="coin-circle-markings">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="coin-marking"
                        style={{
                          top: `${Math.sin(i * 15 * Math.PI / 180) * 45 + 50}%`,
                          left: `${Math.cos(i * 15 * Math.PI / 180) * 45 + 50}%`,
                          animationDelay: `${i * 0.1}s`,
                          opacity: i % 2 === 0 ? 0.9 : 0.5,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Back face */}
                <div className="coin-face back">
                  <div className="coin-center">
                    <span>Li</span>
                  </div>
                  {/* Circle markings for more detail */}
                  <div className="coin-circle-markings">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="coin-marking"
                        style={{
                          top: `${Math.sin(i * 15 * Math.PI / 180) * 45 + 50}%`,
                          left: `${Math.cos(i * 15 * Math.PI / 180) * 45 + 50}%`,
                          animationDelay: `${i * 0.1}s`,
                          opacity: i % 2 === 0 ? 0.9 : 0.5,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Edge - More edge segments for better detail */}
                <div className="coin-edge">
                  {[...Array(120)].map((_, i) => (
                    <div key={i} className="edge-segment" 
                      style={{transform: `rotateY(${i * 3}deg) translateZ(60px)`}}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Particle system for coin */}
              <div className="coin-particles">
                {[...Array(20)].map((_, i) => {
                  const angle = (i * 18) * Math.PI / 180;
                  return (
                    <div 
                      key={i} 
                      className="coin-particle"
                      style={{
                        top: '50%',
                        left: '50%',
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        animationDuration: `${Math.random() * 4 + 6}s`,
                        animationDelay: `${i * 0.2}s`,
                        transform: `rotate(${angle}rad) translateX(90px)`
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
            
            {/* Orbiting elements */}
            <div className="orbital-system">
              <div className="orbit orbit-1">
                <div className="orbital-element elem-1"></div>
              </div>
              
              <div className="orbit orbit-2">
                <div className="orbital-element elem-2"></div>
              </div>
              
              <div className="orbit orbit-3">
                <div className="orbital-element elem-3"></div>
              </div>
            </div>
            
            {/* Data circles */}
            <div className="data-circles">
              <div className="data-circle circle-1">
                <span className="circle-label">Litio</span>
                <span className="circle-value">Certificado</span>
              </div>
              
              <div className="data-circle circle-2">
                <span className="circle-label">Blockchain</span>
                <span className="circle-value">Cardano</span>
              </div>
              
              <div className="data-circle circle-3">
                <span className="circle-label">Valor</span>
                <span className="circle-value">Real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`scroll-indicator ${isLoaded ? 'visible' : ''}`}>
        <span>Scroll</span>
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
