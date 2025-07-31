import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaCity, FaFolder, FaRegFolder, FaVideo } from "react-icons/fa"
import { FiVideo, FiX } from 'react-icons/fi'
import HlsPlayer from '../../components/HlsPlayer'

const AdminCameras = () => {
	const [regions, setRegions] = useState([])
	const [organizations, setOrganizations] = useState([])
	const [cameras, setCameras] = useState([])
	const [selectedRegion, setSelectedRegion] = useState(null)
	const [selectedOrganization, setSelectedOrganization] = useState(null)
	const [selectedCamera, setSelectedCamera] = useState(null)
	const [isActive, setIsActive] = useState('region')
	const [streamUrl, setStreamUrl] = useState(null)
	const [loading, setLoading] = useState({
		stats: false,
		regions: false,
		organizations: false,
		stream: false
	})

	useEffect(() => {
		loadRegions()
	}, [])

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

	const handleRegion = (id) => {
		setSelectedRegion(id)
		handleRegionChange(id)
		setIsActive('organization')
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

	const handleOrganization = async (organization) => {
		setSelectedOrganization(organization)
		setCameras(organization.cameras)
		setIsActive('cameras')
	}

	const startStream = async (camera) => {
		setLoading(prev => ({ ...prev, stream: true }))
		setSelectedCamera(camera)
		setIsActive('selectedCameras')
		setStreamUrl(null)
		try {
			const res = await axios.post('http://localhost:5000/api/camera/start-stream', {
				cameraId: camera._id,
				regionId: selectedRegion,
				organizationId: selectedOrganization._id,
				rtspUrl: camera.rtspUrl,
				cameraname: camera.name,
			})

			if (res.data.success) {
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
		setIsActive('cameras')
		if (!selectedCamera || !selectedRegion || !selectedOrganization) return
		try {
			await axios.post('http://localhost:5000/api/camera/stop-stream', {
				cameraId: selectedCamera._id,
				regionId: selectedRegion,
				organizationId: selectedOrganization._id,
			})
		} catch (err) {
			console.error('Streamni to\'xtatishda xatolik:', err)
		} finally {
			setSelectedCamera(null)
			setStreamUrl(null)
		}
	}
	const goBack = () => {
		if (isActive === 'organization') {
			setIsActive('region')
			setSelectedRegion(null)
			setOrganizations([])
		} else if (isActive === 'cameras') {
			setIsActive('organization')
			setSelectedOrganization(null)
			setCameras([])
		} else if (isActive === 'selectedCameras') {
			setIsActive('cameras')
			setSelectedCamera(null)
			setStreamUrl(null)
		}
	}

	return (
		<div className="p-4 md:p-6">
			<div className="flex items-center mb-6">
				{(isActive === 'organization' || isActive === 'cameras' || isActive === 'selectedCameras') && (
					<button
						onClick={goBack}
						className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
					>
						<FaArrowLeft className="text-gray-600" />
					</button>
				)}
				<h1 className="text-2xl font-bold text-gray-800">
					{isActive === 'region' && 'Hududlar'}
					{isActive === 'organization' && 'Tashkilotlar'}
					{isActive === 'cameras' && 'Kameralar'}
					{isActive === 'selectedCameras' && selectedCamera?.name}
				</h1>
			</div>
			{isActive === 'region' && (
				<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-800 flex items-center">
							<FaCity className="mr-2 text-indigo-500" /> Hududlar soni {regions.length} ta
						</h2>
					</div>

					{regions.length === 0 ? (
						<div className="text-center py-12">
							<FaRegFolder className="mx-auto text-4xl text-gray-300 mb-3" />
							<p className="text-gray-500">Hududlar mavjud emas</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
							{regions.map(region => (
								<div
									key={region._id}
									className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
									onClick={() => handleRegion(region._id)}
								>
									<div className="bg-gradient-to-br from-indigo-50 to-blue-50 h-40 flex items-center justify-center">
										<div className="relative w-full h-full flex items-center justify-center">
											<FaFolder className="text-6xl text-indigo-400 group-hover:text-indigo-500 transition-colors" />
										</div>
									</div>
									<div className="p-4 bg-white">
										<h4 className="font-semibold text-gray-800 truncate">{region.name}</h4>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
			{isActive === 'organization' && (
				<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-800 flex items-center">
							<FaCity className="mr-2 text-blue-500" /> Tashkilotlar soni - {organizations.length} ta
						</h2>
					</div>

					{organizations.length === 0 ? (
						<div className="text-center py-12">
							<FaRegFolder className="mx-auto text-4xl text-gray-300 mb-3" />
							<p className="text-gray-500">Tashkilotlar mavjud emas</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
							{organizations.map(org => (
								<div
									key={org._id}
									className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
									onClick={() => handleOrganization(org)}
								>
									<div className="bg-gradient-to-br from-blue-50 to-cyan-50 h-40 flex items-center justify-center">
										<div className="relative w-full h-full flex items-center justify-center">
											<FaFolder className="text-6xl text-blue-400 group-hover:text-blue-500 transition-colors" />

										</div>
									</div>
									<div className="p-4 bg-white">
										<h4 className="font-semibold text-gray-800 truncate">{org.name}</h4>
										<p className="text-sm text-gray-500 mt-1">Kamerlar: {org.cameras?.length || 0}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
			{isActive === 'cameras' && (
				<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-800 flex items-center">
							<FaVideo className="mr-2 text-red-500" /> Kameralar soni {cameras.length} ta
						</h2>
					</div>

					{cameras.length === 0 ? (
						<div className="text-center py-12">
							<FiVideo className="mx-auto text-4xl text-gray-300 mb-3" />
							<p className="text-gray-500">Kameralar mavjud emas</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
							{cameras.map(cam => (
								<div
									key={cam._id}
									className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
									onClick={() => startStream(cam)}
								>
									<div className="bg-gradient-to-br from-red-50 to-pink-50 h-40 flex items-center justify-center relative">
										<div className="absolute inset-0 flex items-center justify-center">
											<FiVideo className="text-5xl text-red-400 group-hover:text-red-500 transition-colors" />
										</div>
										<div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
											{cam.name}
										</div>
										<div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-sm">
											<div className="w-3 h-3 rounded-full bg-green-500"></div>
										</div>
									</div>
									<div className="p-4 bg-white">
										<h4 className="font-semibold text-gray-800 truncate">{cam.name}</h4>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
			{isActive === 'selectedCameras' && (
				<div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl">
						<div className="flex justify-between items-center border-b border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white">
							<div className="flex items-center">
								<FaVideo className="text-red-500 mr-2" />
								<h3 className="text-xl font-bold text-gray-800">{selectedCamera.name}</h3>
							</div>
							<button
								className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
								onClick={stopStream}
							>
								<FiX size={24} />
							</button>
						</div>

						<div className="p-4 bg-black">
							<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
								{loading.stream ? (
									<div className="w-full h-full flex flex-col items-center justify-center text-white">
										<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
										<p>Strim yuklanmoqda...</p>
									</div>
								) : streamUrl ? (
									<HlsPlayer src={`http://localhost:5000${streamUrl}`} />
								) : (
									<div className="w-full h-full flex items-center justify-center text-white">
										<div className="text-center">
											<FiVideo className="mx-auto text-4xl text-gray-400 mb-3" />
											<p>Strim mavjud emas</p>
											<p className="text-sm text-gray-400 mt-1">Kamera ulanmagan yoki xatolik yuz berdi</p>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
							<div>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Hudud:</span> {selectedRegion}
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Tashkilot:</span> {selectedOrganization?.name}
								</p>
							</div>
							<button
								className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
								onClick={stopStream}
							>
								<FiX className="mr-2" /> Yopish
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AdminCameras