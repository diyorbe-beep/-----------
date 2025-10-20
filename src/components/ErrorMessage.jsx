import React from 'react'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card" style={{ 
      padding: '24px', 
      textAlign: 'center', 
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid var(--danger)'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <h3 style={{ color: 'var(--danger)', marginBottom: '8px' }}>Xatolik yuz berdi</h3>
      <p className="muted">{message}</p>
      {onRetry && (
        <button 
          className="btn" 
          onClick={onRetry}
          style={{ marginTop: '16px' }}
        >
          Qayta urinish
        </button>
      )}
    </div>
  )
}

export default ErrorMessage

