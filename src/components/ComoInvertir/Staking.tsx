import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const Staking = () => {
    const { t } = useTranslation("global"); 
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
                        {t("staking.migracion_titulo")} {/*  uso de t */}
                    </h2>
                    {/* Contenido de Migración en Negro */}
                    <div className="prose max-w-none text-black">
                        <p>
                            {t("staking.migracion_p1")} {/* uso de t */}
                        </p>
                        <ol className="list-decimal list-inside">
                            <li>{t("staking.migracion_li1")}</li> {/* uso de t */}
                            <li>{t("staking.migracion_li2")}</li> {/* uso de t */}
                            <li>{t("staking.migracion_li3")}</li> {/* uso de t */}
                            <li>{t("staking.migracion_li4")}</li> {/* uso de t */}
                        </ol>
                        <h4>{t("staking.migracion_procedimiento_titulo")}</h4> {/*uso de t */}
                        <p>
                            {t("staking.migracion_procedimiento_p1")} {/*uso de t */}
                        </p>
                        <p>
                            {t("staking.migracion_procedimiento_p2")} {/*uso de t */}
                        </p>
                    </div>

                    {/* Nueva sección añadida: Enlaces a formularios */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4 text-center text-black">
                            {t("staking.formularios_titulo")} {/*uso de t */}
                        </h3>
                        <p className="text-center text-black text-lg">
                            {t("staking.formularios_persona_humana_residente")} <a href="https://forms.gle/R4nNv53xKsf2ozhK8" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/R4nNv53xKsf2ozhK8</a>
                        </p>
                        <p className="text-center text-black text-lg">
                            {t("staking.formularios_persona_humana_no_residente")} <a href="https://forms.gle/WMbnxGrG7kaLXFLFA" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/WMbnxGrG7kaLXFLFA</a>
                        </p>
                        <p className="text-center text-black text-lg">
                            {t("staking.formularios_persona_juridica_residente")} <a href="https://forms.gle/MaLEyAeFx5Yo2sJG9" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.google/MaLEyAeFx5Yo2sJG9</a>
                        </p>
                        <p className="text-center text-black text-lg">
                            {t("staking.formularios_persona_juridica_no_residente")} <a href="https://forms.gle/oQt8JqYGCcwYgWYG9" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://forms.gle/oQt8JqYGCcwYgWYG9</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};