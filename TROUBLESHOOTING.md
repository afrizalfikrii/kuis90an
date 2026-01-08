# 🔍 Troubleshooting: Error "Gagal memuat leaderboard"

## Langkah Debugging

Saya sudah menambahkan logging detail di aplikasi. Sekarang ikuti langkah ini:

### 1️⃣ Buka Browser Console

1. Buka aplikasi di browser (http://localhost:5173)
2. Tekan **F12** atau **Ctrl+Shift+I** untuk buka Developer Tools
3. Klik tab **Console**

### 2️⃣ Cek Log Firebase Config

Saat halaman pertama kali load, kamu akan melihat log seperti ini:

```
🔥 Firebase Config: {
  apiKey: "✅ Set" atau "❌ Missing"
  authDomain: "✅ Set" atau "❌ Missing"
  projectId: "✅ Set" atau "❌ Missing"
  ...
}
✅ Firebase initialized successfully
```

**Jika ada yang "❌ Missing":**

- File `.env` belum dibuat atau belum diisi dengan benar
- Atau server belum di-restart setelah membuat `.env`

**Solusi:**

1. Pastikan file `.env` ada di root folder project
2. Isi dengan kredensial Firebase yang benar (lihat `FIREBASE_SETUP.md`)
3. **RESTART server** dengan `Ctrl+C` lalu `npm run dev`

---

### 3️⃣ Test Submit Score

1. Main kuis sampai selesai
2. Masukkan nama di form
3. Klik **KIRIM SKOR**
4. Lihat console, akan muncul log:

```
📤 Submitting score: { username: "...", score: 100, avatar: "default" }
```

**Jika berhasil:**

```
✅ Skor berhasil disimpan dengan ID: abc123xyz
```

**Jika error, akan muncul:**

```
❌ Error menambahkan skor: ...
Error code: ...
Error message: ...
```

---

## 🚨 Error Umum dan Solusinya

### Error 1: "Missing or insufficient permissions"

**Penyebab:** Firestore rules terlalu ketat atau belum di-setup

**Solusi:**

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project kamu
3. Klik **Firestore Database** → tab **Rules**
4. Ubah rules menjadi (untuk testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Klik **Publish**

> ⚠️ Rules ini untuk testing saja! Untuk production, gunakan rules yang lebih aman (lihat `FIREBASE_SETUP.md`)

---

### Error 2: "The query requires an index"

**Penyebab:** Firestore memerlukan composite index untuk query dengan multiple orderBy

**Solusi:**

1. Di console browser, akan ada link untuk membuat index
2. Klik link tersebut (akan buka Firebase Console)
3. Klik **Create Index**
4. Tunggu beberapa menit hingga index selesai dibuat
5. Refresh aplikasi dan coba lagi

**Atau buat index manual:**

1. Buka Firebase Console → Firestore Database → tab **Indexes**
2. Klik **Create Index**
3. **Collection ID**: `leaderboard`
4. Tambah 2 fields:
   - Field: `score`, Order: `Descending`
   - Field: `createdAt`, Order: `Ascending`
5. Klik **Create**

---

### Error 3: "Firebase: Error (auth/invalid-api-key)"

**Penyebab:** API Key salah atau tidak valid

**Solusi:**

1. Buka Firebase Console → Project Settings
2. Scroll ke **Your apps** → pilih Web app kamu
3. Copy ulang semua kredensial
4. Update file `.env`
5. Restart server

---

### Error 4: Environment variables tidak terbaca

**Penyebab:** File `.env` salah format atau server belum di-restart

**Cek di console, jika muncul:**

```
🔥 Firebase Config: {
  apiKey: "YOUR_API_KEY"  // ❌ Ini artinya env var tidak terbaca!
  ...
}
```

**Solusi:**

1. Pastikan file bernama `.env` (bukan `.env.txt` atau lainnya)
2. Pastikan format benar (lihat `.env.example`)
3. Pastikan semua variable diawali `VITE_`
4. **RESTART server** (ini penting!)

**Contoh `.env` yang benar:**

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

### Error 5: Collection "leaderboard" tidak ada

**Penyebab:** Collection belum dibuat di Firestore

**Solusi:**

1. Buka Firebase Console → Firestore Database
2. Klik **Start collection**
3. Collection ID: `leaderboard`
4. Tambah 1 document dummy (lihat `FIREBASE_SETUP.md` langkah 2.4)

---

## 📋 Checklist Debugging

Cek satu per satu:

- [ ] File `.env` sudah dibuat di root folder
- [ ] File `.env` sudah diisi dengan kredensial Firebase yang benar
- [ ] Server sudah di-restart setelah membuat/edit `.env`
- [ ] Di console browser, semua config "✅ Set"
- [ ] Collection `leaderboard` sudah dibuat di Firestore
- [ ] Firestore rules sudah di-setup (minimal test mode)
- [ ] Jika ada error "requires index", index sudah dibuat

---

## 🆘 Masih Error?

**Kirim screenshot console browser yang menunjukkan:**

1. Log Firebase Config (🔥 Firebase Config)
2. Error message lengkap (❌ Error...)
3. Screenshot Firestore rules di Firebase Console

Dengan informasi ini, saya bisa bantu troubleshoot lebih spesifik!
