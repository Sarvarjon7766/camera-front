import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from '../../components/AdminNavbar'
import AdminSitebar from '../../components/AdminSitebar'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'

const OfficecenterDashboard = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	}, [token, navigate])

	return (
		<div className="min-h-screen flex flex-col">
			<AdminNavbar />
			<div className="flex flex-1 overflow-hidden">
				<div className="w-64 bg-[#0086DB] text-white hidden md:block">
					<AdminSitebar role="officecenter" /> {/* Role yuborilmoqda */}
				</div>
				<div className="flex-1 overflow-y-auto bg-gray-50">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default OfficecenterDashboard
