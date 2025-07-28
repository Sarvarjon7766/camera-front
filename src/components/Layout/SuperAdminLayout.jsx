import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SuperAdminNavbar from '../navbar/SuperAdminNavbar'
import SuperAdminSidebar from '../sidebar/SuperAdminSidebar'

const SuperAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setIsSidebarOpen(!mobile) // mobile holatda yopiq, desktopda ochiq
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex transition-all duration-300 relative">

      {/* ✅ Sidebar */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-0'}
          ${isMobile ? 'fixed top-0 left-0 h-full z-30' : ''}
          bg-blue-600 text-white shadow-lg overflow-hidden
        `}
      >
        {isSidebarOpen && <SuperAdminSidebar />}
      </div>

      {/* ✅ Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <SuperAdminNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default SuperAdminLayout
