import { Building, LayoutDashboard, MapPin } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const RegionHeadSidebar = () => {
	const location = useLocation()
	const navItems = [
		{ path: "/region-manager", icon: LayoutDashboard, label: "Dashboard" },
		{ path: "/region-manager/districts", icon: MapPin, label: "Districts" },
		{ path: "/region-manager/organizations", icon: Building, label: "Organizations" }
	]

	return (
		<aside className="h-full p-4 flex flex-col bg-blue-800">
			<h2 className="text-lg font-bold mb-6 text-white">Region Manager</h2>
			<nav className="flex flex-col gap-1">
				{navItems.map((item) => (
					<Link
						key={item.path}
						to={item.path}
						className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
								? 'bg-blue-600 text-white shadow-md'
								: 'text-blue-100 hover:bg-blue-700/80'
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

export default RegionHeadSidebar