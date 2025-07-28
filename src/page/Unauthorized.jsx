// src/page/Unauthorized.jsx
import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
			<div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
				<div className="flex items-center justify-center mb-4">
					<ShieldAlert className="h-12 w-12 text-red-500" />
				</div>
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Kirish Rad Etildi</h2>
				<p className="text-gray-600 mb-6">
					Sizda ushbu sahifaga kirish huquqi mavjud emas. Iltimos, to‘g‘ri rol bilan tizimga kiring yoki administrator bilan bog‘laning.
				</p>
				<Link
					to="/"
					className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
				>
					Bosh sahifaga qaytish
				</Link>
			</div>
		</div>
	)
}

export default Unauthorized
