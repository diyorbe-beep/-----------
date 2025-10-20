import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { bookingHelpers } from '../lib/supabase.js'

const PatientDashboard = () => {
  const { user, profile } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [user])

  const loadBookings = async () => {
    try {
      const data = await bookingHelpers.getUserBookings(user.id, 'patient')
      setBookings(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
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
    <main className="container">
      <h1 style={{ marginTop: '32px' }}>Dashboard</h1>
      <p className="muted">Xush kelibsiz, {profile?.full_name}!</p>

      <div className="kpi" style={{ marginTop: '24px' }}>
        <div className="item">
          <div className="n">{bookings.length}</div>
          <div className="muted">Jami qabullar</div>
        </div>
        <div className="item">
          <div className="n">{bookings.filter(b => b.status === 'pending').length}</div>
          <div className="muted">Kutilayotgan</div>
        </div>
        <div className="item">
          <div className="n">{bookings.filter(b => b.status === 'completed').length}</div>
          <div className="muted">Tugallangan</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>Sizning qabullaringiz</h2>
          <Link to="/doctors" className="btn">
            Yangi qabul
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p className="muted">Hozircha qabullar yo'q</p>
            <Link to="/doctors" className="btn" style={{ marginTop: '16px' }}>
              Shifokorlarni ko'rish
            </Link>
          </div>
        ) : (
          <div className="list">
            {bookings.map(booking => (
              <div key={booking.id} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div className="avatar avatar-lg">
                    <img 
                      src={booking.doctor?.profiles?.avatar_url || 'https://via.placeholder.com/80'} 
                      alt={booking.doctor?.profiles?.full_name} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{booking.doctor?.profiles?.full_name}</h3>
                    <p className="muted" style={{ margin: '4px 0' }}>
                      {booking.doctor?.specialization}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <span className="badge">{booking.service?.name}</span>
                      <span className={`badge ${
                        booking.status === 'confirmed' ? 'badge-success' :
                        booking.status === 'pending' ? 'badge-warning' :
                        booking.status === 'completed' ? 'badge-success' :
                        'badge-danger'
                      }`}>
                        {booking.status}
                      </span>
                      <span className="badge">${booking.amount_usd}</span>
                    </div>
                    <p className="muted" style={{ margin: '8px 0 0' }}>
                      📅 {new Date(booking.scheduled_at).toLocaleString('uz-UZ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default PatientDashboard

