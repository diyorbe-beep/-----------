# 🚀 Tez Boshlash (Quick Start)

## Variant 1: DEMO Mode (hozir ishga tushirish) ⚡

Supabase sozlamasdan platformani ko'rish uchun:

```bash
npm run dev
```

**Demo mode'da:**
- ✅ UI/UX ko'rish mumkin
- ✅ Dark/Light mode ishlaydi
- ✅ Routing ishlaydi
- ❌ Login/Register ishlamaydi (Supabase kerak)
- ❌ Database features ishlamaydi

**Browser console'da ko'rasiz:**
```
⚠️ DEMO MODE: Supabase not configured. Some features will not work.
```

---

## Variant 2: To'liq versiya (Supabase bilan) 🔥

### 1. Supabase Account yaratish

1. **https://supabase.com** ga o'ting
2. "Start your project" tugmasini bosing
3. GitHub/Google bilan sign up qiling (bepul!)

### 2. Project yaratish

1. Dashboard'da "New Project" tugmasini bosing
2. Project nomi: `doctor-consultation`
3. Database parol: **Yaxshi parol kiriting va saqlab qo'ying!**
4. Region: **Singapore** yoki **Mumbai** (eng yaqin)
5. Plan: **Free** (0$)
6. "Create new project" tugmasini bosing
7. 2-3 daqiqa kuting (project yaratilmoqda...)

### 3. Database sozlash

Project tayyor bo'lgach:

1. Sol menyu'dan **SQL Editor** ni tanlang
2. "New query" tugmasini bosing
3. `SUPABASE_SETUP.md` faylini oching
4. **2.1 Profiles table** dan boshlab SQL kodlarni **tartib bilan** copy-paste qiling:

```sql
-- Birinchi: Extensions va enums
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE user_role AS ENUM ('patient', 'doctor');
-- ... davomi
```

5. Har bir bo'limni (2.1, 2.2, 2.3, ...) alohida run qiling
6. ✅ belgisi chiqsa - muvaffaqiyatli!
7. ❌ xatolik chiqsa - kodni tekshiring va qaytadan urining

### 4. Storage Buckets yaratish

1. Sol menyu'dan **Storage** ni tanlang
2. "Create new bucket" tugmasini bosing

**Birinchi bucket:**
- Name: `avatars`
- Public bucket: ✅ **true** (avatarlar public bo'lishi kerak)
- Create bucket

**Ikkinchi bucket:**
- Name: `documents`
- Public bucket: ❌ **false** (hujjatlar private)
- Create bucket

**Storage policies qo'shish:**
SQL Editor'ga qaytib, `SUPABASE_SETUP.md` dagi **3.1 va 3.2 Storage Policies** ni run qiling

### 5. Credentials olish

1. Sol menyu'dan **Settings** > **API** ga o'ting
2. **Project URL** ni copy qiling
   - Misol: `https://abcxyz123.supabase.co`
3. **anon public** key ni copy qiling (juda uzun key)
   - Misol: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 6. .env faylni yangilash

`.env` faylini oching va o'zingizning credentials'larni kiriting:

```env
VITE_SUPABASE_URL=https://abcxyz123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

### 7. Server'ni qayta ishga tushirish

```bash
# Agar server ishlayotgan bo'lsa, Ctrl+C bosing
npm run dev
```

### 8. Test qilish ✅

1. Browser'da **http://localhost:3000** ni oching
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Bemor yoki Shifokor sifatida ro'yxatdan o'ting
4. Email tasdiqlash xabarini tekshiring

**Diqqat:** Supabase email confirmation default'da yoqilgan. Development uchun o'chirib qo'yishingiz mumkin:
- Settings > Authentication > Email Auth > **Confirm email** ni o'chiring

---

## ❓ Troubleshooting

### 1. "relation does not exist" xatosi
**Yechim:** SQL kodlarni to'liq kiritmadingiz. `SUPABASE_SETUP.md` ni qaytadan ko'ring.

### 2. "Missing Supabase environment variables"
**Yechim:** 
- `.env` fayl bor-yo'qligini tekshiring
- `.env` da credentials to'g'ri kiritilganini tekshiring
- Server'ni qayta ishga tushiring

### 3. Storage upload ishlamayapti
**Yechim:**
- Storage buckets yaratilganini tekshiring
- Storage policies qo'shilganini tekshiring

### 4. Email confirmation kelmayapti
**Yechim:**
- Spam papkani tekshiring
- Yoki Settings > Authentication'da email confirmation'ni o'chiring

---

## 🎯 Keyingi qadamlar

Supabase sozlangandan keyin:

1. **Shifokor test qilish:**
   - Register > Doctor role
   - Profile yaratish > Diplom yuklash
   - SQL Editor'da: `UPDATE doctors SET verification_status = 'approved' WHERE user_id = 'your-id'`
   - Xizmatlar qo'shish

2. **Bemor test qilish:**
   - Register > Patient role
   - Shifokorlarni ko'rish
   - Booking qilish

3. **Admin panel:**
   - `/admin/verification` ga o'ting

---

## 📞 Yordam kerakmi?

- `SUPABASE_SETUP.md` - To'liq SQL setup
- `SETUP_INSTRUCTIONS.md` - Batafsil qo'llanma
- `README.md` - Loyiha haqida

---

**Muvaffaqiyatlar!** 🚀

