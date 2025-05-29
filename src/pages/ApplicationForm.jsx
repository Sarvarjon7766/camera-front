import axios from 'axios'
import { useEffect, useState } from 'react'
import { RiFileEditLine } from 'react-icons/ri'

const ApplicationForm = () => {
	const [data, setData] = useState({})
	const [formData, setFormData] = useState({})

	const fetchLeader = async () => {
		try {
			const token = localStorage.getItem('code')
			if (!token) {
				console.warn('Token topilmadi!')
				return
			}

			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}api/v1/users/me`,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)
			console.log(res.data)

			if (res.data.status === 'success') {
				const userData = res.data.data
				setData(userData)
				setFormData(userData)
			}
		} catch (error) {
			console.error("Xatolik:", error)
		}
	}

	useEffect(() => {
		fetchLeader()
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newFields = {}
		Object.keys(formData).forEach(key => {
			if (!data[key] && formData[key]) {
				newFields[key] = formData[key]
			}
		})

		if (Object.keys(newFields).length === 0) {
			alert("Yangi ma'lumot kiritilmadi.")
			return
		}

		try {
			const token = localStorage.getItem('code')
			console.log(newFields)
			const res = await axios.put(
				`${import.meta.env.VITE_BASE_URL}api/v1/users/me`,
				newFields,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)

			if (res.data.status === 'success') {
				alert("Ma'lumotlar yuborildi!")
				fetchLeader()
			}
		} catch (error) {
			console.error("Yuborishda xatolik:", error)
		}
	}

	const fields = [
		{ label: "Ism Familiya", name: "fullname" },
		{ label: "Telefon raqami", name: "phone" },
		{ label: "Elektron pochta", name: "email" },
		{ label: "Ta'lim sohasi", name: "mutaxasisligi" },
		{ label: "Lavozimi", name: "position" },
		{ label: "Davlati", name: "country" },

	]

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl font-bold mb-4 text-sky-600 flex items-center justify-center gap-2">
				<RiFileEditLine className="text-3xl" />
				Shaxsiy Ma'lumotlar
			</h2>
			<hr className="border-sky-300 mb-8" />

			<form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
				{fields.map(({ label, name, type }) => {
					const value = formData[name] || ''
					const isDisabled = data[name] ? true : false

					return (
						<div key={name}>
							<label htmlFor={name} className="block mb-1 font-medium text-gray-700">{label}</label>
							<input
								type={type || "text"}
								id={name}
								name={name}
								value={value}
								onChange={handleChange}
								disabled={isDisabled}
								required={!isDisabled}
								className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none 
									${isDisabled
										? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed'
										: 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
							/>
						</div>
					)
				})}

				<div className="md:col-span-2 flex justify-center mt-6">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow transition duration-300"
					>
						Yuborish
					</button>
				</div>
			</form>
		</div>
	)
}

export default ApplicationForm
