import { HashRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../views/MainLayout"
import { Home } from "../views/Home"
import { ComoInvertir } from "../views/ComoInvertir"
import ScrollToTop from "../components/ScrollToTop"
import { Noticias } from "../views/Noticias&Medios/Noticias"
import { Nosotros } from "../views/Nosotros"
import { Support } from "../views/Support"
import { LegalLayout } from "../views/Legal/LegalLayout"
import { Terms } from "../views/Legal/Terms"
import { PrivacyPolicy } from "../views/Legal/PrivacyPolicy"
import { Medios } from "../views/Noticias&Medios/Medios"
import { FaqForLaw } from "../views/Legal/FaqForLaw"
import { CookiesPolicy } from "../views/Legal/CookiesPolicy"
import { ProyectosTokenizacion } from "../views/ProyectosTokenizacion"
import { LoginView } from "../views/Auth/LoginView"
import { RegisterView } from "../views/Auth/RegisterView"

export const RoutesOutlet = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout />}>

                    <Route index element={<Home />} />
                    <Route path="comoInvertir" element={<ComoInvertir />} />
                    <Route path="faq" element={<Home />} />
                    <Route path="noticias" element={<Noticias />} />
                    <Route path="medios" element={<Medios />} />

                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="soporte" element={<Support />} />
                    <Route path="proyectos" element={<ProyectosTokenizacion />} />
                    
                    <Route path="login" element={<LoginView />} />
                    <Route path="register" element={<RegisterView />} />

                    <Route path="legal" element={<LegalLayout />}>
                        <Route path="terms" element={<Terms />} />
                        <Route path="privacy" element={<PrivacyPolicy />} />
                        <Route path="faqForLaw" element={<FaqForLaw />} />
                        <Route path="cookiesPolicy" element={<CookiesPolicy />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    )
}
