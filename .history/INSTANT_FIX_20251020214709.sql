-- ⚡ INSTANT FIX - Supabase SQL Editor'ga copy-paste qiling
-- Bu SQL barcha muammolarni 1 minutda hal qiladi!

-- ============================================
-- 1. AUTO PROFILE TRIGGER (User ro'yxatdan o'tganda avtomatik profile)
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::user_role
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. RLS POLICIES (Ruxsatlar)
-- ============================================

-- Profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Doctors
DROP POLICY IF EXISTS "Doctors can insert own profile" ON doctors;
CREATE POLICY "Doctors can insert own profile"
  ON doctors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Doctors can update own profile" ON doctors;
CREATE POLICY "Doctors can update own profile"
  ON doctors FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 3. ESKI USER'LAR UCHUN PROFILE (agar kerak bo'lsa)
-- ============================================

-- Agar oldin ro'yxatdan o'tgan bo'lsangiz va profile yo'q bo'lsa
INSERT INTO public.profiles (id, full_name, role)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', u.email),
  COALESCE(u.raw_user_meta_data->>'role', 'patient')::user_role
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. EMAIL'LARNI TASDIQLASH (agar email confirmation yoqilgan bo'lsa)
-- ============================================

-- Barcha user'larni avtomatik tasdiqlash (Development only!)
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email_confirmed_at IS NULL;

-- ============================================
-- ✅ TAYYOR!
-- ============================================

SELECT 'All fixes applied! Try to register and login now!' as status;

