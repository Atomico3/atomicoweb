import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const TeamHeader = () => {
  const [t] = useTranslation("global");
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-12"
    >
      <div className="mb-2 flex items-center justify-center">
        <div className="w-8 h-0.5 bg-blue-600"></div>
        <span className="mx-3 text-blue-600 font-medium uppercase text-xs tracking-wider">
          {t("team.subtitle")}
        </span>
        <div className="w-8 h-0.5 bg-blue-600"></div>
      </div>
      
      <h2 className='text-3xl font-bold mb-4 text-gray-800'>
        {t("team.nuestro equipo")}
      </h2>
      
      <p className='text-sm text-gray-600 mb-0 leading-relaxed max-w-2xl mx-auto'>
        {t("team.nuestro equipo descripcion")}
      </p>
    </motion.div>
  );
};
