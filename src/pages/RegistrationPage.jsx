import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const RegistrationPage = () => {
	const { lang } = useLang()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({ email: '', password: '' })
	const [showForm, setShowForm] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({ ...prevData, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("Formdan kiritilgan ma'lumot:", formData)
	}

	const handleGoogleSuccess = (credentialResponse) => {
		const token = credentialResponse.credential
		console.log("Google JWT token:", token)
	}

	const handleFacebookResponse = (response) => {
		console.log("Facebook user data:", response)
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-sky-200 px-4">
			<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
				<h2 className="text-4xl font-bold text-center text-sky-600 mb-8">{lang === 'uz' ? "Ro'yxatdan o'tish":lang === 'ru'?"Зарегистрироваться":'Sign up'}</h2>

				{showForm === false && (
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={() => console.log("Google orqali ro'yxatdan o'tishda xatolik")}
						/>
						<FacebookLogin
							appId="YOUR_FACEBOOK_APP_ID"
							autoLoad={false}
							fields="name,email,picture"
							callback={handleFacebookResponse}
							textButton=""
							cssClass="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-sm"
							icon="fa-facebook"
						/>
					</div>
				)}
				{/* Email form */}
				{showForm && (
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className="block text-sm font-medium text-gray-700">{lang === 'uz' ? "Email":lang === 'ru'?"Электронная почта":'Email'}</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">{lang === 'uz' ? "Parol":lang === 'ru'?"Пароль":'Password'}</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition"
						>
							{lang === 'uz' ? "Ro'yxatdan o'tish":lang === 'ru'?"Зарегистрироваться":'Sign up'}
						</button>
					</form>
				)}
				{/* Toggle form */}
				<div className="text-center mb-6">
					<button
						className="text-sky-600 pt-3 hover:underline font-medium"
						onClick={() => setShowForm(!showForm)}
					>
						{showForm ? "Google yordamida" : "Email yordamida"}
					</button>
				</div>

				{/* Login link */}
				<p className="text-center text-sm text-gray-600 mt-6">
					Akkauntingiz bormi?{' '}
					<span
						className="text-blue-600 hover:underline cursor-pointer font-medium"
						onClick={() => navigate('/login')}
					>
						Login
					</span>
				</p>
			</div>
		</div>
	)
}

export default RegistrationPage
