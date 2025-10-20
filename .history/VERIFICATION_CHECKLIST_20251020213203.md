# ✅ Verification Checklist - Platformani Tekshirish

## 1. Supabase Database ✅

### Tables tekshirish:

Supabase Dashboard > **Table Editor** ga o'ting va quyidagilar borligini tekshiring:

- [ ] **profiles** table
- [ ] **doctors** table
- [ ] **services** table
- [ ] **bookings** table
- [ ] **reviews** table
- [ ] **messages** table

**Agar yo'q bo'lsa:** `SUPABASE_SETUP.md` dagi SQL kodlarni qayta run qiling

### Storage Buckets tekshirish:

Supabase Dashboard > **Storage** ga o'ting:

- [ ] **avatars** bucket (public)
- [ ] **documents** bucket (private)

**Agar yo'q bo'lsa:** Storage'da "Create bucket" qiling

---

## 2. Environment Variables ✅

`.env` fayli borligini tekshiring (root papkada):

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**Tekshirish:**
- [ ] `.env` fayli mavjud
- [ ] VITE_SUPABASE_URL to'g'ri (https bilan)
- [ ] VITE_SUPABASE_ANON_KEY to'g'ri (juda uzun)
- [ ] Hech qanday qo'shtirnoq yo'q

**Credentials olish:**
1. Supabase > Settings > API
2. "Project URL" ni copy
3. "anon public" key ni copy

---

## 3. Server Running ✅

Terminal'da:

```bash
npm run dev
```

**Muvaffaqiyatli bo'lsa ko'rasiz:**
```
VITE v5.4.21  ready in 436 ms
➜  Local:   http://localhost:3000/
```

**Xatolik bo'lmasligi kerak!**

Browser console'da (F12):
- [ ] ⚠️ Demo Mode warning **YO'Q** bo'lishi kerak
- [ ] Xatoliklar yo'q bo'lishi kerak

---

## 4. Frontend Test ✅

### A. Home Page

**URL:** http://localhost:3000

Tekshirish:
- [ ] Page ochildi
- [ ] Hero section ko'rinadi
- [ ] "Shifokorlar" button ishlaydi
- [ ] Demo warning **YO'Q**

### B. Theme Toggle

Header'dagi theme button:
- [ ] 🌙 Dark mode (default)
- [ ] ☀️ Light mode switch ishlaydi
- [ ] Theme saqlanadi (page refresh qiling)

### C. Navigation

- [ ] "Shifokorlar" link ishlaydi
- [ ] "Qanday ishlaydi" link ishlaydi
- [ ] "Haqida" link ishlaydi
- [ ] "Kirish" button ko'rinadi
- [ ] "Ro'yxatdan o'tish" button ko'rinadi

---

## 5. Authentication Test ✅

### A. Register (Bemor)

**URL:** http://localhost:3000/register

1. To'liq ism: `Test Bemor`
2. Email: `bemor@test.com`
3. Rol: **Bemor**
4. Parol: `test123`
5. Parol tasdiqlash: `test123`
6. **Ro'yxatdan o'tish** bosing

**Natija:**
- [ ] Success message
- [ ] Login page'ga redirect
- [ ] Email verification (agar yoqilgan bo'lsa)

### B. Login

**URL:** http://localhost:3000/login

1. Email: `bemor@test.com`
2. Parol: `test123`
3. **Kirish** bosing

**Natija:**
- [ ] Login successful
- [ ] Redirect to `/doctors`
- [ ] Header'da "Dashboard" link paydo bo'ldi
- [ ] Avatar ko'rinadi (agar yuklangan bo'lsa)

### C. Register (Shifokor)

Logout qiling > Register:

1. To'liq ism: `Dr. Test Shifokor`
2. Email: `doctor@test.com`
3. Rol: **Shifokor**
4. Parol: `test123`
5. **Ro'yxatdan o'tish**

---

## 6. Doctor Flow Test ✅

Doctor sifatida login qiling:

### A. Dashboard

**URL:** http://localhost:3000/doctor/dashboard

Tekshiring:
- [ ] "Profil yaratish" tugmasi ko'rinadi (yangi doctor uchun)
- [ ] Statistika ko'rinadi (0/0/0)

### B. Profile Setup

"Profil yaratish" tugmasini bosing:

1. Ixtisoslik: `Kardiolog`
2. Tajriba: `10`
3. Bio: `Professional kardiolog...`
4. Ta'lim: `Toshkent Tibbiyot Akademiyasi`
5. Klinika: `Shifo Markazi`
6. Shahar: `Toshkent`

**Diplom yuklash:**
- [ ] Fayl tanlash ishlaydi
- [ ] Preview ko'rinadi
- [ ] "✓ Diplom yuklandi" xabari chiqadi

**Saqlash:**
- [ ] Success alert
- [ ] Redirect to dashboard

### C. Verification

**SQL Editor'da:**

```sql
-- User ID topish
SELECT id, full_name FROM profiles WHERE role = 'doctor';

-- Tasdiqlash
UPDATE doctors 
SET verification_status = 'approved' 
WHERE user_id = '<your-user-id>';
```

Yoki `/admin/verification` page'dan approve qiling

### D. Service Management

**URL:** http://localhost:3000/doctor/services

**Xizmat 1 - Chat:**
- Service type: Chat
- Price: `1`
- Duration: `20`
- **Saqlash**

**Xizmat 2 - Video:**
- Service type: Video
- Price: `10`
- Duration: `30`
- **Saqlash**

**Xizmat 3 - Live:**
- Service type: Live
- Price: `50`
- Duration: `60`
- **Saqlash**

Tekshiring:
- [ ] 3 ta xizmat ko'rinadi
- [ ] Narxlar to'g'ri
- [ ] "Yoqish/O'chirish" ishlaydi

---

## 7. Patient Flow Test ✅

Logout > Patient sifatida login:

### A. Doctor List

**URL:** http://localhost:3000/doctors

Tekshiring:
- [ ] Shifokorlar ko'rinadi (kamida 1 ta)
- [ ] Doctor card ko'rinadi (avatar, ism, ixtisoslik)
- [ ] Rating ko'rinadi
- [ ] Price ko'rinadi
- [ ] Hover effect ishlaydi

### B. Search & Filter

- [ ] Ism bo'yicha qidiruv ishlaydi
- [ ] Ixtisoslik filter ishlaydi
- [ ] Rating filter ishlaydi
- [ ] "Filter tozalash" ishlaydi
- [ ] Results count ko'rinadi

### C. Doctor Detail

Shifokorni bosing:

Tekshiring:
- [ ] Doctor profili to'liq ko'rinadi
- [ ] Avatar katta ko'rinadi
- [ ] Bio ko'rinadi
- [ ] Xizmatlar ro'yxati ko'rinadi
- [ ] "Band qilish" button ishlaydi

### D. Booking

Xizmat tanlang > "Band qilish":

1. Sana/vaqt: Ertaga
2. Izoh: `Test booking`
3. **Band qilish**

Tekshiring:
- [ ] Success message
- [ ] Redirect to patient dashboard
- [ ] Booking dashboard'da ko'rinadi

---

## 8. Additional Features ✅

### A. Profile Settings

**URL:** http://localhost:3000/profile

- [ ] Avatar o'zgartirish ishlaydi
- [ ] Ism tahrirlash ishlaydi
- [ ] Telefon tahrirlash ishlaydi
- [ ] Parol o'zgartirish ishlaydi

### B. Reviews

Patient dashboard > Completed booking > "Sharh qoldirish":

- [ ] Rating (1-5 yulduz) ishlaydi
- [ ] Comment yozish mumkin
- [ ] Submit ishlaydi
- [ ] Doctor detail'da sharh ko'rinadi

### C. Admin Panel

**URL:** http://localhost:3000/admin/verification

- [ ] Pending doctors ko'rinadi
- [ ] Diploma ko'rish mumkin
- [ ] "Tasdiqlash" button ishlaydi
- [ ] "Rad etish" button ishlaydi

---

## 9. Responsive Test ✅

### Mobile (F12 > Device toolbar)

- [ ] iPhone 12/13
- [ ] Samsung Galaxy
- [ ] Tablet iPad

Tekshiring:
- [ ] Header responsive
- [ ] Cards stack properly
- [ ] Buttons touch-friendly
- [ ] Forms usable
- [ ] Navigation works

### Desktop

- [ ] 1920x1080
- [ ] 1366x768
- [ ] Grid layouts work
- [ ] Hover effects work

---

## 10. Performance Test ✅

### A. Loading Speed

Browser DevTools > Network tab:

- [ ] First load < 2 seconds
- [ ] Page transitions smooth
- [ ] Images load fast

### B. Build Test

```bash
npm run build
```

Tekshiring:
- [ ] Build successful (xatosiz)
- [ ] `dist/` folder yaratildi
- [ ] Warnings kam yoki yo'q

---

## ✅ Final Verification

### Critical Features:

- [ ] Registration works (both roles)
- [ ] Login works
- [ ] Logout works
- [ ] Doctor profile creation works
- [ ] File upload works
- [ ] Service creation works
- [ ] Booking creation works
- [ ] Doctor approval works (admin)
- [ ] Search & filter works
- [ ] Theme toggle works
- [ ] Responsive on mobile
- [ ] No console errors

### Database Check (Supabase):

**Table Editor'da:**

```sql
-- Profiles
SELECT * FROM profiles;

-- Doctors
SELECT * FROM doctors;

-- Services
SELECT * FROM services;

-- Bookings
SELECT * FROM bookings;
```

Har birida kamida 1 ta record bo'lishi kerak (test data)

---

## 🎊 Success Criteria

Agar barcha ✅ bo'lsa:

**🎉 PLATFORM 100% ISHLAYAPTI!**

Keyingi qadamlar:
1. Production'ga deploy qiling
2. Custom domain ulang
3. Payment gateway ulang (optional)
4. Marketing boshlang
5. Real users qabul qiling!

---

## 🐛 Agar muammo bo'lsa:

### Console'da xatolik:
1. Browser console'ni oching (F12)
2. Red error'larni o'qing
3. Stack trace'ni ko'ring

### Database xatolik:
1. Supabase Dashboard > Logs
2. Table Editor > SQL kodlarni tekshiring
3. RLS policies tekshiring

### File upload ishlamayapti:
1. Storage buckets borligini tekshiring
2. Storage policies tekshiring
3. File size limit tekshiring (5MB)

---

## 📞 Yordam

Agar hali ham muammo bo'lsa:

1. Screenshot oling (xatolik)
2. Console log'ni copy qiling
3. Qaysi qadamda xatolik chiqdi?

Men yordam beraman! 💪

---

**Omad! Platform ishga tushishiga ishonchim komil! 🚀**

