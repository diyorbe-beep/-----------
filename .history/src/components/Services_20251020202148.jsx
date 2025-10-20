import React from 'react'
import { SERVICES } from '../config/constants.js'

const Services = () => {
  return (
    <section id="services" className="card" style={{ marginTop: '18px' }}>
      <h2>Xizmatlar</h2>
      <div className="grid-3">
        <div className="card">
          <h3>Birlamchi ko'rik (Offline)</h3>
          <p className="muted">
            Anamnez, ko'rik, dastlabki tavsiyalar. <strong>30 daqiqa</strong> • <strong>{SERVICES.offline_primary.price.toLocaleString('uz-UZ')} so'm</strong>
          </p>
        </div>
        <div className="card">
          <h3>Takroriy qabul (Offline)</h3>
          <p className="muted">
            Davolashni kuzatish va tuzatish. <strong>20 daqiqa</strong> • <strong>{SERVICES.offline_follow.price.toLocaleString('uz-UZ')} so'm</strong>
          </p>
        </div>
        <div className="card">
          <h3>Online konsultatsiya (Video)</h3>
          <p className="muted">
            WhatsApp/Telegram yoki Jitsi video orqali. <strong>25 daqiqa</strong> • <strong>{SERVICES.online_consult.price.toLocaleString('uz-UZ')} so'm</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services

