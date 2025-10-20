import React, { useState, useEffect } from 'react'
import { doctorHelpers } from '../lib/supabase.js'
import DoctorSearch from '../components/DoctorSearch.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

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
      <main className="container">
        <div style={{ 
          minHeight: '60vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '4px solid rgba(34, 211, 238, 0.2)',
            borderTop: '4px solid var(--brand)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p className="muted" style={{ fontSize: '18px' }}>
            🩺 Shifokorlar ro'yxati yuklanmoqda...
          </p>
        </div>
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
      <h1 className="page-title" style={{ marginTop: '32px', marginBottom: '24px' }}>Shifokorlar</h1>
      
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
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default DoctorList

