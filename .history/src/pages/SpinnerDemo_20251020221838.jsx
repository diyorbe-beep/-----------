import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const SpinnerDemo = () => {
  return (
    <main className="container">
      <h1 style={{ marginTop: '32px', marginBottom: '24px' }}>Tibbiy Animatsiyalar</h1>
      
      <div className="grid-3">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>⚕ Tibbiy Simvol</h3>
          <LoadingSpinner type="medical" fullScreen={false} />
          <p className="muted" style={{ marginTop: '16px' }}>
            Asosiy tibbiy animatsiya
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>❤️ Yurak Urishi</h3>
          <LoadingSpinner type="heartbeat" fullScreen={false} />
          <p className="muted" style={{ marginTop: '16px' }}>
            Yurak urishi animatsiyasi
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>🩺 Stetoskop</h3>
          <LoadingSpinner type="stethoscope" fullScreen={false} />
          <p className="muted" style={{ marginTop: '16px' }}>
            Shifokor stetoskopi
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '32px', textAlign: 'center', padding: '40px' }}>
        <h3>To'liq Ekran Animatsiya</h3>
        <LoadingSpinner 
          type="stethoscope" 
          fullScreen={true}
          message="Shifokorlar ro'yxati yuklanmoqda..."
        />
      </div>
    </main>
  )
}

export default SpinnerDemo
