import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaUniversity, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const GeneralInformation = () => {
	const token = localStorage.getItem('code')
	const [dataa, setDataa] = useState({})
	const [data, setData] = useState(
		{
			fullName: "Adhamov Jasur",
			date_of_birth: "02.02.2000",
			phone: "+998954566545",
			region: "Toshkent viloyati",
			district: "Chilonzor tumani",
			neighborhood: "Bog‘bon MFY",
			university: "Toshkent Axborot Texnologiyalari Universiteti",
			faculty: "Dasturiy injiniring",
			course: "3-kurs",
			email: "jasur@mail.uz",
			gender: "Erkak"
		}
	)
	const navigate = useNavigate()

	const fetchLeader = async () => {
		try {
			const token = localStorage.getItem('code')
			if (!token) {
				console.warn('Token topilmadi!')
				return
			}

			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}api/v1/users/me`,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)
			console.log(res.data)

			if (res.data.status === 'success') {
				const userData = res.data.data
				setDataa(userData)
			}
		} catch (error) {
			console.error("Xatolik:", error)
		}
	}

	useEffect(() => {
		fetchLeader()
	}, [])




	const Section = ({ icon, title, children }) => (
		<div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
			<div className="flex items-center mb-4">
				<span className="text-sky-500 text-2xl mr-3">{icon}</span>
				<h3 className="text-xl font-semibold text-gray-700">{title}</h3>
			</div>
			<div className="text-gray-600 space-y-2">{children}</div>
		</div>
	)

	const InfoRow = ({ label, value }) => (
		<div>
			<span className="text-sm font-semibold text-gray-500">{label}:</span> {value}
		</div>
	)

	return (
		<div className="min-h-screen bg-gradient-to-tr from-sky-100 to-sky-200 p-6">
			<div className="max-w-5xl mx-auto">
				<h2 className="text-3xl font-bold text-center text-sky-700 mb-10">👤 Shaxsiy Ma'lumotlar</h2>
				{dataa !== null && <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Section icon={<FaUser />} title="Shaxsiy Ma'lumotlar">
						<InfoRow label="F.I.SH" value={dataa.fullname} />
						<InfoRow label="Davlati" value={dataa.country} />
						{/* <InfoRow label="Jins" value={dataa.gender || ''} /> */}
					</Section>

					<Section icon={<FaPhone />} title="Aloqa">
						<InfoRow label="Telefon raqam" value={dataa.phone} />
						<InfoRow label="Email" value={dataa.email} />
					</Section>

					<Section icon={<FaUniversity />} title="Ta'lim">
						<InfoRow label="Mutaxasisligi" value={dataa.mutaxasisligi} />
						<InfoRow label="Lavozimi" value={dataa.position} />
					</Section>
				</div>}
				{dataa === null && <h2 className="text-xl sm:text-2xl font-bold py-3 mb-6 text-sky-500/80 text-center">Shaxsiy ma'lumotlaringiz mavjud emas</h2>}
				<p className="text-sm text-gray-500 text-center mt-12">
					So‘nggi yangilangan: <span className="font-medium">25-aprel, 2025</span>
				</p>
			</div>
		</div>
	)
}

export default GeneralInformation
