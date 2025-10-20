import React from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {
  return (
    <Link 
      to={`/doctors/${doctor.id}`} 
      className="card"
      style={{ 
        textDecoration: 'none', 
        transition: 'all 0.2s',
        display: 'block'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div className="avatar avatar-lg">
          <img 
            src={doctor.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.profiles?.full_name || 'Doctor')}&background=06b6d4&color=fff&size=80`} 
            alt={doctor.profiles?.full_name} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: 'var(--txt)', fontSize: '18px' }}>
            {doctor.profiles?.full_name}
          </h3>
          <p className="muted" style={{ margin: '2px 0 0', fontSize: '14px' }}>
            {doctor.specialization}
          </p>
        </div>
      </div>

      {/* Bio */}
      {doctor.bio && (
        <p className="muted" style={{ fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
          {doctor.bio.length > 120 ? doctor.bio.substring(0, 120) + '...' : doctor.bio}
        </p>
      )}

      {/* Badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <span className="badge">
          ⭐ {doctor.rating?.toFixed(1) || '0.0'}
        </span>
        <span className="badge">
          {doctor.experience_years} yil tajriba
        </span>
        {doctor.total_consultations > 0 && (
          <span className="badge">
            {doctor.total_consultations}+ konsultatsiya
          </span>
        )}
      </div>

      {/* Languages */}
      {doctor.languages && doctor.languages.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <small className="muted" style={{ fontSize: '11px' }}>Tillar:</small>
          <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
            {doctor.languages.slice(0, 3).map((lang, i) => (
              <span key={i} className="badge" style={{ fontSize: '10px', padding: '4px 8px' }}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      {doctor.services && doctor.services.length > 0 && (
        <div style={{ 
          marginTop: '16px', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border)',
          fontSize: '16px', 
          color: 'var(--brand)', 
          fontWeight: '700' 
        }}>
          ${doctor.services[0].price_usd} dan boshlab
        </div>
      )}
    </Link>
  )
}

export default DoctorCard

