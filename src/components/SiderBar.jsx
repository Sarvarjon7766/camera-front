import React, { useState, useEffect } from 'react'
import { FaInfoCircle, FaListAlt, FaMoneyBillWave, FaRegFileAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const SiderBar = () => {
  const { lang } = useLang()

  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const data = [
    {
      icon: FaListAlt,
      titles: {
        uz: "Barcha xizmatlar",
        en: "All Services",
        ru: "Все услуги"
      },
      link: ''
    },
    {
      icon: FaListAlt,
      titles: {
        uz: "Mening arizalarim",
        en: "My Applications",
        ru: "Мои заявки"
      },
      link: 'my-applications'
    },
    {
      icon: FaMoneyBillWave,
      titles: {
        uz: "To'lovlar",
        en: "Payments",
        ru: "Платежи"
      },
      link: 'payments'
    },
    {
      icon: FaInfoCircle,
      titles: {
        uz: "Umumiy ma'lumotlar",
        en: "General Info",
        ru: "Общая информация"
      },
      link: 'general-info'
    },
    {
      icon: FaRegFileAlt,
      titles: {
        uz: "Ma'lumotlarni to'ldirish",
        en: "Fill Information",
        ru: "Заполнить данные"
      },
      link: 'application'
    },
    {
      icon: FaSignOutAlt,
      titles: {
        uz: "Tizimdan chiqish",
        en: "Logout",
        ru: "Выйти из системы"
      },
      link: '/login'
    }
  ]

  const renderLink = (item) => {
    const Icon = item.icon
    const isLogout = item.link === '/login'
    const path = isLogout ? item.link : `/dashboard/${item.link}`
    const title = item.titles[lang] || item.titles['uz']

    const handleClick = () => {
      if (isLogout) {
        localStorage.removeItem('code')
      }
    }

    return (
      <Link
        to={path}
        onClick={handleClick}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-[#0086DB] transition font-semibold text-white duration-200"
      >
        <Icon className="text-xl" />
        <span className="truncate">{title}</span>
      </Link>
    )
  }

  return (
    <div
      className="w-64 bg-[#0F4BE5] text-white shadow-md p-4 overflow-y-auto"
      style={{ height: windowHeight }}
    >
      <h2 className="text-2xl font-extrabold mb-8 text-center tracking-wide">
        {lang === 'uz' ? 'Dashboard' : lang === 'en' ? 'Dashboard' : 'Панель'}
      </h2>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index}>
            {renderLink(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SiderBar
