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

export const AtomicInfo: React.FC = () => {
    const [t] = useTranslation("global");

    return (
        <>
            <section className="relative text-white bg-white pb-7">
                <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 overflow-hidden bg-cover bg-no-repeat p-8 md:p-12 lg:px-16 lg:py-24"
                    style={{
                        background: `linear-gradient(to bottom, rgba(0, 0, 18, 0.7), rgba(0, 0, 0, 0.1)), url(${at3})`,
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    <div className="mx-auto w-full text-center max-w-screen-lg flex flex-col md:flex-row">
                        <div className="md:w-full">
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
                                <h3 className='text-xl font-bold mt-4'>Nuestra billetera oficial es la</h3>
                                <span className='text-sm md:text-2xl text-celeste font-bold'>0xAfF655c15c943121Dea79B67c47ac9BD2253FD65</span> <br />
                                <h3 className='text-xl font-bold mt-4'>Nuestro contrato POLYGON es</h3>
                                <span className='text-sm md:text-2xl text-celeste font-bold'>0x22a79a08ddb74A9F1A4eBE5da75300Ad9f1AED76</span>
                                <br />
                                <h3 className='text-xl font-bold mt-4'>Nuestro contrato CARDANO</h3>
                                <button className="inline-block px-5 py-2 mt-2 text-sm md:text-2xl font-extrabold 
                                                   bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg 
                                                   shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all">
                                    asset10n0du9x28k3weydqsx9204vteyzg7j09qdpq67
                                </button>
                            </p>
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
                            Esta alianza estratégica nos va a permitir migrar y llevar a Atomico3 desde la red Polygon a la red Cardano.
                        </p>
                        <p className="text-base text-justify mb-4">
                            Este movimiento nos permite aprovechar sus capacidades avanzadas, para introducir la tokenizacion (novedoso mecanismo de financiamiento para activos mineros), utilizando tecnología de tokens algorítmicos, respaldada por reservas de litio certificadas ajustadas por el valor del litio.
                        </p>
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
