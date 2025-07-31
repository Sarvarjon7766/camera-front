import { Bell, ChevronDown, LogOut, Menu, UserCircle } from 'lucide-react'
import { useState } from 'react'

const AdminNavbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-blue-600 border-b border-blue-500 p-3 md:p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-blue-500 p-2 rounded-full transition-all hover:scale-105"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-white">
          Admin Panel
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-blue-100 hover:text-white rounded-full hover:bg-blue-500 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-medium">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="hidden md:flex items-center gap-1">
              <span className="text-sm font-medium text-white">Admin</span>
              <ChevronDown className={`h-4 w-4 text-blue-100 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-gray-500">admin@example.com</div>
              </div>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => console.log('Logout')}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar