import { ChevronDown, LogOut, Menu, MessageCircle, User2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SuperAdminNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="bg-blue-600 shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-blue-700 p-2 rounded-full transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-white">
          NazoratMarkazi
        </h1>
      </div>

      <div className="flex items-center gap-4">


        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 hover:bg-blue-700 rounded-full p-2 pr-3 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              SA
            </div>
            <span className="hidden md:inline text-sm font-medium text-white">SuperAdmin</span>
            <ChevronDown className={`h-4 w-4 text-blue-100 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-blue-100">
              <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"

              >
                <User2 className="h-4 w-4 text-blue-500" />
                <span>Profile</span>
              </button>
              <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"

              >
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span>Xabarlar</span>
              </button>
              <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"

              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span>Chiqish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default SuperAdminNavbar