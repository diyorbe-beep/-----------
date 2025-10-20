import React, { useState } from 'react'

const FileUpload = ({ onUpload, accept = 'image/*', label = 'Fayl yuklash', maxSize = 5 }) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')

    // Check file size (MB)
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`Fayl hajmi ${maxSize}MB dan kichik bo'lishi kerak`)
      return
    }

    // Show preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }

    // Upload
    setUploading(true)
    try {
      await onUpload(file)
    } catch (err) {
      setError(err.message || 'Yuklashda xatolik')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
        {label}
      </label>
      
      {preview && (
        <div style={{ marginBottom: '12px' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px', 
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)'
            }} 
          />
        </div>
      )}

      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: 'block', marginBottom: '8px' }}
      />

      {uploading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
          <span className="muted">Yuklanmoqda...</span>
        </div>
      )}

      {error && (
        <p style={{ color: 'var(--danger)', fontSize: '14px', marginTop: '8px' }}>
          {error}
        </p>
      )}

      <p className="muted" style={{ fontSize: '12px', marginTop: '4px' }}>
        Maksimal hajm: {maxSize}MB
      </p>
    </div>
  )
}

export default FileUpload

