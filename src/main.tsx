import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import global_en from './translations/en/global.json'
import global_es from './translations/es/global.json'
import global_por from './translations/por/global.json'
import faqForLaw_en from './translations/en/faqForLaw.json'
import faqForLaw_es from './translations/es/faqForLaw.json'
import faqForLaw_por from './translations/por/faqForLaw.json'
import cookiesPolicy_en from './translations/en/cookiesPolicy.json'
import cookiesPolicy_es from './translations/es/cookiesPolicy.json'
import cookiesPolicy_por from './translations/por/cookiesPolicy.json'

import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

// Add team member translations
const enrichGlobalTranslations = (translations: any) => {
  if (!translations.team) {
    translations.team = {};
  }
  
  // Add CEO specific translations
  translations.team.ceo_message = translations.team.ceo_message || 
    `Desde la creación de Atómico 3, mi propósito ha sido liderar una revolución digital que impulse la transición hacia una economía plenamente digitalizada, un cambio esencial para garantizar la transparencia y la visibilidad en los ecosistemas económicos modernos.

El litio, como pilar estratégico de la nueva era energética, me motivó a diseñar un modelo disruptivo para la formación de precios, centrado en la trazabilidad y la transparencia de este valioso commodity. Su relevancia para la electromovilidad, un sector clave en la transición hacia energías limpias, lo posiciona como un motor del cambio hacia un futuro sostenible.

En 2019, identifiqué la oportunidad de crear una sinergia entre tecnología, sostenibilidad y minería responsable, con el objetivo de transformar toda la cadena de valor del litio. Este proyecto no solo busca redefinir cómo interactuamos con los recursos estratégicos, sino también establecer un estándar global que integre innovación, eficiencia y compromiso con el medio ambiente.

Con Atómico 3, estamos trazando el camino hacia un futuro donde la digitalización y la sostenibilidad no sean aspiraciones, sino realidades integradas en un ecosistema económico más justo, transparente y dinámico.`;
  
  // Add section titles
  translations.team.leadership_title = translations.team.leadership_title || "Leadership Team";
  translations.team.executive_title = translations.team.executive_title || "Executive Team";
  translations.team.department_title = translations.team.department_title || "Department Heads";
  translations.team.partners_title = translations.team.partners_title || "Partners Comerciales";
  
  // Original team members
  translations.team.subtitle = translations.team.subtitle || "Leadership Team";
  
  translations.team.pablo_bio = translations.team.pablo_bio || 
    "CEO and founder with extensive experience in blockchain and financial technology. Leading the company's vision and strategy.";
  translations.team.pablo_achievement1 = translations.team.pablo_achievement1 || 
    "Pioneer in blockchain technology with over 10 years of experience";
  translations.team.pablo_achievement2 = translations.team.pablo_achievement2 || 
    "Successfully led multiple fintech startups to profitability";
  translations.team.pablo_achievement3 = translations.team.pablo_achievement3 || 
    "Recognized speaker at international blockchain conferences";
  
  translations.team.ezequiel_bio = translations.team.ezequiel_bio || 
    "President with a strong background in business development and corporate management. Driving growth and operational excellence.";
  translations.team.ezequiel_achievement1 = translations.team.ezequiel_achievement1 || 
    "15+ years of experience in corporate finance and investment management";
  translations.team.ezequiel_achievement2 = translations.team.ezequiel_achievement2 || 
    "Former advisor to government agencies on financial technology regulation";
  translations.team.ezequiel_achievement3 = translations.team.ezequiel_achievement3 || 
    "Established strategic partnerships with leading financial institutions";
  
  // New team member positions
  translations.team.cto = translations.team.cto || "Gerencia de Tecnología";
  translations.team.cfo = translations.team.cfo || "CFO";
  translations.team.coo = translations.team.coo || "Gerencia de RRHH & Estrategia";
  translations.team.legal_head = translations.team.legal_head || "Gerencia de Comunicaciones";
  translations.team.biz_dev_head = translations.team.biz_dev_head || "Dirección de Relaciones Institucionales";
  translations.team.lead_dev = translations.team.lead_dev || "Tecnología & Desarrollo";
  translations.team.marketing_head = translations.team.marketing_head || "Gerencia de Prensa";
  translations.team.Economy_head = translations.team.Economy_head || "Dirección de Minería & Economía";

  
  // New team member bios
  translations.team.maria_bio = translations.team.maria_bio || 
    "Tech visionary with 12+ years in blockchain architecture. Leading our technology innovation and development strategies.";
  translations.team.carlos_bio = translations.team.carlos_bio || 
    "Financial expert with extensive experience in investment banking and crypto assets management.";
  translations.team.laura_bio = translations.team.laura_bio || 
    "Operations specialist with a track record of optimizing business processes and scaling fintech companies.";
  translations.team.alejandro_bio = translations.team.alejandro_bio || 
    "Legal expert specializing in blockchain regulatory frameworks and international financial law.";
  translations.team.valentina_bio = translations.team.valentina_bio || 
    "Strategic partnership expert with deep connections in the financial and technology sectors.";
  translations.team.matias_bio = translations.team.matias_bio || 
    "Technical genius behind our core blockchain architecture with expertise in smart contracts and distributed systems.";
  translations.team.sofia_bio = translations.team.sofia_bio || 
    "Creative marketing strategist specializing in blockchain and fintech brand development.";
  
  // New team member achievements
  translations.team.maria_achievement1 = translations.team.maria_achievement1 || 
    "Led development of several groundbreaking blockchain platforms";
  translations.team.maria_achievement2 = translations.team.maria_achievement2 || 
    "Patent holder for innovative distributed ledger solutions";
  translations.team.maria_achievement3 = translations.team.maria_achievement3 || 
    "Former tech advisor to multiple successful crypto startups";
  
  translations.team.carlos_achievement1 = translations.team.carlos_achievement1 || 
    "Former investment director at a major global financial institution";
  translations.team.carlos_achievement2 = translations.team.carlos_achievement2 || 
    "Managed over $500M in crypto assets";
  translations.team.carlos_achievement3 = translations.team.carlos_achievement3 || 
    "Helped structure financial models for 10+ successful token offerings";
  
  translations.team.laura_achievement1 = translations.team.laura_achievement1 || 
    "Scaled operations at previous fintech from 20 to 200 employees";
  translations.team.laura_achievement2 = translations.team.laura_achievement2 || 
    "Implemented efficient operational protocols that reduced costs by 30%";
  translations.team.laura_achievement3 = translations.team.laura_achievement3 || 
    "Led successful integrations of 3 acquired companies";
  
  translations.team.alejandro_achievement1 = translations.team.alejandro_achievement1 || 
    "Helped develop regulatory frameworks for digital assets in multiple jurisdictions";
  translations.team.alejandro_achievement2 = translations.team.alejandro_achievement2 || 
    "Former advisor to central banks on digital currency regulations";
  translations.team.alejandro_achievement3 = translations.team.alejandro_achievement3 || 
    "Published author on blockchain legal implications";
  
  translations.team.valentina_achievement1 = translations.team.valentina_achievement1 || 
    "Secured partnerships with 5 major financial institutions";
  translations.team.valentina_achievement2 = translations.team.valentina_achievement2 || 
    "Expanded company operations into 3 new international markets";
  translations.team.valentina_achievement3 = translations.team.valentina_achievement3 || 
    "Generated over $10M in new business through strategic alliances";
  
  translations.team.matias_achievement1 = translations.team.matias_achievement1 || 
    "Developed innovative consensus mechanism for high-throughput transactions";
  translations.team.matias_achievement2 = translations.team.matias_achievement2 || 
    "Contributor to multiple open-source blockchain projects";
  translations.team.matias_achievement3 = translations.team.matias_achievement3 || 
    "Created custom smart contract framework used by leading DeFi platforms";
  
  translations.team.sofia_achievement1 = translations.team.sofia_achievement1 || 
    "Led marketing campaigns that increased user acquisition by 200%";
  translations.team.sofia_achievement2 = translations.team.sofia_achievement2 || 
    "Established company as thought leader through strategic content initiatives";
  translations.team.sofia_achievement3 = translations.team.sofia_achievement3 || 
    "Organized successful blockchain education events with 10,000+ attendees";
  
  return translations;
};

// Enrich translations with team data
const enriched_global_en = enrichGlobalTranslations(global_en);
const enriched_global_es = enrichGlobalTranslations(global_es);
const enriched_global_por = enrichGlobalTranslations(global_por);

i18next.init({
  interpolation:{escapeValue: false},
  lng: "es",
  resources: {
    en:{
      global: enriched_global_en,
      faqForLaw: faqForLaw_en,
      cookiesPolicy: cookiesPolicy_en
    },
    es:{
      global: enriched_global_es,
      faqForLaw: faqForLaw_es,
      cookiesPolicy: cookiesPolicy_es
    },
    por:{
      global: enriched_global_por,
      faqForLaw: faqForLaw_por,
      cookiesPolicy: cookiesPolicy_por
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
)



