# 🗂️ Znippetmep

Znippetmep adalah Web App sederhana berbasis Vanilla JavaScript untuk menyimpan, mengelola, dan menghubungkan code snippet serta CLI command dalam satu tempat.

---

## ✨ Fitur Utama

- 📌 Simpan CLI & Code Snippet
- 🗂️ Kategori & Tag
- ⭐ Favorite Snippet
- 🔍 Pencarian Instan
- 📋 Copy ke Clipboard
- 🌿 Relasi / Flow Snippet (branching)
- 🧠 Visualisasi Flow dengan Canvas API
- 📱 Mobile-first & Responsive

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- localStorage API
- Canvas API
- Clipboard API

---

## 📁 Struktur Project

```
znippetmep/
│
├── index.html
├── style.css
└── app.js
```

---

## 🧠 Arsitektur

- Single Page Application (SPA)
- State terpusat (single object)
- Render ulang UI saat state berubah
- Data disimpan di localStorage

---

## 💾 Struktur Data

```js
{
  id: "uuid",
  title: "Git Commit",
  content: "git commit -m 'message'",
  category: "git",
  tags: ["git", "commit"],
  favorite: false,
  connections: ["id_lain"],
  createdAt: 123456789
}
```


---

⚙️ Cara Menjalankan

1. Download / clone project


2. Buka index.html di browser


3. Selesai 🎉




---

📌 Roadmap (Future)

Export / Import JSON

Dark Mode

Drag & Drop Flow Builder

Sync Cloud (Firebase / Supabase)



---

🤝 Kontribusi

Pull request terbuka untuk pengembangan fitur baru 🚀


---

📝 Lisensi

MIT License