import React, { useState, useEffect } from 'react'
import { API_BASE, SERVICES } from '../../config/constants.js'
import { getAuthHeaders, saveServicesPrices } from '../../utils/storage.js'

const AdminPrices = ({ onPricesUpdate }) => {
  const [prices, setPrices] = useState({
    offline_primary: SERVICES.offline_primary.price,
    offline_follow: SERVICES.offline_follow.price,
    online_consult: SERVICES.online_consult.price
  })

  useEffect(() => {
    setPrices({
      offline_primary: SERVICES.offline_primary.price,
      offline_follow: SERVICES.offline_follow.price,
      online_consult: SERVICES.online_consult.price
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPrices(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || 0
    }))
  }

  const savePrices = async () => {
    if (Object.values(prices).some(isNaN)) {
      alert('Iltimos to\'g\'ri summa kiriting')
      return
    }

    try {
      const response = await fetch(API_BASE + '/api/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          offline_primary: { price: prices.offline_primary },
          offline_follow: { price: prices.offline_follow },
          online_consult: { price: prices.online_consult }
        })
      })

      if (!response.ok) throw new Error('save_fail')
    } catch (err) {
      // Fallback to local storage
      console.warn('Backend unavailable, saving locally')
    }

    // Update local SERVICES object
    SERVICES.offline_primary.price = prices.offline_primary
    SERVICES.offline_follow.price = prices.offline_follow
    SERVICES.online_consult.price = prices.online_consult

    saveServicesPrices({
      p1: prices.offline_primary,
      p2: prices.offline_follow,
      p3: prices.online_consult
    })

    if (onPricesUpdate) {
      onPricesUpdate()
    }

    alert('Narxlar yangilandi.')
  }

  return (
    <div>
      <h3>Narxlarni yangilash</h3>
      <div className="grid-3">
        <div>
          <label>Birlamchi ko'rik</label>
          <input
            name="offline_primary"
            type="number"
            min="0"
            value={prices.offline_primary}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Takroriy qabul</label>
          <input
            name="offline_follow"
            type="number"
            min="0"
            value={prices.offline_follow}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Online konsultatsiya</label>
          <input
            name="online_consult"
            type="number"
            min="0"
            value={prices.online_consult}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button className="btn" onClick={savePrices}>
          Saqlash
        </button>
      </div>
      <p className="muted" style={{ marginTop: '8px' }}>
        Saqlangach, sayt bo'ylab narxlar avtomatik yangilanadi.
      </p>
    </div>
  )
}

export default AdminPrices

