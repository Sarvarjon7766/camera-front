import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaHotel, FaUserGraduate } from "react-icons/fa6"
import { FcBusinessman } from "react-icons/fc"
import { MdCancel } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const DashboardHome = () => {
	const navigate = useNavigate()
	const [datas, setDataa] = useState([])
	const { lang } = useLang()

	// Til bo‘yicha tarjimalar
	const translations = {
		title: {
			uz: "Barcha Xizmatlar",
			ru: "Все услуги",
			en: "All Services"
		},
		useService: {
			uz: "Xizmatdan foydalanish",
			ru: "Использовать услугу",
			en: "Use Service"
		},
		notActive: {
			uz: "Xizmat hozirda faol emas",
			ru: "Услуга временно недоступна",
			en: "Service is currently inactive"
		}
	}

	const fetchLeader = async () => {
		try {
			const token = localStorage.getItem('code')
			if (!token) {
				console.warn('Token topilmadi!')
				return
			}

			const res = await axios.get(`https://admininteractive.ssuv.uz/api/v1/service`)
			if (res.data.status === 'success') {
				setDataa(res.data.data)
			}
		} catch (error) {
			console.error("Xatolik:", error)
		}
	}

	useEffect(() => {
		fetchLeader()
	}, [])

	return (
		<div className="p-6 bg-gray-50">
			<h2 className="text-3xl font-bold mb-6 text-sky-500/80 text-center">
				{translations.title[lang]}
			</h2>
			<hr className='text-blue-400 py-4' />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{datas.map((item, index) => {
					const isAllowed = item.status === "active"

					// Xizmat nomini til bo‘yicha olish
					const serviceName =
						lang === 'ru' ? item.name_ru :
							lang === 'en' ? item.name_en : item.name_uz

					// Har bir xizmat uchun default icon (ixtiyoriy: backenddan icon nomi kelsa o‘zgartirish mumkin)
					const icons = [FcBusinessman, FaHotel, FaUserGraduate, MdCancel, MdCancel, MdCancel]
					const IconComponent = icons[index] || MdCancel

					return (
						<div
							key={index}
							className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
						>
							<div className={`p-6 flex flex-col items-center ${!isAllowed ? 'blur-[1px]' : ''}`}>
								<div className="text-4xl text-blue-600 mb-4">
									<IconComponent />
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">{serviceName}</h3>
								<button
									onClick={() => isAllowed && navigate(`/${item.link}`)}
									className={`text-blue-500 hover:text-blue-800 ${!isAllowed ? 'cursor-not-allowed text-gray-400' : ''}`}
									disabled={!isAllowed}
								>
									{translations.useService[lang]}
								</button>
							</div>

							{/* Faol bo'lmagan xizmatlar uchun xabar */}
							{!isAllowed && (
								<div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center text-center px-4">
									<p className="text-red-600 font-semibold text-sm">
										{translations.notActive[lang]}
									</p>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default DashboardHome
