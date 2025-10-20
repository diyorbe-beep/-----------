import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { doctorHelpers, storageHelpers } from '../lib/supabase.js'
import FileUpload from '../components/FileUpload.jsx'

const DoctorProfileSetup = () => {
  const { user, reloadProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    specialization: '',
    bio: '',
    experience_years: '',
    education: '',
    languages: 'O\'zbek, Rus',
    clinic_name: '',
    clinic_address: '',
    city: '',
    license_number: ''
  })

  const [diplomaUrl, setDiplomaUrl] = useState('')
  const [certificateUrls, setCertificateUrls] = useState([])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleDiplomaUpload = async (file) => {
    try {
      const url = await doctorHelpers.uploadDocument(user.id, file, 'diploma')
      setDiplomaUrl(url)
      alert('Diplom muvaffaqiyatli yuklandi!')
    } catch (err) {
      throw new Error('Diplom yuklashda xatolik')
    }
  }

  const handleCertificateUpload = async (file) => {
    try {
      const url = await doctorHelpers.uploadDocument(user.id, file, 'certificate')
      setCertificateUrls(prev => [...prev, url])
      alert('Sertifikat muvaffaqiyatli yuklandi!')
    } catch (err) {
      throw new Error('Sertifikat yuklashda xatolik')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!diplomaUrl) {
      setError('Diplom rasmini yuklang')
      setLoading(false)
      return
    }

    try {
      const languages = formData.languages.split(',').map(l => l.trim())
      
      await doctorHelpers.upsertDoctorProfile(user.id, {
        specialization: formData.specialization,
        bio: formData.bio,
        experience_years: parseInt(formData.experience_years),
        education: formData.education,
        languages: languages,
        clinic_name: formData.clinic_name,
        clinic_address: formData.clinic_address,
        city: formData.city,
        license_number: formData.license_number,
        diploma_url: diplomaUrl,
        certificate_urls: certificateUrls,
        verification_status: 'pending'
      })

      await reloadProfile()
      alert('Profil yaratildi! Administrator tekshirgach tasdiqlanadi.')
      navigate('/doctor/dashboard')
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Shifokor Profilini To'ldirish</h1>
        <p className="muted">
          Profilingiz administrator tomonidan tekshiriladi. Barcha ma'lumotlarni to'g'ri kiriting.
        </p>

        {error && (
          <div style={{ padding: '12px', background: 'var(--danger)', color: 'white', borderRadius: 'var(--radius-sm)', marginTop: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          <div className="grid-2">
            <div>
              <label htmlFor="specialization">Ixtisoslik *</label>
              <input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Kardiolog, Terapevt, ..."
                required
              />
            </div>
            <div>
              <label htmlFor="experience_years">Tajriba (yillar) *</label>
              <input
                id="experience_years"
                name="experience_years"
                type="number"
                min="0"
                value={formData.experience_years}
                onChange={handleChange}
                placeholder="10"
                required
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="bio">Bio *</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="O'zingiz haqingizda qisqacha ma'lumot..."
              rows="4"
              required
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="education">Ta'lim *</label>
            <input
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Toshkent Tibbiyot Akademiyasi, 2010"
              required
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="languages">Tillar (vergul bilan ajrating)</label>
            <input
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              placeholder="O'zbek, Rus, Ingliz"
            />
          </div>

          <div className="grid-2" style={{ marginTop: '16px' }}>
            <div>
              <label htmlFor="clinic_name">Klinika nomi</label>
              <input
                id="clinic_name"
                name="clinic_name"
                value={formData.clinic_name}
                onChange={handleChange}
                placeholder="Shifo Tibbiyot Markazi"
              />
            </div>
            <div>
              <label htmlFor="city">Shahar</label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Toshkent"
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="clinic_address">Klinika manzili</label>
            <input
              id="clinic_address"
              name="clinic_address"
              value={formData.clinic_address}
              onChange={handleChange}
              placeholder="Amir Temur ko'chasi, 123"
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="license_number">Litsenziya raqami</label>
            <input
              id="license_number"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              placeholder="L-123456"
            />
          </div>

          <div style={{ marginTop: '24px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
            <h3>Hujjatlar *</h3>
            
            <div style={{ marginTop: '16px' }}>
              <FileUpload
                label="Diplom (majburiy)"
                onUpload={handleDiplomaUpload}
                accept="image/*"
                maxSize={5}
              />
              {diplomaUrl && (
                <p style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px' }}>
                  ✓ Diplom yuklandi
                </p>
              )}
            </div>

            <div style={{ marginTop: '24px' }}>
              <FileUpload
                label="Sertifikatlar (ixtiyoriy, bir nechta yuklash mumkin)"
                onUpload={handleCertificateUpload}
                accept="image/*"
                maxSize={5}
              />
              {certificateUrls.length > 0 && (
                <p style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px' }}>
                  ✓ {certificateUrls.length} ta sertifikat yuklandi
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn"
            style={{ width: '100%', marginTop: '24px' }}
            disabled={loading}
          >
            {loading ? 'Saqlanmoqda...' : 'Profilni saqlash'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default DoctorProfileSetup

