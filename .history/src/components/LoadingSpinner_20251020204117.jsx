import React from 'react'

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: { width: '20px', height: '20px', borderWidth: '2px' },
    md: { width: '40px', height: '40px', borderWidth: '3px' },
    lg: { width: '60px', height: '60px', borderWidth: '4px' }
  }

  const spinnerStyle = {
    ...sizes[size],
    border: `${sizes[size].borderWidth} solid var(--border)`,
    borderTop: `${sizes[size].borderWidth} solid var(--brand)`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }

  if (fullScreen) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={spinnerStyle}></div>
        <p className="muted">Yuklanmoqda...</p>
      </div>
    )
  }

  return <div style={spinnerStyle}></div>
}

export default LoadingSpinner

