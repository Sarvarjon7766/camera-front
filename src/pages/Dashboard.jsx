import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SiderBar from '../components/SiderBar'
import Footer from '../components/Footer'
import { Menu } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardNavbar from '../components/DashboardNavbar'

const Dashboard = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const navigate = useNavigate()
	const token = localStorage.getItem('code')


	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	// useEffect(() => {
	// 	if (!token) {
	// 		navigate('/login')
	// 	}
	// }, [token, navigate]) 

	return (
		<div className="min-h-screen flex flex-col">
			{/* <Navbar /> */}
			<DashboardNavbar />
			<div className="flex flex-1 overflow-hidden">
				<div
					className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-[#0086DB] text-white transform ${
						sidebarOpen ? 'translate-x-0' : '-translate-x-full'
					} transition-transform duration-300 md:translate-x-0`}
				>
					<SiderBar />
				</div>

				{/* Mobil versiyada fon overlay */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
						onClick={toggleSidebar}
					></div>
				)}

				{/* Main content */}
				<div className="flex-1 overflow-y-auto bg-gray-50 p-4">
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default Dashboard
