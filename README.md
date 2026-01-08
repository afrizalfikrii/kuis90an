# 🕹️ Kuis Trivia Anak 90an (Retro Edition)

Aplikasi kuis interaktif dengan tema nostalgia 90an, menampilkan pertanyaan seputar kartun, mainan, jajanan, dan game era 90an. Dibangun dengan React + Vite dan Firebase Firestore untuk sistem leaderboard.

## ✨ Fitur

- 🎮 **10 Pertanyaan Trivia** tentang nostalgia 90an
- 💖 **Sistem Nyawa** (3 lives)
- 🏆 **Leaderboard Real-time** dengan Firebase Firestore
- 🎨 **Desain Retro Vaporwave** dengan warna neon dan animasi
- 📱 **Responsive Design** - tampil sempurna di desktop dan mobile
- ⚡ **Fast Performance** dengan Vite

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Fonts**: Press Start 2P, VT323

## 🚀 Cara Menjalankan Proyek

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan **Firestore Database**
3. Buat collection bernama `leaderboard`
4. Copy kredensial Firebase dari Project Settings
5. Buat file `.env` di root folder:

```bash
cp .env.example .env
```

6. Isi file `.env` dengan kredensial Firebase kamu:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka browser di `http://localhost:5173`

### 4. Build untuk Production

```bash
npm run build
```

## 📂 Struktur Folder

```
src/
├── components/
│   ├── MainMenu.jsx          # Menu utama
│   ├── GameScreen.jsx        # Layar permainan
│   ├── GameOver.jsx          # Layar game over + submit skor
│   ├── Leaderboard.jsx       # Tampilan leaderboard
│   └── FeedbackOverlay.jsx   # Overlay feedback jawaban
├── data/
│   └── questions.js          # Bank soal kuis
├── firebase/
│   ├── config.js             # Konfigurasi Firebase
│   └── leaderboard.js        # Helper functions Firestore
├── App.jsx                   # Komponen utama
├── main.jsx                  # Entry point
└── index.css                 # Global styles + Tailwind
```

## 🎨 Kustomisasi

### Menambah Pertanyaan

Edit file `src/data/questions.js`:

```javascript
{
  id: 11,
  question: "Pertanyaan baru kamu?",
  image: "https://...", // atau null
  options: ["A", "B", "C", "D"],
  answer: "A",
  category: "Kategori"
}
```

### Mengubah Warna

Edit `tailwind.config.js` di bagian `theme.extend.colors`:

```javascript
colors: {
  'retro-pink': '#ff7eb6',
  'retro-cyan': '#7ee787',
  // ... tambah warna lain
}
```

## 🌐 Deploy ke Vercel

1. Push kode ke GitHub
2. Import repository di [Vercel](https://vercel.com)
3. Tambahkan Environment Variables di Vercel Dashboard (sama seperti `.env`)
4. Deploy!

## 📝 Firestore Database Schema

**Collection**: `leaderboard`

```javascript
{
  username: "BudiGaming99",    // String
  score: 1500,                 // Number
  avatar: "default",           // String (opsional)
  createdAt: Timestamp         // Firebase Timestamp
}
```

## 🎯 Roadmap

- [ ] Tambah efek suara 8-bit
- [ ] Tambah background music dengan toggle
- [ ] Sistem badge/achievement
- [ ] Share skor ke social media
- [ ] Mode multiplayer

## 📄 License

MIT License - Silakan digunakan untuk belajar dan proyek pribadi!

## 🙏 Credits

- Desain inspirasi: Vaporwave/90s aesthetic
- Icons: [Lucide React](https://lucide.dev)
- Fonts: [Google Fonts](https://fonts.google.com)

---

**Dibuat dengan 💖 dan nostalgia 90an**
