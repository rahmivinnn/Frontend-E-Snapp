# E-Snapp Energy Monitoring Dashboard

A comprehensive energy monitoring dashboard built with modern web technologies to help users track and manage their energy consumption efficiently.

## Features

- **Real-time Energy Monitoring**: Track energy consumption in real-time
- **Device Management**: Setup and manage energy monitoring devices
- **Data Visualization**: Interactive charts and graphs for energy data
- **User Authentication**: Secure login and registration system
- **Billing History**: Track and analyze energy bills
- **Tariff Management**: Configure and manage energy tariffs
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## Technologies Used

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Prisma ORM with SQLite (development)
- **Authentication**: JWT with bcryptjs
- **Charts**: Recharts for data visualization
- **State Management**: TanStack Query (React Query)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Renua-SB-Srl/e-snapp-mobile.git
cd e-snapp-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="30d"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development servers:

**Frontend (Vite dev server):**
```bash
npm run dev
```

**Backend API server:**
```bash
npm run server
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run server` - Start the backend API server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with sample data
- `npm run db:studio` - Open Prisma Studio

## Deployment

### Deploy to Vercel

#### Prerequisites

1. Vercel account
2. PostgreSQL database (Vercel Postgres, Supabase, or other provider)

#### Steps

1. Fork this repository
2. Login to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your forked repository
5. Configure environment variables:
   - `DATABASE_URL`: PostgreSQL connection URL
   - `JWT_SECRET`: Secret key for JWT tokens
   - `JWT_EXPIRES_IN`: Token expiration time (e.g., "30d")
6. Click "Deploy"

#### Database Setup

1. Create a PostgreSQL database
2. Run migrations: `npx prisma migrate deploy`
3. (Optional) Seed data: `npm run db:seed`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages/screens
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── server/             # Backend API and database models
│   ├── api/           # API routes
│   ├── models/        # Database models
│   └── utils/         # Server utilities
public/                 # Static assets
prisma/                 # Database schema and migrations
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
