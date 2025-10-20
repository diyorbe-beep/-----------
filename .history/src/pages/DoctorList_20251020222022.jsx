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
      // Loading ko'rinishi uchun kichik kechikish
      await new Promise(resolve => setTimeout(resolve, 2000))
      
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
          gap: '24px'
        }}>
          {/* Tibbiy simvol bilan loading */}
          <div style={{
            width: '100px',
            height: '100px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Aylanuvchi halqa */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '4px solid rgba(34, 211, 238, 0.2)',
              borderTop: '4px solid var(--brand)',
              borderRadius: '50%',
              animation: 'spin 1.5s linear infinite'
            }}></div>
            
            {/* Tibbiy simvol */}
            <div style={{
              fontSize: '48px',
              color: 'var(--brand)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              ⚕
            </div>
          </div>
          
          {/* Loading matn */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--txt)' }}>
              Shifokorlar ro'yxati yuklanmoqda
            </h3>
            <p className="muted" style={{ fontSize: '16px', margin: 0 }}>
              🩺 Professional tibbiy xodimlar topilmoqda...
            </p>
          </div>
          
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--brand)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--brand)',
              animation: 'pulse 1.5s ease-in-out infinite 0.3s'
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--brand)',
              animation: 'pulse 1.5s ease-in-out infinite 0.6s'
            }}></div>
          </div>
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

