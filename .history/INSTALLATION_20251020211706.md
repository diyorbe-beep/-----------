# 📦 O'rnatish va Sozlash (To'liq Qo'llanma)

## 1️⃣ Loyihani yuklab olish

```bash
# Agar Git'dan clone qilsangiz:
git clone <repository-url>
cd doctor-consultation-platform

# Yoki ZIP'dan ochsangiz:
cd "Новая папка"
```

---

## 2️⃣ Dependencies o'rnatish

```bash
npm install
```

**O'rnatiladigan paketlar:**
- react (^18.2.0)
- react-dom (^18.2.0)
- react-router-dom (^6.20.0)
- @supabase/supabase-js (^2.39.0)
- vite (^5.0.8)
- @vitejs/plugin-react (^4.2.1)
- tslib (auto-installed)

---

## 3️⃣ Supabase Setup (5-10 daqiqa)

### A. Account yaratish

1. Browser'da oching: **https://supabase.com**
2. "Start your project" tugmasini bosing
3. GitHub yoki Google bilan sign up qiling
4. Email tasdiqlang

### B. Project yaratish

1. Dashboard'da **"New Project"** tugmasini bosing
2. **Organization:** Default yoki yangi yarating
3. **Project Name:** `doctor-consultation`
4. **Database Password:** 
   - Yaxshi, murakkab parol yarating
   - ⚠️ **Saqlab qo'ying!** Keyinchalik kerak bo'ladi
5. **Region:** 
   - Singapore (Asia Pacific - eng yaqin)
   - Mumbai (India - alternative)
6. **Pricing Plan:** **Free** (0$/month - 500MB database)
7. **"Create new project"** tugmasini bosing
8. ⏳ Kuting: 2-3 daqiqa (project yaratilmoqda)

### C. Database Tables yaratish

Project tayyor bo'lgach:

1. Sol menyu'dan **SQL Editor** ni tanlang
2. **"+ New query"** tugmasini bosing
3. `SUPABASE_SETUP.md` faylini code editor'da oching
4. **MUHIM:** SQL kodlarni **tartib bilan** kiriting:

**1) Extensions va Types (2.1 bo'lim):**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE user_role AS ENUM ('patient', 'doctor');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  ...
);
```

SQL Editor'ga paste qiling > **Run** tugmasini bosing > ✅ Success!

**2) Doctors table (2.2 bo'lim):**
```sql
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ...
);
```

**3) Services table (2.3 bo'lim)**
**4) Bookings table (2.4 bo'lim)**
**5) Reviews table (2.5 bo'lim)**
**6) Messages table (2.6 bo'lim)**
**7) Triggers (2.7 bo'lim)**

Har bir table uchun Run bosing va ✅ Success'ni kuting!

### D. Storage Buckets yaratish

1. Sol menyu'dan **Storage** ni tanlang
2. **"Create a new bucket"** tugmasini bosing

**Bucket 1 - Avatars:**
- Name: `avatars`
- Public bucket: ✅ **CHECKED** (avatarlar public)
- File size limit: 5MB
- Allowed MIME types: `image/*`
- **Create bucket**

**Bucket 2 - Documents:**
- Name: `documents`
- Public bucket: ❌ **UNCHECKED** (hujjatlar private)
- File size limit: 10MB  
- Allowed MIME types: `image/*,application/pdf`
- **Create bucket**

**Storage Policies qo'shish:**
SQL Editor'ga qaytib, `SUPABASE_SETUP.md` dagi **3.1 va 3.2 Storage Policies** ni run qiling

### E. Authentication sozlash (Ixtiyoriy)

Development uchun email confirmation'ni o'chirish:

1. **Authentication** > **Providers** > **Email**
2. **"Confirm email"** ni o'chiring (development uchun)
3. Save

---

## 4️⃣ Environment Variables

### A. Credentials olish

1. Supabase'da **Settings** > **API** ga o'ting
2. Quyidagilarni copy qiling:

**Project URL:**
```
https://abcdefghijklmno.supabase.co
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI...
```
(Juda uzun key, to'liq copy qiling!)

### B. .env faylni yaratish

Project root papkasida `.env` fayl yarating va paste qiling:

```env
VITE_SUPABASE_URL=https://abcdefghijklmno.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

**⚠️ Muhim:**
- Hech qanday qo'shtirnoq yoki probel qo'shmang
- To'g'ri key'larni kiriting
- Fayl nomini to'g'ri yozing: `.env` (`.env.txt` emas!)

---

## 5️⃣ Server'ni ishga tushirish

```bash
npm run dev
```

**Muvaffaqiyatli bo'lsa ko'rasiz:**
```
VITE v5.4.21  ready in 436 ms

➜  Local:   http://localhost:3000/
```

**Browser'da oching:** http://localhost:3000

Console'da xatolik bo'lmasligi kerak!

---

## 6️⃣ Test qilish

### A. Bemor sifatida test

1. **Register** tugmasini bosing
2. Full name: `Test Patient`
3. Email: `patient@test.com`
4. Role: **Bemor**
5. Password: `test123`
6. **Ro'yxatdan o'tish**

Email confirmation o'chirilgan bo'lsa, darhol login qilishingiz mumkin.

### B. Shifokor sifatida test

1. **Register** tugmasini bosing
2. Full name: `Dr. Test Doctor`
3. Email: `doctor@test.com`
4. Role: **Shifokor**
5. Password: `test123`
6. **Ro'yxatdan o'tish**

Login qiling > **"Profil yaratish"** tugmasini bosing

### C. Shifokorni tasdiqlash (Admin)

SQL Editor'da:

```sql
-- User ID ni topish
SELECT id, full_name, role FROM profiles WHERE role = 'doctor';

-- Doctor ID ni topish
SELECT id, user_id, verification_status FROM doctors;

-- Tasdiqlash
UPDATE doctors 
SET verification_status = 'approved' 
WHERE user_id = '<user-id>';
```

Yoki `/admin/verification` page'dan approve qiling

---

## 7️⃣ Xizmatlar qo'shish (Shifokor)

Doctor sifatida login qiling:

1. Dashboard > **"Xizmatlarni boshqarish"**
2. **"+ Xizmat qo'shish"** tugmasini bosing
3. Ma'lumotlarni to'ldiring:
   - **Service Type:** Chat / Video / Live
   - **Price:** $1, $10, yoki $50
   - **Duration:** 20, 30, yoki 60 daqiqa
4. **"Saqlash"**

---

## 8️⃣ Booking test qilish

Patient sifatida:

1. **Shifokorlar** page'ga o'ting
2. Shifokorni tanlang
3. Xizmatni tanlang
4. **"Band qilish"** tugmasini bosing
5. Sana va vaqt tanlang
6. **"Band qilish"** ni bosing

---

## ✅ Tayyor!

Platform to'liq ishlaydi:
- ✅ Login/Register
- ✅ Doctor profiles
- ✅ Service management
- ✅ Booking system
- ✅ File uploads
- ✅ Dark/Light themes
- ✅ Search & filter

---

## 🎯 Production uchun

### Environment Variables (Production)

Vercel/Netlify'da quyidagi environment variables'ni qo'shing:

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

### Build va Deploy

```bash
npm run build
```

Deploy qiling:
- **Vercel:** `vercel --prod`
- **Netlify:** `netlify deploy --prod`
- **Custom:** `dist/` papkani hostingga yuklang

---

## 🆘 Yordam

Muammo yuzaga kelsa:

1. `.env` faylni tekshiring
2. SQL kodlar to'liq kiritilganini tekshiring
3. Storage buckets yaratilganini tekshiring
4. Server'ni qayta ishga tushiring
5. `TROUBLESHOOTING` bo'limini o'qing

---

**Muvaffaqiyatlar!** 🎊

