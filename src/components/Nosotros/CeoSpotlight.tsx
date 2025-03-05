import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface CeoSpotlightProps {
  name: string;
  title: string;
  message: string;
  image: string;
  compact?: boolean; // Add compact mode option
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const CeoSpotlight = ({ 
  name, 
  title, 
  message, 
  image, 
  socialLinks,
  compact = false 
}: CeoSpotlightProps) => {
  return (
    <section className={compact ? "mb-16" : "mb-24"}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400"></div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Image Section - more compact */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/3 relative bg-gradient-to-br from-blue-50 to-gray-50"
          >
            {/* Adjust image container size */}
            <div className={compact ? "lg:h-full max-h-[400px]" : "aspect-w-4 aspect-h-5 lg:h-full"}>
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent lg:hidden"></div>
          </motion.div>
          
          {/* Content Section - more compact */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-2/3 p-5 sm:p-6 lg:p-8"
          >
            <div className="flex flex-col h-full">
              {/* Header with name and title - more compact */}
              <div className={compact ? "mb-4" : "mb-6"}>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">
                      <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                        {name}
                      </span>
                    </h1>
                    <h2 className="text-blue-600 text-lg font-medium">{title}</h2>
                  </div>
                  
                  {/* Social links */}
                  <div className="flex space-x-3">
                    {socialLinks?.linkedin && (
                      <a 
                        href={socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    )}
                    {socialLinks?.twitter && (
                      <a 
                        href={socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter size={18} />
                      </a>
                    )}
                    {socialLinks?.email && (
                      <a 
                        href={`mailto:${socialLinks.email}`}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <FaEnvelope size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Separator - thinner */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mb-4"></div>
              
              {/* Message with quote styling - smaller quotes */}
              <div className="relative">
                <span className="absolute -top-3 -left-1 text-blue-100 text-5xl font-serif">"</span>
                <div className="relative z-10 pl-2 pr-2">
                  {message.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-3 text-gray-700 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <span className="absolute bottom-0 right-1 text-blue-100 text-5xl font-serif">"</span>
              </div>
              
              {/* No signature in compact mode */}
              {!compact && (
                <div className="mt-6 flex items-end justify-end">
                  <div className="font-cursive text-lg text-blue-700">
                    - {name}, {title}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
