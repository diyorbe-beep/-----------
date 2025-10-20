import React from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

const DemoModeWarning = () => {
  if (supabase) return null // Only show in demo mode

  return (
    <div className="card" style={{ 
      margin: '24px auto',
      maxWidth: '900px',
      padding: '20px', 
      background: 'rgba(245, 158, 11, 0.1)',
      border: '2px solid var(--warning)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
      <h3 style={{ color: 'var(--warning)', marginBottom: '12px' }}>
        DEMO MODE
      </h3>
      <p className="muted" style={{ marginBottom: '16px' }}>
        Supabase sozlanmagan. Faqat UI ko'rish mumkin. Login, Register va database funksiyalari ishlamaydi.
      </p>
      <Link to="/demo-mode" className="btn">
        Supabase'ni sozlash →
      </Link>
    </div>
  )
}

export default DemoModeWarning

