import {
  Building,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
  UserCog,
  UserPlus,
  Users,
  Video
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const SuperAdminSidebar = ({ isCollapsed }) => {
  const location = useLocation()
  const navItems = [
    { path: "/superadmin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/superadmin/regions", icon: Map, label: "Hududlar" },
    { path: "/superadmin/organizations", icon: Building, label: "Tashkilotlar" },
    { path: "/superadmin/users", icon: Users, label: "Foydalanuvchilar" },
    { path: "/superadmin/cameras", icon: Video, label: "Kameralar" },
    { path: "/superadmin/add-manager", icon: UserPlus, label: "Mas'ullarni qo'shish" },
    { path: "/superadmin/admin", icon: UserCog, label: "Adminlar" },
    { path: "/superadmin/settings", icon: Settings, label: "Sozlamalar" },
    { path: "/logout", icon: LogOut, label: "Tizimdan chiqish" }
  ]

  return (
    <aside className="h-full p-4 flex flex-col">
      {!isCollapsed ? (
        <div>
          <h2 className="text-xl font-bold text-white">Nazorat Markazi</h2>
          <p className="mb-6 text-sm text-white">Kameralarni nazorat qilish platformasi</p>
        </div>
      ) : (
        <div className="h-8 mb-6 flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
      )}
      <hr className='text-indigo-600' />

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
              ? 'bg-blue-700 text-white'
              : 'text-indigo-100 hover:bg-blue-700/50'
              } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && (
              <>
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100" />
              </>
            )}
          </Link>
        ))}
      </nav>


    </aside>
  )
}

export default SuperAdminSidebar