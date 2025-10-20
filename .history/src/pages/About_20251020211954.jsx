import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
          DocConsult haqida
        </h1>
        
        <p className="muted" style={{ fontSize: '18px', textAlign: 'center', marginBottom: '40px' }}>
          Professional shifokorlar bilan onlayn bog'laning. Tez, xavfsiz va qulay.
        </p>

        <div className="grid-2" style={{ marginBottom: '40px' }}>
          <div>
            <h3>📱 Missiyamiz</h3>
            <p className="muted">
              Tibbiy yordam olishni oson va qulay qilish. Har qanday vaqtda, har qanday joydan 
              professional shifokorlar bilan bog'lanish imkoniyatini yaratish.
            </p>
          </div>

          <div>
            <h3>🎯 Maqsadimiz</h3>
            <p className="muted">
              Sifatli tibbiy xizmatlarni hamyonbop narxlarda taqdim etish. 
              Shifokorlar va bemorlar o'rtasida ishonchli ko'prik bo'lish.
            </p>
          </div>
        </div>

        <div className="card" style={{ background: 'var(--bg-secondary)', marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px' }}>✨ Afzalliklarimiz</h3>
          <div className="list">
            <div style={{ padding: '12px' }}>
              <strong>✓ Sertifikatlangan shifokorlar</strong>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                Barcha shifokorlar tekshirilgan va tasdiqlangan
              </p>
            </div>
            <div style={{ padding: '12px' }}>
              <strong>✓ Qulay narxlar</strong>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                $1 dan boshlanadigan xizmatlar
              </p>
            </div>
            <div style={{ padding: '12px' }}>
              <strong>✓ 24/7 Mavjudlik</strong>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                Istalgan vaqtda konsultatsiya olish imkoniyati
              </p>
            </div>
            <div style={{ padding: '12px' }}>
              <strong>✓ Xavfsiz va maxfiy</strong>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                Ma'lumotlaringiz shifrlangan va himoyalangan
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '16px' }}>Tayyor boshlashga?</h3>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn">
              Ro'yxatdan o'tish
            </Link>
            <Link to="/doctors" className="btn btn-outline">
              Shifokorlarni ko'rish
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About

