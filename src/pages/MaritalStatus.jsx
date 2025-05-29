import React from 'react'

const MaritalStatus = () => {
	const data = {
		fatherName: "Adhamov O'ktam",
		motherName: "Adhamova Dildora",
		maritalStatus: "Uylangan",
		spouseName: "Adhamova Shoxista",
		childrenCount: 2
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl font-bold mb-6 text-sky-500 text-center">Oilaviy Ma'lumotlarim</h2>
			<hr className="border-sky-300 mb-8" />
			<p className="text-center text-base sm:text-lg mb-6 text-gray-700 leading-relaxed max-w-4xl mx-auto">
				Mazkur oilaviy ma'lumotlar oilaviy holatni va oila a'zolarining roli haqida tushuncha beradi.
			</p>

			<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<div className="space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label htmlFor="fatherName" className="text-gray-700 text-base font-semibold">Otangizning F.I.SH</label>
							<span className="text-gray-500 text-base">{data.fatherName}</span>
						</div>
						<div className="flex flex-col">
							<label htmlFor="motherName" className="text-gray-700 text-base font-semibold">Onangizning F.I.SH</label>
							<span className="text-gray-500 text-base">{data.motherName}</span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label htmlFor="maritalStatus" className="text-gray-700 text-base font-semibold">Nikoh holati</label>
							<span className="text-gray-500 text-base">{data.maritalStatus}</span>
						</div>
						<div className="flex flex-col">
							<label htmlFor="spouseName" className="text-gray-700 text-base font-semibold">Turmush o'rtog'ingizning F.I.SH</label>
							<span className="text-gray-500 text-base">{data.spouseName}</span>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="childrenCount" className="text-gray-700 text-base font-semibold">Farzandlar soni</label>
						<span className="text-gray-500 text-base">{data.childrenCount}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MaritalStatus
