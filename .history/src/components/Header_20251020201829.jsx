import React from 'react'

const Header = () => {
  return (
    <header>
      <div className="container nav">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2c4.971 0 9 4.029 9 9 0 3.217-1.707 6.04-4.263 7.616-.383.238-.737.53-1.041.867L13 22l-.001-2.5c-3.728 0-6.75-3.022-6.75-6.75S9.271 6 12.999 6c1.794 0 3.426.694 4.649 1.83C16.61 5.595 14.45 4 12 4 7.582 4 4 7.582 4 12s3.582 8 8 8v2C6.477 22 2 17.523 2 12S6.477 2 12 2z" fill="#22d3ee" />
          </svg>
          <strong>Dr. Qalandarov Dilmurodjon Madaminovich</strong>
        </div>
        <nav style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <a href="#about">Haqida</a>
          <a href="#services">Xizmatlar</a>
          <a href="#consult">Konsultatsiya</a>
          <a href="#reviews">Sharhlar</a>
          <a href="#contact">Aloqa</a>
          <a className="btn" href="#appoint">Qabulga yozilish</a>
          <a className="btn btn-outline" href="#pay">To'lov</a>
          <a href="#admin" style={{ opacity: 0.7 }}>Admin</a>
        </nav>
      </div>
    </header>
  )
}

export default Header

