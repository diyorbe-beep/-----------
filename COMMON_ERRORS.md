# 🐛 Keng Tarqalgan Xatolar va Yechimlar

## 1. Email Confirmation Error (400 Bad Request)

### Xatolik:
```
POST /auth/v1/token?grant_type=password 400 (Bad Request)
Email not confirmed
```

### Sabab:
Supabase'da email confirmation yoqilgan, lekin email tasdiqlanmagan.

### Yechim:

**A. Email confirmation o'chirish (Development):**

Supabase Dashboard:
1. Authentication > Providers > Email
2. "Confirm email" ni **uncheck** qiling
3. Save

**B. Email tasdiqlash:**
- Emailingizni oching
- Supabase'dan kelgan link'ni bosing

**C. SQL bilan tasdiqlash:**
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'your@email.com';
```

---

## 2. Row Level Security Error (401 Unauthorized)

### Xatolik:
```
POST /rest/v1/profiles 401 (Unauthorized)
new row violates row-level security policy
```

### Sabab:
RLS policies juda qattiq yoki noto'g'ri sozlangan.

### Yechim:

`FIX_RLS_POLICIES.sql` faylini run qiling:

```sql
-- Profiles policy
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

**Yoki:** Trigger yarating (avtomatik profile yaratish)

---

## 3. Missing Supabase Variables

### Xatolik:
```
Missing Supabase environment variables
```

### Yechim:

`.env` faylini tekshiring:

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

Server'ni restart qiling:
```bash
Ctrl+C
npm run dev
```

---

## 4. Storage Upload Fails

### Xatolik:
```
Storage bucket not found
Permission denied
```

### Yechim:

**A. Bucket yaratish:**
- Supabase > Storage
- "Create bucket"
- Name: `avatars` (public)
- Name: `documents` (private)

**B. Policies qo'shish:**
```sql
-- Avatars bucket policy
CREATE POLICY "Anyone can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
```

---

## 5. Relation Does Not Exist

### Xatolik:
```
relation "public.profiles" does not exist
```

### Yechim:

SQL schema to'liq run qilinmagan. `SUPABASE_SETUP.md` dan **BARCHA** SQL kodlarni tartib bilan run qiling:

1. Extensions (2.1)
2. Profiles table (2.1)
3. Doctors table (2.2)
4. Services table (2.3)
5. Bookings table (2.4)
6. Reviews table (2.5)
7. Messages table (2.6)
8. Triggers (2.7)

---

## 6. Can't Read Properties of Null

### Xatolik:
```
Cannot read properties of null (reading 'auth')
```

### Sabab:
Supabase client null (credentials noto'g'ri yoki yo'q)

### Yechim:

`.env` faylni tekshiring:
- File mavjudmi?
- Credentials to'g'rimi?
- Qo'shtirnoqlar yo'qmi?

Server restart:
```bash
npm run dev
```

---

## 7. Doctor Not Showing in List

### Muammo:
Shifokor yaratdim lekin list'da ko'rinmayapti.

### Sabab:
`verification_status` hali `pending`

### Yechim:

SQL Editor'da:

```sql
-- User ID topish
SELECT p.id, p.full_name, d.verification_status
FROM profiles p
JOIN doctors d ON p.id = d.user_id;

-- Approve qilish
UPDATE doctors 
SET verification_status = 'approved'
WHERE user_id = '<your-user-id>';
```

---

## 8. File Upload Size Limit

### Xatolik:
```
File size exceeds limit
```

### Yechim:

Supabase > Storage > Bucket Settings:
- File size limit: **5MB** yoki **10MB** qiling

Code'da `FileUpload.jsx`:
```jsx
maxSize={5} // 5MB
```

---

## 9. CORS Error

### Xatolik:
```
CORS policy blocked
```

### Yechim:

Supabase Project Settings > API:
- Allowed origins'ga localhost qo'shing:
  - `http://localhost:3000`
  - `http://localhost:5173`

---

## 10. Build Fails

### Xatolik:
```
npm run build
Error: ...
```

### Yechim:

**A. Dependencies:**
```bash
npm install
```

**B. TypeScript errors:**
Ignore qiling (pure React project)

**C. Environment variables:**
Build paytida `.env` o'qiladi. Tekshiring.

---

## 🆘 Debug Commands

### Check Supabase Connection:

Browser console'da:

```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20))
```

### Check Tables:

SQL Editor:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Expected: profiles, doctors, services, bookings, reviews, messages

### Check Policies:

```sql
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';
```

### Check User:

```sql
SELECT * FROM auth.users;
```

---

## 💡 Quick Fixes

### Clear browser cache:
```
Ctrl + Shift + Delete
Clear cookies & cache
```

### Restart server:
```bash
Ctrl+C
npm run dev
```

### Check Supabase status:
https://status.supabase.com

---

**Xatolik yuzaga kelsa shu fayldan yechim toping! 🔧**

