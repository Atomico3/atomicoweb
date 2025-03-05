import { FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown, FaHandshake } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { DefaultAvatar } from './DefaultAvatar';

interface TeamMemberCardProps {
  id: number;
  nombre: string;
  puesto: string;
  bio?: string;
  achievements?: string[];
  imagen: string | null;
  alt: string;
  isSelected?: boolean;
  onClick?: () => void;
  isPartner?: boolean;
  partnerType?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const TeamMemberCard = ({ 
  nombre, 
  puesto, 
  bio, 
  achievements, 
  imagen, 
  alt, 
  socialLinks, 
  isSelected,
  isPartner = false,
  onClick
}: TeamMemberCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Determine card accent color based on partner status
  const accentColor = isPartner ? 
    'from-teal-500 to-blue-600' : 
    'from-blue-600 to-purple-500';

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 
                 transform hover:-translate-y-1 flex flex-col relative ${isSelected ? 'ring-4 ring-blue-200' : ''}`}
      style={{ 
        boxShadow: isSelected ? 
          '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.1)' : 
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Partner indicator */}
      {isPartner && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-blue-500 p-1.5 rounded-full shadow-md z-10">
          <FaHandshake className="text-white" size={14} />
        </div>
      )}
      
      {/* Card accent line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentColor}`}></div>
      
      {/* Card Header with image and basic info */}
      <div className="p-6 flex flex-col items-center">
        {/* Image with animated container */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
          <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-md relative z-10">
            {imagen ? (
              <img 
                src={imagen} 
                alt={alt} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
              />
            ) : (
              <DefaultAvatar name={nombre} size={112} />
            )}
          </div>
          
          {/* Hover overlay for social links */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-3 shadow-lg flex gap-3">
              {socialLinks?.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
                >
                  <FaLinkedin size={16} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-400 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50"
                >
                  <FaTwitter size={16} />
                </a>
              )}
              {socialLinks?.email && (
                <a 
                  href={`mailto:${socialLinks.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-600 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50"
                >
                  <FaEnvelope size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Name and title with gradient text */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{nombre}</h3>
          <p className={`text-sm font-medium ${isPartner ? 'text-teal-600' : 'text-blue-600'}`}>{puesto}</p>
        </div>
      </div>
      
      {/* Bio section */}
      <div className="px-6 pb-6 pt-0 flex-grow">
        {bio && <p className="text-gray-600 text-sm leading-relaxed mb-4">{bio}</p>}
        
        {/* Social links and expand button */}
        <div className="mt-auto flex items-center justify-between">
          {/* Social links - now in a container */}
          <div className="flex">
            {socialLinks?.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:text-blue-600 transition-colors mr-3"
              >
                <FaLinkedin size={18} />
              </a>
            )}
            {socialLinks?.twitter && (
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:text-blue-400 transition-colors mr-3"
              >
                <FaTwitter size={18} />
              </a>
            )}
            {socialLinks?.email && (
              <a 
                href={`mailto:${socialLinks.email}`}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaEnvelope size={18} />
              </a>
            )}
          </div>
          
          {/* Expand button */}
          {achievements && achievements.length > 0 && (
            <div 
              className="flex items-center text-blue-600 font-medium cursor-pointer text-sm"
              onClick={onClick}
            >
              Más información
              <FaChevronDown 
                size={12} 
                className={`ml-1 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Expandable achievements section */}
      <AnimatePresence>
        {isSelected && achievements && achievements.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-gray-50 border-t border-gray-100"
          >
            <div className="p-5">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Logros destacados</h4>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 text-sm">•</span>
                    <span className="text-gray-700 text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
