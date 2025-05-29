// src/App.jsx
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import Accomodate from './components/Accomodate.jsx'
import About from './pages/About'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage.jsx'
import Default from './components/Default.jsx'

import {
  AdminDashboardHome,
  Answares,
  Appellations,
  Complaints,
  Offers
} from './pages/Admin/index.js'
import {
  ApplicationForm,
  DashboardHome,
  EducationalInformation,
  GeneralInformation,
  Leader,
  MaritalStatus,
  MyApplication,
  Payment,
  ResidentialInformation
} from './pages/index.js'

import {AccountantDashboard,AccountantHome,GeneralVacancies,SituationsVacant,BusyVacancies} from './pages/accountant/index.js'
import {OfficecenterDashboard} from './pages/officecenter'
import {ResourcesDashboard} from './pages/resources'
import {StudentapplicationDashboard} from './pages/studentapplication'

import Profile from './components/Profile.jsx'
import AdminProfile from './pages/Admin/AdminProfile.jsx'
import Vacancies from './pages/Vacancies.jsx'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/default" element={<Default />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="my-applications" element={<MyApplication />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payments" element={<Payment />} />
            <Route path="general-info" element={<GeneralInformation />} />
            <Route path="address" element={<ResidentialInformation />} />
            <Route path="education" element={<EducationalInformation />} />
            <Route path="family-status" element={<MaritalStatus />} />
            <Route path="application" element={<ApplicationForm />} />
            <Route path="ish-urinlari" element={<ApplicationForm />} />
          </Route>

          {/* Application Routes (e.g., different role or view) */}
          <Route path="/application" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="leader" element={<Leader />} />
            <Route path="payments" element={<Payment />} />
            <Route path="general-info" element={<GeneralInformation />} />
            <Route path="address" element={<ResidentialInformation />} />
            <Route path="education" element={<EducationalInformation />} />
            <Route path="family-status" element={<MaritalStatus />} />
            <Route path="application" element={<ApplicationForm />} />
          </Route>
          {/* Application Routes (e.g., different role or view) */}
          <Route path="/leader" element={<AdminDashboard />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="offers" element={<Offers />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="appellations" element={<Appellations />} />
            <Route path="answares" element={<Answares />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route path="/accountant" element={<AccountantDashboard />}>
            <Route index element={<AccountantHome />} />
            <Route path="general-vacancies" element={<GeneralVacancies />} />
            <Route path="vacancies" element={<SituationsVacant />} />
            <Route path="busy-vacancies" element={<BusyVacancies />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/officecenter" element={<OfficecenterDashboard />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="applications" element={<Offers />} />
            <Route path="answers" element={<Complaints />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route path="/resources" element={<ResourcesDashboard />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="vacancies" element={<Offers />} />
            <Route path="applications" element={<Complaints />} />
            <Route path="answers" element={<Appellations />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route path="/acceptance" element={<StudentapplicationDashboard />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="student-application" element={<Offers />} />
            <Route path="answers" element={<Complaints />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
