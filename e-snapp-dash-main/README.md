# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3f9b6ce8-17f3-4998-bb69-e656ee799c07

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3f9b6ce8-17f3-4998-bb69-e656ee799c07) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/3f9b6ce8-17f3-4998-bb69-e656ee799c07) and click on Share -> Publish.

### Deploy to Vercel

#### Prasyarat

1. Akun Vercel
2. Vercel CLI (opsional)
3. Database PostgreSQL (bisa menggunakan Vercel Postgres, Supabase, atau penyedia lainnya)

#### Langkah-langkah Deployment

##### Menggunakan Vercel Dashboard

1. Fork repositori GitHub ini
2. Login ke [Vercel](https://vercel.com)
3. Klik "New Project"
4. Import repositori GitHub yang telah di-fork
5. Konfigurasi environment variables yang diperlukan:
   - `DATABASE_URL`: URL koneksi database PostgreSQL
   - `JWT_SECRET`: Secret key untuk JWT
   - `JWT_EXPIRES_IN`: Masa berlaku token JWT (contoh: 30d)
6. Klik "Deploy"

##### Menggunakan Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Login ke Vercel: `vercel login`
3. Navigasi ke direktori proyek
4. Deploy: `vercel`
5. Ikuti instruksi untuk mengonfigurasi proyek

#### Konfigurasi Database

1. Buat database PostgreSQL
2. Jalankan migrasi Prisma: `npx prisma migrate deploy`
3. (Opsional) Jalankan seed data: `npm run db:seed`

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
