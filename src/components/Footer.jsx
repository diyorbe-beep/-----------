import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="footer container">
      <div className="grid-2" style={{ gap: '32px' }}>
        <div>
          <strong style={{ fontSize: '18px', marginBottom: '12px', display: 'block' }}>
            DocConsult
          </strong>
          <p className="muted" style={{ margin: '0 0 12px', fontSize: '14px' }}>
            Professional shifokorlar bilan onlayn konsultatsiya platformasi.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Link to="/about" className="muted" style={{ fontSize: '14px' }}>Haqida</Link>
            <Link to="/how-it-works" className="muted" style={{ fontSize: '14px' }}>Qanday ishlaydi</Link>
            <Link to="/doctors" className="muted" style={{ fontSize: '14px' }}>Shifokorlar</Link>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="muted" style={{ fontSize: '14px', marginBottom: '8px' }}>
            © {currentYear} DocConsult. Barcha huquqlar himoyalangan.
          </p>
          <p className="muted" style={{ fontSize: '12px', marginBottom: '16px' }}>
            Built with React + Vite + Supabase
          </p>
          <button 
            onClick={scrollToTop}
            className="btn btn-outline"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            Yuqoriga ↑
          </button>
        </div>
      </div>
    </section>
  )
}

export default Footer

