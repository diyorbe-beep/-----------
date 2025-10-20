import React, { createContext, useContext, useState, useEffect } from 'react'
import { authHelpers } from '../lib/supabase.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = authHelpers.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await loadUserProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await authHelpers.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        await loadUserProfile(currentUser.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId) => {
    try {
      const userProfile = await authHelpers.getUserProfile(userId)
      setProfile(userProfile)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const signUp = async (email, password, fullName, role = 'patient') => {
    setLoading(true)
    try {
      const data = await authHelpers.signUp({ email, password, fullName, role })
      
      // If user is immediately signed in, update local state
      if (data.user && data.session) {
        setUser(data.user)
        await loadUserProfile(data.user.id)
      }
      
      return data
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const data = await authHelpers.signIn({ email, password })
      return data
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await authHelpers.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isDoctor: profile?.role === 'doctor',
    isPatient: profile?.role === 'patient',
    reloadProfile: () => loadUserProfile(user?.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

