import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useLang } from '../context/LangContext'

const Accomodate = () => {
	const navigate = useNavigate()
	const { lang } = useLang()
	const data = [
		{ FISH: "Karimov Abdurahim", location: "Andijon viloyati Shahrixon", phone: 976584844, kishi_soni: 5, uy_egasi_bilan: "Yo'q", narx: 250000 },
		{ FISH: "Karimov Shoxrux", location: "Samarqand viloyati Selxoz", phone: 972578216, kishi_soni: 3, uy_egasi_bilan: "Ha", narx: 180000 },
		{ FISH: "Asadov Ulug'bek", location: "Samarqand viloyati Selxoz", phone: 971906622, kishi_soni: 1, uy_egasi_bilan: "Ha", narx: 100000 },
		{ FISH: "Asadov Abdurahim", location: "Farg'ona viloyati Qo'qon", phone: 976274741, kishi_soni: 4, uy_egasi_bilan: "Ha", narx: 200000 },
		{ FISH: "Karimov Abdurahim", location: "Buxoro viloyati Kogon", phone: 978008034, kishi_soni: 1, uy_egasi_bilan: "Yo'q", narx: 120000 },
	];

	const CloseHandler = () => {
		navigate('/')
	};

	return (
		<div className="p-4 sm:p-6 max-w-7xl mx-auto">
			<h2 className="text-xl sm:text-2xl font-bold mb-4 text-sky-500 text-center">
			{lang === 'uz' ? 'Kvartiralar Jadvali':lang === 'ru'?"Расписание квартир":'Apartment Schedule'}
				
			</h2>

			<div className="overflow-x-auto rounded-lg shadow">
				<table className="min-w-full text-sm sm:text-base">
					<thead className="bg-sky-500 text-white">
						<tr>
							<th className="px-3 sm:px-4 py-2 text-left">#</th>
							<th className="px-3 sm:px-4 py-2 text-left">{lang === 'uz' ? 'F.I.SH':lang === 'ru'?"ФИО":'FullName'}</th>
							<th className="px-3 sm:px-4 py-2 text-left">{lang === 'uz' ? 'Manzil':lang === 'ru'?"Адрес":'Address'}</th>
							<th className="px-3 sm:px-4 py-2 text-left">{lang === 'uz' ? 'Telefon':lang === 'ru'?"Телефон":'Phone'}</th>
							<th className="px-3 sm:px-4 py-2 text-left">{lang === 'uz' ? 'Kishi soni':lang === 'ru'?"Количество человек":'Number of people'}</th>
							<th className="px-3 sm:px-4 py-2 text-left">{lang === 'uz' ? 'Uy egasi bilan':lang === 'ru'?"С хозяином":'With the host'}</th>
							<th className="px-3 sm:px-4 py-2 text-left">{lang === 'uz' ? "Narxi (so'm)":lang === 'ru'?"Цена (сумма)":'Price (sum)'}</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<tr key={index} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">
								<td className="px-3 sm:px-4 py-2">{index + 1}</td>
								<td className="px-3 sm:px-4 py-2">{item.FISH}</td>
								<td className="px-3 sm:px-4 py-2">{item.location}</td>
								<td className="px-3 sm:px-4 py-2">+998 {item.phone}</td>
								<td className="px-3 sm:px-4 py-2">{item.kishi_soni}</td>
								<td
									className={`px-3 sm:px-4 py-2 font-semibold ${
										item.uy_egasi_bilan === "Ha" ? "text-green-600" : "text-red-600"
									}`}
								>
									{item.uy_egasi_bilan}
								</td>
								<td className="px-3 sm:px-4 py-2">{item.narx.toLocaleString()} so'm</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="sticky bottom-4 z-10 w-full flex justify-center mt-6">
				<button
					onClick={CloseHandler}
					className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200"
				>
					Yopish
				</button>
			</div>
		</div>
	);
};

export default Accomodate;
