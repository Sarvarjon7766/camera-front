import { LayoutDashboard, Settings, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
	const location = useLocation()
	const navItems = [
		{ path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
		{ path: "/admin/users", icon: Users, label: "Users" },
		{ path: "/admin/settings", icon: Settings, label: "Settings" }
	]

	return (
		<aside className="h-full p-4 flex flex-col">
			<h2 className="text-lg font-bold mb-6 text-white">Admin Panel</h2>
			<nav className="flex flex-col gap-1">
				{navItems.map((item) => (
					<Link
						key={item.path}
						to={item.path}
						className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
							? 'bg-blue-700 text-white'
							: 'text-blue-100 hover:bg-blue-700/50'
							}`}
					>
						<item.icon className="h-5 w-5" />
						<span>{item.label}</span>
					</Link>
				))}
			</nav>
		</aside>
	)
}
export default AdminSidebar