import React from 'react'
import { IoMdClose } from "react-icons/io"
import { FaListAlt, FaMoneyBillWave, FaInfoCircle, FaRegFileAlt, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  { icon: FaListAlt, title: "Barcha Murojaatlar", link: '' },
  { icon: FaListAlt, title: "Takliflar", link: 'offers' },
  { icon: FaMoneyBillWave, title: "Shikoyatlar", link: 'complaints' },
  { icon: FaInfoCircle, title: "Appelatsiya", link: 'appellations' },
  { icon: FaRegFileAlt, title: "Javoblar", link: 'answares' },
  { icon: FaSignOutAlt, title: "Tizimdan chiqish", link: '/login' },
]

const AdminMobileSidebar = ({ setSidebarOpen, handleLangChange, langOptions }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/30">
      <div className="absolute top-0 left-0 w-64 h-full bg-white text-black shadow-lg p-4 rounded-tr-2xl rounded-br-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <IoMdClose size={24} className="text-red-500 hover:scale-110 transition" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.link)
                setSidebarOpen(false)
              }}
              className="w-full flex items-center gap-3 py-2 px-3 hover:bg-blue-100 rounded transition"
            >
              <item.icon size={18} className="text-gray-700" />
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-300 mt-6">
          {langOptions.map(l => (
            <button
              key={l.title}
              onClick={() => {
                handleLangChange(l)
                setSidebarOpen(false)
              }}
              className="w-full py-2 px-3 flex items-center gap-3 hover:bg-blue-50 rounded transition"
            >
              <img src={l.img} className="w-5 h-5 rounded-full border" alt={l.title} />
              <span className="text-sm font-medium">{l.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminMobileSidebar
