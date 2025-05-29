import React from 'react'
import Slider from 'react-slick'

import ssuv from '../assets/logo.jpg'
import arm from '../assets/arm.jpg'
import hemis from '../assets/hemis.jpg'
import kpi from '../assets/kpii.jpg'
import { useLang } from '../context/LangContext'


const QuickLinks = () => {
	const { lang } = useLang()

	const data = [
		{ icons: ssuv, link: "https://ssuv.uz/uz" },
		{ icons: arm, link: "https://arm.ssuv.uz/"},
		{ icons: hemis, link: "https://student.otmsamvmi.uz/dashboard/login"},
		{ icons: kpi, link: "https://kpi.ssuv.uz/"},
	]


	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	}

	return (
		<div className='px-6 py-10'>
			<h2 className='text-blue-600 text-3xl font-semibold mb-6 text-center'>{lang === 'uz' ? 'Tezkor havolalar':lang === 'ru'?"Быстрые ссылки":'Quick links'}</h2>
			<Slider {...settings}>
				{data.map((item, index) => (
					<div key={index} className="flex justify-center">
						<a
							href={item.link}
							className={`rounded-2xl p-6 hover:scale-105 transition-transform duration-300 w-[120px] h-[120px] flex items-center justify-center`}
						>
							<img
								src={item.icons}
								alt={`icon-${index}`}
								className="w-16 h-16 object-contain"
							/>
						</a>
					</div>
				))}
			</Slider>


		</div>
	)
}

export default QuickLinks
