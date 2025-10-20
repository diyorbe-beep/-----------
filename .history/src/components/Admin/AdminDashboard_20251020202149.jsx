import React, { useState } from 'react'
import { setToken, setAdminAuth } from '../../utils/storage.js'
import { exportCSV } from '../../utils/helpers.js'
import { getAppointments } from '../../utils/storage.js'
import AdminAppointments from './AdminAppointments.jsx'
import AdminPrices from './AdminPrices.jsx'
import AdminPayments from './AdminPayments.jsx'

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('appts')

  const handleLogout = () => {
    setToken('')
    setAdminAuth(false)
    onLogout()
  }

  const handleExportCSV = () => {
    const appointments = getAppointments()
    exportCSV(appointments)
  }

  return (
    <div id="adminDash">
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button className="btn" onClick={() => setActiveTab('appts')}>
          Qabul so'rovlari
        </button>
        <button className="btn" onClick={() => setActiveTab('prices')}>
          Narxlar
        </button>
        <button className="btn" onClick={() => setActiveTab('payments')}>
          To'lovlar
        </button>
        <button className="btn btn-outline" onClick={handleExportCSV}>
          CSV eksport
        </button>
        <button className="btn btn-outline" onClick={handleLogout}>
          Chiqish
        </button>
      </div>

      {activeTab === 'appts' && (
        <div id="tab_appts" className="card">
          <h3>Qabul so'rovlari</h3>
          <AdminAppointments />
        </div>
      )}

      {activeTab === 'prices' && (
        <div id="tab_prices" className="card">
          <AdminPrices onPricesUpdate={() => {/* Could trigger a refresh if needed */}} />
        </div>
      )}

      {activeTab === 'payments' && (
        <div id="tab_payments" className="card">
          <AdminPayments />
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

