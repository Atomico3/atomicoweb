import { useEffect, useRef } from 'react';
import staking2 from '../../assets/staking2.jpeg';
import stakingEN from '../../assets/stakingEN.jpeg';
import stakingES from '../../assets/stakingES.png';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const Staking = () => {
    const { t, i18n } = useTranslation("global");
    const location = useLocation();
    const stakingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (location.hash === '#staking' && stakingRef.current) {
            const elementPosition = stakingRef.current.getBoundingClientRect().top + window.scrollY;
            const offset = window.innerWidth < 768 ? 40 : 60;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    }, [location]);

    return (
        <>
            {/* Sección de Migración de Tokens (Añadida al inicio) */}
            <section className="bg-white py-8">
                <div className="container mx-auto px-4">
                    {/* Título de Migración en Azul */}
                    <h2 className="text-3xl font-bold mb-6 text-center text-celeste">
                        Registro para la Migración de Tokens AT3
                    </h2>
                    {/* Contenido de Migración en Negro */}
                    <div className="prose max-w-none text-black">
                        <p>
                            REGISTRO PARA LA MIGRACIÓN DE LOS TOKENS DE ATÓMICO 3 (AT3) DE LA RED POLYGON A LOS TOKENS DE ATÓMICO 3 (AT3) DE LA RED CARDANO. Con el objetivo de cumplir con los marcos regulatorios establecidos por la RG N° 994/2024 de la Comisión Nacional de Valores (CNV) y en relación con el Registro de Proveedores de Servicios de Activos Virtuales, conforme a lo dispuesto en las leyes Nros. 27.739, 25.246 y el Art. 4 bis (referente al encubrimiento y lavado de activos de origen delictivo), la compañía Atómico 3 S.A., bajo el registro de inscripción y cumplimiento N° 103, determinó, dentro de su marco de cumplimiento (Compliance), la siguiente orden del día para dar inicio a la registración, cuyos objetivos son:
                        </p>
                        <ul>
                            <li>Se fijará como medio de registración la página web de la empresa www.atomico3.io, a través del enlace creado por el departamento de sistemas.</li>
                            <li>Se han establecido los requisitos para la registración, los cuales deberán cumplimentarse de forma digital y ser enviados a nuestra base de datos, la cual ha sido preparada especialmente para este proceso de cumplimiento.</li>
                            <li>El procedimiento de registro para la migración de AT3 de Polygon (<strong>0x22a79a08ddb74a9f1a4ebe5da75300ad9f1aed76</strong>) a Atómico 3 Cardano (<strong>asset10n0du9x28k3weydqsx9204vteyzg7j09qdpq67</strong>)</li>
                            <li>Todos los requisitos cumplimentados en el proceso KYC serán debidamente custodiados por la compañía, y su utilización se regirá por las normas de cumplimiento requeridas por la entidad de control, según lo establecido por la Comisión Nacional de Valores de la República Argentina y por la autoridad que lo solicite, para los fines para los cuales fueron creados.</li>
                        </ul>
                        <h4>PROCEDIMIENTO / OBJETIVO:</h4>
                        <p>
                            En cumplimiento con nuestro compromiso ante las autoridades regulatorias y con el fin de salvaguardar a nuestros holders, se comunica que la Etapa 1 del proceso de registración será crucial para estar habilitados y avanzar con la Etapa 2 y la posterior migración de los tokens de ATÓMICO 3 (AT3) de la red Polygon a los tokens de ATÓMICO 3 (AT3) de la red Cardano. Este proceso se llevará a cabo siempre en plena conformidad con las regulaciones globales en materia de criptoactivos y, sobre todo, garantizando rapidez, seguridad y cumplimiento con todas las normativas relacionadas con la prevención del lavado de dinero y el financiamiento del terrorismo.
                        </p>
                        <p>
                            Todos los holders presentarán, en carácter de declaración jurada (DDJJ), la información proporcionada por el firmante de este formulario.
                        </p>
                    </div>

                    {/* Nueva sección añadida: Enlaces a formularios */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-center text-black">
                            SELECCIONA EL FORMULARIO CORRECTO
                        </h3>
                        <p className="text-center text-black">
                            PERSONA HUMANA RESIDENTE EN ARGENTINA: <a href="https://forms.gle/R4nNv53xKsf2ozhK8" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/R4nNv53xKsf2ozhK8</a>
                        </p>
                        <p className="text-center text-black">
                            PERSONA HUMANA NO RESIDENTE EN ARGENTINA: <a href="https://forms.gle/WMbnxGrG7kaLXFLFA" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/WMbnxGrG7kaLXFLFA</a>
                        </p>
                        <p className="text-center text-black">
                            PERSONA JURIDICA RESIDENTE EN ARGENTINA: <a href="https://forms.gle/MaLEyAeFx5Yo2sJG9" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/MaLEyAeFx5Yo2sJG9</a>
                        </p>
                        <p className="text-center text-black">
                            PERSONA JURIDICA NO RESIDENTE EN ARGENTINA: <a href="https://forms.gle/oQt8JqYGCcwYgWYG9" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/oQt8JqYGCcwYgWYG9</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección de Staking Original */}
            <section className='bg-white pt-20 lg:pt-0' ref={stakingRef} id='staking'>
                <section className="lg:pt-20 flex overflow-hidden sm:grid sm:grid-cols-4 py-10">
                    <div className='flex items-center'>
                        <img
                            alt="staking"
                            src={i18n.language === 'es' ? stakingES : stakingEN}
                            className='hidden sm:block max-w-[200px] lg:max-w-[400px] w-2/3 mx-auto object-contain lg:object-contain rounded-md'
                        />
                    </div>
                    <div className="mx-auto sm:col-span-2 md:p-0 md:w-full px-10 md:px-5 text-center lg:text-left ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="mb-5 w-full text-celeste text-2xl font-bold lg:text-6xl py-2 ">
                            {t("stakingView.¿Qué es el Staking?")}
                        </h2>
                        <p className="text-dark-light text-xs md:mt-4 md:block text-justify md:px-0 lg:text-base break-words">
                            {t("stakingView.staking p1")}
                            <br />
                            <span className="block sm:hidden"><br /></span>
                            {t("stakingView.staking p1.1")}
                            <br />
                            <span className="block sm:hidden"><br /></span>
                            {t("stakingView.staking p1.2")} <br /> <br />
                            {t("stakingView.staking p1.3")}
                        </p>
                        <div className="mt-4 md:mt-8 flex justify-between md:justify-center lg:justify-start ">
                            <Link to={'/ComoInvertir#tutoriales'} className='w-2/3 max-w-[150px] lg:max-w-[200px] md:w-full bg-blue-50 border border-celeste text-celeste py-2 lg:py-2 rounded-md px-6 text-xs sm:text-sm lg:text-base text-center hover:cursor-pointer transition hover:bg-blue-200 hover:text-blue-800'>
                                {t("invertir.ver tutoriales")}
                            </Link>
                            <a className='ml-5 w-2/3 max-w-[150px] lg:max-w-[200px] md:w-full bg-blue-50 border border-celeste text-celeste py-2 lg:py-2 rounded-md px-6 text-xs sm:text-sm lg:text-base text-center hover:cursor-pointer transition hover:bg-blue-200 hover:text-blue-800'
                                href='https://atomico3dapp.vercel.app/' target='_blank'>
                                Staking
                            </a>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <img
                            alt="staking"
                            src={staking2}
                            className='hidden sm:block max-w-[200px] lg:max-w-[400px] w-2/3 mx-auto object-contain lg:object-contain rounded-md'
                        />
                    </div>
                </section>
            </section>
        </>
    );
};
