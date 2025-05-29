import React from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import accomodate from '../assets/accomodate.png'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const AccommodationStudent = () => {
	const { lang } = useLang()
	const navigate = useNavigate()
	const AccomodateHandler = () =>{
		navigate('/accomodate')
	}
	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
			<div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-10 p-6">
				
				<div className="w-full md:w-1/2 flex items-center justify-center">
					<img
						src={accomodate}
						alt="Ijara uylari rasmi"
						className="w-[90%] h-auto md:w-[600px] rounded-lg object-cover"
					/>
				</div>

				{/* Matn qismi */}
				<div className="flex w-full md:w-1/2 text-center md:text-left flex-col items-center justify-center md:px-8 space-y-6">
					<div>
						<h2 className="text-2xl md:text-4xl font-bold text-blue-800">{lang === 'uz'?"Ijara uylari":lang === 'ru'?'Аренда домов':'Rental houses'}</h2>
						<p className="text-sky-400 font-semibold text-base md:text-lg">
						{lang === 'uz'?"SDVMCHBU talabalari uchun ijara uylari":lang === 'ru'?'Аренда домов для студентов СДВМЧБУ':'Rental houses for SDVMCHBU students'}
							
						</p>
						<ul className="mt-4 space-y-3">
							<li className="flex items-center gap-2 text-gray-700">
								<IoCheckmarkCircleOutline className="text-blue-500 text-xl" />
								<span className='font-semibold'>
								{lang === 'uz'?"F.I.SH":lang === 'ru'?'ФИО':'FullName'}
									</span>
							</li>
							<li className="flex items-center gap-2 text-gray-700">
								<IoCheckmarkCircleOutline className="text-blue-500 text-xl" />
								<span className='font-semibold'>{lang === 'uz'?"Telefon raqami":lang === 'ru'?'Номер телефона':'Phone'}</span>
							</li>
							<li className="flex items-center gap-2 text-gray-700">
								<IoCheckmarkCircleOutline className="text-blue-500 text-xl" />
								<span className='font-semibold'>{lang === 'uz'?"Narxi":lang === 'ru'?'Цена':'Price'}</span>
							</li>
						</ul>
					</div>

					<button onClick={AccomodateHandler} className="bg-blue-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition">
					{lang === 'uz'?"Ko'rish":lang === 'ru'?'Вид':'View'}
						
					</button>
				</div>
			</div>
		</div>
	)
}

export default AccommodationStudent
