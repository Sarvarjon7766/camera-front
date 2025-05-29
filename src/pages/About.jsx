import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsChevronRight } from 'react-icons/bs'
import Footer from '../components/Footer'
import { useLang } from '../context/LangContext'
import Navbar from '../components/Navbar'

const About = () => {
	const [title, setTitle] = useState('Biz haqimizda')
		const { lang } = useLang()

	useEffect(() => {

	}, [])

	return (
		<div className="w-full">
			<Navbar />
			<div className="top-0 bg-gradient-to-r from-blue-700 to-teal-400 text-white shadow-md p-4 flex items-center space-x-2">
				
				<a href="/" className="flex items-center gap-2 hover:text-teal-200 transition duration-200">
					<AiFillHome className="text-xl sm:text-lg md:text-xl" />
					<span className="text-lg sm:text-base md:text-lg font-semibold">{lang === 'uz' ? 'Bosh sahifa':lang === 'ru'?"домашня страница":'Home page'}</span>
				</a>
				<BsChevronRight className="text-white sm:text-base md:text-lg" />
				<a href="/" className="hover:text-teal-200 transition duration-200 text-lg sm:text-base md:text-lg">{lang === 'uz' ? 'Biz haqimizda':lang === 'ru'?"о нас":'about Us'}</a>
				<BsChevronRight className="text-white sm:text-base md:text-lg" />
				<span className="text-lg sm:text-base md:text-lg font-medium">{lang === 'uz' ? 'Biz haqimizda':lang === 'ru'?"о нас":'about Us'}</span>
			</div>



			<div className="flex flex-col md:flex-row w-full bg-[#FAFAFA] space-y-6 md:space-x-6 py-6">
				<div className="w-full md:w-1/2 text-center md:text-left flex-col items-center justify-center md:px-8 space-y-6 py-6">
					<h2 className="text-2xl sm:text-xl md:text-3xl font-semibold text-gray-800">{lang === 'uz' ? 'Tizim haqida':lang === 'ru'?"О системе":'About the system'}</h2>
					<p className="text-lg sm:text-base md:text-lg text-gray-600">
						<span className="font-bold text-teal-600">{lang === 'uz' ? 'Interaktive xizmatlari bu -':lang === 'ru'?"Интерактивные услуги - ":'Interactive services are - '}</span>{lang === 'uz' ? "oflayn xizmatlar o‘rniga onlayn xizmatlarning joriy qilinishi.Ya’ni ma’lum bir hujjat uchun yana boshqa o‘nlab idoradan hujjat to‘plashga chek qo‘yilishidir.":lang === 'ru'?"Внедрение онлайн-услуг вместо офлайн-услуг. То есть, прекращение сбора документов из десятков других офисов для получения конкретного документа. ":'The introduction of online services instead of offline services. That is, the end of collecting documents from dozens of other offices for a specific document.'}  
					</p>
				</div>

				<div className="w-full md:w-1/3 flex items-center justify-center bg-white px-4 py-6">
					<div className="space-y-4">
						<a href="" className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
							<BsChevronRight className="text-green-400" />
							<span className="font-semibold">{lang === 'uz' ? 'Rahbarlarga murojaat':lang === 'ru'?"Обращение к лидерам":'Appeal to leaders'}</span>
						</a>
						<a href="" className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
							<BsChevronRight className="text-green-400" />
							<span className="font-semibold">{lang === 'uz' ? 'Talabalar turar joyiga ariza berish':lang === 'ru'?"Подача заявления на студенческое общежитие":'Applying for student accommodation'}</span>
						</a>
						<a href="" className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
							<BsChevronRight className="text-green-400" />
							<span className="font-semibold"> {lang === 'uz' ? 'Klinik ordinaturaga qabul':lang === 'ru'?"Прием в клиническую ординатуру":'Admission to clinical residency'}</span>
						</a>
						<a href="" className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
							<BsChevronRight className="text-green-400" />
							<span className="font-semibold">{lang === 'uz' ? "Qo'shma ta'limga qabul (bakalavriat)":lang === 'ru'?"Совместный прием на обучение (степень бакалавра)":"Joint Education Admission (Bachelor's Degree)"}</span>
						</a>
						<a href="" className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
							<BsChevronRight className="text-green-400" />
							<span className="font-semibold">{lang === 'uz' ? "Qo'shma ta'limga qabul (KO)":lang === 'ru'?"Совместный прием на обучение (JEE)":"Joint Education Admission (JEE)"}</span>
						</a>
					</div>
				</div>
			</div>


			<Footer />
		</div>
	)
}

export default About
