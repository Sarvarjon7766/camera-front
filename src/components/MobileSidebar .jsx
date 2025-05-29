import React from 'react'
import { IoMdClose } from 'react-icons/io'
import {
  FaListAlt,
  FaMoneyBillWave,
  FaInfoCircle,
  FaRegFileAlt,
  FaSignOutAlt
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

// Tilga mos menyu ma'lumotlari
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

const MobileSidebar = ({ isOpen, onClose, handleLangChange, langOptions }) => {
  const navigate = useNavigate()
  const { lang } = useLang()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex justify-end items-start p-2">
      <div className="w-72 bg-white/80 backdrop-blur-md text-black shadow-xl p-4 space-y-4 rounded-l-2xl border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button onClick={onClose}>
            <IoMdClose size={24} className="text-red-500 hover:text-red-700 transition duration-200" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.link === '/login') {
                  // 🔐 Logout qilish: localStorage'dan code ni o'chirish
                  localStorage.removeItem('code')
                }
                navigate(item.link)
                onClose()
              }}
              className="w-full flex items-center gap-3 py-2 px-3 hover:bg-blue-100 rounded transition"
            >
              <item.icon size={18} className="text-gray-700" />
              <span className="text-sm font-medium">{item.titles[lang]}</span>
            </button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="pt-4 border-t border-gray-300 mt-4">
          {langOptions?.map((langOption) => (
            <button
              key={langOption.title}
              onClick={() => {
                handleLangChange(langOption)
                onClose()
              }}
              className="w-full py-2 px-3 flex items-center gap-3 hover:bg-blue-50 rounded transition"
            >
              <img src={langOption.img} className="w-5 h-5 rounded-full border" alt={langOption.title} />
              <span className="text-sm font-medium">{langOption.title}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MobileSidebar
