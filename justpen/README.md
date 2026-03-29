# Justpen - Membuat Coretan

Justpen adalah aplikasi web sederhana berbasis kanvas yang dirancang untuk memberikan pengalaman mencoret atau menggambar secara instan tanpa gangguan. Fokus utama aplikasi ini adalah kemudahan penggunaan, aksesibilitas cepat di perangkat seluler (mobile-first), dan privasi karena semua data disimpan secara lokal.

---

## 📋 Deskripsi
Aplikasi ini mensimulasikan penggunaan **Pulpen**, **Stabilo**, dan **Tip-Ex** di atas selembar kertas putih. Cocok digunakan untuk mencatat ide cepat, sketsa kasar, atau sekadar coretan iseng tanpa perlu menginstal aplikasi berat atau membawa alat tulis fisik.

---

## ✨ Fitur Utama
- **Pulpen Hitam**: Untuk menulis atau menggambar garis tipis yang presisi.  
- **Stabilo Oranye**: Memberikan efek highlight transparan yang realistis (menggunakan mode multiply sehingga tidak menutupi garis hitam).  
- **Tip-Ex**: Menghapus kesalahan dengan menimpanya menggunakan warna putih tebal.  
- **Ganti Kertas**: Fitur untuk membersihkan seluruh halaman dengan konfirmasi melalui modal UI kustom.  
- **Penyimpanan Otomatis**: Progres coretan disimpan secara otomatis ke `localStorage` browser. Coretan tidak akan hilang meski halaman di-refresh atau browser ditutup.  
- **Mobile Optimized**: Mendukung interaksi sentuh (**touch events**) dan desain responsif untuk layar smartphone.  
- **Tanpa Backend**: Berjalan 100% di sisi klien (browser) tanpa ketergantungan pada database atau server eksternal.

---

## 🚀 Teknologi yang Digunakan
- **HTML5**: Struktur halaman dan elemen `<canvas>`.  
- **CSS3**: Tata letak responsif, desain UI modern, dan animasi modal.  
- **JavaScript (Vanilla)**: Logika menggambar menggunakan Canvas API dan manajemen penyimpanan lokal.

---

## 🛠️ Cara Penggunaan
1. Buka file `index.html` di browser pilihan Anda (direkomendasikan **Chrome** atau **Safari Mobile**).  
2. Pilih alat (**Pulpen**, **Stabilo**, atau **Tip-Ex**) dari toolbar di bagian bawah layar.  
3. Mulai coretkan jari atau mouse Anda pada area putih.  
4. Klik **Ganti Kertas** jika ingin memulai dari awal dengan halaman bersih.  
5. Progress Anda akan tersimpan secara otomatis selama Anda tidak menghapus data situs/cache browser.

---

## 📦 Instalasi
Tidak diperlukan instalasi rumit. Cukup unduh atau salin kode dari `index.html` dan jalankan langsung di browser apa pun.  

Dibuat untuk kemudahan membuat coretan kapan saja, di mana saja.