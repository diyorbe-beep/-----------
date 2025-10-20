import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import ThemeToggle from '../ThemeToggle.jsx'

const Header = () => {
  const { user, profile, signOut } = useAuth()

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

        <nav style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Link to="/doctors">Shifokorlar</Link>
          <Link to="/how-it-works">Qanday ishlaydi</Link>
          <Link to="/about">Haqida</Link>
          
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline">Kirish</Link>
              <Link to="/register" className="btn">Ro'yxatdan o'tish</Link>
            </>
          ) : (
            <>
              <Link to={profile?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}>
                Dashboard
              </Link>
              <Link to="/profile">Profil</Link>
              <button onClick={signOut} className="btn btn-outline">
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

