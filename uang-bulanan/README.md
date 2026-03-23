# 💰 Uang Bulanan - Catat Uang Setiap Bulan

Aplikasi pengelolaan keuangan pribadi berbasis web yang sederhana, ringan, dan privat. Didesain khusus untuk penggunaan mobile-first, aplikasi ini membantu Anda mencatat pemasukan dan pengeluaran harian tanpa ribet.

## ✨ Fitur Utama

- **Zero-Backend**: Berjalan 100% di browser. Tidak ada server, tidak ada risiko kebocoran data di cloud.
- **Mobile-First Design**: Antarmuka yang dioptimalkan untuk layar smartphone dengan navigasi yang mudah dijangkau.
- **Offline Ready**: Menggunakan localStorage untuk menyimpan data, sehingga tetap bisa digunakan tanpa koneksi internet.
- **Manajemen Transaksi**:
  - Tambah, edit, dan hapus transaksi.
  - Kategorisasi otomatis dengan autocomplete.
  - Catatan tambahan untuk setiap transaksi.
- **Analisis Sederhana**: Ringkasan total pemasukan, pengeluaran, dan sisa saldo secara real-time.
- **Keamanan Data (Self-Host)**: Fitur Export JSON untuk backup data ke file lokal dan Import JSON untuk memulihkan data di perangkat lain.
- **Tips Keuangan**: Widget dinamis yang memberikan saran finansial singkat setiap kali aplikasi dibuka.

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan **Vanilla Tech Stack** murni untuk memastikan kecepatan maksimal:

- **HTML5**: Struktur semantik dan elemen form modern.
- **CSS3**: Custom properties (variabel), Flexbox, Grid, dan animasi halus.
- **JavaScript (ES6+)**: Logika aplikasi, manipulasi DOM, dan pengelolaan localStorage.
- **SVG**: Icon dikodekan secara manual (inline) tanpa tergantung pada library eksternal atau CDN.

## 🚀 Cara Penggunaan

Karena aplikasi ini hanya terdiri dari satu file HTML, cara menggunakannya sangat mudah:

1. Unduh file `index.html`.
2. Buka file tersebut menggunakan browser pilihan Anda (Chrome, Safari, Firefox, dll).
3. Klik tombol **"+"** di bagian bawah untuk mulai mencatat transaksi pertama Anda.
4. Gunakan fitur **Export** secara berkala untuk mencadangkan data Anda dalam format berkas `.json`.

## 📂 Struktur Data (JSON)

Data yang diekspor memiliki struktur sebagai berikut:

```json
[
  {
    "id": "1710563200000",
    "type": "in",
    "amount": 5000000,
    "category": "Gaji",
    "note": "Gaji Bulan Maret",
    "date": "2024-03-16T10:00:00.000Z"
  }
]
```

## 📝 Catatan Pengembangan

- **Penyimpanan**: Data disimpan di localStorage browser. Jika Anda menghapus cache browser atau melakukan clear data pada browser, data aplikasi ini juga akan terhapus. Selalu gunakan fitur **Export** untuk cadangan.
- **Privasi**: Developer tidak memiliki akses ke data Anda. Semua angka yang Anda masukkan tetap berada di perangkat Anda sendiri.
