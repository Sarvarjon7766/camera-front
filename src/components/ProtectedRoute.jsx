import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, role }) => {
	const user = JSON.parse(localStorage.getItem('user'))
	console.log(user)

	if (!user) return <Navigate to="/login" />

	if (user.role !== role) return <Navigate to="/unauthorized" />

	return children
}

export default ProtectedRoute
