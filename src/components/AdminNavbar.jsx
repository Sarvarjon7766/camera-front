import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io"
import { MdDensityMedium } from "react-icons/md"
import { Link, useNavigate } from 'react-router-dom'
import en from '../assets/en.png'
import logo from '../assets/logo.jpg'
import ru from '../assets/ru.png'
import uz from '../assets/uz.png'
import { useLang } from '../context/LangContext'
import AdminMobileSidebar from './AdminMobileSidebar'

const langOptions = [
  { title: 'English', img: en, descript: 'en' },
  { title: "O'zbekcha", img: uz, descript: 'uz' },
  { title: 'Русский', img: ru, descript: 'ru' },
]

const AdminNavbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { lang, setLang } = useLang()

  const handleLangChange = (langObj) => {
    setLang(langObj.descript)
    setIsLangOpen(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const buttonText = lang === 'uz' ? "O'zbekcha" : lang === 'ru' ? 'Русский' : 'English'
  const buttonImg = lang === 'uz' ? uz : lang === 'ru' ? ru : en

  const menuItems = {
    dashboard: { uz: "Dashboard", ru: "Панель", en: "Dashboard" },
    profile: { uz: "Profil", ru: "Профиль", en: "Profile" },
    logout: { uz: "Chiqish", ru: "Выйти", en: "Logout" },
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-white" />
          <span className="text-xl font-bold tracking-wide">SDVMCHBU</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/admin" className="hover:text-teal-200 transition">{menuItems.dashboard[lang]}</Link>
          <Link to="/admin/profile" className="hover:text-teal-200 transition">{menuItems.profile[lang]}</Link>

          {/* Language Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <button className="flex items-center gap-2 hover:text-teal-200 transition">
              <img src={buttonImg} alt="Lang" className="w-5 h-5 rounded-full" />
              {buttonText}
            </button>
            <div
              className={`absolute right-0 top-full mt-2 bg-white text-black rounded shadow-md border transition-all duration-200 z-50 w-40
                ${isLangOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
              {langOptions.map(l => (
                <button
                  key={l.title}
                  onClick={() => handleLangChange(l)}
                  className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <img src={l.img} alt={l.title} className="w-4 h-4 rounded-full" />
                  {l.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
          {sidebarOpen ? <IoMdClose size={26} /> : <MdDensityMedium size={26} />}
        </button>
      </div>

      {/* Mobil menyuni chaqirish */}
      {sidebarOpen && (
        <AdminMobileSidebar
          setSidebarOpen={setSidebarOpen}
          handleLangChange={handleLangChange}
          langOptions={langOptions}
        />
      )}
    </nav>
  )
}

export default AdminNavbar
