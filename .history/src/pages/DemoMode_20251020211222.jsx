import React from 'react'
import { Link } from 'react-router-dom'

const DemoMode = () => {
  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔌</div>
          <h1>Supabase Sozlanmagan</h1>
          <p className="muted" style={{ fontSize: '18px' }}>
            Platform to'liq ishga tushishi uchun Supabase kerak
          </p>
        </div>

        <div className="card" style={{ background: 'var(--bg-secondary)', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>✅ Hozir ishlayotgan narsalar:</h3>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li className="muted" style={{ marginBottom: '8px' }}>UI/UX dizayni</li>
            <li className="muted" style={{ marginBottom: '8px' }}>Dark/Light mode</li>
            <li className="muted" style={{ marginBottom: '8px' }}>Responsive layout</li>
            <li className="muted" style={{ marginBottom: '8px' }}>Navigatsiya</li>
            <li className="muted">Barcha sahifalar (UI faqat)</li>
          </ul>
        </div>

        <div className="card" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--danger)' }}>❌ Ishlamayotgan narsalar:</h3>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li className="muted" style={{ marginBottom: '8px' }}>Login/Register</li>
            <li className="muted" style={{ marginBottom: '8px' }}>Database operations</li>
            <li className="muted" style={{ marginBottom: '8px' }}>File uploads</li>
            <li className="muted" style={{ marginBottom: '8px' }}>Bookings</li>
            <li className="muted">User authentication</li>
          </ul>
        </div>

        <h3 style={{ marginBottom: '16px' }}>🚀 Supabase'ni sozlash (5 daqiqa):</h3>
        
        <div className="list">
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                flexShrink: 0
              }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <strong>Supabase account yarating</strong>
                <p className="muted" style={{ margin: '4px 0 8px' }}>
                  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)' }}>
                    https://supabase.com
                  </a> ga o'ting va GitHub/Google bilan sign up qiling (BEPUL!)
                </p>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                flexShrink: 0
              }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <strong>Project yaratish</strong>
                <p className="muted" style={{ margin: '4px 0 0' }}>
                  Dashboard'da "New Project" tugmasini bosing<br />
                  Nom: <code>doctor-consultation</code><br />
                  Database parol yozing<br />
                  Region: Singapore/Mumbai
                </p>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                flexShrink: 0
              }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <strong>Database sozlash</strong>
                <p className="muted" style={{ margin: '4px 0 0' }}>
                  SQL Editor'ni oching<br />
                  <code>SUPABASE_SETUP.md</code> faylidagi SQL kodlarni copy-paste qiling
                </p>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                flexShrink: 0
              }}>
                4
              </div>
              <div style={{ flex: 1 }}>
                <strong>Credentials olish</strong>
                <p className="muted" style={{ margin: '4px 0 0' }}>
                  Settings > API ga o'ting<br />
                  <strong>Project URL</strong> ni copy qiling<br />
                  <strong>anon public</strong> key ni copy qiling
                </p>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                flexShrink: 0
              }}>
                5
              </div>
              <div style={{ flex: 1 }}>
                <strong>.env faylni yangilash</strong>
                <p className="muted" style={{ margin: '4px 0 8px' }}>
                  Root papkadagi <code>.env</code> faylini oching va credentials'ni kiriting
                </p>
                <pre style={{ 
                  background: 'var(--bg)', 
                  padding: '12px', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  overflow: 'auto'
                }}>
{`VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...`}
                </pre>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                flexShrink: 0
              }}>
                6
              </div>
              <div style={{ flex: 1 }}>
                <strong>Server qayta ishga tushirish</strong>
                <p className="muted" style={{ margin: '4px 0 0' }}>
                  Terminal'da <code>Ctrl+C</code> bosing<br />
                  Keyin: <code>npm run dev</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p className="muted" style={{ marginBottom: '16px' }}>
            Batafsil qo'llanma uchun:
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <code style={{ padding: '4px 8px', background: 'var(--bg)', borderRadius: '4px' }}>
              QUICK_START.md
            </code>
            <code style={{ padding: '4px 8px', background: 'var(--bg)', borderRadius: '4px' }}>
              SUPABASE_SETUP.md
            </code>
            <code style={{ padding: '4px 8px', background: 'var(--bg)', borderRadius: '4px' }}>
              SETUP_INSTRUCTIONS.md
            </code>
          </div>
        </div>

        <div style={{ marginTop: '32px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
          <p className="muted">Hozircha UI'ni ko'rishingiz mumkin:</p>
          <Link to="/" className="btn" style={{ marginTop: '12px' }}>
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </main>
  )
}

export default DemoMode

