import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaHotel, FaUserGraduate } from "react-icons/fa6"
import { FcBusinessman } from "react-icons/fc"
import { MdCancel } from "react-icons/md"
import { useLang } from '../context/LangContext'
import { Link } from 'react-router-dom'

// Iconlar ro'yxati (id asosida)
const icons = [
	FcBusinessman,
	FaHotel,
	FaUserGraduate,
	FaUserGraduate,
	FaUserGraduate,
	BsFillJournalBookmarkFill,
	MdCancel
];

// Har bir xizmat uchun link
const links = [
	'/login',
	'/dashboard',
	'/login',
	'/login',
	'/dashboard',
	'/login',
	'/dashboard'
];

// Tarjimani boshqarish
const translations = {
	title: {
		uz: 'Interaktiv xizmatlar',
		ru: 'Интерактивные услуги',
		en: 'Interactive Services'
	},
	use: {
		uz: 'Xizmatdan foydalanish',
		ru: 'Использовать сервис',
		en: 'Use the service'
	},
	inactive: {
		uz: 'Xizmat vaqtincha ishlamayapti',
		ru: 'Сервис временно недоступен',
		en: 'Service temporarily unavailable'
	}
}

const InteractiveServices = () => {
	const { lang } = useLang()
	const [services, setServices] = useState([])

	const fetchServices = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_BASE_URL}api/v1/service`);
			if (res.data.status === 'success') {
				setServices(res.data.data)
			}
		} catch (error) {
			console.error("Xatolik fetchServices funksiyasida:", error);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	const getIconById = (id) => {
		const Icon = icons[id - 1] || BsFillJournalBookmarkFill;
		return <Icon size={30} className="text-blue-600" />;
	};

	const getLinkById = (id) => {
		return links[id - 1] || '/login';
	};

	return (
		<div className='bg-[#EAF0FF] px-6 py-10 min-h-screen'>
			<h2 className='text-blue-600 text-3xl font-bold text-center mb-10'>
				{translations.title[lang]}
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{services.map((item) => {
					const isActive = item.status === 'active';
					const serviceName = lang === 'ru' ? item.name_ru : lang === 'en' ? item.name_en : item.name_uz;
					const Icon = getIconById(item.id);
					const link = getLinkById(item.id);

					return (
						<div
							key={item.id}
							className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center 
								hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative`}
						>
							<div className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4">
								{Icon}
							</div>
							<h3 className="text-lg font-semibold text-center mb-2">
								{serviceName}
							</h3>

							{isActive ? (
								<Link
									to={link}
									className="mt-2 text-blue-600 text-sm font-medium hover:underline"
								>
									{translations.use[lang]}
								</Link>
							) : (
								<p className="mt-2 text-red-500 text-sm font-medium text-center">
									{translations.inactive[lang]}
								</p>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default InteractiveServices;
