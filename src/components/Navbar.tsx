import { Link, useNavigate } from 'react-router-dom';
import atomicLogo from '../assets/atomicLogo.png';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import eng from '../assets/lang/eng.png';
import esp from '../assets/lang/esp.png';
import bra from '../assets/lang/brazil.png';
import login from '../assets/login.png';
import { Form } from './Form';

export const Navbar = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  
  // Read auth state directly from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  });
  
  // Listen for storage events (login/logout)
  useEffect(() => {
    const handleStorageEvent = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
      try {
        const userData = localStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    };
    
    // Listen to custom events
    window.addEventListener('storage-login', handleStorageEvent);
    window.addEventListener('storage-logout', handleStorageEvent);
    
    return () => {
      window.removeEventListener('storage-login', handleStorageEvent);
      window.removeEventListener('storage-logout', handleStorageEvent);
    };
  }, []);
  
  // Estados para cada dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdownHelp, setIsOpenDropdownHelp] = useState(false);
  const [isOpenDropdownLang, setIsOpenDropdownLang] = useState(false);
  const [isOpenDropdownAboutUs, setIsOpenDropdownAboutUs] = useState(false);
  const [isOpenDropdownLegal, setIsOpenDropdownLegal] = useState(false);
  const [isOpenDropdownProyectos, setIsOpenDropdownProyectos] = useState(false);
  const [isOpenDropdownNoticias, setIsOpenDropdownNoticias] = useState(false);
  const [isOpenDropdownLogin, setIsOpenDropdownLogin] = useState(false);
  const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState('');

  // Function to handle logout
  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Trigger event so other components can react
    window.dispatchEvent(new Event('storage-logout'));
    
    setIsOpenDropdownUser(false);
    navigate('/');
  };

  // Función para abrir/cerrar el menú principal
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsOpenDropdownLogin(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Cambiar idioma
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Función para cerrar todos los dropdowns
  const closeAllDropdowns = () => {
    setIsOpenDropdown(false);
    setIsOpenDropdownHelp(false);
    setIsOpenDropdownAboutUs(false);
    setIsOpenDropdownLegal(false);
    setIsOpenDropdownProyectos(false);
    setIsOpenDropdownLang(false);
    setIsOpenDropdownUser(false);
  };

  // Funciones para abrir/cerrar dropdowns, cerrando todos los demás
  const toggleDropdown = () => {
    const isCurrentlyOpen = isOpenDropdown;
    closeAllDropdowns();
    setIsOpenDropdown(!isCurrentlyOpen); // Si ya estaba abierto, lo cerramos
  };

  const toggleDropdownHelp = () => {
    const isCurrentlyOpen = isOpenDropdownHelp;
    closeAllDropdowns();
    setIsOpenDropdownHelp(!isCurrentlyOpen);
  };

  const toggleDropdownAboutUs = () => {
    const isCurrentlyOpen = isOpenDropdownAboutUs;
    closeAllDropdowns();
    setIsOpenDropdownAboutUs(!isCurrentlyOpen);
  };

  const toggleDropdownLegal = () => {
    const isCurrentlyOpen = isOpenDropdownLegal;
    closeAllDropdowns();
    setIsOpenDropdownLegal(!isCurrentlyOpen);
  };

  const toggleDropdownNoticias = () => {
    const isCurrentlyOpen = isOpenDropdownNoticias;
    closeAllDropdowns();
    setIsOpenDropdownNoticias(!isCurrentlyOpen);
  };

  const toggleDropdownProyectos = () => {
    const isCurrentlyOpen = isOpenDropdownProyectos;
    closeAllDropdowns();
    setIsOpenDropdownProyectos(!isCurrentlyOpen);
  };

  const toggleDropdownLogin = () => {
    const isCurrentlyOpen = isOpenDropdownLogin;
    closeAllDropdowns();
    setIsOpenDropdownLogin(!isCurrentlyOpen);
    setIsOpen(false);
  };

  const toggleDropdownUser = () => {
    const isCurrentlyOpen = isOpenDropdownUser;
    closeAllDropdowns();
    setIsOpenDropdownUser(!isCurrentlyOpen);
  };

  const handleForm = () => {
    setShowForm(prev => !prev);
  };

  const getAuthButtons = () => {
    if (isAuthenticated && user) {
      return (
        <div className="relative" onMouseLeave={() => setIsOpenDropdownUser(false)}>
          <button
            className="flex items-center text-white hover:text-blue-500 space-x-1"
            onMouseEnter={() => setIsOpenDropdownUser(true)}
            onClick={() => setIsOpenDropdownUser(!isOpenDropdownUser)}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-medium">
                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <span className="hidden sm:inline">{user.username}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpenDropdownUser && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 bg-dark-light text-white shadow-lg rounded-md"
              role="menu"
            >
              <div className="p-2 border border-gray-700 rounded-md">
                {user.email && (
                  <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                    {user.email}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md"
                  role="menuitem"
                >
                  {t('navbar.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          <Link 
            to="/login" 
            className="text-white hover:text-blue-500"
          >
            {t("navbar.iniciar sesion")}
          </Link>
          <Link 
            to="/register" 
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {t("navbar.registrarse")}
          </Link>
        </>
      );
    }
  };

  const getMobileAuthButtons = () => {
    if (isAuthenticated && user) {
      return (
        <>
          <div className="flex items-center space-x-2 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-medium">
                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <span className="text-white">{user.username}</span>
          </div>
          {user.email && (
            <div className="text-sm text-gray-300 py-2">
              {user.email}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="block w-full py-2 text-center bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            {t('navbar.logout')}
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link 
            to="/login" 
            className="block py-2 text-white hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            {t("navbar.iniciar sesion")}
          </Link>
          <Link 
            to="/register" 
            className="block py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            {t("navbar.registrarse")}
          </Link>
        </>
      );
    }
  };

  return (
    <>
      {showForm && <Form handleForm={handleForm} documentType={selectedDocument} />}

      <nav className="fixed sticky absolute top-0 left-0 w-full bg-dark-light text-white z-50 lg:py-3">
        <div className="mx-auto max-w-screen-xl px-1 sm:px-1 lg:px-1">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600 dark:text-teal-300 hover:cursor-pointer" to={'/'}>
                <span className="sr-only">Inicio</span>
                <img src={atomicLogo} alt="logo" className="w-28 lg:w-60" />
              </Link>
            </div>

            <div className="md:flex md:items-center">
              {/* Menú en pantallas grandes */}
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 lg:text-md">
                  <li>
                    {/* DROPDONW PROYECTO */}
                    <div className="relative"
                      onMouseLeave={() => setIsOpenDropdownProyectos(false)}>
                      <div
                        className="inline-flex items-center overflow-hidden rounded-md  text-white"
                      >

                        <button
                          className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                          onMouseEnter={() => setIsOpenDropdownProyectos(true)}

                        >
                          <a
                            className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 leading-[20px] "
                          >
                            {t("navbar.proyectos de")} <br />
                            {t("navbar.tokenizacion")}
                          </a>
                          <span className="sr-only">Menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {
                        isOpenDropdownProyectos &&
                        <div
                          className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                          role="menu"
                        >
                          <div className="p-2">
                            <Link
                              to={'/proyectos'}
                              className=" block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500 "
                              role="menuitem"
                            >
                              {t("navbar.nuestros proyectos")}

                            </Link>
                            <Link
                              to={'/proyectos#litio'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500 "
                              role="menuitem"
                            >
                              {t("navbar.informacion sobre litio")}

                            </Link>
                          </div>
                        </div>
                      }
                    </div>
                    {/* FIN DROPDWON PROYECTO*/}
                  </li>

                  <li >
                    {/* DROPDWON NOSOTROS*/}
                    <div className="relative"
                      onMouseLeave={() => setIsOpenDropdownAboutUs(false)}>
                      <div
                        className="inline-flex items-center overflow-hidden rounded-md  text-white"
                      >

                        <button
                          className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                          onMouseEnter={() => setIsOpenDropdownAboutUs(true)}

                        >
                          <a
                            className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                          >
                            {t("navbar.nosotros")}
                          </a>
                          <span className="sr-only">Menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {
                        isOpenDropdownAboutUs &&
                        <div
                          className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                          role="menu"
                        >
                          <div className="p-2">

                            <Link
                              to={'/nosotros'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.sobre atomico")}

                            </Link>
                            <Link
                              to={'/nosotros#equipo'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.nuestro equipo")}
                            </Link>
                            <a
                              // to={'/nosotros#trabajar'}
                              className="block rounded-lg px-4 py-2 text-sm text-white  "
                              role="menuitem"
                            >
                              {t("navbar.trabaja")}
                            </a>
                            <button
                              className="hover:cursor-pointer block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                              onClick={() => { toggleDropdownAboutUs(); setSelectedDocument('brochure'); handleForm(); }}
                            >
                              {t("navbar.descargar brochure")}

                            </button>
                            <button
                              className="hover:cursor-pointer block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                              onClick={() => { toggleDropdownAboutUs(); setSelectedDocument('whitepaper'); handleForm(); }}
                            >
                              {t("navbar.descargar whitepaper")}

                            </button>

                          </div>
                        </div>
                      }
                    </div>
                  </li>
                  {/* FIN DROPDWON NOSOTROS*/}


                  <li>
                    {/* DROPDWON */}
                    <div className="relative"
                      onMouseLeave={() => setIsOpenDropdown(false)}>
                      <div
                        className="inline-flex items-center overflow-hidden rounded-md  text-white"
                      >

                        <button
                          className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                          onMouseEnter={() => setIsOpenDropdown(true)}

                        >
                          <a
                            className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 leading-[20px] "
                          >
                            {t("navbar.inverti en")} <br />
                            Atómico3

                          </a>
                          <span className="sr-only">Menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {
                        isOpenDropdown &&
                        <div
                          className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                          role="menu"
                        >
                          <div className="p-2">
                            <Link
                              to={'/comoInvertir'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.como invertir")}
                            </Link>
                            <Link
                              to={'/comoInvertir#staking'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              Staking
                            </Link>
                            <a
                              href="https://at3selling.vercel.app/"
                              target='_blank'
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.comprar at3")}
                            </a>

                            <Link
                              to={'/comoInvertir#p2p'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              Peer to Peer
                            </Link>
                            <Link
                              to={'/comoInvertir#tutoriales'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.tutoriales")}
                            </Link>

                          </div>
                        </div>
                      }
                    </div>
                    {/* FIN DROPDWON */}

                  </li>
                  <li>
                    {/* DROPDWON LEGAL*/}
                    <div className="relative"
                      onMouseLeave={() => setIsOpenDropdownLegal(false)}>
                      <div
                        className="inline-flex items-center overflow-hidden rounded-md  text-white"
                      >

                        <button
                          className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                          onMouseEnter={() => setIsOpenDropdownLegal(true)}

                        >
                          <a
                            className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                          >
                            {t("navbar.legal")}
                          </a>
                          <span className="sr-only">Menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {
                        isOpenDropdownLegal &&
                        <div
                          className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                          role="menu"
                        >
                          <div className="p-2">
                            <Link
                              to={'/legal/terms'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.terms")}
                            </Link>

                            <Link
                              to={'/legal/privacy'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.privacy")}
                            </Link>
                            <Link
                              to={'/legal/cookiesPolicy'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.politica cookies")}
                            </Link>
                            <Link
                              to={'/legal/faqForlaw'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.faq for law")}
                            </Link>


                          </div>
                        </div>
                      }
                    </div>
                    {/* FIN DROPDWON LEGAL*/}
                  </li>

                  <li>

                    {/* DROPDWON MEDIOS Y NOTICIAS*/}
                    <div className="relative"
                      onMouseLeave={() => setIsOpenDropdownNoticias(false)}>
                      <div
                        className="inline-flex items-center overflow-hidden rounded-md  text-white"
                      >

                        <button
                          className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                          onMouseEnter={() => setIsOpenDropdownNoticias(true)}

                        >
                          <a
                            className="text-white text-center leading-[20px] transition hover:text-celeste   "
                          >
                            {i18n.language === "es" ? (
                              <div className='text-sm'>
                                <span className='block'>Medios y</span>
                                <span className='block'>Noticias</span>
                              </div>
                            ) : (

                              <div className='text-sm'>
                                <span className='block'>Press </span>
                                <span className='block'>& Media</span>
                              </div>
                            )}
                          </a>


                          <span className="sr-only">Menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {
                        isOpenDropdownNoticias &&
                        <div
                          className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                          role="menu"
                        >
                          <div className="p-2">
                            <Link
                              to={'/medios'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.medios")}
                            </Link>

                            <Link
                              to={'/noticias'}
                              className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                              role="menuitem"
                            >
                              {t("navbar.noticias")}
                            </Link>


                          </div>
                        </div>
                      }
                    </div>
                    {/* FIN DROPDWON MEDIOS Y NOTICIAS*/}
                  </li>

                  <div className="relative"
                    onMouseLeave={() => setIsOpenDropdownHelp(false)}>
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >

                      <button
                        className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                        onMouseEnter={() => setIsOpenDropdownHelp(true)}

                      >
                        <a
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.ayuda")}
                        </a>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdownHelp &&
                      <div
                        className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">
                          <a
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById('contact');
                              if (element) { // Verificamos si el elemento no es null
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                              closeMenu();
                            }}
                          >
                            {t("navbar.contacto")}
                          </a>
                          <Link
                            to={'/soporte'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                          >
                            {t("navbar.soporte")}
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500  "
                            to={"/faq"}
                          >
                            {t("navbar.preguntas frecuentes")}

                          </Link>
                        </div>
                      </div>
                    }
                  </div>

                  <li>

                    {/* DROPDWON LANGUAGES*/}
                    <div className="relative"
                      onMouseLeave={() => setIsOpenDropdownLang(false)}>
                      <div
                        className="inline-flex items-center overflow-hidden rounded-md  text-white"
                      >

                        <button
                          className="h-full flex items-center p-2 text-white   hover:text-blue-500 "
                          onMouseEnter={() => setIsOpenDropdownLang(true)}

                        >
                          <a
                            className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                          >
                            {t("navbar.idiomas")}

                          </a>
                          <span className="sr-only">Menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {
                        isOpenDropdownLang &&
                        <div
                          className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                          role="menu"
                        >
                          <div className="lg:ml-auto  sm:flex sm:justify-end p-2 ">
                            <button onClick={() => { handleChangeLanguage("por"); toggleMenu() }}>
                              <img src={bra} className='w-[1rem] lg:w-[2rem] ml-2 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500  hover:scale-105  rounded-full' alt="español" />

                            </button>
                            <button onClick={() => { handleChangeLanguage("en"); toggleMenu() }}>
                              <img src={eng} className='w-[1rem] lg:w-[2rem] ml-2 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500  hover:scale-105  rounded-full' alt="english" />
                            </button>
                            <button onClick={() => { handleChangeLanguage("es"); toggleMenu() }}>
                              <img src={esp} className='w-[1rem] lg:w-[2rem] ml-2 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500  hover:scale-105  rounded-full' alt="español" />

                            </button>
                          </div>
                        </div>
                      }
                    </div>
                    {/* FIN DROPDWON LANGUAGES*/}

                  </li>
                  <li className="flex items-center space-x-3">
                    {getAuthButtons()}
                  </li>
                </ul>
              </nav>

              {/* Menú hamburguesa */}
              <div className="flex items-center gap-4">
                {/* Mobile menu for logged in users */}
                {isAuthenticated && (
                  <div className="relative md:hidden"
                    onClick={toggleDropdownUser}>
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md text-white"
                    >
                      <button
                        className="flex items-center p-2 text-white hover:text-blue-500"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                      </button>
                    </div>

                    {isOpenDropdownUser && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-48 bg-dark-light text-white shadow-lg rounded-md"
                        role="menu"
                      >
                        <div className="p-2 border border-gray-700 rounded-md">
                          {user && user.username && (
                            <div className="px-4 py-2 text-sm font-medium border-b border-gray-700">
                              {user.username}
                            </div>
                          )}
                          {user && user.email && (
                            <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                              {user.email}
                            </div>
                          )}
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md"
                            role="menuitem"
                          >
                            {t('navbar.logout')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* DROPDOwN INICIAR SESIÓN*/}
                {!isAuthenticated && (
                  <div className="relative md:hidden"
                    onClick={() => toggleDropdownLogin()}>
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md text-white"
                    >
                      <button
                        className="h-full flex items-center p-2 text-white hover:text-blue-500"
                        onClick={() => toggleDropdownLogin()}
                      >
                        <a
                          className="mr-1 py-2 text-sm/none text-white hover:text-blue-500"
                        >
                          <img src={login} alt="login" className="w-8 sm:w-10 md:w-12 lg:w-8" />
                        </a>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {isOpenDropdownLogin && (
                      <div
                        className="absolute end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          <Link
                            to="/login"
                            onClick={() => setIsOpenDropdownLogin(false)}
                            className="text-end block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                          >
                            {t("navbar.iniciar sesion")}
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsOpenDropdownLogin(false)}
                            className="text-end block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                          >
                            {t("navbar.registrarse")}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="block md:hidden">
                  <button
                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                    onClick={toggleMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Menú desplegable en pantallas pequeñas */}
          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <nav aria-label="Global">
              <ul className="flex flex-col items-start gap-4 p-4 text-sm">
                <li>
                  {/* DROPDWON PROYECTOS M.H*/}
                  <div className="relative"
                  >
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >

                      <button
                        className="h-full flex items-center text-white   hover:text-blue-500 "
                        onClick={() => toggleDropdownProyectos()}

                      >
                        <button
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.proyectos de tokenizacion")}

                        </button>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdownProyectos &&
                      <div
                        className="absolute left-20 border border-celeste end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">


                          <Link
                            to={'/proyectos'}
                            className="block rounded-lg px-4 py-2 text-sm text-white "
                            role="menuitem"
                            onClick={() => { toggleDropdownProyectos(); closeMenu(); }}
                          >
                            {t("navbar.nuestros proyectos")}
                          </Link>
                          <Link
                            to={'/proyectos#litio'}
                            className=" block rounded-lg px-4 py-2 text-sm text-white "
                            role="menuitem"
                            onClick={() => { toggleDropdownProyectos(); closeMenu(); }}
                          >
                            {t("navbar.informacion sobre litio")}

                          </Link>

                        </div>
                      </div>
                    }
                  </div>

                  {/* FIN DROPDWON PROYECTOS*/}
                </li>

                <li>
                  {/* DORPDOWN NOSOTROS */}
                  <div className="relative"
                  >
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >


                      <button
                        className="h-full flex items-center text-white   hover:text-blue-500 "
                        onClick={() => toggleDropdownAboutUs()}

                      >
                        <button
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.nosotros")}

                        </button>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdownAboutUs &&
                      <div
                        className="absolute left-20 border border-celeste end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">

                          <Link
                            to={'/nosotros'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownAboutUs(); closeMenu(); }}
                          >
                            {t("navbar.sobre atomico")}

                          </Link>
                          <Link
                            to={'/nosotros#equipo'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownAboutUs(); closeMenu(); }}
                          >
                            {t("navbar.nuestro equipo")}

                          </Link>
                          <a
                            // to={'/nosotros#trabajar'}
                            className="block rounded-lg px-4 py-2 text-sm text-white "
                            role="menuitem"
                          >
                            {t("navbar.trabaja")}
                          </a>
                          <button
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownAboutUs(); closeMenu(); setSelectedDocument('brochure'); handleForm(); }}
                          >{t("navbar.descargar brochure")}
                          </button>
                          <button
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownAboutUs(); closeMenu(); setSelectedDocument('whitepaper'); handleForm(); }}
                          >
                            {t("navbar.descargar whitepaper")}
                          </button>
                        </div>
                      </div>
                    }
                  </div>
                  {/* FIN DROPDOWN NOSOTROS */}
                </li>
                <li>

                  {/* DROPDWON COMO INVERTIR*/}
                  <div className="relative"
                  >
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >

                      <button
                        className="h-full flex items-center text-white   hover:text-blue-500 "
                        onClick={() => toggleDropdown()}

                      >
                        <button
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.inverti en At3")}


                        </button>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdown &&
                      <div
                        className="absolute left-20 border border-celeste end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">
                          <Link
                            to={'/comoInvertir'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdown(); closeMenu(); }}

                          >
                            {t("navbar.como invertir")}
                          </Link>
                          <Link
                            to={'/comoInvertir#staking'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdown(); closeMenu(); }}

                          >
                            Staking
                          </Link>
                          <a
                            href="https://dapp-at-3.vercel.app/"
                            target='_blank'
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdown(); closeMenu(); }}
                          >
                            {t("navbar.comprar at3")}
                          </a>
                          <Link
                            to={'/comoInvertir#p2p'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdown(); closeMenu(); }}
                          >
                            Peer to Peer
                          </Link>
                          <Link
                            to={'/comoInvertir#tutoriales'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdown(); closeMenu(); }}
                          >
                            {t("navbar.tutoriales")}
                          </Link>

                        </div>
                      </div>
                    }
                  </div>
                  {/* FIN DROPDWON COMO INVERTIR*/}
                </li>

                <li>
                  {/* DROPDWON LEGAL */}
                  <div className="relative"
                  >
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >

                      <button
                        className="h-full flex items-center text-white   hover:text-blue-500 "
                        onClick={() => toggleDropdownLegal()}

                      >
                        <button
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.legal")}

                        </button>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdownLegal &&
                      <div
                        className="absolute left-12 border border-celeste end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">
                          <Link
                            to={'/legal/terms'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownLegal(); closeMenu(); }}

                          >
                            {t("navbar.terms")}
                          </Link>

                          <Link
                            to={'/legal/privacy'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownLegal(); closeMenu(); }}
                          >
                            {t("navbar.privacy")}

                          </Link>
                          <Link
                            to={'/legal/cookiesPolicy'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownLegal(); closeMenu(); }}
                          >
                            {t("navbar.politica cookies")}
                          </Link>
                          <Link
                            to={'/legal/faqForlaw'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownLegal(); closeMenu(); }}
                          >
                            {t("navbar.faq for law")}
                          </Link>


                        </div>
                      </div>
                    }
                  </div>
                  {/* FIN DROPDWON LEGAL */}
                </li>






                <li>
                  {/* DROPDWON NOTICIAS Y MEDIOS */}
                  <div className="relative"
                  >
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >

                      <button
                        className="h-full flex items-center text-white   hover:text-blue-500 "
                        onClick={() => toggleDropdownNoticias()}

                      >
                        <button
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.medios y noticias")}

                        </button>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdownNoticias &&
                      <div
                        className="absolute left-12 border border-celeste end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">

                          <Link
                            to={'/medios'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownNoticias(); closeMenu(); }}

                          >
                            {t("navbar.medios")}
                          </Link>

                          <Link
                            to={'/noticias'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownNoticias(); closeMenu(); }}
                          >
                            {t("navbar.noticias")}

                          </Link>


                        </div>
                      </div>
                    }
                  </div>
                  {/* FIN DROPDWON NOTICIAS Y MEDIOS */}
                </li>







                <li>

                  {/* DORPDOWN AYUDA */}
                  {/* DROPDWON */}
                  <div className="relative"
                  >
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md  text-white"
                    >

                      <button
                        className="h-full flex items-center text-white   hover:text-blue-500 "
                        onClick={() => toggleDropdownHelp()}

                      >
                        <button
                          className=" mr-1  py-2 text-sm/none text-white hover:text-blue-500 "
                        >
                          {t("navbar.ayuda")}

                        </button>
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {
                      isOpenDropdownHelp &&
                      <div
                        className="absolute left-20 border border-celeste end-0 z-10 mt-0 w-56 bg-dark-light text-white shadow-lg  "
                        role="menu"
                      >
                        <div className="p-2">


                          <a
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById('contact');
                              if (element) { // Verificamos si el elemento no es null
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                              closeMenu();
                            }}
                          >
                            {t("navbar.contacto")}
                          </a>

                          <Link
                            to={'/soporte'}
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500"
                            role="menuitem"
                            onClick={() => { toggleDropdownHelp(); closeMenu(); }}
                          >
                            {t("navbar.soporte")}

                          </Link>
                          <a
                            className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-blue-500 "
                            href="/#faq"
                            onClick={closeMenu}
                          >
                            {t("navbar.preguntas frecuentes")}

                          </a>

                        </div>
                      </div>
                    }
                  </div>
                  {/* FIN DROPDWON */}

                  {/* FIN DROPDOWN AYUDA */}


                </li>
                <li >
                  <button onClick={() => { handleChangeLanguage("en"); toggleMenu() }} >
                    <img src={eng} className='w-[1.5rem] lg:w-[2rem]  transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500  hover:scale-105  rounded-full' alt="english" />
                  </button>
                  <button onClick={() => { handleChangeLanguage("es"); toggleMenu() }}>
                    <img src={esp} className='w-[1.5rem] lg:w-[2rem] ml-2 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500  hover:scale-105  rounded-full' alt="español" />

                  </button>
                  <button onClick={() => { handleChangeLanguage("por"); toggleMenu() }}>
                    <img src={bra} className='w-[1.5rem] lg:w-[2rem] ml-2 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500  hover:scale-105  rounded-full' alt="español" />

                  </button>
                </li>
                <li className="border-t border-gray-700 pt-4 w-full">
                  <div className="flex flex-col space-y-2">
                    {getMobileAuthButtons()}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>

    </>
  );
};
