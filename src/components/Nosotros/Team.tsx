import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CeoSpotlight } from './CeoSpotlight'
import { motion } from 'framer-motion'
import { TeamHeader } from './TeamHeader'

export const Team = () => {
  const [t] = useTranslation("global")
  const equipoRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#equipo' && equipoRef.current) {
      const elementPosition = equipoRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 100,
        behavior: 'smooth',
      });
    }
  }, [location]);

  // CEO message
  const ceoMessage = `Desde la creación de Atómico 3, mi propósito ha sido liderar una revolución digital que impulse la transición hacia una economía plenamente digitalizada, un cambio esencial para garantizar la transparencia y la visibilidad en los ecosistemas económicos modernos.

El litio, como pilar estratégico de la nueva era energética, me motivó a diseñar un modelo disruptivo para la formación de precios, centrado en la trazabilidad y la transparencia de este valioso commodity. Su relevancia para la electromovilidad, un sector clave en la transición hacia energías limpias, lo posiciona como un motor del cambio hacia un futuro sostenible.

En 2019, identifiqué la oportunidad de crear una sinergia entre tecnología, sostenibilidad y minería responsable, con el objetivo de transformar toda la cadena de valor del litio. Este proyecto no solo busca redefinir cómo interactuamos con los recursos estratégicos, sino también establecer un estándar global que integre innovación, eficiencia y compromiso con el medio ambiente.

Con Atómico 3, estamos trazando el camino hacia un futuro donde la digitalización y la sostenibilidad no sean aspiraciones, sino realidades integradas en un ecosistema económico más justo, transparente y dinámico.`;

  // CEO image URL with the correct 'Q' character
  const ceoImageUrl = "https://i.ibb.co/99YDM9jQ/Whats-App-Image-2025-03-05-at-3-48-03-AM.jpg";

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
            email: "prutigliano@atomico3.io"
          }}
        />

      </div>
    </article>
  );
};
