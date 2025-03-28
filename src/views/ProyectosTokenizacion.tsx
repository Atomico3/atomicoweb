import { useRef, useEffect } from 'react';
import video from '../assets/video.mp4'
import { LitioInfo } from '../components/ProyectosTokenizacion/LitioInfo';
import { NoticiasLitio } from '../components/ProyectosTokenizacion/NoticiasLitio';
import { useTranslation } from 'react-i18next';

export const ProyectosTokenizacion = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [t] = useTranslation("global")
    
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                video.currentTime = 2; // Ajusta el tiempo de inicio al segundo 5
                video.play();
            };
        }
    }, []);
    
    return (
        <>
        <section className="relative overflow-hidden">
            {/* Video de fondo */}
            <video
                ref={videoRef}
                src={video}  // Reemplaza "ruta-del-video.mp4" con la URL o ruta de tu video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
            ></video>
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="bg-gray-500/25 p-10 max-w-xl flex flex-col justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                      {t("proyectosTokenizacion.proyectos de")}
                        <strong className="block font-extrabold text-blue-500">
                      {t("proyectosTokenizacion.tokenizacion")}
                            
                        </strong>
                    </h1>
                    <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                    {t("proyectosTokenizacion.p1")}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a
                            className="block w-full rounded bg-blue-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                        >
                            {t("proyectosTokenizacion.p2")}
                        </a>
                        <a
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-500 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                        >
                            {t("proyectosTokenizacion.p3")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Sección de video de YouTube */}
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-blue-500">Salar de Mogna</h2>
                <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
                    <iframe 
                        className="w-full h-96 rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/1D48M03COO8" 
                        title="Salar de Mogna"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </section>
        
        <LitioInfo/>
        <NoticiasLitio/>
        </>
    );
}
