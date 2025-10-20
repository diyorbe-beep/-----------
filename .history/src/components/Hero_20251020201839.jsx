import React from 'react'

const Hero = () => {
  return (
    <section className="hero">
      <div className="card">
        <span className="tag">✨ 15+ yil tajriba • Sertifikatlangan shifokor</span>
        <h1>
          Dr. Qalandarov Dilmurodjon Madaminovich — <span style={{ color: 'var(--brand-2)' }}>[Mutaxassislik]</span>
        </h1>
        <p className="muted">
          Har bir bemorga e'tibor va ishonch. Profilaktika, aniq diagnostika va zamonaviy davolash usullari. Oila uchun ishonchli shifokor.
        </p>
        <div className="kpi" style={{ marginTop: '12px' }}>
          <div className="item">
            <div className="n">2,500+</div>
            <div className="muted">muvaffaqiyatli davolash</div>
          </div>
          <div className="item">
            <div className="n">15 yil</div>
            <div className="muted">amaliy tajriba</div>
          </div>
          <div className="item">
            <div className="n">98%</div>
            <div className="muted">bemorlardan ijobiy fikr</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          <a className="btn" href="#appoint">Online navbatga yozilish</a>
          <a className="btn btn-outline" href="#contact">Telegram / Telefon</a>
        </div>
      </div>
      <div className="portrait card" aria-label="Doktor portreti">
        <img 
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop" 
          alt="Dr. Qalandarov Dilmurodjon Madaminovich portreti" 
        />
      </div>
    </section>
  )
}

export default Hero

