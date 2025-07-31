import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
	FiActivity,
	FiBarChart2,
	FiEdit,
	FiKey,
	FiMail,
	FiPhone,
	FiSearch,
	FiTrash2,
	FiUser,
	FiUserPlus,
	FiUsers,
	FiX
} from 'react-icons/fi'

const AdminManager = () => {
	// Asosiy state'lar
	const [form, setForm] = useState({
		fullName: '',
		phone: '',
		email: '',
		username: '',
		password: '',
		role: 'admin'
	})

	const [admins, setAdmins] = useState([])
	const [loading, setLoading] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [currentAdminId, setCurrentAdminId] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isFetchingAdmins, setIsFetchingAdmins] = useState(true)
	const [showAddModal, setShowAddModal] = useState(false)
	const [stats, setStats] = useState({
		total: 0,
		active: 0,
		recentlyAdded: 0
	})

	// Modal animatsiyalari
	const modalVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 }
	}

	// Filter adminlar
	const getFilteredAdmins = () => {
		if (!admins || admins.length === 0) return []

		return admins.filter(admin => {
			if (!admin) return false
			return (
				(admin.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
				(admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
				(admin.phone?.includes(searchTerm) || '')
			)
		})
	}

	const filteredAdmins = getFilteredAdmins()

	// Statistikani hisoblash
	const calculateStats = (data) => {
		const now = new Date()
		const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

		return {
			total: data.length,
			active: data.filter(a => a.isActive !== false).length,
			recentlyAdded: data.filter(a => new Date(a.createdAt) > oneWeekAgo).length
		}
	}

	// Input o'zgarishi
	const handleChange = (e) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	// Formani tozalash
	const clearForm = () => {
		setForm({
			fullName: '',
			phone: '',
			email: '',
			username: '',
			password: '',
			role: 'admin'
		})
		setEditMode(false)
		setCurrentAdminId(null)
		setShowAddModal(false)
	}

	// Xabarlarni ko'rsatish
	const showMessage = (message, isError = false) => {
		if (isError) {
			setErrorMessage(message)
			setTimeout(() => setErrorMessage(''), 5000)
		} else {
			setSuccessMessage(message)
			setTimeout(() => setSuccessMessage(''), 5000)
		}
	}

	// Formani yuborish
	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			let res
			if (editMode) {
				res = await axios.put(`http://localhost:5000/api/user/${currentAdminId}`, form)
			} else {
				res = await axios.post('http://localhost:5000/api/user/register', form)
			}

			if (res.data.success) {
				showMessage(editMode ? 'Admin muvaffaqiyatli yangilandi!' : 'Admin muvaffaqiyatli yaratildi!')
				clearForm()
				await getAdmins()
			} else {
				showMessage(`Xatolik: ${res.data.message}`, true)
			}
		} catch (error) {
			console.error('Server bilan bog‘lanishda xatolik:', error)
			showMessage(error.response?.data?.message || 'Server bilan bog‘lanib bo‘lmadi', true)
		} finally {
			setLoading(false)
		}
	}

	// Adminlarni olish
	const getAdmins = async () => {
		setIsFetchingAdmins(true)
		try {
			const res = await axios.get('http://localhost:5000/api/user/getAdmins')
			if (res.data.success) {
				const data = res.data.users || []
				setAdmins(data)
				setStats(calculateStats(data))
			} else {
				setAdmins([])
				showMessage('Adminlarni yuklashda xatolik yuz berdi', true)
			}
		} catch (error) {
			console.error('Adminlarni olishda xatolik:', error)
			setAdmins([])
			showMessage('Adminlarni yuklashda xatolik yuz berdi', true)
		} finally {
			setIsFetchingAdmins(false)
		}
	}

	// Adminni o'chirish
	const handleDelete = async (id) => {
		if (window.confirm('Haqiqatan ham bu adminni o\'chirmoqchimisiz?')) {
			try {
				const res = await axios.delete(`http://localhost:5000/api/user/${id}`)
				if (res.data.success) {
					showMessage('Admin muvaffaqiyatli o\'chirildi!')
					await getAdmins()
				}
			} catch (error) {
				console.error('Adminni o\'chirishda xatolik:', error)
				showMessage('Adminni o\'chirishda xatolik yuz berdi', true)
			}
		}
	}

	// Adminni tahrirlash
	const handleEdit = (admin) => {
		setForm({
			fullName: admin.fullName || '',
			phone: admin.phone || '',
			email: admin.email || '',
			username: admin.username || '',
			password: '',
			role: admin.role || 'admin'
		})
		setEditMode(true)
		setCurrentAdminId(admin._id)
		setShowAddModal(true)
	}

	// Komponent yuklanganda adminlarni olish
	useEffect(() => {
		getAdmins()
	}, [])

	return (
		<div className="mx-auto p-4 md:p-6">
			{/* Xabarlar */}
			<AnimatePresence>
				{successMessage && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg shadow-sm"
					>
						{successMessage}
					</motion.div>
				)}
				{errorMessage && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg shadow-sm"
					>
						{errorMessage}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Statistikalar paneli */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<motion.div
					whileHover={{ scale: 1.02 }}
					className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500"
				>
					<div className="flex items-center">
						<div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
							<FiUsers size={24} />
						</div>
						<div>
							<h3 className="text-gray-500 text-sm">Jami Adminlar</h3>
							<p className="text-2xl font-bold">{stats.total}</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.02 }}
					className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500"
				>
					<div className="flex items-center">
						<div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
							<FiActivity size={24} />
						</div>
						<div>
							<h3 className="text-gray-500 text-sm">Faol Adminlar</h3>
							<p className="text-2xl font-bold">{stats.active}</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.02 }}
					className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-500"
				>
					<div className="flex items-center">
						<div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
							<FiBarChart2 size={24} />
						</div>
						<div>
							<h3 className="text-gray-500 text-sm">Yangi Adminlar</h3>
							<p className="text-2xl font-bold">{stats.recentlyAdded}</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Boshqaruv paneli */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800 flex items-center">
					<FiKey className="mr-2" />
					Adminlar Boshqaruvi
				</h1>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setShowAddModal(true)}
					className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center shadow-md"
				>
					<FiUserPlus className="mr-2" />
					Yangi Admin
				</motion.button>
			</div>

			{/* Qidiruv va jadval */}
			<div className="bg-white rounded-xl shadow-md overflow-hidden">
				<div className="p-4 border-b">
					<div className="relative max-w-md">
						<FiSearch className="absolute left-3 top-3 text-gray-400" />
						<input
							type="text"
							placeholder="Adminlarni qidirish..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							disabled={admins.length === 0}
						/>
						{searchTerm && (
							<button
								onClick={() => setSearchTerm('')}
								className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
							>
								<FiX />
							</button>
						)}
					</div>
				</div>

				{isFetchingAdmins ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
						<p className="text-gray-600">Adminlar yuklanmoqda...</p>
					</div>
				) : admins.length === 0 ? (
					<div className="text-center py-12">
						<FiUsers className="mx-auto text-4xl mb-4 text-gray-300" />
						<h3 className="text-xl font-medium text-gray-700 mb-2">Adminlar topilmadi</h3>
						<p className="text-gray-500 mb-4">Sizda hali adminlar ro'yxati mavjud emas</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowAddModal(true)}
							className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg inline-flex items-center shadow-md"
						>
							<FiUserPlus className="mr-2" />
							Birinchi Admin Qo'shish
						</motion.button>
					</div>
				) : filteredAdmins.length === 0 ? (
					<div className="text-center py-12">
						<FiSearch className="mx-auto text-4xl mb-4 text-gray-300" />
						<h3 className="text-xl font-medium text-gray-700 mb-2">Natijalar topilmadi</h3>
						<p className="text-gray-500 mb-4">"{searchTerm}" bo'yicha hech narsa topilmadi</p>
						<button
							onClick={() => setSearchTerm('')}
							className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
						>
							<FiX className="mr-1" />
							Qidiruvni tozalash
						</button>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ism</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontakt</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holati</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredAdmins.map((admin) => (
									<motion.tr
										key={admin._id}
										whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
										className="transition-colors"
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
													<FiUser />
												</div>
												<div className="ml-4">
													<div className="font-medium text-gray-900">{admin.fullName}</div>
													<div className="text-gray-500">{admin.username}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-gray-900 flex items-center">
												<FiMail className="mr-2 text-gray-400" />
												{admin.email}
											</div>
											<div className="text-gray-500 flex items-center mt-1">
												<FiPhone className="mr-2 text-gray-400" />
												{admin.phone}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
												{admin.isActive !== false ? 'Faol' : 'Nofaol'}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												onClick={() => handleEdit(admin)}
												className="text-blue-600 hover:text-blue-900 mr-4 flex items-center"
											>
												<FiEdit className="mr-1" /> Tahrirlash
											</button>
											<button
												onClick={() => handleDelete(admin._id)}
												className="text-red-600 hover:text-red-900 flex items-center"
											>
												<FiTrash2 className="mr-1" /> O'chirish
											</button>
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Modal oyna - Admin qo'shish/tahrirlash */}
			<AnimatePresence>
				{showAddModal && (
					<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<motion.div
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={modalVariants}
							className="bg-white rounded-xl shadow-xl w-full max-w-md"
						>
							<div className="p-6">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-semibold flex items-center">
										{editMode ? (
											<>
												<FiEdit className="mr-2" />
												Adminni Tahrirlash
											</>
										) : (
											<>
												<FiUserPlus className="mr-2" />
												Yangi Admin Qo'shish
											</>
										)}
									</h2>
									<button
										onClick={clearForm}
										className="text-gray-400 hover:text-gray-600"
									>
										<FiX size={20} />
									</button>
								</div>

								<form onSubmit={handleSubmit} className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">To'liq Ism</label>
										<input
											type="text"
											name="fullName"
											value={form.fullName}
											onChange={handleChange}
											placeholder="Egamberdiyev Sarvar"
											className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											required
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
											<input
												type="text"
												name="phone"
												value={form.phone}
												onChange={handleChange}
												placeholder="+998901234567"
												className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
											<input
												type="email"
												name="email"
												value={form.email}
												onChange={handleChange}
												placeholder="sarvar@example.com"
												className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												required
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Login</label>
										<input
											type="text"
											name="username"
											value={form.username}
											onChange={handleChange}
											placeholder="Login"
											className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Parol {editMode && <span className="text-gray-500">(O'zgartirmasangiz bo'sh qoldiring)</span>}
										</label>
										<input
											type="password"
											name="password"
											value={form.password}
											onChange={handleChange}
											placeholder={editMode ? "Yangilash uchun kiriting" : "Parol"}
											className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											required={!editMode}
											minLength={editMode ? 0 : 6}
										/>
									</div>

									<div className="pt-2">
										<button
											type="submit"
											disabled={loading}
											className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-md`}
										>
											{loading ? (
												<span>Yuklanmoqda...</span>
											) : editMode ? (
												<>
													<FiEdit className="mr-2" />
													Yangilash
												</>
											) : (
												<>
													<FiUserPlus className="mr-2" />
													Qo'shish
												</>
											)}
										</button>
									</div>
								</form>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AdminManager