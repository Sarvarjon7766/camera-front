import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaPhoneAlt, FaUserTie } from 'react-icons/fa'
import { useLang } from '../../context/LangContext'

const Leader = () => {
	const { lang } = useLang()
	const token = localStorage.getItem('code')

	const [leader, setLeader] = useState([])
	const [formData, setFormData] = useState({
		application: '',
		leader: 0,
		subject: '',
		message: ''
	})

	const fetchLeader = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_BASE_URL}api/v1/leader`)
			if (res.data.status === 'success') {
				setLeader(res.data.data)
			}
		} catch (error) {
			console.error("Xatolik fetchLeader funksiyasida:", error)
		}
	}

	useEffect(() => {
		fetchLeader()
	}, [])

	const applications = [
		{ index: 1, name: "Taklif", name_ru: "Предложение", name_en: "Offer" },
		{ index: 2, name: "Shikoyat", name_ru: "Жалоба", name_en: "Complaint" },
		{ index: 3, name: "Appellatsiya", name_ru: "Апелляция", name_en: "Appeal" }
	]

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const { application, leader, subject, message } = formData

		if (!application || !leader || !subject || !message) {
			alert("Iltimos, barcha maydonlarni to‘ldiring.")
			return
		}

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}api/v1/application/create`,
				{
					type_uz: application === '1' ? 'Taklif' : application === '2' ? "Shikoyat" : 'Appellatsiya',
					type_ru: application === '1' ? 'Предложение' : application === '2' ? "Жалоба" : 'Апелляция',
					type_en: application === '1' ? 'Offer' : application === '2' ? "Complaint" : 'Appeal',
					leader_id: leader,
					title: subject,
					message: message,
					file: 'default.jpg'
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data.status === 'success') {
				alert("Murojaatingiz muvaffaqiyatli yuborildi.")
				setFormData({ application: '', leader: '', subject: '', message: '' })
			} else {
				alert("Xatolik yuz berdi. Qaytadan urinib ko‘ring.")
			}
		} catch (error) {
			console.error('Error submitting application:', error.response?.data || error.message)
		}
	}

	return (
		<div className="p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-white min-h-screen">
			<h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12 drop-shadow-md">Rahbarlarga murojaat</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
				{leader.map((item, index) => (
					<div
						key={index}
						className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:border-blue-500"
					>
						<div className="flex flex-col items-center text-center">
							<div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4 shadow-inner">
								<FaUserTie className="text-3xl" />
							</div>
							<h3 className="text-xl font-bold text-gray-800 mb-1">
								{lang === 'uz' ? item.fullname_uz : lang === 'ru' ? item.fullname_ru : item.fullname_en}
							</h3>
							<p className="text-sm text-gray-500 mb-3 italic">
								{lang === 'uz' ? item.position_uz : lang === 'ru' ? item.position_ru : item.position_en}
							</p>
							<div className="flex items-center gap-2 text-blue-600 font-medium mt-2">
								<FaPhoneAlt />
								<span>{item.phone}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<h3 className="text-3xl font-bold text-center text-blue-700 mb-8">Murojaat yuborish</h3>
			<form onSubmit={handleSubmit} className="mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label htmlFor="application" className="block text-lg font-medium text-gray-700 mb-2">Murojaat turi</label>
						<select
							name="application"
							value={formData.application}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Tanlang</option>
							{applications.map(app => (
								<option key={app.index} value={app.index}>{app.name}</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="leader" className="block text-lg font-medium text-gray-700 mb-2">Rahbariyat</label>
						<select
							name="leader"
							value={formData.leader}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Tanlang</option>
							{leader.map((lea, i) => (
								<option key={i} value={lea.id}>{lea.fullname_uz}</option>
							))}
						</select>
					</div>
				</div>

				<div>
					<label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Mavzu</label>
					<input
						type="text"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Murojaat mavzusi"
					/>
				</div>

				<div>
					<label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Xabar matni</label>
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows="5"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
						placeholder="Xabaringizni shu yerga yozing..."
					></textarea>
				</div>

				<div className="text-center">
					<button
						type="submit"
						className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
					>
						Yuborish
					</button>
				</div>
			</form>
		</div>
	)
}

export default Leader
