import React, { useState, useEffect } from 'react'
import { API_BASE, SERVICES } from '../../config/constants.js'
import { getAuthHeaders, getPayments, savePayments } from '../../utils/storage.js'

const AdminPayments = () => {
  const [payments, setPayments] = useState([])
  const [newPayment, setNewPayment] = useState({
    name: '',
    phone: '',
    service_key: 'online_consult',
    txn: '',
    amount: 0
  })

  const loadPayments = () => {
    const pmts = getPayments().sort((a, b) => (b.id || 0) - (a.id || 0))
    setPayments(pmts)
  }

  useEffect(() => {
    loadPayments()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPayment(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value, 10) || 0 : value
    }))
  }

  const addPayment = async () => {
    const paymentData = {
      ...newPayment,
      provider: 'manual'
    }

    try {
      const response = await fetch(API_BASE + '/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(paymentData)
      })

      if (!response.ok) throw new Error('post_fail')
    } catch (err) {
      // Fallback to localStorage
      const pmts = getPayments()
      pmts.push({ ...paymentData, id: Date.now() })
      savePayments(pmts)
    }

    setNewPayment({
      name: '',
      phone: '',
      service_key: 'online_consult',
      txn: '',
      amount: 0
    })

    loadPayments()
  }

  return (
    <div>
      <h3>To'lovlar (qo'lda kiritish / demo)</h3>
      <div className="grid-3">
        <div>
          <label>Ism</label>
          <input
            name="name"
            value={newPayment.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefon</label>
          <input
            name="phone"
            value={newPayment.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Xizmat</label>
          <select
            name="service_key"
            value={newPayment.service_key}
            onChange={handleChange}
          >
            <option value="offline_primary">Birlamchi ko'rik</option>
            <option value="offline_follow">Takroriy qabul</option>
            <option value="online_consult">Online konsultatsiya</option>
          </select>
        </div>
        <div>
          <label>Tranzaksiya №</label>
          <input
            name="txn"
            value={newPayment.txn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Summa</label>
          <input
            name="amount"
            type="number"
            value={newPayment.amount}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button className="btn" onClick={addPayment}>
          Qo'shish
        </button>
      </div>

      <div id="paymentsTable" className="list" style={{ marginTop: '12px' }}>
        {payments.length === 0 ? (
          <p className="muted">
            To'lovlar ro'yxati bo'sh. (Backend bilan ko'rish uchun GET /api/payments kerak bo'ladi.)
          </p>
        ) : (
          payments.map(p => (
            <div key={p.id} className="card" style={{ padding: '12px' }}>
              <div>
                <strong>{p.name}</strong> • {p.phone}
              </div>
              <div className="muted">
                Xizmat: {SERVICES[p.service_key]?.label || p.service_key} • 
                Summa: {(p.amount || 0).toLocaleString('uz-UZ')} so'm • 
                Txn: {p.txn || '—'}
              </div>
            </div>
          ))
        )}
      </div>
      <p className="muted">Eslatma: haqiqiy Payme/Click kvitansiyalari uchun backend webhook shart.</p>
    </div>
  )
}

export default AdminPayments

