import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdDensityMedium } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import en from '../assets/en.png'
import logo from '../assets/logo.jpg'
import ru from '../assets/ru.png'
import uz from '../assets/uz.png'
import { useLang } from '../context/LangContext'

const langOptions = [
	{ title: 'English', img: en, descript: 'en' },
	{ title: "O'zbekcha", img: uz, descript: 'uz' },
	{ title: 'Русский', img: ru, descript: 'ru' },
]

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const navigate = useNavigate()
	const token = localStorage.getItem('code')
	const { lang, setLang } = useLang()

	const handleLangChange = (langObj) => {
		setLang(langObj.descript)
	}

	const logout = () => {
		localStorage.removeItem('code')
		navigate('/')
	}

	const title = {
		uz: "Samarqand davlat veterinariya meditsinasi, chorvachilik va biotexnologiyalari universiteti",
		ru: "Самаркандский государственный университет ветеринарной медицины, животноводства и биотехнологии",
		en: "Samarkand State University of Veterinary Medicine, Animal Husbandry and Biotechnology"
	}

	const menuItems = {
		home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
		aboutUs: { uz: "Biz haqimizda", ru: "О нас", en: "About Us" },
		contact: { uz: "Bog'lanish", ru: "Контакты", en: "Contact" },
		dashboard: { uz: "Dashboard", ru: "Панель", en: "Dashboard" },
		profile: { uz: "Profil", ru: "Профиль", en: "Profile" },
		login: { uz: "Tizimga kirish", ru: "Авторизоваться", en: "Login" },
		logout: { uz: "Chiqish", ru: "Выйти", en: "Logout" },
	}

	return (
		<nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-teal-500 text-white shadow-md">
			<div className="mx-auto px-4 py-3 flex justify-between items-center">
				{/* Logo and Title */}
				<Link to="/" className="flex items-center gap-3 max-w-[60%]">
					<img src={logo} alt="Logo" className="w-10 h-10 rounded-full border-2 border-white" />
					<span className="text-base sm:text-lg md:text-xl font-semibold leading-tight tracking-wide">
						{title[lang]}
					</span>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-6 text-sm font-medium">
					<Link to="/about" className="hover:text-teal-200">{menuItems.aboutUs[lang]}</Link>
					<Link to="/login" className="hover:text-teal-200">{menuItems.contact[lang]}</Link>
					<Link
						to="/login"
						className="bg-blue-800 text-white px-4 py-2 rounded hover:text-green-200"
					>
						{menuItems.login[lang]}
					</Link>



					{/* Language Select */}
					<select
						value={lang}
						onChange={(e) => {
							const selectedLang = langOptions.find(l => l.descript === e.target.value)
							handleLangChange(selectedLang)
						}}
						className="p-2 pl-3 pr-8 rounded-lg bg-[#00B1B0] text-white border-none  text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
					>
						{langOptions.map((l) => (
							<option key={l.descript} value={l.descript} className="text-gray-900">
								{l.title}
							</option>
						))}
					</select>
				</div>

				{/* Mobile Menu Button */}
				<button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
					{isSidebarOpen ? <IoMdClose size={26} /> : <MdDensityMedium size={26} />}
				</button>
			</div>

			{/* Mobile Sidebar */}
			{isSidebarOpen && (
				<div className="fixed inset-0 z-50  bg-opacity-40 backdrop-blur-sm flex justify-end items-start p-4">
					<div className="w-80 max-w-full bg-white/70 backdrop-blur-md text-black shadow-2xl p-6 space-y-5 rounded-l-2xl transition-transform transform translate-x-0 border border-gray-200">

						{/* Close Button */}
						<div className="flex justify-between items-center mb-4">
							<span className="text-lg font-semibold text-gray-700">Menu</span>
							<button onClick={() => setIsSidebarOpen(false)}>
								<IoMdClose size={24} className="text-red-500 hover:text-red-700 transition duration-200" />
							</button>
						</div>

						{/* Links */}
						<Link to="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-800 hover:text-blue-600 transition duration-200">
							{menuItems.aboutUs[lang]}
						</Link>
						<Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block text-gray-800 hover:text-blue-600 transition duration-200">
							{menuItems.contact[lang]}
						</Link>

						{!token && (
							<Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block text-gray-800 hover:text-blue-600 transition duration-200">
								{menuItems.login[lang]}
							</Link>
						)}

						{token && (
							<>
								<Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="block text-gray-800 hover:text-blue-600 transition duration-200">
									{menuItems.dashboard[lang]}
								</Link>
								<Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="block text-gray-800 hover:text-blue-600 transition duration-200">
									{menuItems.profile[lang]}
								</Link>
							</>
						)}

						{/* Language Selector */}
						<div className="pt-4 border-t border-gray-300">
							<label htmlFor="langSelect" className="block text-sm mb-2 text-gray-700 font-medium">Tilni tanlang:</label>
							<select
								id="langSelect"
								value={lang}
								onChange={(e) => {
									const selectedLang = langOptions.find(l => l.descript === e.target.value)
									handleLangChange(selectedLang)
									setIsSidebarOpen(false)
								}}
								className="w-full p-2 px-3 rounded-lg bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-800 border border-gray-300 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
							>
								{langOptions.map((l) => (
									<option key={l.descript} value={l.descript}>
										{l.title}
									</option>
								))}
							</select>
						</div>

					</div>

				</div>
			)}

		</nav>
	)
}

export default Navbar
