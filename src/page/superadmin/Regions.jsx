import { useState } from 'react'

const Regions = () => {
	const [regions, setRegions] = useState([
		{
			id: 1,
			name: 'Toshkent',
			manager: {
				fullName: 'Shavkat O',
				email: 'shavkat@mail.com',
				phone: '+998901112233',
				username: 'shavkat',
				password: '***'
			},
			organizations: 12,
			status: 'active',
		},
		{
			id: 2,
			name: 'Samarqand',
			manager: {
				fullName: 'Bahrom R',
				email: 'bahrom@mail.com',
				phone: '+998907654321',
				username: 'bahrom',
				password: '***'
			},
			organizations: 9,
			status: 'active',
		},
		{
			id: 3,
			name: 'Fargʻona',
			manager: {
				fullName: 'Ali M',
				email: 'ali@mail.com',
				phone: '+998903334455',
				username: 'ali',
				password: '***'
			},
			organizations: 15,
			status: 'active',
		},
	])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [form, setForm] = useState({
		regionName: '',
		fullName: '',
		email: '',
		phone: '',
		username: '',
		password: ''
	})

	const handleCreate = () => {
		const newRegion = {
			id: Date.now(),
			name: form.regionName,
			manager: {
				fullName: form.fullName,
				email: form.email,
				phone: form.phone,
				username: form.username,
				password: form.password,
			},
			organizations: 0,
			status: 'active',
		}
		setRegions(prev => [...prev, newRegion])
		setIsModalOpen(false)
		setForm({
			regionName: '',
			fullName: '',
			email: '',
			phone: '',
			username: '',
			password: ''
		})
	}

	const totalOrgs = regions.reduce((sum, r) => sum + r.organizations, 0)

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 space-y-6">
			<h1 className="text-2xl font-bold text-center text-blue-800">Hududlar Boshqaruvi</h1>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-lg shadow text-center">
					<p className="text-sm text-gray-500">Umumiy hududlar</p>
					<p className="text-2xl font-bold text-gray-800">{regions.length}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow text-center">
					<p className="text-sm text-gray-500">Umumiy tashkilotlar</p>
					<p className="text-2xl font-bold text-gray-800">{totalOrgs}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow text-center">
					<p className="text-sm text-gray-500">Faol holatlar</p>
					<p className="text-2xl font-bold text-green-600">
						{regions.filter(r => r.status === 'active').length}
					</p>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow-sm">
				<div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div>
						<h2 className="text-lg font-semibold text-gray-800">Hududlar Ro'yxati</h2>
						<p className="text-sm text-gray-500">{regions.length} ta hudud mavjud</p>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base px-4 py-2 rounded-md flex items-center gap-2 shadow-sm"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
						</svg>
						<span>Yangi hudud</span>
					</button>
				</div>

				<div className="overflow-x-auto w-full">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hudud</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Menejer</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tel</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tashkilotlar</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holat</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{regions.map((region) => (
								<tr key={region.id} className="hover:bg-gray-50">
									<td className="px-4 py-3 text-sm font-medium text-gray-900">{region.name}</td>
									<td className="px-4 py-3 text-sm text-gray-800">{region.manager.fullName}</td>
									<td className="px-4 py-3 text-sm text-gray-600">{region.manager.phone}</td>
									<td className="px-4 py-3 text-sm text-gray-600">{region.manager.email}</td>
									<td className="px-4 py-3 text-sm text-indigo-600 font-semibold">{region.organizations}</td>
									<td className="px-4 py-3 text-sm text-green-600 capitalize">{region.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
						<h3 className="text-lg font-semibold text-gray-800">Yangi hudud qo'shish</h3>
						<input type="text" placeholder="Hudud nomi" className="input" value={form.regionName} onChange={e => setForm({ ...form, regionName: e.target.value })} />
						<input type="text" placeholder="Menejer FISH" className="input" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
						<input type="email" placeholder="Email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
						<input type="text" placeholder="Telefon" className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
						<input type="text" placeholder="Username" className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
						<input type="password" placeholder="Parol" className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
						<div className="flex justify-end gap-2 pt-2">
							<button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm">Bekor qilish</button>
							<button onClick={handleCreate} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Qo'shish</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Regions
