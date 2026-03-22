# 📚 Buku Pustaka

Aplikasi manajemen koleksi buku personal berbasis web yang ringan, cepat, dan fokus pada tampilan mobile. Dibuat murni menggunakan teknologi web standar tanpa ketergantungan pada server.

## ✨ Fitur Utama
- **Tanpa Database:** Menggunakan `localStorage` untuk penyimpanan data permanen di browser.
- **Mobile First:** Antarmuka minimalis yang dioptimalkan untuk layar sentuh.
- **Manajemen Status:** Lacak buku dari tahap *Wishlist* hingga *Selesai*.
- **Offline Ready:** Tidak memerlukan koneksi internet setelah aplikasi dimuat.
- **Backup & Restore:** Ekspor dan Impor data dalam format JSON menggunakan File API.

## 🛠️ Teknologi
- **HTML5:** Struktur semantik dan form.
- **CSS3:** Flexbox/Grid untuk tata letak dan animasi transisi.
- **Vanilla JavaScript:** Logika aplikasi, manipulasi DOM, dan pengelolaan data.
- **Web APIs:** LocalStorage, File API (Backup), Clipboard API (Copy Link).

## 🚀 Cara Penggunaan
1. Simpan file `index.html` di perangkat Anda.
2. Buka file tersebut menggunakan browser (Chrome/Safari/Firefox).
3. Tambahkan buku pertama Anda dengan menekan ikon tambah.
4. Gunakan fitur "Ekspor Data" secara berkala untuk mencadangkan koleksi Anda.

## 📝 Catatan Pengembangan
Aplikasi ini tidak menggunakan aset eksternal (CDN/Font/Icon). Semua ikon dibuat menggunakan karakter Unicode atau manipulasi CSS murni untuk memastikan kecepatan akses maksimal.
