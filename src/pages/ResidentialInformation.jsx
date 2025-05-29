import React from 'react'

const ResidentialInformation = () => {
	const data = {
		street: "Mustaqillik ko'chasi, 12-uy",
		city: "Toshkent",
		district: "Yashnabad",
		region: "Toshkent viloyati",
		postcode: "100100"
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl font-bold mb-6 text-sky-500 text-center">Yashash Manzilim</h2>
			<hr className="border-sky-300 mb-8" />
			<p className="text-center text-base sm:text-lg mb-6 text-gray-700 leading-relaxed max-w-4xl mx-auto">
				Mazkur manzil ma'lumotlari davlat tizimlari orqali olinadi.
			</p>

			<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<div className="space-y-6">
					{/* Street and City */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label htmlFor="street" className="text-gray-700 text-base font-semibold">Ko'cha va uy raqami</label>
							<span className="text-gray-500 text-base">{data.street}</span>
						</div>
						<div className="flex flex-col">
							<label htmlFor="city" className="text-gray-700 text-base font-semibold">Shahar</label>
							<span className="text-gray-500 text-base">{data.city}</span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label htmlFor="district" className="text-gray-700 text-base font-semibold">Tuman</label>
							<span className="text-gray-500 text-base">{data.district}</span>
						</div>
						<div className="flex flex-col">
							<label htmlFor="region" className="text-gray-700 text-base font-semibold">Viloyat</label>
							<span className="text-gray-500 text-base">{data.region}</span>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="postcode" className="text-gray-700 text-base font-semibold">Pochta indeksi</label>
						<span className="text-gray-500 text-base">{data.postcode}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResidentialInformation
