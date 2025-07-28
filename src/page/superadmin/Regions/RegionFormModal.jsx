import { useState } from 'react'

const RegionFormModal = ({ onClose, onSubmit }) => {
	const [form, setForm] = useState({
		regionName: '',
		fullName: '',
		email: '',
		phone: '',
		username: '',
		password: ''
	})

	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const newRegion = {
			id: Date.now(),
			name: form.regionName,
			manager: {
				fullName: form.fullName,
				email: form.email,
				phone: form.phone,
				username: form.username,
				password: form.password
			},
			organizations: 0,
			status: 'active',
			note: ''
		}

		onSubmit(newRegion)
	}

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
			<div
				className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-in my-8"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Modal Header */}
				<div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-semibold text-white">Yangi hudud qo'shish</h2>
						<button
							onClick={onClose}
							className="text-white/80 hover:text-white transition-colors p-1"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				{/* Modal Body */}
				<form onSubmit={handleSubmit} className="p-8 space-y-6">
					{/* Region Name */}
					<div className="space-y-2">
						<label className="block text-base font-medium text-gray-700">Hudud nomi *</label>
						<div className="relative">
							<input
								type="text"
								name="regionName"
								value={form.regionName}
								onChange={handleChange}
								placeholder="Bulung'ur Tumani"
								className="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
								</svg>
							</div>
						</div>
					</div>

					{/* Manager Full Name */}
					<div className="space-y-2">
						<label className="block text-base font-medium text-gray-700">Mas'ul FISH *</label>
						<div className="relative">
							<input
								type="text"
								name="fullName"
								value={form.fullName}
								onChange={handleChange}
								placeholder="Yuldashev Ali Abduvaliyevich"
								className="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
								</svg>
							</div>
						</div>
					</div>

					{/* Contact Information Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Email */}
						<div className="space-y-2">
							<label className="block text-base font-medium text-gray-700">Email *</label>
							<div className="relative">
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									placeholder="sarvar@example.com"
									className="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
									required
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</div>
							</div>
						</div>

						{/* Phone */}
						<div className="space-y-2">
							<label className="block text-base font-medium text-gray-700">Telefon raqam *</label>
							<div className="relative">
								<input
									type="tel"
									name="phone"
									value={form.phone}
									onChange={handleChange}
									placeholder="+998901234567"
									className="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
									required
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
									</svg>
								</div>
							</div>
						</div>
					</div>

					{/* Credentials Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Username */}
						<div className="space-y-2">
							<label className="block text-base font-medium text-gray-700">Login *</label>
							<div className="relative">
								<input
									type="text"
									name="username"
									value={form.username}
									onChange={handleChange}
									placeholder="ali_admin"
									className="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
									required
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
									</svg>
								</div>
							</div>
						</div>

						{/* Password */}
						<div className="space-y-2">
							<label className="block text-base font-medium text-gray-700">Parol *</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={form.password}
									onChange={handleChange}
									placeholder="Kamida 8 ta belgi"
									className="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
									required
									minLength="8"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
										</svg>
									) : (
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
											<path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Form Actions */}
					<div className="flex justify-end space-x-4 pt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-3 text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
						>
							Bekor qilish
						</button>
						<button
							type="submit"
							className="px-6 py-3 text-base bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							Saqlash
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegionFormModal