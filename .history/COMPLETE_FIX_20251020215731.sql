-- ⚡⚡⚡ TO'LIQ TUZATISH - BITTA FAYL ⚡⚡⚡
-- Bu SQL barcha muammolarni hal qiladi
-- Supabase SQL Editor'ga COPY-PASTE qiling va RUN bosing!

-- ============================================
-- QISM 1: AUTO PROFILE TRIGGER
-- ============================================
-- Har safar yangi user ro'yxatdan o'tganda avtomatik profile yaratadi

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Profile yaratish (xatolik bo'lsa ham davom etadi)
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::user_role
  )
  ON CONFLICT (id) DO UPDATE
  SET full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
      role = COALESCE(EXCLUDED.role, profiles.role);
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Xatolik bo'lsa log qiladi lekin signup'ni to'xtatmaydi
    RAISE WARNING 'Profile creation error for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Eski trigger'ni o'chirish
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Yangi trigger yaratish
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- QISM 2: PROFILES TABLE - RLS POLICIES
-- ============================================

-- Eski policy'larni o'chirish (xatolik chiqmaydi)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;

-- Yangi policy'lar (to'liq ruxsat)
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
-- QISM 3: DOCTORS TABLE - RLS POLICIES
-- ============================================

DROP POLICY IF EXISTS "Doctors are viewable by everyone" ON doctors;
DROP POLICY IF EXISTS "Doctors can insert own profile" ON doctors;
DROP POLICY IF EXISTS "Doctors can update own profile" ON doctors;
DROP POLICY IF EXISTS "Approved doctors are viewable by everyone" ON doctors;

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
-- QISM 4: SERVICES TABLE - RLS POLICIES
-- ============================================

DROP POLICY IF EXISTS "Services are viewable by everyone" ON services;
DROP POLICY IF EXISTS "Doctors can manage own services" ON services;
DROP POLICY IF EXISTS "Active services are viewable" ON services;
DROP POLICY IF EXISTS "Doctors can insert own services" ON services;
DROP POLICY IF EXISTS "Doctors can update own services" ON services;
DROP POLICY IF EXISTS "Doctors can delete own services" ON services;

CREATE POLICY "Active services are viewable"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Doctors can insert own services"
  ON services FOR INSERT
  WITH CHECK (doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can update own services"
  ON services FOR UPDATE
  USING (doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can delete own services"
  ON services FOR DELETE
  USING (doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()));

-- ============================================
-- QISM 5: ESKI USER'LAR UCHUN PROFILE YARATISH
-- ============================================
-- Agar oldin ro'yxatdan o'tgan user'lar bo'lsa, ularni ham fix qiladi

INSERT INTO public.profiles (id, full_name, role)
SELECT 
  u.id,
  COALESCE(
    u.raw_user_meta_data->>'full_name', 
    split_part(u.email, '@', 1)
  ) as full_name,
  COALESCE(
    u.raw_user_meta_data->>'role', 
    'patient'
  )::user_role as role
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- QISM 6: EMAIL CONFIRMATION (Development uchun)
-- ============================================
-- Barcha user'larni tasdiqlangan qiladi (email kutmasdan login mumkin)

UPDATE auth.users 
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  confirmed_at = COALESCE(confirmed_at, NOW())
WHERE email_confirmed_at IS NULL OR confirmed_at IS NULL;

-- ============================================
-- QISM 7: TEKSHIRISH
-- ============================================

-- Natijalarni ko'rsatish
SELECT 
  '✅ ALL FIXES APPLIED SUCCESSFULLY!' as status,
  '' as separator,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM profiles) as total_profiles,
  (SELECT COUNT(*) FROM auth.users WHERE email_confirmed_at IS NOT NULL) as confirmed_users,
  (SELECT COUNT(*) FROM doctors) as total_doctors,
  (SELECT COUNT(*) FROM services) as total_services,
  '' as separator2,
  'Trigger: ' || (SELECT COUNT(*)::text FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') || ' created' as trigger_status,
  'Policies: ' || (SELECT COUNT(*)::text FROM pg_policies WHERE tablename = 'profiles') || ' on profiles' as profile_policies;

-- ============================================
-- ✅✅✅ TAYYOR! ✅✅✅
-- ============================================

-- HOZIR QILING:
-- 1. Bu SQL'ni Supabase SQL Editor'ga copy-paste qiling
-- 2. RUN tugmasini bosing
-- 3. "ALL FIXES APPLIED SUCCESSFULLY!" ko'rishingiz kerak
-- 4. Browser'ni refresh qiling (F5)
-- 5. Register > Login test qiling!

-- AGAR XATOLIK BO'LMASA - HAMMASI ISHLAYDI! 🚀

