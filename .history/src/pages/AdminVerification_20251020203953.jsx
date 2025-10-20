import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabase.js'

const AdminVerification = () => {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple admin check (in production, use proper admin role)
    if (!profile || profile.role !== 'doctor') {
      navigate('/')
      return
    }
    loadPendingDoctors()
  }, [profile])

  const loadPendingDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDoctors(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (doctorId, status) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({ verification_status: status })
        .eq('id', doctorId)

      if (error) throw error

      alert(status === 'approved' ? 'Shifokor tasdiqlandi!' : 'Shifokor rad etildi!')
      loadPendingDoctors()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </main>
    )
  }

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h1>Admin - Shifokorlarni tasdiqlash</h1>
      <p className="muted">Kutilayotgan shifokorlar: {doctors.length}</p>

      {doctors.length === 0 ? (
        <div className="card" style={{ marginTop: '24px', padding: '40px', textAlign: 'center' }}>
          <p className="muted">Kutilayotgan so'rovlar yo'q</p>
        </div>
      ) : (
        <div className="list" style={{ marginTop: '24px' }}>
          {doctors.map(doctor => (
            <div key={doctor.id} className="card" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3>{doctor.profiles?.full_name}</h3>
                <p className="muted">{doctor.specialization}</p>
              </div>

              <div className="grid-2" style={{ gap: '12px', marginBottom: '16px' }}>
                <div>
                  <small className="muted">Tajriba</small>
                  <p style={{ margin: 0 }}>{doctor.experience_years} yil</p>
                </div>
                <div>
                  <small className="muted">Ta'lim</small>
                  <p style={{ margin: 0 }}>{doctor.education}</p>
                </div>
                <div>
                  <small className="muted">Litsenziya</small>
                  <p style={{ margin: 0 }}>{doctor.license_number || 'Yo\'q'}</p>
                </div>
                <div>
                  <small className="muted">Klinika</small>
                  <p style={{ margin: 0 }}>{doctor.clinic_name || 'Kiritilmagan'}</p>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <small className="muted">Bio</small>
                <p style={{ margin: '4px 0 0' }}>{doctor.bio}</p>
              </div>

              {doctor.diploma_url && (
                <div style={{ marginBottom: '16px' }}>
                  <small className="muted">Diplom</small>
                  <div style={{ marginTop: '8px' }}>
                    <a 
                      href={doctor.diploma_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ fontSize: '14px', padding: '8px 16px' }}
                    >
                      📄 Diplomni ko'rish
                    </a>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button 
                  className="btn"
                  onClick={() => handleVerification(doctor.id, 'approved')}
                >
                  ✓ Tasdiqlash
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleVerification(doctor.id, 'rejected')}
                >
                  ✗ Rad etish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default AdminVerification

