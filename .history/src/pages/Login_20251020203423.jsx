import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/doctors')
    } catch (err) {
      setError(err.message || 'Kirish xatosi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Kirish</h1>
        
        {error && (
          <div style={{ padding: '12px', background: 'var(--danger)', color: 'white', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
            Hisobingiz yo'qmi? <Link to="/register" style={{ color: 'var(--brand)' }}>Ro'yxatdan o'ting</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Login

