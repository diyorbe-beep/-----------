import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'
import DemoModeWarning from '../components/DemoModeWarning.jsx'

const Register = () => {
  if (!supabase) {
    return (
      <main className="container" style={{ paddingTop: '40px' }}>
        <DemoModeWarning />
      </main>
    )
  }
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Parollar mos kelmayapti')
      return
    }

    if (formData.password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
      return
    }

    setLoading(true)

    try {
      const result = await signUp(formData.email, formData.password, formData.fullName, formData.role)
      
      // Check if user is immediately signed in (no email confirmation required)
      if (result.user && result.session) {
        // User is automatically signed in, redirect to appropriate dashboard
        if (formData.role === 'doctor') {
          navigate('/doctor/dashboard')
        } else {
          navigate('/patient/dashboard')
        }
      } else {
        // Email confirmation required
        alert('Ro\'yxatdan o\'tish muvaffaqiyatli! Emailingizni tasdiqlang.')
        navigate('/login')
      }
    } catch (err) {
      setError(err.message || 'Ro\'yxatdan o\'tish xatosi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Ro'yxatdan o'tish</h1>
        
        {error && (
          <div style={{ padding: '12px', background: 'var(--danger)', color: 'white', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="fullName">To'liq ism</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ism Familiya"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="role">Rol</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Bemor</option>
              <option value="doctor">Shifokor</option>
            </select>
            <small style={{ color: 'var(--muted)', display: 'block', marginTop: '4px' }}>
              {formData.role === 'doctor' ? 'Shifokor sifatida ro\'yxatdan o\'tsangiz, profilingiz tekshiriladi' : 'Bemor sifatida shifokorlardan maslahat olishingiz mumkin'}
            </small>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="confirmPassword">Parolni tasdiqlash</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            style={{ width: '100%', marginBottom: '16px' }}
            disabled={loading}
          >
            {loading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
            Hisobingiz bormi? <Link to="/login" style={{ color: 'var(--brand)' }}>Kirish</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Register

