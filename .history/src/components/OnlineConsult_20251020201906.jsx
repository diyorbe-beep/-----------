import React from 'react'
import { openJitsi } from '../utils/helpers.js'

const OnlineConsult = () => {
  return (
    <section id="consult" className="card" style={{ marginTop: '18px' }}>
      <h2>Online konsultatsiya</h2>
      <p className="muted">
        Video qo'ng'iroq orqali masofadan maslahat. <strong>Oldindan to'lov majburiy.</strong> Qadamlar:
      </p>
      <ol className="list">
        <li>
          <strong>1)</strong> Pastdagi <a href="#pay">To'lov</a> bo'limidan "Online konsultatsiya" xizmatini tanlab, to'lovni amalga oshiring.
        </li>
        <li>
          <strong>2)</strong> To'lov tranzaksiya raqamini oling (Click/Payme kvitansiya №).
        </li>
        <li>
          <strong>3)</strong> Quyidagi tugma orqali <em>Jitsi</em> xonasini oching yoki WhatsApp/Telegram orqali vaqtni tasdiqlang.
        </li>
      </ol>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
        <button className="btn" type="button" onClick={openJitsi}>
          Video xonani ochish
        </button>
        <a className="btn btn-outline" href="#appoint">Vaqtni band qilish</a>
      </div>
      <p className="muted" style={{ fontSize: '12px', marginTop: '8px' }}>
        Izoh: Jitsi havolasi brauzeringizda ochiladi. Telegram/WhatsApp orqali ham video qilish mumkin.
      </p>
    </section>
  )
}

export default OnlineConsult

