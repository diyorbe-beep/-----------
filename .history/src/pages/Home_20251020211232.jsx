import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

const Home = () => {
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    setIsDemoMode(!supabase)
  }, [])

  return (
    <main className="container">
      {isDemoMode && (
        <div className="card" style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid var(--warning)'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: 'var(--warning)' }}>Demo Mode</strong>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: '14px' }}>
                Supabase sozlanmagan. Login/Register ishlamaydi. 
                <Link to="/demo-mode" style={{ color: 'var(--brand)', marginLeft: '8px' }}>
                  Qanday sozlash →
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="card">
          <span className="tag">⚡ Professional shifokorlar bilan onlayn konsultatsiya</span>
          <h1>
            Eng yaxshi shifokorlar bilan <span style={{ color: 'var(--brand-2)' }}>Onlayn Uchrashuv</span>
          </h1>
          <p className="muted">
            Chat, video yoki jonli konsultatsiya orqali tajribali shifokorlardan maslahat oling. 
            Tez, qulay va xavfsiz tibbiy yordam.
          </p>
          <div className="kpi" style={{ marginTop: '24px' }}>
            <div className="item">
              <div className="n">500+</div>
              <div className="muted">Sertifikatlangan shifokorlar</div>
            </div>
            <div className="item">
              <div className="n">10,000+</div>
              <div className="muted">Mamnun bemorlar</div>
            </div>
            <div className="item">
              <div className="n">24/7</div>
              <div className="muted">Onlayn xizmat</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <Link to="/doctors" className="btn">
              Shifokorlarni ko'rish
            </Link>
            <Link to="/register" className="btn btn-outline">
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
        <div className="portrait card">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop" 
            alt="Doctor consultation illustration" 
          />
        </div>
      </section>

      <section className="grid-3" style={{ marginTop: '40px' }}>
        <div className="card">
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
          <h3>Chat Konsultatsiya</h3>
          <p className="muted">
            Xabar orqali shifokorga savollaringizni bering. Tez va qulay.
          </p>
          <div style={{ marginTop: '16px', color: 'var(--brand)', fontWeight: '700' }}>
            $1 dan boshlab
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎥</div>
          <h3>Video Konsultatsiya</h3>
          <p className="muted">
            Video qo'ng'iroq orqali shifokor bilan yuzma-yuz suhbatlashing.
          </p>
          <div style={{ marginTop: '16px', color: 'var(--brand)', fontWeight: '700' }}>
            $10 dan boshlab
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
          <h3>Jonli Konsultatsiya</h3>
          <p className="muted">
            Real-time video/chat orqali to'liq tibbiy konsultatsiya.
          </p>
          <div style={{ marginTop: '16px', color: 'var(--brand)', fontWeight: '700' }}>
            $50 dan boshlab
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>Shifokor sifatida qo'shilmoqchimisiz?</h2>
        <p className="muted">
          Professional shifokor sifatida platformamizga qo'shiling va minglab bemorlarga yordam bering.
        </p>
        <Link to="/register" className="btn" style={{ marginTop: '16px' }}>
          Shifokor sifatida ro'yxatdan o'tish
        </Link>
      </section>
    </main>
  )
}

export default Home

