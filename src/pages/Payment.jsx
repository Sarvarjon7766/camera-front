import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = () => {
	const [payment,setPayment] = useState([])
	const fetchLeader = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`
			};
	
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}api/v1/application/user-applications`,
				{ headers }
			);
	
			console.log(res.data);
	
			if (res.data.status === 'success') {
				setApplication(res.data.data);
			}
		} catch (error) {
			console.error("Xatolik fetchLeader funksiyasida:", error);
		}
	};
	
	useEffect(() => {
		fetchLeader()
	}, [])

	const data = [
		{
			xizmat_turi: "Yotoqxona to‘lovi",
			tolov_miqdori: 250000,
			xabar: 'To‘lov 10-aprelgacha amalga oshiriladi.',
			holat: "Jarayonda",
			yuborilgan_sana: "09.04.2025",
			kimga: "Prorektor"
		},
		{
			xizmat_turi: "O‘quv to‘lovi",
			tolov_miqdori: 1300000,
			xabar: 'To‘lov amalga oshirildi.',
			holat: "Ko‘rib chiqildi",
			yuborilgan_sana: "05.04.2025",
			kimga: "Buxgalteriya"
		},
		{
			xizmat_turi: "Internet to‘lovi",
			tolov_miqdori: 150000,
			xabar: 'Yangi to‘lov arizasi yuborildi.',
			holat: "Yangi",
			yuborilgan_sana: "10.04.2025",
			kimga: "Axborot bo‘limi"
		},
	];

	return (
		<div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-500/80 text-center">To'lovlar</h2>
			<hr className="border-sky-300 mb-8" />

			<div className="overflow-x-auto">
				<table className="min-w-full text-sm sm:text-base">
					<thead className="bg-sky-300 text-white">
						<tr>
							<th className="px-4 py-3 text-left">#</th>
							<th className="px-4 py-3 text-left">Xizmat turi</th>
							<th className="px-4 py-3 text-left">To'lov miqdori</th>
							<th className="px-4 py-3 text-left">Xabar</th>
							<th className="px-4 py-3 text-left">Holati</th>
							<th className="px-4 py-3 text-left">Sana</th>
							<th className="px-4 py-3 text-left">Kimga</th>
						</tr>
					</thead>
					<tbody>
						{payment.length !== 0 && data.map((item, index) => (
							<tr key={index} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">
								<td className="px-4 py-2">{index + 1}</td>
								<td className="px-4 py-2">{item.xizmat_turi}</td>
								<td className="px-4 py-2">{item.tolov_miqdori.toLocaleString()} so'm</td>
								<td className="px-4 py-2">{item.xabar}</td>
								<td className={`px-4 py-2 font-semibold ${item.holat === "Jarayonda" ? "text-yellow-600" : item.holat === "Ko‘rib chiqildi" ? "text-green-600" : "text-blue-600"}`}>
									{item.holat}
								</td>
								<td className="px-4 py-2">{item.yuborilgan_sana}</td>
								<td className="px-4 py-2">{item.kimga}</td>
							</tr>
						))}
					</tbody>
				</table>
				{
					payment.length === 0 && <h2 className="text-xl sm:text-2xl font-bold py-3 mb-6 text-sky-500/80 text-center">Hali hech qanday to'lov qilinmagan.</h2>
				}
			</div>
		</div>
	);
};

export default Payment;
