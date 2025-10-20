import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ textAlign: 'center', maxWidth: '500px', padding: '40px' }}>
        <h1 style={{ fontSize: '72px', margin: '0 0 16px' }}>404</h1>
        <h2 style={{ marginBottom: '16px' }}>Sahifa topilmadi</h2>
        <p className="muted" style={{ marginBottom: '24px' }}>
          Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan
        </p>
        <Link to="/" className="btn">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  )
}

export default NotFound

