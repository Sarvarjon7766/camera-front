import axios from 'axios'
import { useEffect, useState } from 'react'

const Users = () => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get('http://localhost:5000/api/user/getAll')
				setUsers(res.data.users || [])
				console.log(res.data)
			} catch (err) {
				console.error('Foydalanuvchilarni olishda xatolik:', err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchUsers()
	}, [])

	const roleColor = (role) => {
		switch (role) {
			case 'superadmin': return 'bg-purple-100 text-purple-800'
			case 'admin': return 'bg-blue-100 text-blue-800'
			case 'region_head': return 'bg-green-100 text-green-800'
			case 'organization_head': return 'bg-orange-100 text-orange-800'
			default: return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className="min-h-screen p-6 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">Foydalanuvchilar</h1>

				{loading ? (
					<p>Yuklanmoqda...</p>
				) : (
					<div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
						<table className="min-w-full text-sm text-left text-gray-600">
							<thead className="bg-gray-100 text-xs uppercase font-medium text-gray-500">
								<tr>
									<th className="px-6 py-3">FISH</th>
									<th className="px-6 py-3">Username</th>
									<th className="px-6 py-3">Telefon</th>
									<th className="px-6 py-3">Email</th>
									<th className="px-6 py-3">Roli</th>
									<th className="px-6 py-3">Tashkilot/Hudud</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id} className="border-t hover:bg-gray-50">
										<td className="px-6 py-3">{user.fullName}</td>
										<td className="px-6 py-3">@{user.username}</td>
										<td className="px-6 py-3">{user.phone || '-'}</td>
										<td className="px-6 py-3">{user.email || '-'}</td>
										<td className="px-6 py-3">
											<span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColor(user.role)}`}>
												{user.role}
											</span>
										</td>
										<td className="px-6 py-3">
											{`${user.regionId?.name || '-'} / ${user.organizationId?.name || '-'}`}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}

export default Users
