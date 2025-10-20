import React, { useState } from 'react'
import supabase from '../lib/supabase.js'

const ReviewForm = ({ bookingId, doctorId, patientId, onSuccess }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          booking_id: bookingId,
          patient_id: patientId,
          doctor_id: doctorId,
          rating: rating,
          comment: comment
        })

      if (error) throw error

      alert('Sharh qo\'shildi! Rahmat!')
      if (onSuccess) onSuccess()
    } catch (err) {
      alert(err.message || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ background: 'var(--bg-secondary)', marginTop: '16px' }}>
      <h4 style={{ marginBottom: '16px' }}>Sharh qoldirish</h4>
      
      <div style={{ marginBottom: '16px' }}>
        <label>Reyting *</label>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              style={{
                fontSize: '32px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                color: star <= rating ? 'var(--warning)' : 'var(--muted)'
              }}
            >
              {star <= rating ? '⭐' : '☆'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="comment">Izoh</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Xizmat sifati haqida fikr bildiring..."
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        className="btn"
        disabled={loading}
      >
        {loading ? 'Saqlanmoqda...' : 'Sharh qo\'shish'}
      </button>
    </form>
  )
}

export default ReviewForm

