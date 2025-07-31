import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logout from './components/Logout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './page/Login'
import Unauthorized from './page/Unauthorized'

// Layouts
import AdminLayout from './components/Layout/AdminLayout'
import OrganizationLayout from './components/layout/OrganizationHeadLayout'
import RegionManagerLayout from './components/layout/RegionHeadLayout'
import SuperAdminLayout from './components/layout/SuperAdminLayout'

// Dashboards
import { AdminCameras, AdminDashboard } from './page/admin/index'
import OrganizationDashboard from './page/organizationhead/Dashboard'
import RegionManagerDashboard from './page/regionhead/Dashboard'
import { AddManager, AdminManager, Cameras, Organizations, Regions, Settings, SuperAdminDashboard, Users } from './page/superadmin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login and Unauthorized */}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/logout" element={<Logout />} />

        {/* SuperAdmin */}
        <Route element={<ProtectedRoute role="superadmin"><SuperAdminLayout /></ProtectedRoute>}>
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/superadmin/regions" element={<Regions />} />
          <Route path="/superadmin/organizations" element={<Organizations />} />
          <Route path="/superadmin/users" element={<Users />} />
          <Route path="/superadmin/cameras" element={<Cameras />} />
          <Route path="/superadmin/add-manager" element={<AddManager />} />
          <Route path="/superadmin/settings" element={<Settings />} />
          <Route path="/superadmin/admin" element={<AdminManager />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cameras" element={<AdminCameras />} />
          <Route path="/admin/settings" element={<AdminCameras />} />
        </Route>

        {/* Region Manager */}
        <Route element={<ProtectedRoute role="region_head"><RegionManagerLayout /></ProtectedRoute>}>
          <Route path="/region-manager" element={<RegionManagerDashboard />} />
        </Route>

        {/* Organization Head */}
        <Route element={<ProtectedRoute role="organization_head"><OrganizationLayout /></ProtectedRoute>}>
          <Route path="/organization" element={<OrganizationDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
