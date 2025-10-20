import React from 'react'

const LoadingSpinner = ({ 
  size = 'md', 
  fullScreen = false, 
  type = 'medical',
  message = 'Yuklanmoqda...' 
}) => {
  const getSpinnerClass = () => {
    switch (type) {
      case 'heartbeat':
        return 'medical-spinner'
      case 'stethoscope':
        return 'doctor-spinner'
      default:
        return 'spinner'
    }
  }

  const getSpinnerContent = () => {
    switch (type) {
      case 'heartbeat':
        return (
          <div className="heartbeat">
            <div></div>
          </div>
        )
      case 'stethoscope':
        return null // CSS ::before handles the emoji
      default:
        return null // CSS ::before handles the medical symbol
    }
  }

  const getMessage = () => {
    switch (type) {
      case 'heartbeat':
        return 'Shifokorlar tekshirilmoqda...'
      case 'stethoscope':
        return 'Tibbiy ma\'lumotlar yuklanmoqda...'
      default:
        return message
    }
  }

  if (fullScreen) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className={getSpinnerClass()}>
          {getSpinnerContent()}
        </div>
        <p className="muted" style={{ 
          fontSize: '16px', 
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          {getMessage()}
        </p>
      </div>
    )
  }

  return (
    <div className={getSpinnerClass()}>
      {getSpinnerContent()}
    </div>
  )
}

export default LoadingSpinner

