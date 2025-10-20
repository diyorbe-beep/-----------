import React, { useState } from 'react'

const DoctorSearch = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    search: '',
    specialization: '',
    minRating: ''
  })

  const specializations = [
    'Kardiolog',
    'Terapevt',
    'Pediatr',
    'Dermatolog',
    'Nevrolog',
    'Oftalmolog',
    'Ginekolog',
    'Urolog',
    'Endokrinolog',
    'Psixiatr',
    'Travmatolog'
  ]

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    }
    setFilters(newFilters)
    onSearch(newFilters)
  }

  const handleClear = () => {
    const cleared = {
      search: '',
      specialization: '',
      minRating: ''
    }
    setFilters(cleared)
    onSearch(cleared)
  }

  return (
    <div className="card search-card" style={{ marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '16px' }}>🔍 Qidiruv va filter</h3>
      
      <div className="search-grid">
        <div>
          <label htmlFor="search">Qidiruv</label>
          <input
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={handleChange}
            placeholder="Shifokor ismi..."
          />
        </div>

        <div>
          <label htmlFor="specialization">Ixtisoslik</label>
          <select
            id="specialization"
            name="specialization"
            value={filters.specialization}
            onChange={handleChange}
          >
            <option value="">Barchasi</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="minRating">Minimal reyting</label>
          <select
            id="minRating"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
          >
            <option value="">Barchasi</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4.0">⭐ 4.0+</option>
            <option value="3.5">⭐ 3.5+</option>
            <option value="3.0">⭐ 3.0+</option>
          </select>
        </div>
      </div>

      {(filters.search || filters.specialization || filters.minRating) && (
        <button 
          className="btn btn-outline" 
          onClick={handleClear}
          style={{ marginTop: '16px', width: '100%' }}
        >
          Filterni tozalash
        </button>
      )}
    </div>
  )
}

export default DoctorSearch

