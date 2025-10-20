import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'

// Layout
import Header from './components/Layout/Header.jsx'
import Footer from './components/Footer.jsx'

// Public Pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DoctorList from './pages/DoctorList.jsx'
import DoctorDetail from './pages/DoctorDetail.jsx'

// Doctor Pages
import DoctorDashboard from './pages/DoctorDashboard.jsx'
import DoctorProfileSetup from './pages/DoctorProfileSetup.jsx'
import ServiceManagement from './pages/ServiceManagement.jsx'

// Patient Pages
import PatientDashboard from './pages/PatientDashboard.jsx'
import Booking from './pages/Booking.jsx'

// Other Pages
import Profile from './pages/Profile.jsx'
import AdminVerification from './pages/AdminVerification.jsx'
import NotFound from './pages/NotFound.jsx'
import DemoMode from './pages/DemoMode.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import About from './pages/About.jsx'

// Protected Route wrapper
const ProtectedRoute = ({ children, requireRole }) => {
  const { user, profile, loading } = useAuth()
  
  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (requireRole && profile?.role !== requireRole) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          
          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute requireRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/profile/setup" 
            element={
              <ProtectedRoute requireRole="doctor">
                <DoctorProfileSetup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/services" 
            element={
              <ProtectedRoute requireRole="doctor">
                <ServiceManagement />
              </ProtectedRoute>
            } 
          />
          
          {/* Patient Routes */}
          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute requireRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking/:serviceId" 
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } 
          />
          
          {/* Profile & Settings */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes (Demo - add proper admin role in production) */}
          <Route 
            path="/admin/verification" 
            element={
              <ProtectedRoute>
                <AdminVerification />
              </ProtectedRoute>
            } 
          />
          
          {/* Info Pages */}
          <Route path="/demo-mode" element={<DemoMode />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
