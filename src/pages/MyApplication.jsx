import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'

const MyApplication = () => {
	const token = localStorage.getItem('code')
	const { lang } = useLang()
	const [application, setApplication] = useState([])


	const fetchLeader = async () => {
		try {
			const token = localStorage.getItem('code')
			if (!token) {
				console.warn('Token topilmadi!')
				return
			}

			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}api/v1/application/user-applications`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			if (res.data.status === 'success') {
				console.log(res.data)
				setApplication(res.data.data)
			}
		} catch (error) {
			console.error("Xatolik fetchLeader funksiyasida:", error)
		}
	}


	useEffect(() => {
		fetchLeader()
	}, [])

	return (
		<div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-500/80 text-center">Mening Arizalarim</h2>
			<hr className="border-sky-300 mb-8" />
			{application.map((app, index) => {
				<h1 className='bg-black text-white'>{app}</h1>
			})}
			<div className="overflow-x-auto">
				{/* Sarlavha (header) qismi */}
				<ul className="grid grid-cols-8 gap-4 bg-sky-300 text-white font-semibold text-sm sm:text-base p-3 rounded-t-md min-w-[800px]">
					<li>#</li>
					<li>Ariza turi</li>
					<li>Xabar</li>
					<li>Holat</li>
					<li>Yuborilgan sana</li>
					<li>Kimga</li>
					<li>Lavozimi</li>
					<li>Javob</li>
				</ul>

				{/* Ma'lumotlar qismi */}
				{application.length !== 0 ? (
					application.map((item, index) => (
						<ul
							key={index}
							className="grid grid-cols-8 gap-4 bg-white even:bg-gray-50 hover:bg-gray-100 text-sm sm:text-base p-3 border-b min-w-[800px]"
						>
							<li>{index + 1}</li>
							<li>{item.type_uz}</li>

							{/* Xabar matni scroll bilan */}
							<li className="overflow-auto max-h-24 break-words whitespace-pre-wrap-none rounded p-1">
								{item.message}
							</li>

							{/* Holat rangli */}
							<li
								className={`font-semibold ${item.status === "yangi"
										? "text-yellow-600"
										: item.holat === "Ko‘rib chiqildi"
											? "text-green-600"
											: "text-blue-600"
									}`}
							>
								{item.status}
							</li>

							<li>{new Date(item.created_at).toLocaleDateString("uz-UZ")}</li>
							<li>{item.leader_id.fullname_uz}</li>
							<li>{item.leader_id.position_uz}</li>

							{/* Javob matni scroll bilan */}
							<li className="overflow-auto max-h-24 break-words whitespace-pre-wrap-none rounded p-1">
								{item.reply_message !== null ? item.reply_message : "Hali javob berilmagan"}
							</li>
						</ul>
					))
				) : (
					<div className="text-center text-gray-500 py-6">Hozircha ma'lumot yo‘q</div>
				)}
			</div>

		</div>
	)
}

export default MyApplication
