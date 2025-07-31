import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiCamera, FiHome, FiKey, FiMail, FiMapPin, FiPhone, FiPlus, FiUser, FiUsers } from 'react-icons/fi'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Organizations = () => {
	const [regions, setRegions] = useState([])
	const [organizations, setOrganizations] = useState([])
	const [stats, setStats] = useState({
		total: 0,
		totalCameras: 0,
		byRegion: [],
		recentAdditions: []
	})
	const [form, setForm] = useState({
		name: '',
		address: '',
		regionId: '',
		manager: {
			fullName: '',
			email: '',
			phone: '',
			username: '',
			password: ''
		}
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('all')

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const [regionsRes, orgsRes] = await Promise.all([
					axios.get(`${import.meta.env.VITE_API_URL}/api/region/getAll`),
					axios.get(`${import.meta.env.VITE_API_URL}/api/organization/getAll`),
				])

				const orgsData = orgsRes.data.data || []
				const regionsData = regionsRes.data.data || []

				// Calculate statistics
				const totalCameras = orgsData.reduce((sum, org) => sum + (org.cameras?.length || 0), 0)

				// Group by region for chart
				const byRegion = regionsData.map(region => {
					const orgsInRegion = orgsData.filter(org => org.regionId === region._id)
					return {
						name: region.name,
						count: orgsInRegion.length,
						cameras: orgsInRegion.reduce((sum, org) => sum + (org.cameras?.length || 0), 0)
					}
				})

				setRegions(regionsData)
				setOrganizations(orgsData)
				setStats({
					total: orgsData.length,
					totalCameras,
					byRegion,
					recentAdditions: orgsData.slice(0, 3) // Get first 3 as recent
				})
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleCreate = async () => {
		try {
			const newOrg = {
				name: form.name,
				address: form.address,
				regionId: form.regionId,
				manager: {
					...form.manager,
					role: 'organization_head'
				}
			}
			const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/organization/register`, newOrg)
			if (res.data.success) {
				setOrganizations(prev => [...prev, res.data.data])
				setIsModalOpen(false)
				setForm({
					name: '',
					address: '',
					regionId: '',
					manager: {
						fullName: '',
						email: '',
						phone: '',
						username: '',
						password: ''
					}
				})
				// Refresh data after creation
				const orgsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/organization/getAll`)
				const orgsData = orgsRes.data.data || []
				setOrganizations(orgsData)
				setStats(prev => ({
					...prev,
					total: orgsData.length,
					totalCameras: orgsData.reduce((sum, org) => sum + (org.cameras?.length || 0), 0),
					recentAdditions: orgsData.slice(0, 3)
				}))
			} else {
				setErrorMessage(res.data.message)
			}
		} catch (error) {
			setErrorMessage(error.response?.data?.message || 'Serverda xatolik yuz berdi')
		}
	}

	const filteredOrganizations = activeTab === 'all'
		? organizations
		: organizations.filter(org => org.regionId === activeTab)

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
			{/* Header with Stats */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tashkilotlar Boshqaruvi</h1>
					<p className="text-gray-600">Barcha tashkilotlar va ularning rahbarlari</p>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
				>
					<FiPlus /> Yangi tashkilot
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-500">Jami tashkilotlar</p>
							<h3 className="text-2xl font-bold">{stats.total}</h3>
						</div>
						<div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
							<FiUsers size={24} />
						</div>
					</div>
				</div>

				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-500">Hududlar soni</p>
							<h3 className="text-2xl font-bold">{regions.length}</h3>
						</div>
						<div className="p-3 bg-green-50 rounded-full text-green-600">
							<FiMapPin size={24} />
						</div>
					</div>
				</div>

				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-500">Jami kameralar</p>
							<h3 className="text-2xl font-bold">{stats.totalCameras}</h3>
						</div>
						<div className="p-3 bg-blue-50 rounded-full text-blue-600">
							<FiCamera size={24} />
						</div>
					</div>
				</div>
			</div>

			{/* Chart Section */}
			<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
				<h3 className="font-semibold text-lg mb-4">Tashkilotlar va kameralar taqsimoti</h3>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={stats.byRegion}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="count" fill="#4f46e5" name="Tashkilotlar soni" />
							<Bar dataKey="cameras" fill="#10b981" name="Kameralar soni" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Filter Tabs */}
			<div className="flex flex-wrap gap-2">
				<button
					onClick={() => setActiveTab('all')}
					className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
				>
					Barchasi
				</button>
				{regions.map(region => (
					<button
						key={region._id}
						onClick={() => setActiveTab(region._id)}
						className={`px-4 py-2 rounded-lg ${activeTab === region._id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
					>
						{region.name}
					</button>
				))}
			</div>

			{/* Organizations Table */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomi</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manzili</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hudud</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kameralar</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rahbar</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aloqa</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{isLoading ? (
								<tr>
									<td colSpan="6" className="px-6 py-4 text-center text-gray-500">
										Yuklanmoqda...
									</td>
								</tr>
							) : filteredOrganizations.length === 0 ? (
								<tr>
									<td colSpan="6" className="px-6 py-4 text-center text-gray-500">
										Tashkilotlar topilmadi
									</td>
								</tr>
							) : (
								filteredOrganizations.map((org, idx) => (
									<tr key={idx} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{org.name}</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500">{org.address}</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500">
											{regions.find(r => r._id === org.regionId)?.name || 'Nomaʼlum'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500">
											<span className="inline-flex items-center gap-1">
												<FiCamera /> {org.cameras?.length || 0}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500">
											{org.managerId?.fullName || '---'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500">
											<div className="flex flex-col">
												{org.managerId?.phone && <span className="flex items-center gap-1"><FiPhone size={14} /> {org.managerId.phone}</span>}
												{org.managerId?.email && <span className="flex items-center gap-1"><FiMail size={14} /> {org.managerId.email}</span>}
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Create Organization Modal */}
			{isModalOpen && (
				<div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
						<div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
							<h2 className="text-lg font-semibold">Yangi tashkilot qo'shish</h2>
						</div>
						<div className="p-6 space-y-4">
							{errorMessage && (
								<div className="bg-red-50 border-l-4 border-red-500 p-4">
									<div className="flex">
										<div className="flex-shrink-0">
											<svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
											</svg>
										</div>
										<div className="ml-3">
											<p className="text-sm text-red-700">{errorMessage}</p>
										</div>
									</div>
								</div>
							)}

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Tashkilot nomi</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<FiHome className="text-gray-400" />
										</div>
										<input
											type="text"
											placeholder="Tashkilot nomi"
											className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
											value={form.name}
											onChange={e => setForm({ ...form, name: e.target.value })}
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Manzili</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<FiMapPin className="text-gray-400" />
										</div>
										<input
											type="text"
											placeholder="Manzili"
											className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
											value={form.address}
											onChange={e => setForm({ ...form, address: e.target.value })}
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Hudud</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<FiMapPin className="text-gray-400" />
										</div>
										<select
											className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
											value={form.regionId}
											onChange={e => setForm({ ...form, regionId: e.target.value })}
										>
											<option value="">Hudud tanlang</option>
											{regions.map(region => (
												<option key={region._id} value={region._id}>{region.name}</option>
											))}
										</select>
									</div>
								</div>
							</div>

							<div className="pt-4 mt-4 border-t">
								<h4 className="font-semibold text-gray-700 flex items-center gap-2">
									<FiUser /> Rahbar maʼlumotlari
								</h4>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">To'liq ismi</label>
										<input
											type="text"
											placeholder="FISH"
											className="w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
											value={form.manager.fullName}
											onChange={e => setForm({ ...form, manager: { ...form.manager, fullName: e.target.value } })}
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<FiMail className="text-gray-400" />
											</div>
											<input
												type="email"
												placeholder="Email"
												className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
												value={form.manager.email}
												onChange={e => setForm({ ...form, manager: { ...form.manager, email: e.target.value } })}
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<FiPhone className="text-gray-400" />
											</div>
											<input
												type="text"
												placeholder="Telefon"
												className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
												value={form.manager.phone}
												onChange={e => setForm({ ...form, manager: { ...form.manager, phone: e.target.value } })}
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-2">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<FiUser className="text-gray-400" />
												</div>
												<input
													type="text"
													placeholder="Username"
													className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
													value={form.manager.username}
													onChange={e => setForm({ ...form, manager: { ...form.manager, username: e.target.value } })}
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<FiKey className="text-gray-400" />
												</div>
												<input
													type="password"
													placeholder="Parol"
													className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
													value={form.manager.password}
													onChange={e => setForm({ ...form, manager: { ...form.manager, password: e.target.value } })}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="p-4 flex justify-end gap-3 bg-gray-50">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
							>
								Bekor qilish
							</button>
							<button
								onClick={handleCreate}
								className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
							>
								Saqlash
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Organizations