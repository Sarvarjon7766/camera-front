import {
	Activity,
	BarChart3,
	Building2,
	Camera,
	ChevronRight,
	Clock,
	LineChart,
	MapPin,
	Users,
	Users2
} from 'lucide-react'

const SuperAdminDashboard = () => {
	return (
		<div className="space-y-8 p-4 md:p-6">
			{/* Header with date */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-bold text-indigo-800">Boshqaruv Paneli</h1>
					<p className="text-sm text-gray-500 mt-1">Bugun: {new Date().toLocaleDateString()}</p>
				</div>
				<div className="flex items-center gap-2 text-sm text-indigo-600">
					<Clock className="w-4 h-4 text-current" />
					<span>Oxirgi yangilanish: 12:45 PM</span>
				</div>
			</div>

			{/* Stats Cards - Now with visible icons */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{[
					{
						title: "Jami foydalanuvchilar",
						value: 124,
						icon: <Users2 className="w-5 h-5 text-current" />,
						color: "from-indigo-500 to-purple-600",
						trend: "up"
					},
					{
						title: "Tashkilotlar soni",
						value: 48,
						icon: <Building2 className="w-5 h-5 text-current" />,
						color: "from-pink-500 to-rose-500",
						trend: "up"
					},
					{
						title: "Tuman va shaharlar",
						value: 21,
						icon: <MapPin className="w-5 h-5 text-current" />,
						color: "from-emerald-500 to-teal-500",
						trend: "stable"
					},
					{
						title: "Jami kameralar",
						value: 390,
						icon: <Camera className="w-5 h-5 text-current" />,
						color: "from-amber-500 to-orange-500",
						trend: "up"
					},
					{
						title: "Faol tashkilotlar",
						value: 36,
						icon: <Activity className="w-5 h-5 text-current" />,
						color: "from-green-500 to-lime-500",
						trend: "down"
					},
					{
						title: "Nofaol tashkilotlar",
						value: 12,
						icon: <Activity className="w-5 h-5 text-current rotate-180" />,
						color: "from-gray-500 to-gray-700",
						trend: "up"
					},
				].map(({ title, value, icon, color, trend }, idx) => (
					<div
						key={idx}
						className={`bg-gradient-to-br ${color} text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
					>
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm opacity-90 mb-1">{title}</p>
								<p className="text-2xl font-bold">{value}</p>
							</div>
							<div className="flex flex-col items-end">
								<div className="bg-white bg-opacity-20 p-2 rounded-lg">
									{icon}
								</div>
								{trend === 'up' && (
									<span className="text-xs mt-2 text-green-200 flex items-center">
										+2.5% <ChevronRight className="w-3 h-3 text-current" />
									</span>
								)}
								{trend === 'down' && (
									<span className="text-xs mt-2 text-rose-200 flex items-center">
										-1.2% <ChevronRight className="w-3 h-3 text-current rotate-180" />
									</span>
								)}
								{trend === 'stable' && (
									<span className="text-xs mt-2 text-blue-200">0%</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Charts Section with visible icons */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className="font-semibold text-lg text-gray-800">Hududlar bo'yicha tashkilotlar</h2>
							<p className="text-sm text-gray-500">Oxirgi 30 kun</p>
						</div>
						<div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
							<BarChart3 className="w-5 h-5 text-current" />
						</div>
					</div>
					<div className="h-64 bg-gradient-to-b from-indigo-50 to-white rounded-lg flex items-center justify-center text-gray-400">
						[Bar chart joyi]
					</div>
				</div>

				<div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className="font-semibold text-lg text-gray-800">So'nggi 7 kunlik tizimga kirish</h2>
							<p className="text-sm text-gray-500">Har bir rol bo'yicha</p>
						</div>
						<div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
							<LineChart className="w-5 h-5 text-current" />
						</div>
					</div>
					<div className="h-64 bg-gradient-to-b from-indigo-50 to-white rounded-lg flex items-center justify-center text-gray-400">
						[Line chart joyi]
					</div>
				</div>
			</div>

			{/* Quick Actions with visible icons */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-md border border-gray-100">
					<h2 className="font-semibold text-lg text-gray-800 mb-4">Tezkor harakatlar</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						{[
							{
								title: "Tashkilot qo'shish",
								icon: <Building2 />,
								color: "bg-pink-100 text-pink-600"
							},
							{
								title: "Hudud qo'shish",
								icon: <MapPin className="w-4 h-4 text-indigo-600" />,
								color: "bg-emerald-100 text-emerald-600"
							},
							{
								title: "Kamera joylash",
								icon: <Camera className="w-4 h-4 text-current" />,
								color: "bg-amber-100 text-amber-600"
							},
							{
								title: "Foydalanuvchilar ro'yxati",
								icon: <Users className="w-4 h-4 text-current" />,
								color: "bg-indigo-100 text-indigo-600"
							}
						].map((action, i) => (
							<button
								key={i}
								className={`flex items-center justify-between p-3 rounded-lg ${action.color} hover:opacity-90 transition`}
							>
								<div className="flex items-center gap-2">
									<div className={`p-1.5 rounded-md ${action.color.replace('text', 'bg').replace('600', '500/20')}`}>
										{action.icon}

									</div>
									<span className="font-medium">{action.title}</span>
								</div>
								<ChevronRight className="w-4 h-4 text-current" />
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuperAdminDashboard