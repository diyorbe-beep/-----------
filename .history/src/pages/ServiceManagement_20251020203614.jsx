import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { serviceHelpers } from '../lib/supabase.js'
import supabase from '../lib/supabase.js'

const ServiceManagement = () => {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [doctorId, setDoctorId] = useState(null)

  const [formData, setFormData] = useState({
    service_type: 'chat',
    name: '',
    description: '',
    price_usd: '',
    duration_minutes: ''
  })

  useEffect(() => {
    if (profile?.role !== 'doctor') {
      navigate('/')
      return
    }
    loadServices()
  }, [profile])

  const loadServices = async () => {
    try {
      // Get doctor ID first
      const { data: doctor } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (doctor) {
        setDoctorId(doctor.id)
        const servicesData = await serviceHelpers.getDoctorServices(doctor.id)
        setServices(servicesData || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-fill name based on service type
    if (name === 'service_type') {
      const names = {
        chat: 'Chat Konsultatsiya',
        video: 'Video Konsultatsiya',
        live: 'Jonli Konsultatsiya'
      }
      setFormData(prev => ({
        ...prev,
        name: names[value] || ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!doctorId) {
      alert('Avval shifokor profilini yarating')
      return
    }

    try {
      await serviceHelpers.createService(doctorId, {
        service_type: formData.service_type,
        name: formData.name,
        description: formData.description,
        price_usd: parseFloat(formData.price_usd),
        duration_minutes: parseInt(formData.duration_minutes),
        is_active: true
      })

      alert('Xizmat qo\'shildi!')
      setShowForm(false)
      setFormData({
        service_type: 'chat',
        name: '',
        description: '',
        price_usd: '',
        duration_minutes: ''
      })
      loadServices()
    } catch (err) {
      alert(err.message || 'Xatolik yuz berdi')
    }
  }

  const handleToggleActive = async (serviceId, currentStatus) => {
    try {
      await serviceHelpers.updateService(serviceId, {
        is_active: !currentStatus
      })
      loadServices()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </main>
    )
  }

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0 }}>Xizmatlar boshqaruvi</h1>
          <button 
            className="btn" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Bekor qilish' : '+ Xizmat qo\'shish'}
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginBottom: '24px', background: 'var(--bg-secondary)' }}>
            <h3>Yangi xizmat</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div>
                  <label htmlFor="service_type">Xizmat turi *</label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="chat">💬 Chat</option>
                    <option value="video">🎥 Video</option>
                    <option value="live">⚡ Live</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="name">Nomi *</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Chat Konsultatsiya"
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label htmlFor="description">Tavsif</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Xizmat haqida qisqacha ma'lumot..."
                  rows="3"
                />
              </div>

              <div className="grid-2" style={{ marginTop: '16px' }}>
                <div>
                  <label htmlFor="price_usd">Narx (USD) *</label>
                  <input
                    id="price_usd"
                    name="price_usd"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price_usd}
                    onChange={handleChange}
                    placeholder="10.00"
                    required
                  />
                  <small className="muted">Masalan: $1, $10, $50</small>
                </div>
                <div>
                  <label htmlFor="duration_minutes">Davomiyligi (daqiqa) *</label>
                  <input
                    id="duration_minutes"
                    name="duration_minutes"
                    type="number"
                    min="5"
                    step="5"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                    placeholder="30"
                    required
                  />
                  <small className="muted">Masalan: 20, 30, 60</small>
                </div>
              </div>

              <button type="submit" className="btn" style={{ marginTop: '16px' }}>
                Saqlash
              </button>
            </form>
          </div>
        )}

        <div>
          <h3>Mavjud xizmatlar ({services.length})</h3>
          {services.length === 0 ? (
            <p className="muted">Hozircha xizmatlar yo'q</p>
          ) : (
            <div className="list">
              {services.map(service => (
                <div key={service.id} className="card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 8px', fontSize: '18px' }}>
                        {service.service_type === 'chat' && '💬 '}
                        {service.service_type === 'video' && '🎥 '}
                        {service.service_type === 'live' && '⚡ '}
                        {service.name}
                      </h4>
                      {service.description && (
                        <p className="muted" style={{ margin: '0 0 8px', fontSize: '14px' }}>
                          {service.description}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="badge">{service.duration_minutes} daqiqa</span>
                        <span className="badge badge-success">${service.price_usd}</span>
                        <span className={`badge ${service.is_active ? 'badge-success' : 'badge-danger'}`}>
                          {service.is_active ? 'Faol' : 'Nofaol'}
                        </span>
                      </div>
                    </div>
                    <button 
                      className={`btn ${service.is_active ? 'btn-outline' : ''}`}
                      onClick={() => handleToggleActive(service.id, service.is_active)}
                    >
                      {service.is_active ? 'O\'chirish' : 'Yoqish'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ServiceManagement

