import atomicLogo from '../assets/atomicLogo.png'
import cnv from '../assets/cnv.png'
import facebook from '../assets/social_networks/facebook.png'
import instagram from '../assets/social_networks/instagram.png'
import linkedin from '../assets/social_networks/linkedin.png'
import telegram from '../assets/social_networks/telegram.png'
import tiktok from '../assets/social_networks/tiktok.png'
import youtube from '../assets/social_networks/youtube.png'
import twitter from '../assets/social_networks/twitter.png'
import whatsapp from '../assets/contact_icons/whatsapp.png'
import mail from '../assets/contact_icons/correo.png'
import location from '../assets/contact_icons/location.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const [t] = useTranslation("global")

  return (
    <>
      <footer className="" id='contact'>
        <div className="mx-auto w-full space-y-8 px-4 lg:pt-5 sm:px-6 lg:space-y-5 lg:px-8">
          <ul className="py-5 lg:py-4 text-sm grid grid-cols-2 sm:grid-cols-3 sm:gap-10 lg:grid-cols-7 gap-4 justify-center items-center w-full lg:gap-x-10 lg:mx-auto">
            <li className="flex items-center justify-self-start">
              <img src={facebook} alt="facebook" className="w-8 lg:ml-4" />
              <a href="https://www.facebook.com/profile.php?id=61565306192045&mibextid=ZbWKwL" className="text-white transition hover:text-blue-500 hover:underline ml-2" target="_blank">Facebook</a>
            </li>

            <li className="flex items-center justify-self-start">
              <img src={instagram} alt="insta" className="w-8 lg:ml-4" />
              <a href="https://www.instagram.com/atomico3ok?igsh=Y3cwbW9wMHZrYzlr" target="_blank" className="text-white transition hover:text-blue-500 hover:underline ml-2">Instagram</a>
            </li>

            <li className="flex items-center justify-self-start">
              <img src={telegram} alt="telegram" className="w-8 lg:ml-4" />
              <a href="https://t.me/atomico3" className="text-white transition hover:text-blue-500 hover:underline ml-2" target="_blank">Telegram</a>
            </li>

            <li className="flex items-center justify-self-start">
              <img src={tiktok} alt="tiktok" className="w-8 lg:ml-4" />
              <a href="https://www.tiktok.com/@atomico3oficial?_t=8oPdJMeOgH0&_r=1" className="text-white transition hover:text-blue-500 hover:underline ml-2" target="_blank">Tiktok</a>
            </li>

            <li className="flex items-center justify-self-start">
              <img src={linkedin} alt="linkedin" className="w-8 lg:ml-4" />
              <a href="https://www.linkedin.com/company/atomico-3-sa/posts/" className="text-white transition hover:text-blue-500 hover:underline ml-2" target="_blank">Linkedin</a>
            </li>

            <li className="flex items-center justify-self-start">
              <img src={youtube} alt="youtube" className="w-8 lg:ml-4" />
              <a href="https://www.youtube.com/@atomico3oficial" className="text-white transition hover:text-blue-500 hover:underline ml-2" target="_blank">Youtube</a>
            </li>

            <li className="flex items-center justify-self-start">
              <img src={twitter} alt="twitter" className="w-8 lg:ml-4" />
              <a href="https://x.com/Atomico3oficial?t=x7LBcGkemJSaTbmVD1q2Hw&s=09" target="_blank" className="text-white transition hover:text-blue-500 hover:underline ml-2">X</a>
            </li>
          </ul>

          <div className="grid grid-cols-1 pt-8 lg:grid-cols-4 lg:pt-10">
            <div className='lg:col-span-1 flex flex-col items-center lg:items-start'>
              <img src={atomicLogo} alt="" className='w-52 lg:w-72 mx-auto lg:mx-0' />
              <img src={cnv} alt="CNV logo" className='w-32 mt-4' />
              <p className="text-white text-xs mt-4 max-w-md">
                Atómico 3 S.A. Proveedor de Servicios de Activos Virtuales (PSAV) inscripto bajo el N° 103 de fecha 22 de enero de 2025 en el Registro de Proveedores de Servicios de Activos Virtuales de CNV. Este registro es a los fines del control como Sujeto Obligado ante la Unidad de Información Financiera (UIF) y de todo otro ente regulador facultado a tal efecto, en el marco de sus competencias, y no implica licencia ni supervisión por parte de la COMISIÓN NACIONAL DE VALORES sobre la actividad realizada por el PSAV.
              </p>
            </div>

            <div className='lg:col-span-3 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4 p-3'>
              <div className=''>
                <p className="font-medium text-celeste">{t("footer.links utiles")}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a className="text-white transition hover:opacity-75">{t("footer.proyectos de tokenizacion")}</a>
                  </li>
                  <li>
                    <Link className="text-white transition hover:text-blue-500 hover:underline" to={'/nosotros'}>{t("footer.nosotros")}</Link>
                  </li>
                  <li>
                    <Link className="text-white transition hover:text-blue-500 hover:underline" to={'/comoInvertir'}>{t("footer.como invertir")}</Link>
                  </li>
                  <li>
                    <Link to={'/comoInvertir#staking'} className="text-white transition hover:text-blue-500 hover:underline">
                      Staking
                    </Link>
                  </li>
                  <li>
                    <Link to={'/press'} className="text-white transition hover:text-blue-500 hover:underline">
                      {t("footer.noticias")}
                    </Link>
                  </li>
                  <li>
                    <a href="#faq" className="text-white transition hover:text-blue-500 hover:underline">{t("footer.Preguntas Frecuentes")}</a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-celeste">Legal</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link to={"/legal"} className="text-white transition hover:text-blue-500 hover:underline">{t("footer.Términos y Condiciones")}</Link>
                  </li>
                  <li>
                    <a className="text-white transition hover:opacity-75">{t("footer.Política de privacidad")}</a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-celeste">{t("footer.contacto")}</p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className='flex items-center'>
                    <img src={whatsapp} alt="whatsapp" className='w-4 lg:w-5 ml-1 mr-3' />
                    <a href="https://wa.me/595992544500" target='_blank' className="text-white transition hover:cursor-pointer hover:text-blue-500 hover:underline">+595 992 544500</a>
                  </li>
                  <li className='flex items-center'>
                    <img src={mail} alt="mail" className='w-4 lg:w-5 ml-1 lg:mr-4 mr-3' />
                    <a href="mailto:info@atomico3.io" className="text-white transition hover:text-blue-500 hover:underline">
                      Info@atomico3.io
                    </a>
                  </li>
                  <li className='flex items-center'>
                    <img src={location} alt="location" className='w-4 lg:w-5 ml-1 lg:mr-4 mr-3' />
                    <span className="text-white transition">Av. Santa Teresa y Coronel Escurra - Ycua Sati. Asunción Paraguay</span>
                  </li>
                </ul>

                <div className='mt-5'>
                  <p className="font-medium text-celeste">{t("footer.soporte")}</p>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li className='flex items-center'>
                      <img src={mail} alt="soporte" className='w-4 lg:w-5 ml-2 lg:mr-4 mr-3' />
                      <a href="mailto:support@atomico3.io" className="text-white transition hover:text-blue-500 hover:underline">
                        support@atomico3.io
                      </a>
                    </li>
                    <li className='flex items-center'>
                      <img src={whatsapp} alt="whatsapp" className='w-4 lg:w-5 ml-2 mr-3' />
                      <a href="https://wa.me/595992544500" target='_blank' className="text-white transition hover:cursor-pointer hover:text-blue-500 hover:underline">+595 992 544500</a>
                    </li>
                  </ul>
                </div>

                <div className='mt-5'>
                  <p className="font-medium text-celeste">Compliance</p>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li className='flex items-center'>
                      <img src={mail} alt="soporte" className='w-4 lg:w-5 ml-2 lg:mr-4 mr-3' />
                      <a href="mailto:compliance@atomico3.io" className="text-white transition hover:text-blue-500 hover:underline">
                        compliance@atomico3.io
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className='pt-5 text-center text-sm'>
            {t("footer.horarios")}
          </p>
          <p className="text-xs text-white text-center mt-5">&copy; 2025. Atómico3 S.A. {t("footer.todos los derechos reservados")}</p>
        </div>
      </footer>
    </>
  )
}
