import React from 'react'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Qanday ishlaydi?</h1>

      {/* For Patients */}
      <div className="card" style={{ marginBottom: '40px' }}>
        <h2>👤 Bemorlar uchun</h2>
        
        <div className="grid-2" style={{ marginTop: '24px' }}>
          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>1️⃣</div>
            <h3>Ro'yxatdan o'ting</h3>
            <p className="muted">
              Bemor sifatida tizimga kiring. Email orqali hisobingizni tasdiqlang.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>2️⃣</div>
            <h3>Shifokor toping</h3>
            <p className="muted">
              Ixtisoslik, reyting va narx bo'yicha shifokorlarni qidiring va tanlang.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>3️⃣</div>
            <h3>Xizmat tanlang</h3>
            <p className="muted">
              Chat ($1+), Video ($10+) yoki Jonli ($50+) konsultatsiya turini tanlang.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>4️⃣</div>
            <h3>Vaqt belgilang</h3>
            <p className="muted">
              O'zingizga qulay sana va vaqtni tanlang. To'lovni amalga oshiring.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>5️⃣</div>
            <h3>Konsultatsiya oling</h3>
            <p className="muted">
              Belgilangan vaqtda shifokor bilan bog'laning va maslahat oling.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>6️⃣</div>
            <h3>Sharh qoldiring</h3>
            <p className="muted">
              Konsultatsiyadan keyin shifokorga reyting va sharh bering.
            </p>
          </div>
        </div>
      </div>

      {/* For Doctors */}
      <div className="card" style={{ marginBottom: '40px' }}>
        <h2>👨‍⚕️ Shifokorlar uchun</h2>
        
        <div className="grid-2" style={{ marginTop: '24px' }}>
          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>1️⃣</div>
            <h3>Ro'yxatdan o'ting</h3>
            <p className="muted">
              Shifokor sifatida platformaga qo'shiling. Emailingizni tasdiqlang.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>2️⃣</div>
            <h3>Profil yarating</h3>
            <p className="muted">
              Ixtisoslik, bio, tajriba va boshqa ma'lumotlarni kiriting.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>3️⃣</div>
            <h3>Hujjatlar yuklang</h3>
            <p className="muted">
              Diplom va sertifikatlaringizni yuklang. Administrator tekshiradi.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>4️⃣</div>
            <h3>Tasdiqlanishni kuting</h3>
            <p className="muted">
              Administrator hujjatlaringizni tekshirib, profilingizni tasdiqlaydi.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>5️⃣</div>
            <h3>Xizmatlar qo'shing</h3>
            <p className="muted">
              Chat, Video yoki Live konsultatsiya xizmatlarini qo'shing va narx belgilang.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>6️⃣</div>
            <h3>Bemorlar qabul qiling</h3>
            <p className="muted">
              Dashboard'da qabullarni ko'ring va bemorlarni davolang. Pul ishlang! 💰
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>💰 Pricing Tiers</h2>
        <p className="muted" style={{ marginBottom: '24px' }}>
          Shifokorlar o'z narxlarini belgilaydi. Taxminiy narxlar:
        </p>

        <div className="grid-3">
          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
            <h3>Chat</h3>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--brand)', margin: '12px 0' }}>
              $1+
            </div>
            <p className="muted" style={{ fontSize: '14px' }}>
              Text xabarlar orqali maslahat. 15-30 daqiqa davomida javob.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)', border: '2px solid var(--brand)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎥</div>
            <h3>Video</h3>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--brand)', margin: '12px 0' }}>
              $10+
            </div>
            <p className="muted" style={{ fontSize: '14px' }}>
              Video qo'ng'iroq. 20-45 daqiqa to'liq konsultatsiya.
            </p>
            <span className="badge badge-success" style={{ marginTop: '8px' }}>
              Eng mashhuр
            </span>
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚡</div>
            <h3>Live</h3>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--brand)', margin: '12px 0' }}>
              $50+
            </div>
            <p className="muted" style={{ fontSize: '14px' }}>
              Real-time video + chat. 30-60 daqiqa premium xizmat.
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/register" className="btn" style={{ marginRight: '12px' }}>
          Boshlash
        </Link>
        <Link to="/doctors" className="btn btn-outline">
          Shifokorlarni ko'rish
        </Link>
      </div>
    </main>
  )
}

export default HowItWorks

