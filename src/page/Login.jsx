import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	// State lar
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	// Parolni ko'rsatish/yashirish
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// Formani yuborish
	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		setIsLoading(true)

		try {
			// API ga so'rov yuborish
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/auth`, {
				username,
				password
			})
			if (response.data.success) {
				localStorage.setItem('user', JSON.stringify({
					token: response.data.token,
					role: response.data.role,
				}))

				// Rolga qarab yo'naltirish
				switch (response.data.role) {
					case 'superadmin':
						navigate('/superadmin')
						break
					case 'admin':
						navigate('/admin')
						break
					case 'region_head':
						navigate('/region-manager')
						break
					case 'organization_head':
						navigate('/organization')
						break
					default:
						navigate('/')
				}
			} else {
				throw new Error(response.data.message || 'Kirish muvaffaqiyatsiz tugadi')
			}
		} catch (err) {
			console.error('Kirish xatosi:', err)
			setError(err.response?.data?.message || err.message || 'Tizimda xatolik yuz berdi')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
			{/* Chap qism - Tasvir va tizim haqida */}
			<div className="hidden md:flex flex-col justify-center w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-blue-900 p-8 lg:p-12 text-white relative overflow-hidden">
				{/* Orqa fon elementlari */}
				<div className="absolute inset-0 opacity-10" style={{
					backgroundImage: `
                        radial-gradient(circle at 70% 30%, #3b82f6, transparent 70%),
                        radial-gradient(circle at 30% 70%, #6366f1, transparent 70%)
                    `
				}}></div>

				{/* Asosiy kontent */}
				<div className="relative z-10 space-y-8">
					<h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
						Nazorat Markazi
					</h2>

					<div className="max-w-md p-6 backdrop-blur-sm bg-white/10 rounded-lg">
						<p className="text-lg text-blue-100 leading-relaxed">
							Tizim orqali barcha kameralarni real vaqt rejimida kuzatish,
							yozuvlarni ko'rish va xavfsizlik sozlamalarini boshqarish mumkin.
						</p>
					</div>

					<div className="flex items-center space-x-2 text-blue-200">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
						</svg>
						<span>Real vaqt rejimida monitoring</span>
					</div>

					<div className="flex items-center space-x-2 text-blue-200">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
						</svg>
						<span>Xavfsizlikni ta'minlash</span>
					</div>
				</div>
			</div>

			{/* O'ng qism - Kirish formasi */}
			<div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
				<div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
					{/* Forma headeri */}
					<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
						<div className="flex justify-center mb-4">
							<div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
						</div>
						<h1 className="text-2xl font-bold">Tizimga Kirish</h1>
						<p className="mt-2 opacity-90">Hisobingizga kirish uchun ma'lumotlaringizni kiriting</p>
					</div>

					{/* Xato xabari */}
					{error && (
						<div className="px-6 pt-4">
							<div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
								{error}
							</div>
						</div>
					)}

					{/* Kirish formasi */}
					<form onSubmit={handleSubmit} className="p-6 space-y-6">
						<div className="space-y-4">
							{/* Foydalanuvchi nomi */}
							<div>
								<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
									Foydalanuvchi nomi
								</label>
								<div className="relative">
									<input
										id="username"
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
										placeholder="Foydalanuvchi nomingiz"
										required
										disabled={isLoading}
									/>
									<span className="absolute left-4 top-3.5 text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
									</span>
								</div>
							</div>

							{/* Parol */}
							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
									Parol
								</label>
								<div className="relative">
									<input
										id="password"
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-3 pl-11 pr-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
										placeholder="Parolingiz"
										required
										disabled={isLoading}
									/>
									<span className="absolute left-4 top-3.5 text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
									</span>
									<button
										type="button"
										onClick={togglePasswordVisibility}
										className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
										disabled={isLoading}
									>
										{showPassword ? (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										) : (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
											</svg>
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Yuborish tugmasi */}
						<button
							type="submit"
							disabled={isLoading}
							className={`w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
						>
							{isLoading ? (
								<>
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Kirish...
								</>
							) : 'Kirish'}
						</button>
					</form>


				</div>
			</div>
		</div>
	)
}

export default Login