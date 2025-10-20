import React, { useState, useEffect } from 'react'
import { SERVICES } from '../config/constants.js'
import { startPayment } from '../utils/helpers.js'

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    service: 'online_consult',
    name: '',
    phone: ''
  })

  const [amount, setAmount] = useState(SERVICES.online_consult.price)

  useEffect(() => {
    setAmount(SERVICES[paymentData.service].price)
  }, [paymentData.service])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePayment = (provider) => {
    const service = SERVICES[paymentData.service]
    startPayment(provider, paymentData.service, service, paymentData.name, paymentData.phone)
  }

  return (
    <section id="pay" className="card" style={{ marginTop: '18px' }}>
      <h2>To'lov</h2>
      <p className="muted">
        Iltimos, xizmatni tanlab, oldindan to'lovni bajaring. Band qilingan vaqt faqat to'lovdan so'ng tasdiqlanadi.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="list">
        <div className="grid-2">
          <div>
            <label htmlFor="pay_service">Xizmat</label>
            <select
              id="pay_service"
              name="service"
              value={paymentData.service}
              onChange={handleChange}
            >
              <option value="online_consult">Online konsultatsiya (Video)</option>
              <option value="offline_primary">Birlamchi ko'rik (Offline)</option>
              <option value="offline_follow">Takroriy qabul (Offline)</option>
            </select>
          </div>
          <div>
            <label htmlFor="pay_name">Ism Familiya</label>
            <input
              id="pay_name"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              placeholder="Ali Valiyev"
            />
          </div>
        </div>
        <div className="grid-2">
          <div>
            <label htmlFor="pay_phone">Telefon</label>
            <input
              id="pay_phone"
              name="phone"
              value={paymentData.phone}
              onChange={handleChange}
              placeholder="99890xxxxxxx"
            />
          </div>
          <div>
            <label>To'lov summasi</label>
            <div className="kpi">
              <div className="item">
                <div className="n">{amount.toLocaleString('uz-UZ')}</div>
                <div className="muted">so'm</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn" type="button" onClick={() => handlePayment('payme')}>
            Payme
          </button>
          <button className="btn" type="button" onClick={() => handlePayment('click')}>
            Click
          </button>
          <button className="btn btn-outline" type="button" onClick={() => handlePayment('manual')}>
            Bank o'tkazma / Naqd ofisda
          </button>
        </div>
        <p className="muted" style={{ fontSize: '12px' }}>
          To'lov muvaffaqiyatli bo'lgach, kvitansiya № ni saqlab qo'ying va <a href="#appoint">band qilish</a> formasiga kiriting.
        </p>
      </form>
    </section>
  )
}

export default Payment

