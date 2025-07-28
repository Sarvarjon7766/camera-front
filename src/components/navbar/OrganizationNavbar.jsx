import { Menu, LogOut, Bell, ChevronDown, Building2 } from 'lucide-react'
import { useState } from 'react'

const OrganizationNavbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-blue-100 p-3 md:p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar} 
          className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-all"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <h1 className="text-xl md:text-2xl font-bold text-blue-800">
          Organization Panel
        </h1>
      </div>
      
      <div className="flex items-center gap-3 md:gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-blue-500 rounded-full hover:bg-blue-50">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        {/* Profile Section */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="hidden md:flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">Organization Head</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-1 z-30 border border-blue-50">
              <div className="px-4 py-2 text-sm text-gray-700">
                <div className="font-medium">Organization Head</div>
              </div>
              <button 
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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

export default OrganizationNavbar