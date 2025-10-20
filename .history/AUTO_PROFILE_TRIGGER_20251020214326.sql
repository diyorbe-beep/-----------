-- 🔥 Automatic Profile Creation Trigger
-- Bu trigger har safar yangi user ro'yxatdan o'tganda avtomatik profile yaratadi
-- Supabase SQL Editor'ga copy-paste qiling va RUN bosing

-- ============================================
-- 1. Function yaratish
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, full_name, role, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::user_role,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  );
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't fail
    RAISE WARNING 'Could not create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- ============================================
-- 2. Trigger yaratish
-- ============================================

-- O'chirib tashlash (agar mavjud bo'lsa)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Yangi trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. Test qilish
-- ============================================

-- Tekshirish: Trigger mavjudmi?
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Expected: 1 row returned

-- ============================================
-- 4. Eski user'lar uchun profile yaratish (agar kerak bo'lsa)
-- ============================================

-- Agar oldin user yaratgan bo'lsangiz va profile yo'q bo'lsa:
INSERT INTO public.profiles (id, full_name, role)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', 'User'),
  COALESCE(u.raw_user_meta_data->>'role', 'patient')::user_role
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
);

-- ============================================
-- ✅ TAYYOR!
-- ============================================

SELECT 'Auto profile creation trigger installed!' as status;

