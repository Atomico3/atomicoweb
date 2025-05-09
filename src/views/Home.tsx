import { useEffect, useRef } from "react";
import { AtomicInfo } from "../components/AtomicInfo";
import { Faq } from "../components/Faq";
import { Invest } from "../components/Invest";
import { Invertir } from "../components/Invertir";
import { VideoSection } from "../components/VideoSection";
import { useLocation } from "react-router-dom";
import './Home.css';
import HeroSection from "../components/HeroSection";

export const Home = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to FAQ section if the URL path is '/faq'
    if (location.pathname === '/faq') {
      faqRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="main-container">
      {/* Modern HeroSection with Three.js instead of Header */}
      <HeroSection />
      
      {/* Redesigned components follow */}
      <AtomicInfo />
      <VideoSection />
      <Invest />
   
      <Faq ref={faqRef} />
    </div>
  );
};
