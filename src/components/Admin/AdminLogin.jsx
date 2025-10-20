import React, { useState } from 'react'
import { API_BASE, ADMIN_USER, ADMIN_PASS } from '../../config/constants.js'
import { setToken, setAdminAuth } from '../../utils/storage.js'

const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    // Try backend login first
    try {
      const response = await fetch(API_BASE + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      })
      
      const data = await response.json()
      
      if (data && data.token) {
        setToken(data.token)
        setAdminAuth(true)
        onLoginSuccess()
        return
      }
    } catch (err) {
      // Fallback to demo credentials
      if (credentials.username === ADMIN_USER && credentials.password === ADMIN_PASS) {
        setAdminAuth(true)
        onLoginSuccess()
        return
      }
    }

    alert('Noto\'g\'ri foydalanuvchi yoki parol')
  }

  return (
    <div id="adminLogin">
      <p className="muted">
        Kirish uchun foydalanuvchi va parol kiriting. (Demo: front-end darajasida, backend talab qilinadi.)
      </p>
      <div className="grid-2">
        <div>
          <label htmlFor="adm_user">Foydalanuvchi</label>
          <input
            id="adm_user"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="admin"
          />
        </div>
        <div>
          <label htmlFor="adm_pass">Parol</label>
          <input
            id="adm_pass"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="••••••"
          />
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button className="btn" onClick={handleLogin}>
          Kirish
        </button>
      </div>
    </div>
  )
}

export default AdminLogin

