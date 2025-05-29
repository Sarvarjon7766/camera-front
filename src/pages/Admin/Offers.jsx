import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaRegClock } from 'react-icons/fa'

const Offers = () => {
	const [datas, setDataa] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedOffer, setSelectedOffer] = useState(null)
	const [response, setResponse] = useState('') // Javob uchun state

	const fetchLeader = async () => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				console.warn('Token topilmadi!')
				return
			}

			const res = await axios.post(
				`https://admininteractive.ssuv.uz/api/v1/leader-application/leader-taklif`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)

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

	const handleOpenModal = (offer) => {
		setSelectedOffer(offer)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setResponse('')
	}

	const handleResponseChange = (e) => {
		setResponse(e.target.value)
	}

	const handleDeactivate = async (id) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				console.warn('Token topilmadi!')
				return
			}
			console.log(id)
			console.log(response)

			// Backendga tasdiqlash yuborilsa:
			await axios.post(
				`https://admininteractive.ssuv.uz/api/v1/leader-application/reply`,
				{
					application_id: id,
					reply_message: response
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			// Mahalliy state yangilash
			setDataa(prev =>
				prev.map(offer =>
					offer._id === id ? { ...offer, status: "tasdiqlangan", javob: response } : offer
				)
			)

			handleCloseModal()
			fetchLeader()
		} catch (error) {
			console.error("Tasdiqlashda xatolik:", error)
		}
	}


	return (
		<div className="min-h-screen p-8">
			<h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Takliflar Jadvali</h1>

			<div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
				{/* Jadval sarlavhasi */}
				<ul className="grid grid-cols-6 gap-4 bg-sky-300 text-white uppercase text-sm font-semibold p-3 rounded-t-md min-w-[900px]">
					<li>#</li>
					<li>Nomi</li>
					<li>Tavsif</li>
					<li>Sana</li>
					<li>Holat</li>
					<li className="text-center">Amal</li>
				</ul>

				{/* Ma'lumotlar */}
				{datas.map((offer, index) => (
					<ul
						key={offer._id}
						className="grid grid-cols-6 gap-4 text-gray-700 text-sm items-center border-b hover:bg-gray-100 p-3 min-w-[900px]"
					>
						<li>{index + 1}</li>
						<li className="font-semibold">{offer.title}</li>

						{/* Uzun matnlar uchun scroll */}
						<li className="overflow-auto max-h-24 whitespace-pre-wrap break-words border-none p-2 rounded">
							{offer.message}
						</li>

						<li>{new Date(offer.created_at).toLocaleString()}</li>

						<li>
							{offer.status === "yangi" ? (
								<span className="flex items-center gap-2 bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs w-fit">
									<FaRegClock /> Ko'rib chiqish kerak
								</span>
							) : (
								<span className="flex items-center gap-2 bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs w-fit">
									<FaCheckCircle /> Ko'rib chiqildi
								</span>
							)}
						</li>

						<li className="text-center">
							{offer.status === "yangi" ? (
								<button
									onClick={() => handleOpenModal(offer)}
									className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center transition"
								>
									<FaCheckCircle /> Tasdiqlash
								</button>
							) : (
								<button
									disabled
									className="bg-gray-400 text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center cursor-not-allowed"
								>
									<FaCheckCircle /> Tasdiqlangan
								</button>
							)}
						</li>
					</ul>
				))}
			</div>


			{/* Modal */}
			{isModalOpen && selectedOffer && (
				<div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 transition-all duration-300">
					<div className="bg-white rounded-lg shadow-2xl p-8 w-[700px]">
						<h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Tasdiqlash</h2>
						<p className="text-blue-500 mb-6 text-center">
							Siz <strong>{selectedOffer.title}</strong> arizasini tasdiqlaysizmi?
						</p>

						<div className="flex flex-col items-center space-y-4">
							<textarea
								value={response}
								onChange={handleResponseChange}
								className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none"
								placeholder="Javobni kiriting..."
							/>

							<div className="flex justify-between w-full">
								<button
									onClick={() => handleDeactivate(selectedOffer.id)}
									className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full transform transition-all hover:scale-105"
								>
									Tasdiqlash
								</button>
								<button
									onClick={handleCloseModal}
									className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transform transition-all hover:scale-105"
								>
									Bekor qilish
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Offers
