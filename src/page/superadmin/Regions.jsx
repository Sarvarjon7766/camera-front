import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiActivity, FiMail, FiMapPin, FiPhone, FiPlus, FiSearch, FiUser, FiUsers } from 'react-icons/fi'

const Region = () => {
	const [regions, setRegions] = useState([])
	const [form, setForm] = useState({
		regionName: '',
		fullName: '',
		email: '',
		phone: '',
		username: '',
		password: ''
	})
	const [errorMessage, setErrorMessage] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	// 🔄 Regionlarni yuklash
	useEffect(() => {
		const fetchRegions = async () => {
			try {
				setIsLoading(true)
				const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/region/getAll`)
				setRegions(res.data.data || [])
			} catch (error) {
				console.error('Serverdan regionlarni olishda xatolik:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchRegions()
	}, [])

	// ➕ Yangi region yaratish
	const handleCreate = async () => {
		try {
			const newRegion = {
				name: form.regionName,
				manager: {
					fullName: form.fullName,
					email: form.email,
					phone: form.phone,
					username: form.username,
					password: form.password,
					role: 'region_head'
				},
				organizations: [],
				status: 'active'
			}

			const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/region/register`, newRegion)
			if (res.data.success) {
				setRegions(prev => [...prev, res.data.data])
				setIsModalOpen(false)
				setForm({
					regionName: '',
					fullName: '',
					email: '',
					phone: '',
					username: '',
					password: ''
				})
				setErrorMessage('')
			} else {
				setErrorMessage(res.data.message)
			}
		} catch (error) {
			setErrorMessage(error.response?.data?.message || 'Server bilan bog‘lanishda xatolik.')
		}
	}

	// Filter regions based on search term
	const filteredRegions = regions.filter(region =>
		region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(region.managerId?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
		(region.managerId?.username || '').toLowerCase().includes(searchTerm.toLowerCase())
	)

	// Calculate statistics
	const totalRegions = regions.length
	const activeRegions = regions.filter(r => r.status === 'active').length
	const totalOrganizations = regions.reduce((sum, r) => sum + (r.organizations?.length || 0), 0)

	return (
		<div className="min-h-screen bg-gray-50 p-4 sm:p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Hududlar Boshqaruvi</h1>
						<p className="text-sm sm:text-base text-gray-600">Barcha hududlar va ularning menejerlari</p>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base w-full md:w-auto justify-center"
					>
						<FiPlus className="text-lg" />
						<span>Yangi hudud</span>
					</button>
				</div>

				{/* Statistics Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="p-2 sm:p-3 rounded-lg bg-blue-100 text-blue-600">
								<FiMapPin className="text-xl sm:text-2xl" />
							</div>
							<div>
								<p className="text-xs sm:text-sm font-medium text-gray-500">Jami hududlar</p>
								<p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{totalRegions}</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="p-2 sm:p-3 rounded-lg bg-green-100 text-green-600">
								<FiUsers className="text-xl sm:text-2xl" />
							</div>
							<div>
								<p className="text-xs sm:text-sm font-medium text-gray-500">Jami tashkilotlar</p>
								<p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{totalOrganizations}</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="p-2 sm:p-3 rounded-lg bg-emerald-100 text-emerald-600">
								<FiActivity className="text-xl sm:text-2xl" />
							</div>
							<div>
								<p className="text-xs sm:text-sm font-medium text-gray-500">Faol hududlar</p>
								<p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">{activeRegions}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Table Section */}
				<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
					<div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
						<div>
							<h2 className="text-lg sm:text-xl font-semibold text-gray-800">Hududlar Ro'yxati</h2>
							<p className="text-xs sm:text-sm text-gray-500">{filteredRegions.length} ta hudud topildi</p>
						</div>
						<div className="relative w-full md:w-auto">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FiSearch className="text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Qidirish..."
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64 text-sm sm:text-base"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{isLoading ? (
						<div className="p-6 sm:p-8 flex justify-center">
							<div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
										<th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hudud</th>
										<th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Menejer</th>
										<th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Aloqa</th>
										<th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tash.</th>
										<th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{filteredRegions.map((region, idx) => (
										<tr key={region._id} className="hover:bg-gray-50 transition-colors">
											<td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
											<td className="px-3 sm:px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-lg flex items-center justify-center">
														<FiMapPin className="text-blue-600 text-sm sm:text-base" />
													</div>
													<div className="ml-2 sm:ml-4">
														<div className="text-sm font-medium text-gray-900">{region.name}</div>
														<div className="text-xs text-gray-500 sm:hidden mt-1 flex items-center">
															<FiUser className="mr-1" /> {region.managerId?.fullName || 'Nomalum'}
														</div>
													</div>
												</div>
											</td>
											<td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
												<div className="text-sm font-medium text-gray-900">{region.managerId?.fullName || 'Nomalum'}</div>
												<div className="text-xs sm:text-sm text-gray-500 flex items-center mt-1">
													<FiUser className="mr-1" /> @{region.managerId?.username || '-'}
												</div>
											</td>
											<td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
												<div className="text-sm text-gray-900 flex items-center">
													<FiPhone className="mr-2" /> {region.managerId?.phone || '-'}
												</div>
												<div className="text-sm text-gray-500 flex items-center mt-1">
													<FiMail className="mr-2" /> {region.managerId?.email || '-'}
												</div>
											</td>
											<td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
												<span className="px-2 py-1 inline-flex text-xs leading-4 sm:text-sm sm:leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
													{region.organizations?.length || 0}
												</span>
											</td>
											<td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
												<span className={`px-2 py-1 inline-flex text-xs leading-4 sm:text-xs sm:leading-5 font-semibold rounded-full ${region.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
													{region.status === 'active' ? 'Faol' : 'Nofaol'}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{/* Create Region Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-screen">
						{/* Modal Header */}
						<div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 relative">
							<h2 className="text-lg sm:text-xl font-semibold text-white">Yangi hudud qo'shish</h2>
							<div className="absolute -bottom-5 left-6 right-6 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-30"></div>
						</div>

						{/* Modal Content */}
						<div className="p-4 sm:p-6">
							{errorMessage && (
								<div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mb-4 rounded-r-lg">
									<div className="flex">
										<div className="flex-shrink-0">
											<svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
											</svg>
										</div>
										<div className="ml-3">
											<p className="text-xs sm:text-sm text-red-700">{errorMessage}</p>
										</div>
									</div>
								</div>
							)}

							{/* Two-column form layout */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
								{/* Left Column */}
								<div className="space-y-4 sm:space-y-5">
									{/* Region Name */}
									<div className="relative group">
										<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Hudud nomi</label>
										<div className="relative">
											<input
												type="text"
												placeholder="Samarqand"
												className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 group-hover:border-blue-300"
												value={form.regionName}
												onChange={e => setForm({ ...form, regionName: e.target.value })}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<FiMapPin className="text-gray-400 group-hover:text-blue-400 transition-colors" />
											</div>
										</div>
									</div>

									{/* Manager Full Name */}
									<div className="relative group">
										<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Menejer FISH</label>
										<div className="relative">
											<input
												type="text"
												placeholder="Egamberdiyev Sarvar"
												className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 group-hover:border-blue-300"
												value={form.fullName}
												onChange={e => setForm({ ...form, fullName: e.target.value })}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<FiUser className="text-gray-400 group-hover:text-blue-400 transition-colors" />
											</div>
										</div>
									</div>

									{/* Phone */}
									<div className="relative group">
										<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Telefon</label>
										<div className="relative">
											<input
												type="text"
												placeholder="+998901234567"
												className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 group-hover:border-blue-300"
												value={form.phone}
												onChange={e => setForm({ ...form, phone: e.target.value })}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<FiPhone className="text-gray-400 group-hover:text-blue-400 transition-colors" />
											</div>
										</div>
									</div>
								</div>

								{/* Right Column */}
								<div className="space-y-4 sm:space-y-5">
									{/* Email */}
									<div className="relative group">
										<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
										<div className="relative">
											<input
												type="email"
												placeholder="sarvar@mail.com"
												className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 group-hover:border-blue-300"
												value={form.email}
												onChange={e => setForm({ ...form, email: e.target.value })}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<FiMail className="text-gray-400 group-hover:text-blue-400 transition-colors" />
											</div>
										</div>
									</div>

									{/* Username */}
									<div className="relative group">
										<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Username</label>
										<div className="relative">
											<input
												type="text"
												placeholder="sarvar"
												className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 group-hover:border-blue-300"
												value={form.username}
												onChange={e => setForm({ ...form, username: e.target.value })}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<span className="text-gray-400 group-hover:text-blue-400 transition-colors">@</span>
											</div>
										</div>
									</div>

									{/* Password */}
									<div className="relative group">
										<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Parol</label>
										<div className="relative">
											<input
												type="password"
												placeholder="••••••••"
												className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 group-hover:border-blue-300"
												value={form.password}
												onChange={e => setForm({ ...form, password: e.target.value })}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<svg className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
												</svg>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Modal Footer */}
						<div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2 sm:gap-3">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base font-medium flex items-center gap-1.5"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
								Bekor qilish
							</button>
							<button
								onClick={handleCreate}
								className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md text-sm sm:text-base font-medium flex items-center gap-1.5 hover:shadow-lg"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
								</svg>
								Saqlash
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Region