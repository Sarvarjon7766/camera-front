import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiBarChart2, FiLayers as FiBuilding, FiChevronDown, FiHome, FiMap, FiVideo, FiX } from 'react-icons/fi'
import HlsPlayer from '../../components/HlsPlayer'

const AdminDashboard = () => {
	const [stats, setStats] = useState({ regions: 0, organizations: 0, cameras: 0 })
	const [regions, setRegions] = useState([])
	const [selectedRegion, setSelectedRegion] = useState(null)
	const [organizations, setOrganizations] = useState([])
	const [selectedOrganization, setSelectedOrganization] = useState(null)
	const [cameras, setCameras] = useState([])
	const [selectedCamera, setSelectedCamera] = useState(null)
	const [streamUrl, setStreamUrl] = useState(null)
	const [loading, setLoading] = useState({
		stats: false,
		regions: false,
		organizations: false,
		stream: false
	})

	useEffect(() => {
		loadStats()
		loadRegions()
	}, [])

	const loadStats = async () => {
		setLoading(prev => ({ ...prev, stats: true }))
		try {
			const res = await axios.get('http://localhost:5000/api/dashboard/stats')
			if (res.data.success) {
				setStats(res.data.data)
			}
		} catch (err) {
			console.error('Statistikani olishda xatolik:', err)
		} finally {
			setLoading(prev => ({ ...prev, stats: false }))
		}
	}

	const loadRegions = async () => {
		setLoading(prev => ({ ...prev, regions: true }))
		try {
			const res = await axios.get('http://localhost:5000/api/region/getAll')
			if (res.data.success) {
				setRegions(res.data.data)
			}
		} catch (err) {
			console.error('Hududlar xatosi:', err)
		} finally {
			setLoading(prev => ({ ...prev, regions: false }))
		}
	}

	const handleRegionChange = async (regionId) => {
		setSelectedRegion(regionId)
		setSelectedOrganization(null)
		setCameras([])
		setLoading(prev => ({ ...prev, organizations: true }))

		try {
			const res = await axios.get(`http://localhost:5000/api/organization/region-organization/${regionId}`)
			if (res.data.success) {
				setOrganizations(res.data.data)
			}
		} catch (err) {
			console.error('Tashkilotlar xatosi:', err)
		} finally {
			setLoading(prev => ({ ...prev, organizations: false }))
		}
	}

	const handleOrganizationChange = (orgId) => {
		setSelectedOrganization(orgId)
		const org = organizations.find(o => o._id === orgId)
		setCameras(org?.cameras || [])
	}

	const startStream = async (camera) => {
		setLoading(prev => ({ ...prev, stream: true }))
		setSelectedCamera(camera)
		setStreamUrl(null) // Reset previous stream URL

		try {
			const res = await axios.post('http://localhost:5000/api/camera/start-stream', {
				cameraId: camera._id,
				regionId: selectedRegion,
				organizationId: selectedOrganization,
				rtspUrl: camera.rtspUrl,
				cameraname: camera.name,
			})

			if (res.data.success) {
				console.log(res.data.streamUrl)
				setStreamUrl(res.data.streamUrl)
			} else {
				throw new Error(res.data.message || 'Streamni boshlashda xatolik')
			}
		} catch (err) {
			console.error('Streamni boshlashda xatolik:', err)
			alert(`Kamera strimini boshlashda xatolik: ${err.message}`)
		} finally {
			setLoading(prev => ({ ...prev, stream: false }))
		}
	}

	const stopStream = async () => {
		if (!selectedCamera || !selectedRegion || !selectedOrganization) return

		try {
			await axios.post('http://localhost:5000/api/camera/stop-stream', {
				cameraId: selectedCamera._id,
				regionId: selectedRegion,
				organizationId: selectedOrganization,
			})
		} catch (err) {
			console.error('Streamni to\'xtatishda xatolik:', err)
		} finally {
			setSelectedCamera(null)
			setStreamUrl(null)
		}
	}

	const StatCard = ({ icon, value, label, loading }) => (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-gray-100">
			<div className="flex items-center space-x-4">
				<div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
					{icon}
				</div>
				<div>
					<p className="text-sm text-gray-500">{label}</p>
					{loading ? (
						<div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
					) : (
						<h3 className="text-2xl font-bold text-gray-800">{value}</h3>
					)}
				</div>
			</div>
		</div>
	)

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-800 flex items-center">
							<FiHome className="mr-2" /> Boshqaruv Paneli
						</h1>
						<p className="text-gray-500">Tizim statistikasi va kameralarni boshqarish</p>
					</div>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<StatCard
						icon={<FiMap size={24} />}
						value={stats.regions}
						label="Hududlar"
						loading={loading.stats}
					/>
					<StatCard
						icon={<FiBuilding size={24} />}
						value={stats.organizations}
						label="Tashkilotlar"
						loading={loading.stats}
					/>
					<StatCard
						icon={<FiVideo size={24} />}
						value={stats.cameras}
						label="Kameralar"
						loading={loading.stats}
					/>
				</div>

				{/* Selection Section */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
					<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
						<FiBarChart2 className="mr-2" /> Hudud va Tashkilotni tanlang
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Hudud</label>
							<div className="relative">
								<select
									className="appearance-none w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
									onChange={(e) => handleRegionChange(e.target.value)}
									value={selectedRegion || ''}
									disabled={loading.regions}
								>
									<option value="">-- Hududni tanlang --</option>
									{regions.map(r => (
										<option key={r._id} value={r._id}>{r.name}</option>
									))}
								</select>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<FiChevronDown className="text-gray-400" />
								</div>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Tashkilot</label>
							<div className="relative">
								<select
									className="appearance-none w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
									onChange={(e) => handleOrganizationChange(e.target.value)}
									value={selectedOrganization || ''}
									disabled={!selectedRegion || loading.organizations}
								>
									<option value="">-- Tashkilotni tanlang --</option>
									{organizations.map(org => (
										<option key={org._id} value={org._id}>{org.name}</option>
									))}
								</select>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<FiChevronDown className="text-gray-400" />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Cameras Section */}
				{selectedOrganization && (
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
							<FiVideo className="mr-2" /> Kameralar ({cameras.length})
						</h2>

						{cameras.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-gray-500">Bu tashkilotda kameralar mavjud emas</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{cameras.map(cam => (
									<div
										key={cam._id}
										className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
										onClick={() => startStream(cam)}
									>
										<div className="bg-gray-100 h-40 flex items-center justify-center">
											<div className="relative w-full h-full">
												<img
													src={`https://via.placeholder.com/400x225.png?text=${encodeURIComponent(cam.name)}`}
													alt={cam.name}
													className="w-full h-full object-cover"
												/>
												<div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
													<div className="bg-red-500 rounded-full p-2 animate-pulse">
														<FiVideo className="text-white" />
													</div>
												</div>
											</div>
										</div>
										<div className="p-4">
											<h4 className="font-semibold text-gray-800">{cam.name}</h4>
											<p className="text-sm text-gray-500 mt-1">Status: <span className="text-green-500">Faol</span></p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Camera Modal */}
			{selectedCamera && (
				<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden">
						<div className="flex justify-between items-center border-b border-gray-200 p-4">
							<h3 className="text-xl font-bold text-gray-800">{selectedCamera.name}</h3>
							<button
								className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
								onClick={stopStream}
							>
								<FiX size={24} />
							</button>
						</div>

						<div className="p-4">
							<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-black">
								{loading.stream ? (
									<div className="w-full h-full flex items-center justify-center text-white">
										<p>Stream yuklanmoqda...</p>
									</div>
								) : streamUrl ? (
									<HlsPlayer src={`http://localhost:5000${streamUrl}`} />
								) : (
									<div className="w-full h-full flex items-center justify-center text-white">
										<p>Stream mavjud emas</p>
									</div>
								)}
							</div>
						</div>

						<div className="border-t border-gray-200 p-4 flex justify-end">
							<button
								className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
								onClick={stopStream}
							>
								Yopish
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AdminDashboard