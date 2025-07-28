const RegionStats = ({ regions }) => {
	const totalOrganizations = regions.reduce((sum, region) => sum + region.organizations, 0)
	const averageOrganizations = Math.round(totalOrganizations / regions.length) || 0

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
			{/* Total Regions Card */}
			<div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm border-l-4 border-indigo-500">
				<h3 className="text-xs sm:text-sm font-medium text-gray-500">Jami Hududlar</h3>
				<p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1 sm:mt-2">
					{regions.length}
				</p>
			</div>

			{/* Total Organizations Card */}
			<div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm border-l-4 border-emerald-500">
				<h3 className="text-xs sm:text-sm font-medium text-gray-500">Tashkilotlar</h3>
				<p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1 sm:mt-2">
					{totalOrganizations}
				</p>
			</div>

			{/* Average Organizations Card */}
			<div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm border-l-4 border-amber-500">
				<h3 className="text-xs sm:text-sm font-medium text-gray-500">O'rtacha tashkilot</h3>
				<p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1 sm:mt-2">
					{averageOrganizations}
				</p>
			</div>
		</div>
	)
}

export default RegionStats