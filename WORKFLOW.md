# WORKFLOW.md

Tutorial cara membuat banyak web apps sederhana menggunakan AI, langsung dari smartphone.

---

## Part 1 — Gimana caranya bikin web app sendiri pakai AI gratis (langsung dari smartphone)?

**Kenapa harus download tools simpel, kalau kita sebenarnya bisa bikin sendiri?**  
Inilah Tutorial Mempersulit Hidup... hehe... beesyaandaaa...

Akhir-akhir ini, banyak orang udah nggak pusing lagi kalau butuh tools sederhana. Nggak mikir harus cari atau download di mana. Karena sekarang... mereka vibe coding, bikin sendiri pakai AI. (Lovable, v0, Antigravity, dll.)

Jadi aku mau coba juga, vibe coding, versi "wong ruwet", versi "lite", gratisan, tanpa laptop. Cuma modal smartphone, yang penting bisa sambil rebahan.

**Alur yang aku pakai:**

```
Smartphone + mobile web browser + GitHub app + AI app
```

---

## 5 TUTORIAL MEMPERSULIT HIDUP

### 0. Buat repository (via browser ya, ini penting)

- Buka **GitHub lewat web browser** (bukan lewat GitHub app)  
  **Kenapa?** Karena fitur create repository belum tersedia lengkap di GitHub app
- Buat **private repository**, misalnya: `my-all-personal-web-apps`
- Centang **"README"**

---

### 1. Siapkan tools

**Install dari Play Store:**

1. **GitHub app**
2. **Gemini app** (walaupun sebenarnya sudah ada di Assistant Google app)
3. **ChatGPT app**
4. **Claude app**

---

### 2. Mulai dari ide (pakai AI app pertama)

- Buka **Gemini app**, lalu mulai dengan percakapan:

```
Saya ingin membuat web app sederhana...
Tujuan: ...
Nama: ...
Fungsionalitas: ...
Manfaat: ...
```

- Tambahkan **batasan** supaya tetap realistis untuk pemula:

**Wajib:**

- Mobile-first (fokus ke tampilan smartphone)
- Hanya HTML, CSS, JavaScript
- Tanpa database → gunakan localStorage
- Tanpa aset eksternal (font/icon/CDN)
- Satu halaman saja (seperti SPA tanpa pindah halaman)

**Opsional:**

- Canvas API (untuk olah gambar sederhana)
- Web Audio API (untuk fitur suara/audio)
- File API (upload & baca file lokal)
- Clipboard API (copy/paste otomatis)
- Geolocation API (ambil lokasi user)
- Free public API (untuk mendukung fitur lain)

> **Intinya:** Semua fitur harus bisa jalan 100% di browser tanpa backend.

---

### 3. Ubah jadi dokumentasi (biar nggak ngawang)

- Salin hasil jawaban **Gemini app** → masuk ke **ChatGPT app**
- Lalu minta dibuatkan:

```
- Mini PRD
- Scope sederhana
- User flow
- Struktur fitur
- README.md
```

Semua dalam **format markdown**.

**Tujuannya:** Biar ide berubah jadi blueprint yang jelas.

---

### 4. Generate aplikasinya

- Salin semua dokumentasi dari **ChatGPT app** → masuk ke **Claude app**
- Lalu minta:

```
Buatkan MVP sederhana dari dokumentasi ini

Output:
- index.html
- style.css
- script.js
```

---

### 5. Upload ke GitHub (step-by-step dari smartphone)

Sekarang buka aplikasi **GitHub app**

1. Masuk ke **Repositories**
2. Pilih repo: `my-all-personal-web-apps`
3. Masuk ke tab **Code**
4. Klik titik tiga **(⋮)**
5. Pilih **Create file**

**Kemudian, mulai dari sini, semua dilakukan satu per satu:**

#### Buat folder sekaligus ketiga file

Jadi, setelah pilih **Create file:**

6. Isi **Nama:** `my-1st-tools/index.html`
7. Isi **File:** Salin isi `index.html` dari Claude app
8. **Commit** → **Push**

**Bagus, file berhasil dibuat!**

**Ulangi langkah yang sama:**

9. `my-1st-tools/style.css` → Isi → Commit → Push
10. `my-1st-tools/script.js` → Isi → Commit → Push

> **Setiap file:** Create → Isi → Commit → Push

---

## Sampai di sini... web app kita sebenarnya sudah jadi.

**Tanpa laptop.**  
**Tanpa tools berbayar.**  
**Tanpa setup ribet.**

**Workflow-nya:**

```
ide → AI → dokumentasi → coding → upload
```

**Langkah berikutnya?**
Kita bikin jadi live.

---

## Part 2 — Gimana caranya bikin web app jadi live (langsung dari smartphone)?

Di **Part 1**, kita sudah sampai tahap:  
App sudah jadi (HTML, CSS, JS) dan tersimpan di GitHub.

**Sekarang pertanyaannya:**  
Gimana caranya biar bisa diakses orang lain lewat link?

**Jawabannya:** Deploy.  
Dan aku coba tetap pakai cara yang sama: **smartphone only**.

---

## 3 TUTORIAL LANJUTAN

### 6. Deploy pakai Vercel (via browser)

- Buka **Vercel** lewat mobile browser
- Buat **New Project**
- **Import repository GitHub** yang sudah dibuat di Part 1
- Pilih repository: `my-all-personal-web-apps`

---

### 7. Deploy per folder (ini kuncinya)

Karena satu repo isinya banyak app, kita bisa deploy per folder.  
Sebenarnya bisa juga langsung dari root reponya, tapi kita tetap akan pakai pendekatan ini. Yaitu pendekatan **B)**

A) Contoh yang tidak kita pakai:

```
Root Directory: ./
```

**B) Contoh yang kita pakai:**

```
Root Directory: my-1st-tools/
```

1. **Root Directory:** `my-1st-tools/`

Kemudian pada bagian lain ada pilihan **Application Preset**

2. **Application Preset:** `Other` (karena cuma HTML, CSS, JS)

Kemudian pada bagian atas ada **Project Name**

3. **Project Name:** `my-1st-tools` (sesuai dengan nama web app kita)

Lalu klik **Deploy**

---

### 💡 Tips (Opsional)

Jika kita mau mendeploy tools ini langsung dari dalam **root directory (./)**, kita harus sedikit memodifikasi HTML untuk mengubah path ke file CSS & JS menggunakan **absolute path** (relative-to-root/subfolder), bukan relative path default buatan milik Claude app.

Hal ini penting untuk menghindari Vercel mengalami bug saat routing atau ketika halaman diakses dari path yang berbeda.

#### ❌ Tag di index.html yang berpotensi error adalah seperti ini:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

Jadi, jika kita tetap mau mendeploy tools ini langsung dari dalam **root directory**

Yaitu contoh yang tidak kita pakai:

```
Root Directory: ./
```

#### ✅ Edit tag di index.html menjadi seperti ini:

```html
<link rel="stylesheet" href="../my-1st-tools/style.css">
<script src="../my-1st-tools/script.js"></script>
```

**Kenapa?**

Karenan jika kita tetap mau mendeploy menggunakan **root directory (./)**, browser bisa salah resolve path saat kita hanya menggunakan relative path biasa, terutama ketika berpindah halaman atau menggunakan routing. Dengan menggunakan **absolute path** pada tag yang di-edit di atas, kita memastikan file CSS & JS tetap bisa diakses dengan benar dari berbagai level URL.

**Namun pada tutorial kali ini, kita tidak akan menerapkan tips (opsional) di atas**.

**Kembali ke contoh yang kita pakai:**

```
Root Directory: my-1st-tools/
```

Sudah klik **Deploy**?

---

### 8. Hasilnya?

- Kita langsung dapat **link**!
- Bisa dipakai kita pribadi atau dishare linknya agar bisa dipakai orang lain!
- Dan yang menarik: **Setiap folder → bisa jadi 1 web app terpisah**!
- Jadi, **1 Repository:** `my-all-personal-web-apps` → bisa punya banyak link web apps!

---

## Real case (yang aku lakukan)

Aku beneran deploy web apps tersebut langsung dari smartphone.

**Tanpa buka laptop.**

**Tanpa setup tambahan.**

**Dan hasilnya? Langsung live.**

**Kenapa ini powerful?**

- Bisa bikin "kumpulan tools pribadi" dalam 1 repo
- Bisa share ke orang lain cukup pakai link

---

## Workflow lengkapnya sekarang:

```
ide → AI → dokumentasi → coding → upload → deploy → live
```

**Semuanya dari smartphone.**

---

## Kesimpulan

Dengan kombinasi:

- **Smartphone** (sebagai satu-satunya device)
- **AI** (untuk generate app)
- **GitHub** (untuk simpan kode)
- **Vercel** (untuk deploy)

Kita bisa bikin dan publish web app tanpa laptop sama sekali.

Yang penting: **ide + eksekusi + konsistensi**.

---

### Next?

Tinggal bikin app berikutnya, ulangi workflow yang sama, dan terus eksplorasi kemungkinan lainnya.

Happy vibe coding from your smartphone! 🚀
