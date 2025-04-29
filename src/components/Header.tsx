import { useTranslation } from 'react-i18next'
import atomico from '../assets/Atomico.png'
import { useState } from 'react';
import './Header.css'
import { Modal } from './Modal';
import cardano from '../assets/caradno-circulo.png'
import cardanoWord from '../assets/cardano-palabra.png'
import naveCardano from '../assets/nave-planeta.png'
import migration1 from '../assets/migration/migration1.png';

export const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const [t] = useTranslation("global")
  const [isSpringBtn, setIsSpringBtn] = useState<boolean | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsSpringBtn(null)
  };

  return (
    <>
      <Modal handleCloseModal={handleCloseModal} isSpringBtn={isSpringBtn} showModal={showModal} />

      <header className='h-screen overflow-hidden bg-cover bg-no-repeat' style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 18, 0), rgba(0, 0, 0, 0)), url(${naveCardano})`,
        backgroundPosition: 'center 100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
        <article className='flex w-full'>
          <div className="p-4 w-full sm:w-4/5 text-center sm:text-left pl-5 text-left">
            <h1 className='font-bold text-shadow-bl text-5xl md:text-6xl lg:text-7xl mt-4'>{t("header.bienvenido")}</h1>
            <p className='my-5 text-sm md:text-base lg:text-md text-shadow sm:w-2/3'>
              {t("header.criptoactivo")}
            </p>
          </div>

          
        </article>

        <article className='w-full h-full'>
          <div className="hidden sm:block w-1/3 h-[50%] ml-32">
            <img src={atomico} alt="atomico" className="object-contain w-full h-full" />
          </div>
          
          <div className='sm:hidden h-[200px]'>
            <img src={atomico} alt="atomico" className="object-contain w-full h-full" />
          </div>
          <div className='sm:hidden mt-7 flex flex-col items-center justify-center'>
            <p className='w-full text-center text-shadow-bl text-2xl'>
              Partner tecnológico
            </p>
            <div className="flex flex-col items-center mb-4">
              <img src={migration1} alt="ZenGate" className='w-[100px] mb-2' />
              <p className='text-center text-shadow-bl text-lg'>ZENGATE GLOBAL</p>
            </div>
            <img src={cardano} alt="" className='bg-white rounded-[200px] w-[100px]' />
            <img src={cardanoWord} alt="" className='bg-white rounded-[200px] w-[125px] mt-2 object-cover' />
          </div>
        </article>
      </header>
    </>
  )
}
