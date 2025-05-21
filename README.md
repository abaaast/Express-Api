# Expres-BE

Backend API sederhana menggunakan Express.js, SQLite, dan Swagger untuk dokumentasi.

## Fitur

- Autentikasi JWT (login & register)
- Manajemen User (CRUD)
- Todo List (CRUD, kategori, progress history, kolaborator)
- Dokumentasi API otomatis dengan Swagger

## Requirement

- Node.js v22.12.0 atau lebih baru
- npm v11.0.0 atau lebih baru

Pastikan Node.js dan npm sudah terinstall sebelum menjalankan perintah instalasi.

## Instalasi

1. Clone repo ini
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

## Menjalankan Server

```
npm start
```

atau untuk development:

```
npm run dev
```

## Dokumentasi API

Swagger UI tersedia di:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Struktur Direktori

- `src/`
  - `routes/` - Berisi definisi endpoint/route Express
  - `controllers/` - Logika bisnis untuk menangani request dari route
  - `models/` - Model database (ORM/sequelize/knex atau query builder)
  - `middlewares/` - Middleware Express (autentikasi, error handler, dsb)
  - `utils/` - Fungsi utilitas/helper yang digunakan di berbagai bagian aplikasi
  - `services/` - (Opsional) Berisi logika bisnis yang lebih kompleks, terpisah dari controller
  - `config/` - Konfigurasi aplikasi (database, env, dsb)
  - `validators/` - Validasi input request (menggunakan Joi, express-validator, dsb)
  - `docs/` - (Opsional) Dokumentasi tambahan atau definisi Swagger
- `database/` - File migrasi & seed database
- `swagger/` - Konfigurasi & output dokumentasi Swagger

---

**Author:**  
Abaaast
