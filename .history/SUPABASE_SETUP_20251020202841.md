# Supabase Setup Guide - Doctor Consultation Platform

## 1. Supabase Project yaratish

1. [supabase.com](https://supabase.com) ga kiring
2. "New Project" tugmasini bosing
3. Project nomini kiriting: `doctor-consultation`
4. Database parolini yozing (ESLAB QOLMANG!)
5. Region tanlang (eng yaqin: Singapore yoki Mumbai)

---

## 2. Database Tables - SQL Schema

Supabase SQL Editoriga quyidagi kodlarni kiriting:

### 2.1 Users (Profiles) Table

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('patient', 'doctor');

-- Create enum for doctor verification status
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'patient',
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 2.2 Doctors Table

```sql
-- Doctors table (doctor-specific info)
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- Professional Info
  specialization TEXT NOT NULL,
  bio TEXT,
  experience_years INTEGER,
  education TEXT,
  languages TEXT[], -- Array: ['Uzbek', 'Russian', 'English']
  
  -- Verification
  verification_status verification_status DEFAULT 'pending',
  diploma_url TEXT, -- Diplom rasmi
  license_number TEXT,
  certificate_urls TEXT[], -- Array of certificate images
  
  -- Location
  clinic_name TEXT,
  clinic_address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Uzbekistan',
  
  -- Statistics
  total_consultations INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  
  -- Availability
  is_available BOOLEAN DEFAULT true,
  working_hours JSONB, -- {'monday': {'start': '09:00', 'end': '18:00'}, ...}
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Doctors are viewable by everyone"
  ON doctors FOR SELECT
  USING (verification_status = 'approved');

CREATE POLICY "Doctors can update own profile"
  ON doctors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert own profile"
  ON doctors FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 2.3 Services Table

```sql
-- Create enum for service types
CREATE TYPE service_type AS ENUM ('chat', 'video', 'live');

-- Services table (doctor services and pricing)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  
  service_type service_type NOT NULL,
  name TEXT NOT NULL, -- 'Chat Konsultatsiya', 'Video Konsultatsiya', etc.
  description TEXT,
  
  -- Pricing
  price_usd DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER, -- 20, 30, 60, etc.
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(doctor_id, service_type)
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Doctors can manage own services"
  ON services FOR ALL
  USING (doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()));
```

### 2.4 Bookings (Appointments) Table

```sql
-- Create enum for booking status
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL,
  
  -- Booking details
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status booking_status DEFAULT 'pending',
  
  -- Payment
  payment_status payment_status DEFAULT 'pending',
  amount_usd DECIMAL(10,2) NOT NULL,
  transaction_id TEXT,
  
  -- Notes
  patient_notes TEXT,
  doctor_notes TEXT,
  
  -- Meeting link (for video/live)
  meeting_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() IN (SELECT user_id FROM doctors WHERE id = doctor_id)
  );

CREATE POLICY "Patients can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (
    auth.uid() = patient_id OR 
    auth.uid() IN (SELECT user_id FROM doctors WHERE id = doctor_id)
  );
```

### 2.5 Reviews Table

```sql
-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Patients can create reviews for completed bookings"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = patient_id AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id 
      AND patient_id = auth.uid()
      AND status = 'completed'
    )
  );
```

### 2.6 Messages Table (Chat)

```sql
-- Messages table (for chat consultations)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view messages from own bookings"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id 
      AND (
        patient_id = auth.uid() OR 
        doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Users can send messages to own bookings"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id 
      AND (
        patient_id = auth.uid() OR 
        doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
      )
    )
  );
```

### 2.7 Triggers (Auto-update timestamps)

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 3. Storage Buckets

Supabase Storage'da quyidagi bucket'larni yarating:

### 3.1 Avatars Bucket
```sql
-- SQL Editor'da
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Policy
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 3.2 Documents Bucket (Diplomas, Certificates)
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false); -- Private

-- Policy
CREATE POLICY "Users can upload own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents' AND
    auth.jwt() ->> 'role' = 'admin'
  );
```

---

## 4. Environment Variables

`.env` faylini yarating:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Bu ma'lumotlarni Supabase Project Settings > API'dan oling!**

---

## 5. Supabase JavaScript Client

```bash
npm install @supabase/supabase-js
```

---

## 6. Test Data (Ixtiyoriy)

Test uchun sample data:

```sql
-- Sample doctor
INSERT INTO profiles (id, role, full_name, phone)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'doctor',
  'Dr. Qalandarov Dilmurod',
  '+998901234567'
);

INSERT INTO doctors (user_id, specialization, bio, experience_years, verification_status)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Kardiolog',
  'Tajribali yurak kasalliklari mutaxassisi',
  15,
  'approved'
);
```

---

## 7. Summary - Kerakli narsalar

### ✅ Database Tables:
1. `profiles` - Barcha foydalanuvchilar (Doctor/Patient)
2. `doctors` - Doctor profili va verification
3. `services` - Doctor xizmatlari va narxlari
4. `bookings` - Qabullar/Konsultatsiyalar
5. `reviews` - Sharhlar
6. `messages` - Chat xabarlari

### ✅ Storage Buckets:
1. `avatars` - Profil rasmlari (public)
2. `documents` - Diplom va sertifikatlar (private)

### ✅ Authentication:
- Supabase Auth (Email/Password)
- Role-based access (Doctor/Patient)

### ✅ Files:
- Row Level Security (RLS) policies
- Triggers for auto-updates
- Enums for statuses

---

## 8. Next Steps

1. ✅ SQL kodlarni Supabase'ga copy-paste qiling
2. ✅ Storage bucket'larni yarating
3. ✅ `.env` faylini sozlang
4. ✅ Frontend'dan Supabase client'ni ulang

**Barcha SQL kodlar tayyor! Copy-paste qilib Supabase SQL Editor'ga joylashtiring.** 🚀

