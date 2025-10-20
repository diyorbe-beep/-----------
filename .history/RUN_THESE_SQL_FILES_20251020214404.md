# 🎯 BU SQL FAYLLARNI RUN QILING!

**Supabase SQL Editor'da quyidagilarni tartib bilan run qiling:**

---

## 1️⃣ AUTO_PROFILE_TRIGGER.sql

**Maqsad:** Yangi user ro'yxatdan o'tganda avtomatik profile yaratish

**Nima qiladi:**
- User signup qilganda
- Avtomatik `profiles` table'ga qo'shadi
- Email confirmation kutish shart emas

**Qanday:**
1. `AUTO_PROFILE_TRIGGER.sql` faylni oching
2. BARCHA kodini copy qiling (140+ lines)
3. Supabase SQL Editor'ga paste qiling
4. **RUN** ▶️ bosing

**Expected result:**
```
✅ Auto profile creation trigger installed!
```

---

## 2️⃣ FIX_RLS_POLICIES.sql

**Maqsad:** Row Level Security policies'ni tuzatish

**Nima qiladi:**
- User'lar o'z profillarini yarata oladi
- Doctor'lar o'z ma'lumotlarini update qila oladi
- Ruxsatlar to'g'ri ishlaydi

**Qanday:**
1. `FIX_RLS_POLICIES.sql` faylni oching
2. BARCHA kodini copy qiling (180+ lines)
3. SQL Editor'ga paste qiling
4. **RUN** ▶️ bosing

**Expected result:**
```
✅ RLS Policies successfully updated!
```

---

## 🔍 Tekshirish

### Policies mavjudligini tekshirish:

```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Ko'rishingiz kerak:**

```
profiles | Public profiles are viewable by everyone
profiles | Users can insert own profile
profiles | Users can update own profile
doctors  | Approved doctors are viewable by everyone
doctors  | Doctors can insert own profile
doctors  | Doctors can update own profile
... va hokazo
```

### Trigger mavjudligini tekshirish:

```sql
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

**Expected:**
```
on_auth_user_created | users
```

---

## ⚠️ MUHIM!

**Ikkala SQL faylni ham run qilishingiz SHART:**

1. ✅ AUTO_PROFILE_TRIGGER.sql - Profile avtomatik yaratish uchun
2. ✅ FIX_RLS_POLICIES.sql - Ruxsatlar uchun

**Agar faqat bittasini run qilsangiz - ishlamaydi!**

---

## 📝 Quick Copy-Paste

Agar fayllarni ochish qiyin bo'lsa, qisqa versiya:

### Minimal Fix (60 seconds):

```sql
-- 1. Auto profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::user_role
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Profile INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. Test
SELECT 'Quick fix applied!' as status;
```

**Run qiling!** ▶️

---

## ✅ Success Criteria:

Agar hammasi to'g'ri bo'lsa:

1. Register page'da yangi user yarating
2. Darhol login qilishingiz mumkin (email kutmasdan)
3. Profile avtomatik yaratiladi
4. Dashboard ochiladi
5. Console'da xatolik yo'q

---

**Hozir Supabase'ga o'ting va SQL kodlarni run qiling! 🚀**

1. SQL Editor oching
2. AUTO_PROFILE_TRIGGER.sql ni run qiling
3. FIX_RLS_POLICIES.sql ni run qiling
4. Test qiling!

**GO! GO! GO!** 💪

