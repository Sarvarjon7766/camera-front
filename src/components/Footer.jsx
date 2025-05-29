import React from 'react'
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaMapMarkedAlt, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IoShareSocialOutline } from "react-icons/io5";
import { useLang } from '../context/LangContext'

const Footer = () => {
	const { lang } = useLang()
	return (
		<div className="bg-gray-800 text-white py-4">
			<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
						<IoShareSocialOutline className="text-2xl" />
						{lang === 'uz' ? "Ijtimoiy Tarmoqlar" : lang === 'ru' ? 'Социальные сети' : 'Social Networks'}
					</h2>
					<ul className="space-y-2">
						<li>
							<a
								href="https://www.facebook.com/ssuv.media"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
								aria-label="Facebook"
							>
								<FaFacebook className="text-2xl" />{lang === 'uz' ? "Facebook" : lang === 'ru' ? 'Фейсбук' : 'Facebook'}
							</a>
						</li>
						<li>
							<a
								href="https://www.instagram.com/ssuv.education/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-pink-500 hover:text-pink-700"
								aria-label="Instagram"
							>
								<FaInstagram className="text-2xl" />{lang === 'uz' ? "Instagram" : lang === 'ru' ? 'Инстаграм' : 'Instagram'}
							</a>
						</li>
						<li>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-red-500 hover:text-red-600"
								aria-label="Twitter"
							>
								<FaYoutube className="text-2xl" />{lang === 'uz' ? "Twitter" : lang === 'ru' ? 'Твиттер' : 'Twitter'}
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
						<FaMapMarkedAlt className="text-2xl" />{lang === 'uz' ? "Bizning Manzil" : lang === 'ru' ? 'Наш адрес' : 'Our Address'}
					</h2>
					<ul className="space-y-2">
						<li className="flex items-center gap-2">
							<FaMapMarkedAlt className="text-lg" />{lang === 'uz' ? "SDVMCHBU, Samarqand" : lang === 'ru' ? 'СДВМЧБУ, Самарканд' : 'SDVMCHBU, Samarkand'}
						</li>
						<li className="flex items-center gap-2">
							<FaPhone className="text-lg" />{lang === 'uz' ? " Tel: +99855 707-76-86" : lang === 'ru' ? 'Тел: +99855 707-76-86' : 'Tel: +99855 707-76-86'}
						</li>
						<li className="flex items-center gap-2">
							<FaEnvelope className="text-lg" />{lang === 'uz' ? "Email: ssuv@edu.uz" : lang === 'ru' ? 'почта: ssuv@edu.uz' : 'Email: ssuv@edu.uz'}
						</li>
						<li className="flex items-center gap-2">
							<FaGlobe className="text-lg" />{lang === 'uz' ? "Web: www.ssuv.uz" : lang === 'ru' ? 'Сайт: www.ssuv.uz' : 'Web: www.ssuv.uz'}
						</li>
					</ul>
				</div>
				<div className="text-center">
					<div className="w-full max-w-screen-lg mx-auto">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.590857967034!2d66.92985117544409!3d39.65988850135619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d1915ccbdcf4f%3A0x12f6d10af242d504!2sSamarqand%20davlat%20veterinariya%20meditsinasi%2C%20chorvachilik%20va%20biotexnologiyalar%20universiteti!5e1!3m2!1suz!2s!4v1744200575823!5m2!1suz!2s"
							width="80%"
							height="150"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</div>
			<div className="border-t border-gray-600 mt-8 pt-4 text-center">
				<span className="text-sm text-gray-400">{lang === 'uz' ? "SSUV Education 2025" : lang === 'ru' ? 'SSUV Образование 2025' : 'SSUV Education 2025'}  </span>
			</div>
		</div>
	)
}

export default Footer
