import React from 'react'

const EducationalInformation = () => {
	const data = {
		university: "Toshkent Davlat Texnika Universiteti",
		faculty: "Kompyuter injiniringi",
		degree: "Bakалавr",
		startYear: "2018",
		endYear: "2022",
		gpa: "4.5"
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl font-bold mb-6 text-sky-500 text-center">Ta'lim Ma'lumotlarim</h2>
			<hr className="border-sky-300 mb-8" />
			<p className="text-center text-base sm:text-lg mb-6 text-gray-700 leading-relaxed max-w-4xl mx-auto">
				Mazkur ta'lim ma'lumotlari davlat tizimlaridan olinadi va tasdiqlangan.
			</p>

			<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<div className="space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label htmlFor="university" className="text-gray-700 text-base font-semibold">Universitet</label>
							<span className="text-gray-500 text-base">{data.university}</span>
						</div>
						<div className="flex flex-col">
							<label htmlFor="faculty" className="text-gray-700 text-base font-semibold">Fakultet</label>
							<span className="text-gray-500 text-base">{data.faculty}</span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label htmlFor="degree" className="text-gray-700 text-base font-semibold">Daraja</label>
							<span className="text-gray-500 text-base">{data.degree}</span>
						</div>
						<div className="flex flex-col">
							<label htmlFor="duration" className="text-gray-700 text-base font-semibold">Boshlanish va tugash yillari</label>
							<span className="text-gray-500 text-base">{data.startYear} - {data.endYear}</span>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="gpa" className="text-gray-700 text-base font-semibold">GPA</label>
						<span className="text-gray-500 text-base">{data.gpa}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EducationalInformation
