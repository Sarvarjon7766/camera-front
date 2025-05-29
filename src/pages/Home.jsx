import React, { useContext, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { IoIosSearch } from 'react-icons/io'
import inteactive from '../assets/interactive.png'
import AccommodationStudent from '../components/AccommodationStudent'
import Footer from '../components/Footer'
import InteractiveServices from '../components/InteractiveServices'
import Navbar from '../components/Navbar'
import QuickLinks from '../components/QuickLinks'
import StatisticsCard from '../components/StatisticsCard'
import { LangContext } from '../context/LangContext'

import { motion } from 'framer-motion'

const Home = () => {
  const { lang, setLang } = useContext(LangContext)

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'lang') {
        setLang(event.newValue || 'uz')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [setLang])



  const data = {
    title: {
      uz: 'Samarqand Davlat Veterinariya Chorvachilik va Biotexnologiyalar Universiteti Interactive xizmatlar',
      ru: 'Самаркандский государственный университет ветеринарии, животноводства и биотехнологий Интерактивные услуги',
      en: 'Samarkand State University of Veterinary and Animal Husbandry and Biotechnologies Interactive services'
    },
    p: {
      uz: 'Sayt test rejimida ishlamoqda',
      ru: 'Сайт находится в тестовом режиме',
      en: 'The site is in test mode.'
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <Navbar />

      <div className={`transition-all duration-300 ml-64}`}>
        <div className="flex flex-col items-center justify-center">

          {/* Hero section */}
          <motion.div
            className="w-full flex flex-col md:flex-row items-center justify-center gap-10 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex w-full md:w-1/2 text-center md:text-left space-y-6 flex-col items-center justify-center">
              <div className="px-8">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-800">{data.title[lang]}</h2>
                <p className="text-red-600 font-bold text-base md:text-lg">{data.p[lang]}</p>
              </div>
              
            </div>

            <motion.div
              className="w-full md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={inteactive}
                alt="Katta bitta rasm"
                className="w-[90%] h-auto md:w-[600px] rounded-lg object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Statistics */}
          <motion.div className="p-4 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <StatisticsCard />
          </motion.div>

          {/* Interactive Services */}
          <motion.div className="pt-4 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
            <InteractiveServices />
          </motion.div>

          {/* Quick Links */}
          <motion.div className="pt-4 w-full max-w-6xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
            <QuickLinks />
          </motion.div>

          {/* Accommodation */}
          <motion.div className="pt-4 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
            <AccommodationStudent />
          </motion.div>

          {/* Footer */}
          <motion.div className="pt-4 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <Footer />
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Home
