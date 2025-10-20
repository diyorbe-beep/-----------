import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { storageHelpers } from '../lib/supabase.js'
import supabase from '../lib/supabase.js'
import FileUpload from '../components/FileUpload.jsx'

const Profile = () => {
  const { user, profile, reloadProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: ''
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || ''
      })
    }
  }, [profile])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleAvatarUpload = async (file) => {
    try {
      await storageHelpers.uploadAvatar(user.id, file)
      await reloadProfile()
      alert('Avatar yangilandi!')
    } catch (err) {
      throw new Error('Avatar yuklashda xatolik')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone
        })
        .eq('id', user.id)

      if (error) throw error

      await reloadProfile()
      setEditing(false)
      alert('Profil yangilandi!')
    } catch (err) {
      alert(err.message || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    try {
      const newPassword = prompt('Yangi parolni kiriting (kamida 6 ta belgi):')
      if (!newPassword || newPassword.length < 6) {
        alert('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
        return
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      alert('Parol o\'zgartirildi!')
    } catch (err) {
      alert(err.message || 'Parol o\'zgartirishda xatolik')
    }
  }

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1>Profil sozlamalari</h1>

        {/* Avatar */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <div className="avatar avatar-xl" style={{ margin: '0 auto' }}>
            <img 
              src={profile?.avatar_url || 'https://via.placeholder.com/120'} 
              alt={profile?.full_name} 
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <FileUpload
              label="Avatar o'zgartirish"
              onUpload={handleAvatarUpload}
              accept="image/*"
              maxSize={2}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div style={{ marginTop: '32px' }}>
          {!editing ? (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  To'liq ism
                </label>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                  {profile?.full_name}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  Email
                </label>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                  {user?.email}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  Telefon
                </label>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                  {profile?.phone || 'Kiritilmagan'}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  Rol
                </label>
                <span className="badge">
                  {profile?.role === 'doctor' ? '👨‍⚕️ Shifokor' : '👤 Bemor'}
                </span>
              </div>

              <button 
                className="btn" 
                onClick={() => setEditing(true)}
                style={{ marginTop: '16px' }}
              >
                Profilni tahrirlash
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="full_name">To'liq ism *</label>
                <input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="phone">Telefon</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button 
                  type="submit" 
                  className="btn"
                  disabled={loading}
                >
                  {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setEditing(false)}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security */}
        <div className="card" style={{ marginTop: '32px', background: 'var(--bg-secondary)' }}>
          <h3>Xavfsizlik</h3>
          <button 
            className="btn btn-outline" 
            onClick={handlePasswordChange}
            style={{ marginTop: '12px' }}
          >
            Parolni o'zgartirish
          </button>
        </div>
      </div>
    </main>
  )
}

export default Profile

