import React from 'react';
import { useTranslation } from 'react-i18next';
import energy from '../assets/energy.png';
import investors from '../assets/Investors.png';
import platform from '../assets/platform.png';
import at3 from '../assets/pruebas/p1.jpeg';
import partner1 from '../assets/partners/partner1.png';
import partner2 from '../assets/partners/partner2.png';
import migration1 from '../assets/migration/migration1.png';
import migration2 from '../assets/migration/migration2.png';

// Welcome Popup
const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 
      ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className={`absolute inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-500
        ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-gradient-to-br from-white via-blue-50 to-blue-100 
          rounded-2xl p-12 max-w-4xl w-full mx-4 text-center shadow-2xl
          transform transition-all duration-500 ease-in-out
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition-colors duration-300
            transform hover:scale-110 hover:rotate-180 transition-transform duration-300"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-600 to-blue-400 
          bg-clip-text text-transparent">
          BIENVENIDO A ATOMICO 3
        </h2>

        <div className="mb-12 space-y-6">
          <p className="text-xl text-gray-700 font-medium mb-8">
            EN EL SIGUIENTE ENLACE PODRAS COMPRAR NUEVOS ATOMICOS CON UN BONUS EXTRA EN STAKING AUTOMATICO
          </p>

          <a
            href="https://at3staking.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 
              text-white rounded-xl hover:from-blue-700 hover:to-blue-500 transform hover:-translate-y-1 
              transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Compra-stakeBonus
          </a>
        </div>

        <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mx-auto mb-12" />

        <div className="space-y-6">
          <p className="text-xl text-gray-700 font-medium mb-8">
            SI YA TENES ATOMICOS PODES INGRESAR AL SIGUIENTE ENLACE PARA HACER STAKING Y GENERAR RECOMPENSAS MIENTRAS ESPERAS LA MIGRACION A CARDANO
          </p>

          <a
            href="https://dapp-at-3.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 
              text-white rounded-xl hover:from-blue-500 hover:to-blue-700 transform hover:-translate-y-1 
              transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            STAKING
          </a>
        </div>
      </div>
    </div>
  );
};

export const AtomicInfo: React.FC = () => {
  const [t] = useTranslation("global");

  return (
    <>
      <WelcomePopup />
      <section className="relative text-white bg-white pb-7">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 overflow-hidden bg-cover bg-no-repeat p-8 md:p-12 lg:px-16 lg:py-24"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 18, 0.7), rgba(0, 0, 0, 0.1)), url(${at3})`,
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}>
          <div className="mx-auto w-full text-center max-w-screen-lg flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-celeste">
                {t("atomicInfo.que es atomico")}
              </h2>

              <p className="mt-10 text-gray-300 w-full mx-auto text-sm lg:text-xl text-justify px-4">
                {t("atomicInfo.p1")}
                <br />
                {t("atomicInfo.p2")}
                <br />
                {t("atomicInfo.p3")}
                <br /><br />
              </p>
              <p className='px-4 leading-2 break-words text-sm lg:text-xl text-left'>
                {t("atomicInfo.p4")}
                <span className='text-sm md:text-2xl text-celeste font-bold'>0xAfF655c15c943121Dea79B67c47ac9BD2253FD65.</span> <br />
                {t("atomicInfo.p5")}
                <span className='text-sm md:text-2xl text-celeste font-bold'>0x22a79a08ddb74A9F1A4eBE5da75300Ad9f1AED76</span>
              </p>
            </div>

            <div className="md:w-1/3 mt-8 md:mt-0">
              <h2 className="text-2xl font-bold text-celeste mb-4 text-center">COMPRA ATOMICO 3</h2>
              <div className="relative" style={{ 
                width: '150%', 
                height: '20', 
                paddingBottom: '200%',
                borderRadius: '35px', 
                overflow: 'hidden' 
              }}>
                <iframe
                  src="https://at3staking.vercel.app/"
                  title="Atomico3 Compra-Staking"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '35px',
                    backgroundColor: 'transparent',
                  }}
                  allow="ethereum"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección de MIGRACIÓN A */}
        <div className="mt-20 px-4">
          <h2 className="text-3xl font-bold text-celeste text-center mb-8">MIGRACIÓN A</h2>
          
          <div className="max-w-4xl mx-auto mb-12 text-black">
            <p className="text-base text-justify mb-4">
              Nos complace anunciar un paso fundamental para el ecosistema de Atómico3.
            </p>
            <p className="text-base text-justify mb-4">
              En colaboración con nuestro socio tecnológico, ZenGate Global, hemos decidido trabajar juntos para hacer evolucionar al token de Atomico3 (hacia un token algorítmico), por estar su precio fijado no ya por un stable coin sino basado en el precio del litio como commodity.
            </p>
            <p className="text-base text-justify mb-4">
              Esta alianza estratégica nos va a permitir migrar y llevar a Atomico3 desde la red Polygon a la red Cardano.
            </p>
            <p className="text-base text-justify mb-4">
              Este movimiento nos permite aprovechar sus capacidades avanzadas, para introducir la tokenizacion (novedoso mecanismo de financiamiento para activos mineros), utilizando tecnología de tokens algorítmicos, respaldada por reservas de litio certificadas ajustadas por el valor del litio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img src={migration1} alt="Migración 1" className="w-48 mb-4" />
              <p className="text-center text-black text-lg">{t("ZENGATE")}</p>
              <p className="text-center text-black text-sm">{t("Una empresa líder en tecnología")}</p>
              <p className="text-center text-black text-sm">{t("que crea soluciones empresariales para empresas y gobiernos en todo el mundo")}</p>
              <p className="text-center text-black text-sm">{t("Su producto principal es la Plataforma Palmyra")}</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={migration2} alt="Migración 2" className="w-48 mb-4" />
              <p className="text-center text-black text-lg">{t("CARDANO")}</p>
              <p className="text-center text-black text-sm">{t("Una plataforma blockchain para innovadores y visionarios")}</p>
              <p className="text-center text-black text-sm">{t("que proporciona las herramientas y tecnologías")}</p>
              <p className="text-center text-black text-sm">{t("necesarias para crear posibilidades para muchos")}</p>
            </div>
          </div>
        </div>

        {/* Sección de PARTNERS */}
        <div className="mt-20 px-4">
          <h2 className="text-3xl font-bold text-celeste text-center mb-8">PARTNERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img src={partner1} alt="Partner 1" className="w-48 mb-4" />
              <p className="text-center text-black text-lg">{t("CAMARA LATINOAMERICANA DE LITIO")}</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={partner2} alt="Partner 2" className="w-48 mb-4" />
              <p className="text-center text-black text-lg">{t("MERCADO DE METALES")}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 bg-white">
          <a className="bg-white block rounded-xl border border-celeste p-6 sm:p-8 shadow-xl transition hover:border-celeste hover:shadow-light-blue hover:cursor-default" href="#">
            <img src={energy} alt="Energy" className='w-12' />
            <h2 className="mt-4 text-lg sm:text-xl font-bold text-celeste">{t("atomicInfo.criptoactivo responsable")}</h2>
            <p className="mt-1 text-sm text-black">
              {t("atomicInfo.criptoactivo responsable descripcion")}
            </p>
          </a>

          <a className="bg-white block rounded-xl border border-celeste p-6 sm:p-8 shadow-xl transition hover:border-celeste hover:shadow-light-blue hover:cursor-default" href="#">
            <img src={investors} alt="Investors" className='w-12' />
            <h2 className="mt-4 text-lg sm:text-xl font-bold text-celeste">{t("atomicInfo.mercado objetivo")}</h2>
            <p className="mt-1 text-sm text-black">
              {t("atomicInfo.mercado objetivo descripcion")}
            </p>
          </a>

          <a className="bg-white block rounded-xl border border-celeste p-6 sm:p-8 shadow-xl transition hover:border-celeste hover:shadow-light-blue hover:cursor-default" href="#">
            <img src={platform} alt="Platform" className='w-12' />
            <h2 className="mt-4 text-lg sm:text-xl font-bold text-celeste">{t("atomicInfo.plataformas utilizadas")}</h2>
            <p className="mt-1 text-sm text-black">
              {t("atomicInfo.plataformas utilizadas descripcion")}
            </p>
          </a>
        </div>
      </section>
    </>
  );
};
