# 🎯 SIZNING KEYINGI QADAMLARINGIZ

## ✅ Tayyor bo'lgan narsalar:

1. ✅ `.env` fayli yaratildi
2. ✅ Supabase credentials sozlandi
3. ✅ Server qayta ishga tushdi
4. ✅ Platform **REAL MODE**da ishlayapti!

---

## 🚀 HOZIR TEST QILING!

### 1. Browser'da oching:

👉 **http://localhost:3000**

**Tekshiring:**
- ⚠️ "Demo Mode" warning **YO'Q** bo'lishi kerak
- Console'da (F12) xatolik yo'q bo'lishi kerak

---

### 2. Register - Shifokor sifatida

**URL:** http://localhost:3000/register

```
To'liq ism: Dr. Karimov Jamshid
Email: doctor@test.com
Rol: Shifokor ⬅️ MUHIM!
Parol: test123
Parol tasdiqlash: test123
```

**Ro'yxatdan o'tish** bosing

**Kutilayotgan natija:**
- ✅ "Ro'yxatdan o'tish muvaffaqiyatli" alert
- ✅ Redirect to /login

**Agar email confirmation yoqilgan bo'lsa:**
- Emailingizni tekshiring
- Confirmation link'ni bosing
- Keyin login qiling

**Email confirmation o'chirish (ixtiyoriy):**
1. Supabase > Authentication > Providers > Email
2. "Confirm email" ni **o'chiring**
3. Save

---

### 3. Login - Shifokor

**URL:** http://localhost:3000/login

```
Email: doctor@test.com
Parol: test123
```

**Expected:**
- ✅ Login successful
- ✅ Redirect to `/doctor/dashboard`

---

### 4. Doctor Profile Yaratish

Dashboard'da **"Profil yaratish"** tugmasi bor:

**To'ldiring:**
```
Ixtisoslik: Kardiolog
Tajriba: 15
Bio: Professional yurak kasalliklari mutaxassisi. 15 yillik tajriba.
Ta'lim: Toshkent Tibbiyot Akademiyasi, 2010
Tillar: O'zbek, Rus, Ingliz
Klinika nomi: Shifo Tibbiyot Markazi
Shahar: Toshkent
Manzil: Amir Temur ko'chasi, 123
Litsenziya: L-123456
```

**Diplom yuklang:**
- Har qanday JPG/PNG rasm (< 5MB)
- Masalan: screenshot yoki test image

**Saqlash** tugmasini bosing

**Expected:**
- ✅ "Profil yaratildi!" alert
- ✅ Redirect to dashboard
- ✅ Statistika ko'rinadi

---

### 5. Shifokorni Tasdiqlash

**Supabase SQL Editor:**

```sql
-- 1. User ID ni topish
SELECT id, full_name, role 
FROM profiles 
WHERE email = 'doctor@test.com';

-- ID ni copy qiling (masalan: abc123-def456-...)

-- 2. Doctor'ni tasdiqlash
UPDATE doctors 
SET verification_status = 'approved' 
WHERE user_id = 'ABC123-DEF456-...'; -- O'z ID'ingizni qo'ying!
```

**Run** bosing

**Expected:** 
- ✅ "Success. No rows returned"
- ✅ 1 row updated

---

### 6. Xizmatlar Qo'shish

**Dashboard > "Xizmatlarni boshqarish"** link'ni bosing

**URL:** http://localhost:3000/doctor/services

**"+ Xizmat qo'shish"** bosing

**Xizmat 1:**
```
Turi: Chat
Nomi: Chat Konsultatsiya
Tavsif: Tez va qulay chat orqali maslahat
Narx: 1
Davomiyligi: 20
```
**Saqlash**

**Xizmat 2:**
```
Turi: Video
Nomi: Video Konsultatsiya
Tavsif: Video qo'ng'iroq orqali to'liq ko'rik
Narx: 10
Davomiyligi: 30
```
**Saqlash**

**Xizmat 3:**
```
Turi: Live
Nomi: Jonli Konsultatsiya
Tavsif: Premium real-time konsultatsiya
Narx: 50
Davomiyligi: 60
```
**Saqlash**

**Expected:**
- ✅ 3 ta xizmat list'da ko'rinadi
- ✅ Har biri "Faol" status

---

### 7. Bemor Sifatida Test

**Logout qiling** (header'dagi "Chiqish" button)

**Register - Bemor:**
```
To'liq ism: Aziz Valiyev
Email: patient@test.com
Rol: Bemor ⬅️ MUHIM!
Parol: test123
```

**Login qiling**

---

### 8. Shifokorlar Ko'rish

**URL:** http://localhost:3000/doctors

**Expected:**
- ✅ Dr. Karimov Jamshid ko'rinadi
- ✅ Avatar bor (agar yukla gan bo'lsangiz)
- ✅ "⭐ 0.0" ko'rinadi
- ✅ "15 yil tajriba"
- ✅ "$1 dan boshlab"

**Qidiruv test:**
- Ism: "Karim" yozing ✅ Topadi
- Specialty: "Kardiolog" ✅ Filter ishlaydi

---

### 9. Booking Qilish

1. Doctor kartasini bosing
2. Doctor detail page ochiladi
3. Service'lardan birini tanlang (masalan Video - $10)
4. **"Band qilish"** bosing

**Booking form:**
```
Sana/vaqt: Ertaga, 15:00
Izoh: Test konsultatsiya. Yurak tekshiruv kerak.
```

**"Band qilish"** bosing

**Expected:**
- ✅ Success alert
- ✅ Redirect to /patient/dashboard
- ✅ Booking ko'rinadi list'da

---

### 10. Final Verification

**Patient Dashboard:**
- [ ] Booking ko'rinadi
- [ ] Doctor name to'g'ri
- [ ] Price to'g'ri ($10)
- [ ] Status: pending

**Supabase Table Editor > bookings:**
- [ ] Yangi row ko'rinadi
- [ ] patient_id to'g'ri
- [ ] doctor_id to'g'ri
- [ ] service_id to'g'ri
- [ ] amount_usd = 10

---

## 🎉 AGAR HAMMASI ISHLASA:

**🎊 TABRIKLAYMAN! PLATFORM 100% ISHLAYAPTI! 🎊**

---

## 📸 Screenshot Checklist

Agar screenshot olmoqchi bo'lsangiz:

1. ✅ Home page
2. ✅ Doctor list with filters
3. ✅ Doctor detail page
4. ✅ Doctor dashboard
5. ✅ Service management
6. ✅ Patient dashboard with booking
7. ✅ Dark mode
8. ✅ Light mode
9. ✅ Mobile view

---

## 🚀 Deploy Qilish

Platform ishlayotgan bo'lsa, deploy qilishingiz mumkin:

```bash
npm run build
```

**Vercel'ga:**
```bash
npm install -g vercel
vercel
```

**Environment Variables Vercel'da:**
- Settings > Environment Variables
- `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` qo'shing

---

## 🎯 Keyingi Features (Ixtiyoriy)

Agar qo'shimcha funksiya kerak bo'lsa:

1. **Payment Integration**
   - Payme
   - Click
   - Stripe

2. **Real-time Chat**
   - Supabase Realtime
   - Message notifications

3. **Video Calls**
   - Jitsi integration
   - Zoom API

4. **Notifications**
   - Email (Supabase Email)
   - SMS
   - Push notifications

5. **Analytics**
   - Google Analytics
   - Custom dashboard

Men yordam bera olaman! 💪

---

**Hozir platformani test qiling va natijani ayting! 🎉**

