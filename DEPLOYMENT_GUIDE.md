# 🚀 Panduan Deploy Kuis 90an ke Vercel

Panduan lengkap step-by-step untuk deploy aplikasi kuis 90an kamu ke internet menggunakan Vercel (gratis!).

---

## 📋 Persiapan Sebelum Deploy

### ✅ Checklist Pre-Deploy

- [ ] Firebase sudah dikonfigurasi dan berfungsi di local
- [ ] File `.env` sudah diisi dengan kredensial Firebase
- [ ] Aplikasi sudah di-test di local (http://localhost:5173)
- [ ] Leaderboard berfungsi dengan baik
- [ ] Tidak ada error di console browser

---

## 🔧 Langkah 1: Setup Git Repository

### 1.1 Initialize Git (Jika Belum)

Buka terminal di folder project dan jalankan:

```bash
git init
git add .
git commit -m "Initial commit: Kuis Anak 90an"
```

### 1.2 Buat Repository di GitHub

1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"+"** di kanan atas → **"New repository"**
3. **Repository name**: `kuis-90an` (atau nama lain)
4. **Description**: "Kuis Trivia Anak 90an - Retro Edition"
5. Pilih **Public** atau **Private** (terserah kamu)
6. **JANGAN** centang "Initialize with README" (sudah ada)
7. Klik **"Create repository"**

### 1.3 Push ke GitHub

Copy command yang muncul di GitHub, atau jalankan:

```bash
git remote add origin https://github.com/username/kuis-90an.git
git branch -M main
git push -u origin main
```

> ⚠️ Ganti `username` dengan username GitHub kamu!

---

## 🌐 Langkah 2: Deploy ke Vercel

### 2.1 Buat Akun Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"** (recommended)
4. Authorize Vercel untuk akses GitHub kamu

### 2.2 Import Project

1. Di dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Pilih repository **`kuis-90an`** dari list
3. Klik **"Import"**

### 2.3 Configure Project

Di halaman konfigurasi:

**Framework Preset:**

- Otomatis terdeteksi sebagai **"Vite"** ✅

**Root Directory:**

- Biarkan default (`./`)

**Build Command:**

- Otomatis: `npm run build` ✅

**Output Directory:**

- Otomatis: `dist` ✅

**Install Command:**

- Otomatis: `npm install` ✅

### 2.4 Tambahkan Environment Variables

Ini **PENTING**! Klik **"Environment Variables"** dan tambahkan satu per satu:

| Name                                | Value                        |
| ----------------------------------- | ---------------------------- |
| `VITE_FIREBASE_API_KEY`             | (copy dari file `.env` kamu) |
| `VITE_FIREBASE_AUTH_DOMAIN`         | (copy dari file `.env` kamu) |
| `VITE_FIREBASE_PROJECT_ID`          | (copy dari file `.env` kamu) |
| `VITE_FIREBASE_STORAGE_BUCKET`      | (copy dari file `.env` kamu) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | (copy dari file `.env` kamu) |
| `VITE_FIREBASE_APP_ID`              | (copy dari file `.env` kamu) |

> 💡 **Cara menambahkan:**
>
> 1. Ketik nama variable di kolom "Name"
> 2. Paste value dari file `.env` kamu di kolom "Value"
> 3. Klik **"Add"**
> 4. Ulangi untuk semua 6 variables

### 2.5 Deploy!

1. Setelah semua environment variables ditambahkan
2. Klik tombol **"Deploy"**
3. Tunggu proses build (±2-3 menit)
4. Jika berhasil, akan muncul confetti 🎉

---

## 🎊 Langkah 3: Akses Website Kamu

### 3.1 URL Production

Setelah deploy berhasil, kamu akan dapat URL seperti:

```
https://kuis-90an-abc123.vercel.app
```

### 3.2 Custom Domain (Opsional)

Kalau mau domain sendiri (misal: `kuis90an.com`):

1. Di dashboard Vercel, buka project kamu
2. Klik tab **"Settings"** → **"Domains"**
3. Masukkan domain kamu
4. Ikuti instruksi untuk setup DNS

---

## 🔄 Update Website (Setelah Deploy)

Setiap kali kamu update code:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push
```

Vercel akan **otomatis re-deploy** dalam beberapa menit! 🚀

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Cek:**

- Environment variables sudah benar semua?
- Tidak ada error di local (`npm run build`)?
- Cek build logs di Vercel untuk detail error

**Solusi:**

```bash
# Test build di local dulu
npm run build

# Jika berhasil, coba deploy ulang
git add .
git commit -m "Fix build"
git push
```

### Error: Firebase tidak berfungsi di production

**Cek:**

- Environment variables di Vercel sudah diisi semua?
- Nama variable harus **PERSIS** sama (case-sensitive)
- Semua variable diawali dengan `VITE_`

**Solusi:**

1. Buka Vercel dashboard → Project Settings → Environment Variables
2. Cek satu per satu, pastikan tidak ada typo
3. Jika ada yang salah, edit dan redeploy

### Leaderboard tidak muncul

**Cek:**

- Firebase Firestore rules sudah di-setup?
- Collection `leaderboard` sudah dibuat?
- Cek browser console (F12) untuk error messages

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Gratis)

1. Di dashboard Vercel, buka project kamu
2. Klik tab **"Analytics"**
3. Lihat data visitor, page views, dll

### Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project kamu
3. Lihat data di Firestore untuk tracking skor

---

## 🎯 Checklist Post-Deploy

- [ ] Website bisa diakses di URL Vercel
- [ ] Semua gambar muncul dengan benar
- [ ] Timer countdown berfungsi
- [ ] Bisa submit skor ke leaderboard
- [ ] Leaderboard menampilkan data dari Firebase
- [ ] Tombol share WhatsApp berfungsi
- [ ] Responsive di mobile (test di HP)

---

## 🔗 Link Penting

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com/)
- **GitHub Repository**: `https://github.com/username/kuis-90an`

---

## 💡 Tips

1. **Preview Deployments**: Setiap branch yang di-push akan dapat preview URL sendiri
2. **Rollback**: Bisa rollback ke deployment sebelumnya di Vercel dashboard
3. **Custom 404**: Bisa tambah halaman 404 custom di `public/404.html`
4. **Performance**: Vercel otomatis optimize images dan assets

---

**Selamat! Website kuis 90an kamu sudah online! 🎉**

Share link-nya ke teman-teman dan lihat siapa yang paling nostalgia! 🎮
