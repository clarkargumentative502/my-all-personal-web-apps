# 🔢 Playculator - Bermain & Berhitung

Aplikasi web interaktif mobile-first yang dirancang untuk melatih ketangkasan numerasi melalui tantangan matematika acak dengan bantuan kalkulator terintegrasi.

## ✨ Fitur Utama

- **Mobile-First Design**: Antarmuka responsif yang dioptimalkan untuk perangkat layar sentuh dengan elemen UI yang besar dan nyaman ditekan.
- **Tingkat Kesulitan Dinamis**:
  - **MUDAH**: Angka acak 1 - 100 (Fokus pada operasi dasar).
  - **BIASA**: Angka acak 100 - 10.000 (Tantangan menengah).
  - **SULIT**: Angka acak 10.000 - 1.000.000 (Perhitungan angka besar).
- **Sistem Visual Canvas**: Menggunakan HTML5 Canvas API untuk merender soal dan animasi partikel feedback (Benar/Salah) yang dinamis.
- **Copy-to-Input**: Tombol cepat untuk menyalin hasil kalkulator ke kolom jawaban kuis.
- **Local Persistence**: Menyimpan rekor "Paling Cepat" secara terpisah untuk setiap tingkat kesulitan menggunakan `localStorage`.

## 🚀 Teknologi

- **HTML5**: Struktur semantik dan Canvas API untuk grafis.
- **CSS3**: Custom Properties (Variables), Flexbox, dan Grid Layout untuk tata letak presisi.
- **JavaScript (ES6+)**:
  - `requestAnimationFrame` untuk game loop animasi yang halus.
  - Logika state machine untuk mesin kalkulator.
  - Penanganan waktu presisi milidetik (ms).

## 🛠 Cara Penggunaan

1. Buka file `index.html` di browser apa pun.
2. Pilih tingkat kesulitan di bagian atas.
3. Gunakan kalkulator di bagian bawah untuk membantu menghitung soal yang muncul di layar.
4. Masukkan jawaban, klik **CEK JAWABAN**.
5. Pecahkan rekor waktu tercepat Anda!

## 📝 Catatan Teknis Edge Case

- **Input Sanitization**: Mesin kalkulator menggunakan evaluasi string yang telah dibersihkan untuk mencegah eksekusi kode yang tidak aman.
- **DPR Scaling**: Canvas secara otomatis menyesuaikan dengan Device Pixel Ratio layar untuk memastikan teks soal tidak terlihat buram di layar Retina/High-DPI.
- **Zero External Assets**: Tidak menggunakan font, ikon, atau library dari internet. Semua aset visual di-render secara programatik.
