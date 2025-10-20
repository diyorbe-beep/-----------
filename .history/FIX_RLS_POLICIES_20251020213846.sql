-- 🔧 RLS Policies Tuzatish
-- Supabase SQL Editor'ga copy-paste qiling

-- ============================================
-- 1. PROFILES TABLE POLICIES (Tuzatish)
-- ============================================

-- Avvalgi policy'larni o'chirish
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Yangi policy'lar (to'liq ruxsat bilan)
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- 2. DOCTORS TABLE POLICIES (Tuzatish)
-- ============================================

-- Avvalgi policy'larni o'chirish
DROP POLICY IF EXISTS "Doctors are viewable by everyone" ON doctors;
DROP POLICY IF EXISTS "Doctors can update own profile" ON doctors;
DROP POLICY IF EXISTS "Doctors can insert own profile" ON doctors;

-- Yangi policy'lar
CREATE POLICY "Approved doctors are viewable by everyone"
  ON doctors FOR SELECT
  USING (verification_status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Doctors can insert own profile"
  ON doctors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Doctors can update own profile"
  ON doctors FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 3. SERVICES TABLE POLICIES (Tuzatish)
-- ============================================

DROP POLICY IF EXISTS "Services are viewable by everyone" ON services;
DROP POLICY IF EXISTS "Doctors can manage own services" ON services;

CREATE POLICY "Active services are viewable by everyone"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Doctors can insert own services"
  ON services FOR INSERT
  WITH CHECK (
    doctor_id IN (
      SELECT id FROM doctors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can update own services"
  ON services FOR UPDATE
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can delete own services"
  ON services FOR DELETE
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- 4. BOOKINGS TABLE POLICIES (Tuzatish)
-- ============================================

DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Patients can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() IN (SELECT user_id FROM doctors WHERE id = doctor_id)
  );

CREATE POLICY "Patients can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Booking participants can update"
  ON bookings FOR UPDATE
  USING (
    auth.uid() = patient_id OR 
    auth.uid() IN (SELECT user_id FROM doctors WHERE id = doctor_id)
  );

-- ============================================
-- 5. REVIEWS TABLE POLICIES (Tuzatish)
-- ============================================

DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
DROP POLICY IF EXISTS "Patients can create reviews for completed bookings" ON reviews;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Patients can create reviews"
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

-- ============================================
-- 6. MESSAGES TABLE POLICIES (Tuzatish)
-- ============================================

DROP POLICY IF EXISTS "Users can view messages from own bookings" ON messages;
DROP POLICY IF EXISTS "Users can send messages to own bookings" ON messages;

CREATE POLICY "Booking participants can view messages"
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

CREATE POLICY "Booking participants can send messages"
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

-- ============================================
-- TAYYOR! ✅
-- ============================================

-- Test qiling:
SELECT 'RLS Policies successfully updated!' as status;

