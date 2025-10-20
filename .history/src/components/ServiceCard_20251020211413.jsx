import React from 'react'

const ServiceCard = ({ service, onBook, showBookButton = true }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'chat': return '💬'
      case 'video': return '🎥'
      case 'live': return '⚡'
      default: return '📋'
    }
  }

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '20px' }}>
            {getIcon(service.service_type)} {service.name}
          </h3>
          
          {service.description && (
            <p className="muted" style={{ margin: '0 0 12px', fontSize: '14px' }}>
              {service.description}
            </p>
          )}
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {service.duration_minutes && (
              <span className="badge">
                ⏱️ {service.duration_minutes} daqiqa
              </span>
            )}
            <span className="badge badge-success" style={{ fontSize: '16px', padding: '8px 16px' }}>
              ${service.price_usd}
            </span>
            {service.is_active !== undefined && (
              <span className={`badge ${service.is_active ? 'badge-success' : 'badge-danger'}`}>
                {service.is_active ? 'Faol' : 'Nofaol'}
              </span>
            )}
          </div>
        </div>
        
        {showBookButton && onBook && (
          <button 
            className="btn"
            onClick={() => onBook(service.id)}
            style={{ flexShrink: 0 }}
          >
            Band qilish
          </button>
        )}
      </div>
    </div>
  )
}

export default ServiceCard

