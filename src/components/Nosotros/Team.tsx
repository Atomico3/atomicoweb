
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TeamMemberCard } from './TeamMemberCard'
import { CeoSpotlight } from './CeoSpotlight'
import { motion } from 'framer-motion'
import { TeamHeader } from './TeamHeader'

export const Team = () => {
  const [t] = useTranslation("global")
  const equipoRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Track expanded state for each team member independently
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  useEffect(() => {
    if (location.hash === '#equipo' && equipoRef.current) {
      const elementPosition = equipoRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 100,
        behavior: 'smooth',
      });
    }
  }, [location]);

  // Function to toggle a specific member's expanded state
  const toggleMemberExpanded = (id: number) => {
    setExpandedMember(prev => prev === id ? null : id);
  };

  // CEO message
  const ceoMessage = `Desde la creación de Atómico 3, mi propósito ha sido liderar una revolución digital que impulse la transición hacia una economía plenamente digitalizada, un cambio esencial para garantizar la transparencia y la visibilidad en los ecosistemas económicos modernos.

El litio, como pilar estratégico de la nueva era energética, me motivó a diseñar un modelo disruptivo para la formación de precios, centrado en la trazabilidad y la transparencia de este valioso commodity. Su relevancia para la electromovilidad, un sector clave en la transición hacia energías limpias, lo posiciona como un motor del cambio hacia un futuro sostenible.

En 2019, identifiqué la oportunidad de crear una sinergia entre tecnología, sostenibilidad y minería responsable, con el objetivo de transformar toda la cadena de valor del litio. Este proyecto no solo busca redefinir cómo interactuamos con los recursos estratégicos, sino también establecer un estándar global que integre innovación, eficiencia y compromiso con el medio ambiente.

Con Atómico 3, estamos trazando el camino hacia un futuro donde la digitalización y la sostenibilidad no sean aspiraciones, sino realidades integradas en un ecosistema económico más justo, transparente y dinámico.`;

  // CEO image URL with the correct 'Q' character
  const ceoImageUrl = "https://i.ibb.co/99YDM9jQ/Whats-App-Image-2025-03-05-at-3-48-03-AM.jpg";

  // Team members data
  const teamMembers = [
    // Row 1 - Leadership (excluding the CEO who gets his own spotlight)
    {
     

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <article 
      className="py-16 lg:py-20" 
      ref={equipoRef} 
      id="equipo"
      style={{
        background: `linear-gradient(to bottom, #f9fafb, #f3f4f6)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-50/50 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-50/50 blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-pink-50/30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TeamHeader />
        
        {/* CEO Spotlight with corrected image URL and compact prop */}
        <CeoSpotlight 
          name="Pablo Rutigliano" 
          title={t("team.ceo y fundador")}
          message={ceoMessage}
          image={ceoImageUrl}
          compact={true} // Add compact mode
          socialLinks={{
            linkedin: "https://linkedin.com/in/pablorutigliano",
            twitter: "https://twitter.com/pablorutigliano",
            email: "pablo@atomicocompany.com"
          }}
        />
        
        {/* Leadership team (first row) - updated to match other rows */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-8 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-md"
          >
           
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {teamMembers.slice(0, 2).map((member) => (
              <TeamMemberCard 
                key={member.id} 
                {...member}
                isSelected={expandedMember === member.id}
                onClick={() => toggleMemberExpanded(member.id)}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Executive team (second row) */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-8 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-md"
          >
            <h3 className="text-white text-sm font-medium">
            </h3>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {teamMembers.slice(2, 5).map((member) => (
              <TeamMemberCard 
                key={member.id} 
                {...member}
                isSelected={expandedMember === member.id}
                onClick={() => toggleMemberExpanded(member.id)}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Department heads */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-8 px-5 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-md"
          >
            <h3 className="text-white text-sm font-medium">
            </h3>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {teamMembers.slice(5, 8).map((member) => (
              <TeamMemberCard 
                key={member.id} 
                {...member}
                isSelected={expandedMember === member.id}
                onClick={() => toggleMemberExpanded(member.id)}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Technical Specialists */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-8 px-5 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-md"
          >
            <h3 className="text-white text-sm font-medium">
            </h3>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {teamMembers.slice(8, 10).map((member) => (
              <TeamMemberCard 
                key={member.id} 
                {...member}
                isSelected={expandedMember === member.id}
                onClick={() => toggleMemberExpanded(member.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Commercial partners */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-8 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md"
          >
            <h3 className="text-white text-sm font-medium">
              {t("team.partners_title") || "Partners Comerciales"}
            </h3>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {commercialPartners.map((partner) => (
              <TeamMemberCard 
                key={partner.id} 
                {...partner}
                isSelected={expandedMember === partner.id}
                onClick={() => toggleMemberExpanded(partner.id)}
                isPartner
              />
            ))}
          </motion.div>
        </div>
      </div>
    </article>
  );
};
