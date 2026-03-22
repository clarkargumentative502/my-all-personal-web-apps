# 🕘 Kineticlock - Ultra Minimalist Clock

Proyek ini adalah implementasi digital dari jam kinetik (seperti karya seni "A Million Times" oleh Humans since 1982). Jam ini menggunakan grid berisi 24 jam analog kecil (3 baris x 8 kolom) untuk membentuk angka digital yang menunjukkan waktu saat ini.

## ✨ Fitur Utama

* **Ultra Minimalist UI**: Antarmuka bersih tanpa teks tambahan, logo, atau status bar. Fokus sepenuhnya pada keindahan visual jam.
* **Dynamic Needle Opacity**: Jarum jam yang tidak digunakan untuk membentuk angka (pada angka 1, 4, 7, 9, dll.) akan memudar menjadi transparan secara otomatis, memberikan tampilan yang lebih rapi.
* **Auto Dark Mode**: Tema akan berubah secara otomatis berdasarkan waktu sistem (Mode Gelap aktif antara pukul 18.00 hingga 06.00).
* **Smooth Kinetic Animation**: Transisi antar angka menggunakan interpolasi sudut yang halus untuk mensimulasikan gerakan mekanis nyata.
* **Mechanical Sound Effects**: Dilengkapi dengan efek suara "tick" mekanis yang halus setiap kali menit berganti (memerlukan interaksi klik pertama untuk membuka izin Audio API).
* **Responsive Design**: Skalabilitas otomatis untuk perangkat mobile dan desktop dengan dukungan High DPI (Retina Display).

## 🛠️ Detail Teknis

* **Bahasa**: HTML5, CSS3, dan Vanilla JavaScript.
* **Render Engine**: HTML5 Canvas API dengan optimasi `devicePixelRatio`.
* **Logic Mapping**: Menggunakan `DIGIT_BLUEPRINT` untuk mendefinisikan posisi jarum jam per digit dalam grid 2x3.
* **Matematika**: Fungsi `lerpAngle` digunakan untuk memastikan jarum selalu berputar melalui jalur terpendek (shortest path).

## 🚀 Cara Penggunaan

* Buka file `index.html` di peramban (browser) modern apa pun.
* Klik atau ketuk sekali di mana saja pada layar untuk mengaktifkan sistem suara.
* Jam akan otomatis membaca waktu sistem Anda.

## 📱 Optimasi Mobile

Proyek ini dirancang agar ramah perangkat mobile dengan mematikan fitur zoom (`user-scalable=no`) dan menggunakan unit relatif (`vw`, `%`) untuk memastikan tampilan tetap proporsional di berbagai ukuran layar.