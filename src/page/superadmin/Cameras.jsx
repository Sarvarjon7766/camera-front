import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	FiActivity,
	FiCamera, FiCameraOff,
	FiExternalLink,
	FiPlus,
	FiRefreshCw, FiSearch
} from 'react-icons/fi'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Cameras = () => {
	const [cameras, setCameras] = useState([])
	const [organizations, setOrganizations] = useState([])
	const [stats, setStats] = useState({
		total: 0,
		active: 0,
		inactive: 0,
		byOrganization: []
	})
	const [form, setForm] = useState({
		name: '',
		rtspUrl: '',
		organizationId: '',
		status: 'active'
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			setIsLoading(true)
			const [camerasRes, orgsRes] = await Promise.all([
				axios.get('http://localhost:5000/api/camera/getAll'),
				axios.get('http://localhost:5000/api/organization/getAll')
			])


			const camerasData = camerasRes.data.data || []
			const orgsData = orgsRes.data.data || []
			const activeCameras = camerasData.filter(c => c.status === 'active').length
			const inactiveCameras = camerasData.filter(c => c.status === 'inactive').length

			const byOrganization = orgsData.map(org => {
				const orgCameras = camerasData.filter(c => c.organizationId === org._id)
				return {
					name: org.name,
					active: orgCameras.filter(c => c.status === 'active').length,
					inactive: orgCameras.filter(c => c.status === 'inactive').length
				}
			})

			setCameras(camerasData)
			setOrganizations(orgsData)
			setStats({
				total: camerasData.length,
				active: activeCameras,
				inactive: inactiveCameras,
				byOrganization
			})
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleCreate = async () => {
		try {
			const res = await axios.post('http://localhost:5000/api/camera/register', form)
			if (res.data.success) {
				fetchData()
				setIsModalOpen(false)
				setForm({ name: '', rtspUrl: '', organizationId: '', status: 'active' })
			}
		} catch (error) {
			console.error(error)
		}
	}

	const filteredCameras = cameras.filter(camera => {
		const matchesSearch = camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			camera.rtspUrl.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesStatus = statusFilter === 'all' || camera.status === statusFilter
		return matchesSearch && matchesStatus
	})

	const openRTSP = (url) => {
		window.open(url, '_blank')
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
			{/* Header with Stats */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kameralar Monitoringi</h1>
					<p className="text-gray-600">Barcha kameralar va ularning holati</p>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
				>
					<FiPlus /> Yangi kamera
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-500">Jami kameralar</p>
							<h3 className="text-2xl font-bold">{stats.total}</h3>
						</div>
						<div className="p-3 bg-blue-50 rounded-full text-blue-600">
							<FiCamera size={24} />
						</div>
					</div>
				</div>

				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-500">Faol kameralar</p>
							<h3 className="text-2xl font-bold text-green-600">{stats.active}</h3>
						</div>
						<div className="p-3 bg-green-50 rounded-full text-green-600">
							<FiActivity size={24} />
						</div>
					</div>
				</div>

				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-500">Nofaol kameralar</p>
							<h3 className="text-2xl font-bold text-red-600">{stats.inactive}</h3>
						</div>
						<div className="p-3 bg-red-50 rounded-full text-red-600">
							<FiCameraOff size={24} />
						</div>
					</div>
				</div>
			</div>

			{/* Chart Section */}
			<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
				<h3 className="font-semibold text-lg mb-4">Kameralar taqsimoti tashkilotlar bo'yicha</h3>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={stats.byOrganization}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="active" fill="#10b981" name="Faol kameralar" />
							<Bar dataKey="inactive" fill="#ef4444" name="Nofaol kameralar" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Filters */}
			<div className="flex flex-col md:flex-row gap-4">
				<div className="relative flex-1">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<FiSearch className="text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Kamera nomi yoki RTSP URL bo'yicha qidirish..."
						className="pl-10 w-full border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<select
					className="w-full md:w-48 border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
				>
					<option value="all">Barchasi</option>
					<option value="active">Faol</option>
					<option value="inactive">Nofaol</option>
				</select>
				<button
					onClick={fetchData}
					className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
				>
					<FiRefreshCw /> Yangilash
				</button>
			</div>

			{/* Cameras Table */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomi</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RTSP URL</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tashkilot</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holati</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{isLoading ? (
								<tr>
									<td colSpan="5" className="px-6 py-4 text-center text-gray-500">
										Yuklanmoqda...
									</td>
								</tr>
							) : filteredCameras.length === 0 ? (
								<tr>
									<td colSpan="5" className="px-6 py-4 text-center text-gray-500">
										Kameralar topilmadi
									</td>
								</tr>
							) : (
								filteredCameras.map((camera, idx) => (
									<tr key={idx} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
											<div className="flex items-center gap-2">
												{camera.status === 'active' ? (
													<FiCamera className="text-green-500" />
												) : (
													<FiCameraOff className="text-red-500" />
												)}
												{camera.name}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500 break-all max-w-xs truncate">
											{camera.rtspUrl}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-500">
											{organizations.find(o => o._id === camera.organizationId)?.name || '-'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 py-1 text-xs font-semibold rounded-full ${camera.status === 'active'
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'
													}`}
											>
												{camera.status === 'active' ? 'Faol' : 'Nofaol'}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											<button
												onClick={() => openRTSP(camera.rtspUrl)}
												className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
												disabled={!camera.rtspUrl}
											>
												<FiExternalLink /> Ko'rish
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Create Camera Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
						<div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
							<h2 className="text-lg font-semibold">Yangi kamera qo'shish</h2>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Kamera nomi</label>
								<input
									type="text"
									placeholder="Kamera nomi"
									className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
									value={form.name}
									onChange={(e) => setForm({ ...form, name: e.target.value })}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">RTSP URL</label>
								<input
									type="text"
									placeholder="rtsp://example.com/stream"
									className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
									value={form.rtspUrl}
									onChange={(e) => setForm({ ...form, rtspUrl: e.target.value })}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Tashkilot</label>
								<select
									className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
									value={form.organizationId}
									onChange={(e) => setForm({ ...form, organizationId: e.target.value })}
								>
									<option value="">Tashkilotni tanlang</option>
									{organizations.map((org) => (
										<option key={org._id} value={org._id}>
											{org.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
								<select
									className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
									value={form.status}
									onChange={(e) => setForm({ ...form, status: e.target.value })}
								>
									<option value="active">Faol</option>
									<option value="inactive">Nofaol</option>
								</select>
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

export default Cameras