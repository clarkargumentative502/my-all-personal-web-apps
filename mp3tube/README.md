# 🎵 Mp3tube - Visualizer Musik

Mp3tube adalah aplikasi pemutar musik berbasis web (SPA) yang mengubah audio menjadi pengalaman visual. Dibangun khusus untuk perangkat mobile dengan performa tinggi tanpa library eksternal.

## ✨ Fitur Utama
- **Real-time Visualizer:** Pilihan grafik melingkar (Circular) atau diagram batang (Line).
- **YouTube Integration:** Masukkan link dan dengarkan (via Third-party API).
- **No Backend:** Semua data disimpan di `localStorage`.
- **Lightweight:** Tanpa gambar/font eksternal, hanya menggunakan inline SVG.

## 🛠️ Tech Stack
- **Structure:** HTML5 (Semantic Tags)
- **Styling:** CSS3 (Flexbox & Grid, Mobile-First)
- **Logic:** Vanilla JavaScript (ES6+)
- **Audio:** Web Audio API (AnalyserNode)
- **Graphics:** Canvas API

## 🚀 Cara Menjalankan
Cukup buka file `index.html` di browser modern (Chrome/Safari/Edge). Pastikan koneksi internet aktif untuk fetch audio dari API.

## ⚠️ Catatan Penting
Aplikasi ini bergantung pada ketersediaan API publik untuk konversi link. Jika API mencapai limit, sistem akan memicu **Modal Fallback Message**.
