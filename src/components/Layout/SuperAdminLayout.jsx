import axios from 'axios'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SuperAdminNavbar from '../navbar/SuperAdminNavbar'
import SuperAdminSidebar from '../sidebar/SuperAdminSidebar'

const SuperAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Token va rol tekshiruvi
    const checkAuth = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))

        // Agar localStorageda user ma'lumoti bo'lmasa
        if (!userData || !userData.token) {
          throw new Error('Kirish ma\'lumotlari topilmadi')
        }

        // Token yaroqliligini tekshirish uchun API so'rovi
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/verify`, {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        })

        // Agar foydalanuvchi superadmin bo'lmasa
        if (!response.data.success || response.data.role !== 'superadmin') {
          throw new Error('Ruxsat etilmagan foydalanuvchi')
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Autentifikatsiya xatosi:', error)
        localStorage.removeItem('user')
        navigate('/')
      }
    }

    checkAuth()
  }, [navigate])

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Tizimga kirish tekshirilmoqda...</p>
        </div>
      </div>
    )
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
          className="fixed inset-0  z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <SuperAdminNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-sm h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default SuperAdminLayout