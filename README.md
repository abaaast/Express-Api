# 📦 Expres-BE

Backend API sederhana menggunakan Express.js, SQLite, dan Swagger untuk dokumentasi.

## 🚀 Fitur

- Autentikasi JWT (login & register)
- Manajemen User (CRUD)
- Todo List (CRUD, kategori, progress history, kolaborator)
- Dokumentasi API otomatis dengan Swagger

## ⚙️ Requirement

- Node.js v22.12.0 atau lebih baru
- npm v11.0.0 atau lebih baru

Pastikan Node.js dan npm sudah terinstall sebelum menjalankan perintah instalasi.

## 🛠️ Instalasi

1. Clone repo ini:

   ```
   git clone https://github.com/abaaast/Express-Api.git
   cd expres-be
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` ke `.env` dan sesuaikan konfigurasi jika perlu
4. Setup database (migrasi & seed data awal):
   ```
   npm run setup-db
   ```
5. Setup swagger docs:
   ```
   npm run swagger
   ```

## 🚴 Menjalankan Server

```
npm start
```

atau untuk development:

```
npm run dev
```

## 📄 Dokumentasi API

Swagger UI tersedia di:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📁 Struktur Direktori

. ├── src/ │ ├── routes/ # Definisi endpoint/route Express │ ├── controllers/ # Logika bisnis untuk menangani request dari route │ ├── models/ # Model database (ORM / Sequelize / Knex / Query Builder) │ ├── middlewares/ # Middleware Express (autentikasi, error handler, dsb) │ ├── utils/ # Fungsi utilitas/helper yang digunakan di berbagai bagian aplikasi │ ├── services/ # (Opsional) Logika bisnis kompleks, terpisah dari controller │ ├── config/ # Konfigurasi aplikasi (database, env, dsb) │ ├── validators/ # Validasi input request (Joi, express-validator, dsb) │ └── docs/ # (Opsional) Dokumentasi tambahan atau definisi Swagger ├── database/ # File migrasi & seed database └── swagger/ # Konfigurasi & output dokumentasi Swagger

---

## 🤝 Kontribusi

Kontribusi sangat terbuka!  
Silakan fork repo ini, buat branch baru, dan ajukan pull request.

## ☕ Dukung Saya

Saya programmer pemula dari Indonesia 🇮🇩  
Jika kamu suka proyek ini, kamu bisa dukung saya di:

[![Trakteer](https://trakteer.id/images/embed/trbtn-red-6.png)](https://trakteer.id/abaaast)

## 📜 Lisensi

This project is licensed under the [MIT License](./LICENSE).

**👤 Author:**  
Abaaast [Instagram](https://instagram.com/abaaast)
