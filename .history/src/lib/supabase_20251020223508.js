import { createClient } from '@supabase/supabase-js'

// Production credentials (hardcoded for deployment)
const PRODUCTION_URL = 'https://paiduofwlfpbukkhvoma.supabase.co'
const PRODUCTION_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaWR1b2Z3bGZwYnVra2h2b21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NjA1NDQsImV4cCI6MjA3NjUzNjU0NH0.tNTibkJT3MXty05nYpW0lscL5Jqkgvni_9FydvsB5VY'

// Get credentials from environment or use production defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || PRODUCTION_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || PRODUCTION_KEY

// Demo mode: only if credentials are truly missing
const isDemoMode = !supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'https://your-project.supabase.co' ||
  supabaseAnonKey === 'your-anon-key-here' ||
  supabaseUrl === 'undefined' ||
  supabaseAnonKey === 'undefined'

if (isDemoMode) {
  console.warn('⚠️ DEMO MODE: Supabase not configured. Some features will not work.')
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing')
} else {
  console.log('✅ Supabase connected successfully!')
  console.log('URL:', supabaseUrl)
}

export const supabase = isDemoMode 
  ? null 
  : createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for auth
export const authHelpers = {
  // Sign up
  async signUp({ email, password, fullName, role = 'patient' }) {
    if (!supabase) throw new Error('Supabase not configured. Please check .env file.')
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        }
      }
    })
    
    if (error) throw error
    
    // Create profile (will be done by database trigger or manually)
    // Note: User must be authenticated before creating profile
    if (data.user && data.session) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            role: role
          })
        
        if (profileError) {
          console.warn('Profile creation error (will retry on login):', profileError)
          // Don't throw error, profile will be created on first login
        }
      } catch (err) {
        console.warn('Profile creation failed, will retry on login')
      }
    }
    
    return data
  },

  // Sign in
  async signIn({ email, password }) {
    if (!supabase) throw new Error('Supabase not configured. Please check .env file.')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    if (!supabase) return
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    if (!supabase) return null
    
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get user profile with role
  async getUserProfile(userId) {
    if (!supabase) return null
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*, doctors(*)')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    if (!supabase) {
      // Return dummy subscription for demo mode
      return {
        data: { subscription: { unsubscribe: () => {} } }
      }
    }
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Helper functions for doctors
export const doctorHelpers = {
  // Get all approved doctors
  async getDoctors({ limit = 10, offset = 0 } = {}) {
    if (!supabase) return []
    
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url
        ),
        services (*)
      `)
      .eq('verification_status', 'approved')
      .eq('is_available', true)
      .range(offset, offset + limit - 1)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get single doctor
  async getDoctor(doctorId) {
    if (!supabase) return null
    
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          phone
        ),
        services (*),
        reviews (
          rating,
          comment,
          created_at,
          profiles:patient_id (
            full_name,
            avatar_url
          )
        )
      `)
      .eq('id', doctorId)
      .single()
    
    if (error) throw error
    return data
  },

  // Create/Update doctor profile
  async upsertDoctorProfile(userId, doctorData) {
    if (!supabase) throw new Error('Supabase not configured')
    
    const { data, error } = await supabase
      .from('doctors')
      .upsert({
        user_id: userId,
        ...doctorData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Upload doctor document
  async uploadDocument(userId, file, type = 'diploma') {
    if (!supabase) throw new Error('Supabase not configured')
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${type}_${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)
    
    return publicUrl
  }
}

// Helper functions for services
export const serviceHelpers = {
  // Create service
  async createService(doctorId, serviceData) {
    if (!supabase) throw new Error('Supabase not configured')
    
    const { data, error } = await supabase
      .from('services')
      .insert({
        doctor_id: doctorId,
        ...serviceData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update service
  async updateService(serviceId, updates) {
    if (!supabase) throw new Error('Supabase not configured')
    
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get doctor services
  async getDoctorServices(doctorId) {
    if (!supabase) return []
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('is_active', true)
    
    if (error) throw error
    return data
  }
}

// Helper functions for bookings
export const bookingHelpers = {
  // Create booking
  async createBooking(bookingData) {
    if (!supabase) throw new Error('Supabase not configured')
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select(`
        *,
        doctor:doctor_id (
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        ),
        service:service_id (*)
      `)
      .single()
    
    if (error) throw error
    return data
  },

  // Get user bookings
  async getUserBookings(userId, role) {
    if (!supabase) return []
    
    let query = supabase
      .from('bookings')
      .select(`
        *,
        doctor:doctor_id (
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        ),
        patient:patient_id (
          full_name,
          avatar_url
        ),
        service:service_id (*)
      `)
      .order('scheduled_at', { ascending: false })
    
    if (role === 'patient') {
      query = query.eq('patient_id', userId)
    } else {
      // Get doctor's ID first
      const { data: doctor } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', userId)
        .single()
      
      if (doctor) {
        query = query.eq('doctor_id', doctor.id)
      }
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    if (!supabase) throw new Error('Supabase not configured')
    
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Helper functions for storage
export const storageHelpers = {
  // Upload avatar
  async uploadAvatar(userId, file) {
    if (!supabase) throw new Error('Supabase not configured')
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/avatar.${fileExt}`
    
    // Remove old avatar if exists
    await supabase.storage
      .from('avatars')
      .remove([`${userId}/avatar.jpg`, `${userId}/avatar.png`, `${userId}/avatar.jpeg`])
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
    
    // Update profile
    await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)
    
    return publicUrl
  }
}

export default supabase

