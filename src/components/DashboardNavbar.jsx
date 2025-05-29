import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdDensityMedium } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import en from '../assets/en.png'
import logo from '../assets/logo.jpg'
import ru from '../assets/ru.png'
import uz from '../assets/uz.png'
import { useLang } from '../context/LangContext'
import MobileSidebar from './MobileSidebar '

const langOptions = [
	{ title: 'English', img: en, descript: 'en' },
	{ title: "O'zbekcha", img: uz, descript: 'uz' },
	{ title: 'Русский', img: ru, descript: 'ru' },
]

const DashboardNavbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [img, setImg] = useState({})
	const navigate = useNavigate()
	const token = localStorage.getItem('code')
	const { lang, setLang } = useLang()

	const handleLangChange = (langObj) => {
		setLang(langObj.descript)
	}

	const fetchLeader = async () => {
		try {
			if (!token) return
			const res = await axios.get(`https://admininteractive.ssuv.uz/api/v1/users/me`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			if (res.data.status === 'success') {
				setImg(res.data.data)
			}
		} catch (error) {
			console.error("Xatolik:", error)
		}
	}

	useEffect(() => {
		fetchLeader()
	}, [])

	const logout = () => {
		localStorage.removeItem('code')
		navigate('/')
	}

	const title = {
		uz: "Samarqand davlat veterinariya meditsinasi, chorvachilik va biotexnologiyalari universiteti",
		ru: "Самаркандский государственный университет ветеринарной медицины, животноводства и биотехнологии",
		en: "Samarkand State University of Veterinary Medicine, Animal Husbandry and Biotechnology"
	}

	return (
		<nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-teal-500 text-white shadow-md">
			<div className="mx-auto px-4 py-3 flex justify-between items-center">

				<Link to="/" className="flex items-center gap-3 max-w-[60%]">
					<img src={logo} alt="Logo" className="w-10 h-10 rounded-full border-2 border-white" />
					<span className="text-base sm:text-lg md:text-xl font-semibold leading-tight tracking-wide">
						{title[lang]}
					</span>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-6 text-sm font-medium">
					{/* Language Select */}
					<div className="flex items-center gap-2">
						<select
							value={lang}
							onChange={(e) => {
								const selectedLang = langOptions.find(l => l.descript === e.target.value)
								handleLangChange(selectedLang)
							}}
							className="p-2 pl-3 pr-8 rounded-lg bg-[#00B1B0] text-white border-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
						>
							{langOptions.map((l) => (
								<option key={l.descript} value={l.descript} className="text-gray-900">
									{l.title}
								</option>
							))}
						</select>
					</div>

					{/* Profile Link with Avatar */}
					<Link to="/dashboard/profile" className="flex items-center gap-2 hover:text-teal-200">
						<img src={img.profile_picture} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
						{img.fullname}
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
					{isSidebarOpen ? <IoMdClose size={26} /> : <MdDensityMedium size={26} />}
				</button>
			</div>

			{/* Mobile Sidebar */}
			<MobileSidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				handleLangChange={handleLangChange}
				langOptions={langOptions}
			/>
		</nav>
	)
}

export default DashboardNavbar
