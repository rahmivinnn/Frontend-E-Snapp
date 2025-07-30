# Deployment Guide untuk E-Snapp Energy Monitoring Dashboard

## Masalah Umum dan Solusi

### 1. Error 404 NOT_FOUND di Vercel

**Penyebab:**
- Konfigurasi routing yang salah di `vercel.json`
- Environment variables tidak dikonfigurasi
- Database tidak terhubung

**Solusi:**

#### A. Konfigurasi Environment Variables di Vercel

1. Buka dashboard Vercel project Anda
2. Masuk ke **Settings** > **Environment Variables**
3. Tambahkan variabel berikut:

```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d
FRONTEND_URL=https://your-vercel-app.vercel.app
```

#### B. Setup Database PostgreSQL

**Opsi 1: Menggunakan Vercel Postgres**
1. Di dashboard Vercel, pilih **Storage** tab
2. Klik **Create Database** > **Postgres**
3. Copy connection string ke `DATABASE_URL`

**Opsi 2: Menggunakan Supabase (Gratis)**
1. Daftar di [supabase.com](https://supabase.com)
2. Buat project baru
3. Di **Settings** > **Database**, copy connection string
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

**Opsi 3: Menggunakan Railway**
1. Daftar di [railway.app](https://railway.app)
2. Deploy PostgreSQL database
3. Copy connection string

#### C. Menjalankan Database Migration

Setelah setup database, jalankan migration:

```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push

# (Opsional) Seed data
npm run db:seed
```

### 2. Build Errors

**Jika ada error saat build:**

1. Pastikan semua dependencies terinstall:
```bash
npm install
```

2. Test build lokal:
```bash
npm run build
```

3. Jika ada TypeScript errors, fix terlebih dahulu

### 3. API Routes Tidak Berfungsi

**Pastikan:**
- File `api/index.ts` ada dan benar
- Environment variables sudah dikonfigurasi
- Database connection string benar

### 4. Langkah Deploy Ulang

1. **Commit dan push perubahan:**
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push
```

2. **Redeploy di Vercel:**
   - Vercel akan otomatis redeploy setelah push
   - Atau manual redeploy di dashboard Vercel

3. **Test endpoints:**
   - `https://your-app.vercel.app/api/health` - harus return status OK
   - `https://your-app.vercel.app/` - harus load aplikasi React

### 5. Debugging Tips

1. **Check Vercel Function Logs:**
   - Buka dashboard Vercel
   - Masuk ke **Functions** tab
   - Lihat logs untuk error details

2. **Test API lokal:**
```bash
npm run server
# Test di http://localhost:3000/api/health
```

3. **Check database connection:**
```bash
npx prisma studio
# Atau
npx prisma db pull
```

## Checklist Deployment

- [ ] Environment variables dikonfigurasi di Vercel
- [ ] Database PostgreSQL setup dan accessible
- [ ] `vercel.json` dikonfigurasi dengan benar
- [ ] Prisma schema di-push ke database
- [ ] Build berhasil tanpa error
- [ ] API endpoints berfungsi
- [ ] Frontend routing berfungsi

## Struktur Project untuk Vercel

```
e-snapp-dash-main/
├── api/
│   └── index.ts          # Vercel serverless function
├── dist/                 # Build output (auto-generated)
├── src/
│   ├── components/
│   ├── pages/
│   └── server/           # Server code (untuk development)
├── vercel.json           # Vercel configuration
├── package.json
└── prisma/
    └── schema.prisma
```

## Kontak Support

Jika masih ada masalah, check:
1. Vercel documentation: https://vercel.com/docs
2. Prisma documentation: https://www.prisma.io/docs
3. Project GitHub issues