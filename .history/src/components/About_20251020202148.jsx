import React from 'react'

const About = () => {
  return (
    <section id="about" className="grid-2">
      <div className="card">
        <h2>Shifokor haqida</h2>
        <p className="muted">
          Qalandarov Dilmurodjon Madaminovich — Respublika ixtisoslashgan markazida malaka oshirgan. [Universitet] bitiruvchisi. 
          Yevropa va Osiyo konferensiyalarida ma'ruzachi. Bemor bilan muloqot va tushuntirishga alohida e'tibor qaratadi.
        </p>
        <div className="badges" style={{ marginTop: '10px' }}>
          <span className="badge">MD, PhD</span>
          <span className="badge">UzMTR sertifikat</span>
          <span className="badge">A'zo: [Jamiyat]</span>
        </div>
      </div>
      <div className="card">
        <h2>Qabul va manzil</h2>
        <ul className="list">
          <li><strong>Kunlar:</strong> Dushanba–Juma</li>
          <li><strong>Vaqt:</strong> 09:00–18:00</li>
          <li><strong>Manzil:</strong> [Shahar], [Ko'cha 12], [Klinika nomi]</li>
          <li><strong>Tillar:</strong> O'zbek, Rus, Ingliz</li>
          <li><strong>To'lov:</strong> Naqd, karta, online</li>
        </ul>
      </div>
    </section>
  )
}

export default About

