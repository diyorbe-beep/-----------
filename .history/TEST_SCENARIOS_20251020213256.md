# 🧪 Test Scenarios - Platformani Sinash

## Test User Credentials

Test uchun foydalanish mumkin:

```
Bemor 1:
- Email: patient1@test.com
- Password: test123
- Name: Aziz Valiyev

Shifokor 1:
- Email: doctor1@test.com
- Password: test123
- Name: Dr. Karimov Jamshid
- Specialty: Kardiolog

Shifokor 2:
- Email: doctor2@test.com
- Password: test123
- Name: Dr. Aliyeva Dilnoza
- Specialty: Terapevt
```

---

## 🎯 Test Scenario 1: Bemor User Journey

### Step 1: Registration
1. http://localhost:3000/register
2. Bemor sifatida ro'yxatdan o'ting
3. Email tasdiqlang (agar kerak bo'lsa)

**Expected:** ✅ Success message, redirect to login

### Step 2: Login
1. http://localhost:3000/login
2. Credentials kiriting
3. Login qiling

**Expected:** ✅ Redirect to /doctors, header'da avatar

### Step 3: Browse Doctors
1. http://localhost:3000/doctors
2. Shifokorlar ro'yxatini ko'ring

**Expected:** ✅ Kamida 1 ta doctor ko'rinadi

### Step 4: Search
1. Qidiruv: "Karim" yozing
2. Specialty: "Kardiolog" tanlang
3. Rating: "4.0+" tanlang

**Expected:** ✅ Filtered results

### Step 5: View Doctor Profile
1. Doctor kartasini bosing
2. Doctor detail page ochiladi

**Expected:** 
- ✅ Avatar, name, specialty
- ✅ Bio, education
- ✅ Services list
- ✅ Reviews (agar bor bo'lsa)

### Step 6: Book Consultation
1. "Band qilish" tugmasini bosing
2. Sana: Ertaga, Vaqt: 15:00
3. Izoh: "Yurak og'riyapti"
4. Submit

**Expected:** 
- ✅ Success alert
- ✅ Redirect to patient dashboard
- ✅ Booking ko'rinadi

### Step 7: View Bookings
1. Patient Dashboard'ga o'ting
2. Bookings list'ni ko'ring

**Expected:** 
- ✅ Yangi booking ko'rinadi
- ✅ Status: pending
- ✅ Doctor info ko'rinadi
- ✅ Price to'g'ri

---

## 👨‍⚕️ Test Scenario 2: Doctor User Journey

### Step 1: Registration
1. http://localhost:3000/register
2. **Shifokor** sifatida ro'yxatdan o'ting

**Expected:** ✅ Success, redirect to login

### Step 2: Login
**Expected:** ✅ Redirect to doctor dashboard

### Step 3: Profile Setup
1. Dashboard'da "Profil yaratish" bosing
2. Barcha ma'lumotlarni to'ldiring:
   - Specialization: Kardiolog
   - Experience: 15 yil
   - Bio: ...
   - Education: ...

3. **Diplom yuklang** (MUHIM!)
   - JPG/PNG fayl (< 5MB)
   - Upload qiling

**Expected:** 
- ✅ Preview ko'rinadi
- ✅ "Diplom yuklandi" message
- ✅ Success, redirect to dashboard

### Step 4: Verification (Admin)

**Supabase SQL Editor:**

```sql
-- 1. User ID topish
SELECT p.id, p.full_name, d.verification_status 
FROM profiles p
JOIN doctors d ON p.id = d.user_id
WHERE p.role = 'doctor';

-- 2. Approve qilish
UPDATE doctors 
SET verification_status = 'approved' 
WHERE user_id = '<paste-user-id-here>';
```

**Expected:** ✅ verification_status = 'approved'

### Step 5: Add Services

1. Dashboard > "Xizmatlarni boshqarish"
2. "+ Xizmat qo'shish" bosing

**Service 1 - Chat:**
```
Type: Chat
Name: Chat Konsultatsiya
Description: Tez va qulay maslahat
Price: 1
Duration: 20
```

**Service 2 - Video:**
```
Type: Video
Name: Video Konsultatsiya  
Description: Yuzma-yuz suhbat
Price: 10
Duration: 30
```

**Service 3 - Live:**
```
Type: Live
Name: Jonli Konsultatsiya
Description: Real-time to'liq konsultatsiya
Price: 50
Duration: 60
```

**Expected:** ✅ Har biri saqlandi, list'da ko'rinadi

### Step 6: View as Patient

1. Logout
2. Login as patient
3. /doctors page'ga o'ting
4. Shifokoringizni toping

**Expected:** 
- ✅ Doctor ko'rinadi
- ✅ Services ko'rinadi
- ✅ "$1 dan boshlab" ko'rinadi

---

## 🔍 Test Scenario 3: Booking Flow

### Full E2E Test:

**Patient:**
1. Login as patient
2. Browse doctors
3. Select doctor
4. Choose video service ($10)
5. Select time: Tomorrow 15:00
6. Add note: "Test konsultatsiya"
7. Book

**Check Supabase:**

```sql
SELECT * FROM bookings 
ORDER BY created_at DESC 
LIMIT 1;
```

**Expected:**
- ✅ New booking in database
- ✅ status = 'pending'
- ✅ payment_status = 'pending'
- ✅ amount_usd = 10

**Doctor:**
1. Login as doctor
2. Go to dashboard
3. Check "Qabullar" section

**Expected:** ✅ New booking visible

---

## 📤 Test Scenario 4: File Upload

### A. Avatar Upload

1. Login
2. Go to /profile
3. Upload avatar (JPG/PNG < 2MB)

**Check:**
- [ ] Preview shows
- [ ] Upload successful
- [ ] Avatar updates in header
- [ ] Avatar in Supabase Storage > avatars bucket

### B. Diploma Upload

1. Login as doctor
2. Profile setup page
3. Upload diploma (< 5MB)

**Check:**
- [ ] Upload successful
- [ ] File in Storage > documents bucket
- [ ] File path: `<user-id>/diploma_<timestamp>.jpg`

---

## 🎨 Test Scenario 5: UI/UX

### A. Theme Toggle

1. Home page
2. Click theme toggle (🌙/☀️)

**Expected:**
- [ ] Colors change
- [ ] Smooth transition
- [ ] Icons update
- [ ] Refresh page - theme persists

### B. Responsive

**Mobile (375px):**
- [ ] Header collapses properly
- [ ] Cards stack vertically
- [ ] Forms are usable
- [ ] Buttons are touchable

**Tablet (768px):**
- [ ] 2-column grid works
- [ ] Navigation readable

**Desktop (1920px):**
- [ ] 3-column grid
- [ ] Proper spacing
- [ ] Max-width containers

---

## 🔐 Test Scenario 6: Security

### A. Protected Routes

**Logout > Try to access:**

1. http://localhost:3000/doctor/dashboard

**Expected:** ✅ Redirect to /login

2. http://localhost:3000/patient/dashboard

**Expected:** ✅ Redirect to /login

### B. Role-Based Access

**Login as Patient > Try:**

1. http://localhost:3000/doctor/dashboard

**Expected:** ✅ Redirect to home (not authorized)

**Login as Doctor > Try:**

1. http://localhost:3000/patient/dashboard

**Expected:** ✅ Redirect to home (not authorized)

### C. File Access

**Supabase Storage > documents:**

**Expected:** 
- ✅ Private bucket
- ✅ Only owner can view
- ✅ No public URL

**Supabase Storage > avatars:**

**Expected:**
- ✅ Public bucket
- ✅ Public URL works

---

## 📊 Database Integrity Test

### Check Relations:

```sql
-- Profiles without doctors (patients)
SELECT * FROM profiles 
WHERE role = 'patient';

-- Doctors with profiles
SELECT p.full_name, d.specialization, d.verification_status
FROM profiles p
JOIN doctors d ON p.id = d.user_id;

-- Services with doctors
SELECT s.name, s.price_usd, d.specialization
FROM services s
JOIN doctors d ON s.doctor_id = d.id;

-- Bookings with all info
SELECT 
  b.scheduled_at,
  p.full_name as patient,
  doc.specialization,
  s.name as service,
  b.amount_usd
FROM bookings b
JOIN profiles p ON b.patient_id = p.id
JOIN doctors doc ON b.doctor_id = doc.id
JOIN services s ON b.service_id = s.id;
```

**Expected:** ✅ Barcha query'lar xatosiz ishlaydi

---

## ⚡ Performance Test

### A. Page Load Time

Browser DevTools > Network:

- [ ] Home: < 1s
- [ ] Doctor List: < 2s
- [ ] Doctor Detail: < 1.5s
- [ ] Dashboard: < 1s

### B. Search Performance

Doctor List'da qidiruv:

- [ ] Instant filtering (< 100ms)
- [ ] No lag
- [ ] Smooth UI

---

## ✅ Final Check

Barcha test scenariolar muvaffaqiyatli bo'lsa:

**🎉 PLATFORM PRODUCTION READY!**

### Deploy Checklist:

- [ ] All tests passed
- [ ] No console errors
- [ ] Build successful
- [ ] Environment variables set
- [ ] Documentation complete

### Deploy:

```bash
npm run build
vercel --prod
# yoki
netlify deploy --prod
```

---

## 🆘 Common Issues

### Issue: Doctor not showing in list
**Fix:** Update verification_status to 'approved' in SQL

### Issue: File upload fails
**Fix:** Check Storage buckets and policies

### Issue: Booking fails
**Fix:** Check all foreign keys exist (patient_id, doctor_id, service_id)

### Issue: Theme not persisting
**Fix:** Check localStorage in browser

---

**Test qiling va yaxshi natijalar! 🎯**

