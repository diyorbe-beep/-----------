import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import ThemeToggle from '../ThemeToggle.jsx'

const Header = () => {
  const { user, profile, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header>
      <div className="container nav">
        <Link to="/" style={{ display: 'flex', gap: '10px', alignItems: 'center', textDecoration: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7v10c0 5.5 3.8 9.7 9 11 5.2-1.3 9-5.5 9-11V7l-10-5z" stroke="var(--brand)" strokeWidth="2" fill="none"/>
            <path d="M12 6v6M12 16h.01" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <strong style={{ color: 'var(--txt)' }}>DocConsult</strong>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--txt)',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          ☰
        </button>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
          <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)}>Shifokorlar</Link>
          <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Qanday ishlaydi</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Haqida</Link>
          
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline" onClick={() => setIsMobileMenuOpen(false)}>Kirish</Link>
              <Link to="/register" className="btn" onClick={() => setIsMobileMenuOpen(false)}>Ro'yxatdan o'tish</Link>
            </>
          ) : (
            <>
              <Link to={profile?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profil</Link>
              <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="btn btn-outline">
                Chiqish
              </button>
              {profile?.avatar_url && (
                <div className="avatar">
                  <img src={profile.avatar_url} alt={profile.full_name} />
                </div>
              )}
            </>
          )}
          
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header

