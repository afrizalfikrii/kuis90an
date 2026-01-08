# 🔥 Panduan Setup Firebase untuk Kuis 90an

Panduan lengkap step-by-step untuk mengaktifkan fitur leaderboard dengan Firebase Firestore.

---

## 📋 Langkah 1: Buat Project Firebase

### 1.1 Buka Firebase Console

- Kunjungi [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Login dengan akun Google kamu

### 1.2 Buat Project Baru

1. Klik tombol **"Add project"** atau **"Tambahkan project"**
2. Masukkan nama project, contoh: `kuis-90an` atau `trivia-90an`
3. Klik **Continue**
4. **Google Analytics**: Bisa dimatikan (tidak wajib untuk project ini)
5. Klik **Create project**
6. Tunggu proses pembuatan selesai (±30 detik)
7. Klik **Continue** untuk masuk ke dashboard

---

## 📊 Langkah 2: Aktifkan Firestore Database

### 2.1 Buat Firestore Database

1. Di sidebar kiri, klik **"Build"** → **"Firestore Database"**
2. Klik tombol **"Create database"**

### 2.2 Pilih Mode Security

Pilih salah satu:

- **Production mode** (Recommended untuk production)
- **Test mode** (Untuk development - lebih mudah, tapi kurang aman)

> 💡 **Rekomendasi**: Pilih **Test mode** dulu untuk development, nanti bisa diubah ke production mode.

### 2.3 Pilih Lokasi Server

1. Pilih lokasi server terdekat, contoh:
   - **asia-southeast1** (Singapura) - untuk Indonesia
   - **asia-southeast2** (Jakarta) - untuk Indonesia
2. Klik **Enable**
3. Tunggu hingga database selesai dibuat

### 2.4 Buat Collection "leaderboard"

1. Setelah database aktif, klik **"Start collection"**
2. **Collection ID**: Ketik `leaderboard`
3. Klik **Next**
4. **Document ID**: Klik **"Auto-ID"** (biarkan otomatis)
5. Isi field pertama sebagai contoh:
   - **Field**: `username` | **Type**: `string` | **Value**: `TestUser`
   - Klik **Add field**
   - **Field**: `score` | **Type**: `number` | **Value**: `1000`
   - Klik **Add field**
   - **Field**: `avatar` | **Type**: `string` | **Value**: `default`
   - Klik **Add field**
   - **Field**: `createdAt` | **Type**: `timestamp` | **Value**: (klik jam untuk set waktu sekarang)
6. Klik **Save**

> ✅ Collection `leaderboard` sudah siap digunakan!

---

## 🔑 Langkah 3: Dapatkan Kredensial Firebase

### 3.1 Tambah Web App

1. Di dashboard Firebase, klik ikon **Settings (⚙️)** di sidebar → **Project settings**
2. Scroll ke bawah ke bagian **"Your apps"**
3. Klik ikon **Web** (`</>`)
4. **App nickname**: Ketik `Kuis 90an Web` (atau nama lain)
5. **JANGAN** centang "Also set up Firebase Hosting" (tidak perlu, kita pakai Vercel)
6. Klik **Register app**

### 3.2 Copy Konfigurasi

Setelah app terdaftar, kamu akan melihat kode konfigurasi seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "kuis-90an.firebaseapp.com",
  projectId: "kuis-90an",
  storageBucket: "kuis-90an.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};
```

> 📋 **COPY** semua nilai ini, kita akan pakai di langkah berikutnya!

---

## 💾 Langkah 4: Setup Environment Variables

### 4.1 Buat File `.env`

Di root folder project (`e:\Projek Website\kuis90an`), buat file baru bernama `.env` (tanpa extension lain).

> ⚠️ **PENTING**: File `.env` sudah ada di `.gitignore`, jadi tidak akan ter-commit ke Git (aman untuk kredensial).

### 4.2 Isi File `.env`

Copy kredensial dari Firebase Console dan isi seperti ini:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=kuis-90an.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kuis-90an
VITE_FIREBASE_STORAGE_BUCKET=kuis-90an.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

> 🔴 **Ganti semua nilai** dengan kredensial Firebase kamu sendiri!

### 4.3 Contoh Lengkap

Misalkan kredensial Firebase kamu:

- **apiKey**: `AIzaSyABC123xyz789`
- **authDomain**: `trivia-retro.firebaseapp.com`
- **projectId**: `trivia-retro`
- **storageBucket**: `trivia-retro.appspot.com`
- **messagingSenderId**: `987654321098`
- **appId**: `1:987654321098:web:xyz123abc456`

Maka file `.env` kamu:

```env
VITE_FIREBASE_API_KEY=AIzaSyABC123xyz789
VITE_FIREBASE_AUTH_DOMAIN=trivia-retro.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=trivia-retro
VITE_FIREBASE_STORAGE_BUCKET=trivia-retro.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:xyz123abc456
```

---

## 🔄 Langkah 5: Restart Development Server

Setelah membuat file `.env`, kamu harus restart dev server agar environment variables terbaca.

### 5.1 Stop Server

Di terminal, tekan **Ctrl + C** untuk stop server yang sedang berjalan.

### 5.2 Start Ulang

```bash
npm run dev
```

### 5.3 Verifikasi

Buka browser di `http://localhost:5173` dan coba:

1. Main kuis sampai selesai
2. Masukkan nama di form "MASUKKAN NAMA"
3. Klik **KIRIM SKOR**
4. Jika berhasil, akan muncul pesan "✅ Skor berhasil disimpan!"

---

## 🔒 Langkah 6: Setup Security Rules (Opsional tapi Recommended)

Jika tadi kamu pilih **Test mode**, security rules akan expire dalam 30 hari. Untuk production, ubah rules-nya.

### 6.1 Buka Firestore Rules

1. Di Firebase Console, buka **Firestore Database**
2. Klik tab **"Rules"**

### 6.2 Ubah Rules untuk Production

Ganti rules dengan ini (allow read untuk semua, write hanya untuk data baru):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{document} {
      // Semua orang bisa baca leaderboard
      allow read: if true;

      // Hanya bisa create (tidak bisa update/delete)
      allow create: if request.resource.data.keys().hasAll(['username', 'score', 'createdAt'])
                    && request.resource.data.username is string
                    && request.resource.data.score is number
                    && request.resource.data.score >= 0
                    && request.resource.data.score <= 10000;
    }
  }
}
```

### 6.3 Publish Rules

Klik **Publish** untuk menyimpan rules baru.

> ✅ Sekarang database kamu aman untuk production!

---

## 🧪 Langkah 7: Testing Leaderboard

### 7.1 Test Submit Score

1. Buka aplikasi di browser
2. Main kuis sampai game over
3. Masukkan nama, contoh: `BudiGaming99`
4. Klik **KIRIM SKOR**
5. Cek console browser (F12) untuk melihat log

### 7.2 Cek di Firebase Console

1. Buka Firebase Console → Firestore Database
2. Klik collection **leaderboard**
3. Kamu akan melihat data skor yang baru saja disubmit

### 7.3 Test Leaderboard Display

1. Submit beberapa skor dengan nama berbeda
2. Refresh aplikasi
3. High score di menu utama akan update otomatis
4. Setelah submit skor, leaderboard akan muncul menampilkan top 10

---

## 🚀 Langkah 8: Deploy ke Vercel (Bonus)

### 8.1 Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: Kuis 90an dengan Firebase"
git branch -M main
git remote add origin https://github.com/username/kuis-90an.git
git push -u origin main
```

### 8.2 Deploy di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"Add New Project"**
4. Import repository `kuis-90an`
5. **PENTING**: Tambahkan Environment Variables di Vercel:
   - Klik **"Environment Variables"**
   - Tambahkan satu per satu (copy dari file `.env` kamu):
     - `VITE_FIREBASE_API_KEY` = `nilai_api_key_kamu`
     - `VITE_FIREBASE_AUTH_DOMAIN` = `nilai_auth_domain_kamu`
     - `VITE_FIREBASE_PROJECT_ID` = `nilai_project_id_kamu`
     - `VITE_FIREBASE_STORAGE_BUCKET` = `nilai_storage_bucket_kamu`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID` = `nilai_sender_id_kamu`
     - `VITE_FIREBASE_APP_ID` = `nilai_app_id_kamu`
6. Klik **Deploy**
7. Tunggu ±2 menit, website kamu sudah online! 🎉

---

## ❓ Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

- ✅ Cek file `.env`, pastikan `VITE_FIREBASE_API_KEY` benar
- ✅ Restart dev server setelah edit `.env`

### Error: "Missing or insufficient permissions"

- ✅ Cek Firestore Rules, pastikan `allow read/write` sudah benar
- ✅ Coba ubah ke Test mode dulu untuk testing

### Skor tidak muncul di Leaderboard

- ✅ Buka Firebase Console, cek apakah data masuk ke collection `leaderboard`
- ✅ Cek console browser (F12) untuk error messages
- ✅ Pastikan internet connection aktif

### Environment variables tidak terbaca

- ✅ Pastikan nama file `.env` (bukan `.env.txt` atau lainnya)
- ✅ Pastikan semua variable diawali dengan `VITE_`
- ✅ Restart dev server setelah membuat/edit `.env`

---

## 📚 Referensi

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Get Started](https://firebase.google.com/docs/firestore/quickstart)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Selamat! Firebase sudah siap digunakan! 🎉**

Jika ada pertanyaan atau error, cek bagian Troubleshooting di atas.
