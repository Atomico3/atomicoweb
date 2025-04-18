// import React from 'react'

import { useTranslation } from "react-i18next"

export const VideoSection = () => {
  const [t] = useTranslation("global")

  return (

    <section className='bg-white flex flex-col justify-center items-center h-1/2 pt-20 pb-20 lg:pb-32  '>
      <h1 className='text-3xl px-5 text-center lg:text-5xl font-bold sm:text-4xl text-celeste lg:mt-0 mb-20'>{t("videoSection.video section title")}</h1>
      <div className="w-full flex justify-center max-w-[600px] px-5 lg:px-0">
  <div className="relative w-full max-w-4xl h-0 overflow-hidden pb-[56.25%]">
    <iframe
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      src="https://www.youtube.com/embed/NDeiWt9T4rQ?si=XojU1n_azZkOPsk_"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen>
    </iframe>
  </div>
</div>

    </section>

  )
}

