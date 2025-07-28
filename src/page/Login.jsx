import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Simulate API call
			const response = await new Promise(resolve => setTimeout(() => {
				resolve({
					token: 'fake-jwt-token',
					role: 'superadmin', // This would come from your API
					name: username
				})
			}, 1500))

			// Save user data to localStorage
			localStorage.setItem('user', JSON.stringify(response))

			// Redirect based on role
			if (response.role === 'superadmin') navigate('/superadmin')
			else if (response.role === 'admin') navigate('/admin')
			else if (response.role === 'region-manager') navigate('/region-manager')
			else if (response.role === 'organization_head') navigate('/organization')
			else navigate('/')

		} catch (error) {
			console.error('Login error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex">
			{/* Control Center Visualization (Left Side) */}
			<div className="hidden md:flex flex-col justify-center w-1/2 bg-gradient-to-br from-gray-900 to-blue-900 p-12 text-white relative overflow-hidden">
				{/* Subtle background elements */}
				<div className="absolute inset-0 opacity-10" style={{
					backgroundImage: `
      radial-gradient(circle at 70% 30%, #3b82f6, transparent 70%),
      radial-gradient(circle at 30% 70%, #6366f1, transparent 70%)
    `
				}}></div>

				{/* Main content */}
				<div className="relative z-10 space-y-8">
					{/* Title with subtle gradient */}
					<h2 className="text-6xl p-6 pb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
						Nazorat Markazi
					</h2>

					{/* Description in clean card */}
					<div className="max-w-md p-6 pt-2  backdrop-blur-sm">
						<p className="text-lg text-blue-100 leading-relaxed">
							Tizim orqali barcha kameralarni real vaqt rejimida kuzatish,
							yozuvlarni ko'rish va xavfsizlik sozlamalarini boshqarish mumkin.
						</p>
					</div>
				</div>
			</div>
			{/* Login Form (Right Side) */}
			<div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-10">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
						</div>
						<h1 className="text-3xl font-bold text-gray-800">Tizimga Kirish</h1>
						<p className="text-gray-500 mt-2">Hisobingizga kirish uchun ma'lumotlaringizni kiriting</p>
					</div>

					{/* Form */}
					<form onSubmit={handleLogin} className="space-y-6">
						<div className="space-y-4">
							{/* Username Field */}
							<div className="relative">
								<input
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full px-4 py-3 pl-12 pr-4 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
									placeholder="Foydalanuvchi nomi"
									required
								/>
								<span className="absolute left-4 top-3 text-gray-400">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</span>
							</div>

							{/* Password Field with Toggle */}
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-4 py-3 pl-12 pr-10 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
									placeholder="Parol"
									required
								/>
								<span className="absolute left-4 top-3 text-gray-400">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</span>
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
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

						{/* Submit Button */}
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