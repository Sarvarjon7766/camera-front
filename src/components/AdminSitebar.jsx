import {
  FaInfoCircle,
  FaListAlt,
  FaMoneyBillWave,
  FaRegFileAlt,
  FaSignOutAlt,
} from "react-icons/fa"
import { Link } from 'react-router-dom'

const roleBasedMenu = {
  leader: [
    { icon: FaListAlt, title: "Barcha Murojaatlar", link: '' },
    { icon: FaListAlt, title: "Takliflar", link: 'offers' },
    { icon: FaMoneyBillWave, title: "Shikoyatlar", link: 'complaints' },
    { icon: FaInfoCircle, title: "Appelatsiya", link: 'appellations' },
    { icon: FaRegFileAlt, title: "Javoblar", link: 'answares' },
  ],
  accountant: [
    { icon: FaListAlt, title: "Bosh sahifa", link: '' },
    { icon: FaListAlt, title: "Umumiy vakantlar", link: 'general-vacancies' },
    { icon: FaMoneyBillWave, title: "Bo'sh vakantlar", link: 'vacancies' },
    { icon: FaInfoCircle, title: "Band vakantlar", link: 'busy-vacancies' },
    { icon: FaRegFileAlt, title: "Profile", link: 'profile' },
  ],
  resources: [
    { icon: FaListAlt, title: "Bosh sahifa", link: '' },
    { icon: FaListAlt, title: "Bo'sh vakantlar", link: 'vacancies' },
    { icon: FaMoneyBillWave, title: "Arizalar", link: 'applications' },
    { icon: FaInfoCircle, title: "Javoblar", link: 'answers' },
    { icon: FaRegFileAlt, title: "Profile", link: 'profile' },
  ],
  officecenter: [
    { icon: FaListAlt, title: "Bosh sahifa", link: '' },
    { icon: FaListAlt, title: "Arizalar", link: 'applications' },
    { icon: FaInfoCircle, title: "Javoblar", link: 'answers' },
    { icon: FaRegFileAlt, title: "Profile", link: 'profile' },
  ],
  acceptance: [
    { icon: FaListAlt, title: "Bosh sahifa", link: '' },
    { icon: FaListAlt, title: "Studentlar arizasi", link: 'student-application' },
    { icon: FaInfoCircle, title: "Javoblar", link: 'answers' },
    { icon: FaRegFileAlt, title: "Profile", link: 'profile' },
  ]
}

const logoutItem = {
  icon: FaSignOutAlt,
  title: "Tizimdan chiqish",
  link: '/login',
}

const AdminSitebar = ({ role = 'accountant' }) => {
  const menuItems = roleBasedMenu[role] || []

  const renderMenuItem = ({ icon: Icon, title, link }) => {
    const isLogout = link === '/login'
    const fullPath = isLogout ? link : `/${role}/${link}`

    const handleClick = () => {
      if (isLogout) {
        localStorage.removeItem('code')
      }
    }

    return (
      <Link
        key={title}
        to={fullPath}
        onClick={handleClick}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-[#0086DB] transition font-semibold text-white duration-200"
      >
        <Icon className="text-xl" />
        <span className="truncate">{title}</span>
      </Link>
    )
  }


  return (
    <div className="w-64 h-screen bg-[#0F4BE5] text-white shadow-md p-4 overflow-y-auto">
      <h2 className="text-2xl font-extrabold mb-8 text-center tracking-wide">Dashboard</h2>
      <ul className="space-y-2">
        {menuItems.map(renderMenuItem)}
        <li>{renderMenuItem(logoutItem)}</li>
      </ul>
    </div>
  )
}

export default AdminSitebar
