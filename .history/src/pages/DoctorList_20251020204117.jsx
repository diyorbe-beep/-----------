import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { doctorHelpers } from '../lib/supabase.js'
import DoctorSearch from '../components/DoctorSearch.jsx'

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      const data = await doctorHelpers.getDoctors({ limit: 50 })
      setDoctors(data || [])
      setFilteredDoctors(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (filters) => {
    let filtered = [...doctors]

    // Search by name
    if (filters.search) {
      filtered = filtered.filter(d => 
        d.profiles?.full_name?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Filter by specialization
    if (filters.specialization) {
      filtered = filtered.filter(d => 
        d.specialization?.toLowerCase().includes(filters.specialization.toLowerCase())
      )
    }

    // Filter by rating
    if (filters.minRating) {
      filtered = filtered.filter(d => d.rating >= parseFloat(filters.minRating))
    }

    setFilteredDoctors(filtered)
  }

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container">
        <div className="card" style={{ padding: '24px', textAlign: 'center', marginTop: '40px' }}>
          <h2>Xatolik yuz berdi</h2>
          <p className="muted">{error}</p>
          <p className="muted" style={{ marginTop: '16px' }}>
            Supabase sozlanmaganmi? <code>.env</code> faylini tekshiring.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="container">
      <h1 style={{ marginTop: '32px', marginBottom: '24px' }}>Shifokorlar</h1>
      
      {doctors.length > 0 && (
        <DoctorSearch onSearch={handleSearch} />
      )}
      
      {filteredDoctors.length === 0 && doctors.length > 0 ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Hech narsa topilmadi</h3>
          <p className="muted">Qidiruv shartlarini o'zgartiring</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Hozircha shifokorlar yo'q</h3>
          <p className="muted">Database'ga shifokorlar qo'shing yoki Supabase'ni to'g'ri sozlang</p>
        </div>
      ) : (
        <>
          <p className="muted" style={{ marginBottom: '16px' }}>
            {filteredDoctors.length} ta shifokor topildi
          </p>
          <div className="grid-3">
            {filteredDoctors.map((doctor) => (
            <Link 
              key={doctor.id} 
              to={`/doctors/${doctor.id}`} 
              className="card"
              style={{ textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="avatar avatar-lg">
                  <img 
                    src={doctor.profiles?.avatar_url || 'https://via.placeholder.com/80'} 
                    alt={doctor.profiles?.full_name} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: 'var(--txt)' }}>{doctor.profiles?.full_name}</h3>
                  <p className="muted" style={{ margin: 0, fontSize: '14px' }}>{doctor.specialization}</p>
                </div>
              </div>

              <p className="muted" style={{ fontSize: '14px', marginBottom: '12px' }}>
                {doctor.bio?.substring(0, 100)}{doctor.bio?.length > 100 ? '...' : ''}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span className="badge">⭐ {doctor.rating.toFixed(1)}</span>
                <span className="badge">{doctor.experience_years} yil tajriba</span>
                <span className="badge">{doctor.total_consultations}+ konsultatsiya</span>
              </div>

              {doctor.services && doctor.services.length > 0 && (
                <div style={{ fontSize: '14px', color: 'var(--brand)', fontWeight: '600' }}>
                  ${doctor.services[0].price_usd} dan boshlab
                </div>
              )}
            </Link>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default DoctorList

