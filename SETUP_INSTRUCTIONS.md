# Doctor Consultation Platform - Setup Instructions

## 🚀 Tez Boshlash

### 1. Dependencies o'rnatish

```bash
npm install
```

### 2. Supabase Project yaratish

1. [supabase.com](https://supabase.com/dashboard) ga kiring
2. "New Project" tugmasini bosing
3. Project nomi: `doctor-consultation`
4. Database parol yozing va saqlab qo'ying!
5. Region: Singapore yoki Mumbai (eng yaqin)

### 3. Database Setup

#### SQL Schema o'rnatish

`SUPABASE_SETUP.md` faylini oching va quyidagi tartibda SQL kodlarni Supabase SQL Editor'ga kiriting:

1. **Tables yaratish** (2.1 - 2.6 bo'limlar)
   - Profiles table
   - Doctors table
   - Services table
   - Bookings table
   - Reviews table
   - Messages table

2. **Triggers o'rnatish** (2.7 bo'lim)
   - Auto-update timestamps

3. **Storage Buckets** (3.1 - 3.2 bo'limlar)
   - Avatars bucket (public)
   - Documents bucket (private)

**Muhim:** SQL kodlarni tartib bilan kiriting! Bir bo'limni kiritganda xato bo'lmasa keyingisiga o'ting.

### 4. Environment Variables

`.env` fayl yarating (root papkada):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Qayerdan olish:**
1. Supabase Dashboard > Project Settings > API
2. "Project URL" ni copy qiling
3. "anon public" key ni copy qiling
4. `.env` fayliga joylashtiring

### 5. Ishga tushirish

```bash
npm run dev
```

Brauzerda: `http://localhost:3000`

---

## ✅ Tekshirish

### 1. Database tekshirish

Supabase Table Editor'da quyidagi table'lar bo'lishi kerak:
- ✅ profiles
- ✅ doctors
- ✅ services
- ✅ bookings
- ✅ reviews
- ✅ messages

### 2. Storage tekshirish

Supabase Storage'da quyidagi bucket'lar bo'lishi kerak:
- ✅ avatars (public)
- ✅ documents (private)

### 3. Authentication tekshirish

1. Saytni oching: `http://localhost:3000`
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Bemor yoki Shifokor sifatida ro'yxatdan o'ting
4. Email tasdiqlash uchun emailni tekshiring

---

## 🏥 Shifokor sifatida ishlash

### 1. Shifokor hisobi yaratish

1. Register page'ga o'ting
2. Rol: "Shifokor" ni tanlang
3. Ma'lumotlarni kiriting
4. Ro'yxatdan o'ting

### 2. Shifokor profili to'ldirish

Shifokor sifatida kirganingizdan keyin:
- Dashboard > Profil yaratish
- Diploma va sertifikatlarni yuklash
- Ixtisoslik, bio, tajriba yillarini kiritish
- Xizmatlarni qo'shish (chat, video, live)

### 3. Verification

Admin tomonidan tasdiqlangach, profilingiz bemorlarga ko'rinadi.

**Test uchun:** SQL Editor'da doctor'ning `verification_status`ni `approved` qiling:

```sql
UPDATE doctors 
SET verification_status = 'approved' 
WHERE user_id = 'your-user-id';
```

---

## 👤 Bemor sifatida ishlash

1. Register > Bemor sifatida ro'yxatdan o'ting
2. Shifokorlar ro'yxatini ko'ring
3. Shifokorni tanlang va xizmat booking qiling
4. To'lov qiling
5. Konsultatsiya vaqtida qatnashing

---

## 🎨 Theme (Dark/Light Mode)

Header'dagi Theme Toggle tugmasi:
- 🌙 Dark mode (default)
- ☀️ Light mode

Theme localStorage'da saqlanadi va qayta ochganda avtomatik yuklanadi.

---

## 🐛 Troubleshooting

### Xatolik: "Missing Supabase environment variables"

**Yechim:**
- `.env` fayli mavjudligini tekshiring
- `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` to'g'ri ekanligini tekshiring
- Server'ni qayta ishga tushiring: `npm run dev`

### Xatolik: "relation does not exist"

**Yechim:**
- SQL schema to'liq o'rnatilganligini tekshiring
- `SUPABASE_SETUP.md` faylidagi barcha SQL kodlarni kiriting

### Xatolik: "Row Level Security" xatosi

**Yechim:**
- RLS policies to'g'ri o'rnatilganligini tekshiring
- `SUPABASE_SETUP.md` faylidagi policy kodlarini kiriting

### Storage upload ishlamayapti

**Yechim:**
- Storage bucket'lar yaratilganligini tekshiring
- Policy'lar to'g'ri o'rnatilganligini tekshiring

---

## 📦 Production Deploy

### Vercel'ga deploy

```bash
npm run build
vercel --prod
```

Environment variables'ni Vercel dashboard'da qo'shing:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Netlify'ga deploy

```bash
npm run build
netlify deploy --prod
```

---

## 🆘 Yordam kerakmi?

1. `SUPABASE_SETUP.md` faylini qaytadan o'qing
2. Supabase documentation: https://supabase.com/docs
3. GitHub Issues'da savol bering

---

## ✨ Next Steps

Platform tayyor bo'lgach:

1. ✅ Test shifokorlar qo'shing
2. ✅ Test xizmatlar yarating
3. ✅ Test booking'lar yarating
4. ✅ Payment gateway ulang (Payme, Click)
5. ✅ Email notifications qo'shing
6. ✅ Admin panel yarating (verification uchun)

**Muvaffaqiyatlar! 🎉**

