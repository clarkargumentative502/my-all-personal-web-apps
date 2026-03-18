# 🚀 Letsfokus | Personal Pomodoro & Productivity Tracker

Letsfokus adalah aplikasi web sederhana berbasis Pomodoro untuk membantu meningkatkan fokus dan produktivitas harian.

## ✨ Features

    ⏱️ Customizable Pomodoro Timer
    🧠 Task Management dengan kategori dinamis
    📊 History fokus harian
    🗓️ Planner untuk hari berikutnya
    📋 Copy summary ke clipboard
    💾 Data tersimpan otomatis (localStorage)
    🎨 Tanpa dependency (pure HTML, CSS, JS)

---

## 🧱 Tech Stack

    HTML5
    CSS3 (Mobile-first)
    Vanilla JavaScript (ES6+)
    Canvas API (untuk visual timer)
    Web Audio API (untuk notifikasi suara)
    localStorage (sebagai database)

---

## 🚫 Constraints

    Tidak menggunakan framework (React/Vue/dll)
    Tidak menggunakan library eksternal
    Tidak menggunakan CDN
    Tidak menggunakan font/icon eksternal
    Semua berjalan dalam satu halaman (SPA)

---

## 📱 Design Principles

    Mobile-first UI
    Minimalist & fokus-friendly
    Smooth interaction
    Native app-like feel

---

## 🗂️ Data Structure (localStorage)

```js
{
  tasks: [],
  categories: [],
  history: [],
  planner: []
}

---

▶️ How to Run

    Download file index.html

    Buka di browser

    Langsung bisa digunakan (offline ready)

---

🔊 Kenapa Tanpa Audio File?

Aplikasi menggunakan Web Audio API untuk membuat suara notifikasi:

Lebih ringan

Tidak butuh file eksternal

100% offline

---

🎨 Kenapa Canvas API?

Canvas digunakan untuk:

Membuat circular progress timer

Tampilan lebih profesional

Tanpa asset gambar tambahan

---

📌 Future Improvements (Optional)

Dark/Light mode toggle

Export data ke JSON

Statistik mingguan

Progressive Web App (PWA)

---

👨‍💻 Author

Built with focus & intention.
