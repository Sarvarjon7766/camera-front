import { useState } from 'react';

const RegionTable = () => {
	const [regions, setRegions] = useState([
		{
			id: Date.now(),
			name: 'Toshkent',
			manager: {
				fullName: 'Shavkat Otabekov',
				email: 'shavkat@mail.com',
				phone: '+998901234567',
				username: 'shavkat',
				password: '***'
			},
			organizations: 12,
			status: 'active'
		},
		{
			id: Date.now() + 1,
			name: 'Samarqand',
			manager: {
				fullName: 'Bahrom Rasulov',
				email: 'bahrom@mail.com',
				phone: '+998901112233',
				username: 'bahrom',
				password: '***'
			},
			organizations: 7,
			status: 'active'
		}
	]);

	const handleEdit = (id) => {
		console.log('Tahrir qilinmoqda:', id);
		// Modal yoki form ochilishi kerak bo‘lsa shu yerga qo‘shiladi
	};

	const handleDelete = (id) => {
		const confirmDelete = window.confirm("Haqiqatan ham o'chirmoqchimisiz?");
		if (confirmDelete) {
			setRegions(regions.filter(region => region.id !== id));
		}
	};

	return (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hudud nomi</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Menejer (FISH)</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tel</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tashkilotlar</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
					<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harakatlar</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{regions.map((region) => (
					<tr key={region.id} className="hover:bg-gray-50">
						<td className="px-4 py-3 text-sm text-gray-900">{region.id}</td>
						<td className="px-4 py-3 text-sm font-semibold text-gray-900">{region.name}</td>
						<td className="px-4 py-3 text-sm text-gray-700">{region.manager.fullName}</td>
						<td className="px-4 py-3 text-sm text-gray-700">{region.manager.phone}</td>
						<td className="px-4 py-3 text-sm text-gray-700">{region.manager.email}</td>
						<td className="px-4 py-3 text-sm text-gray-700">
							<span className="px-2 py-1 inline-flex text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
								{region.organizations}
							</span>
						</td>
						<td className="px-4 py-3 text-sm text-green-600 font-semibold capitalize">
							{region.status}
						</td>
						<td className="px-4 py-3 text-sm text-right">
							<button
								onClick={() => handleEdit(region.id)}
								className="text-indigo-600 hover:text-indigo-900 mr-3"
							>
								Tahrir
							</button>
							<button
								onClick={() => handleDelete(region.id)}
								className="text-red-600 hover:text-red-900"
							>
								O'chirish
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default RegionTable;
