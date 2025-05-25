# JEE Solver

A comprehensive JEE preparation platform with advanced analytics and performance tracking.

## Features

- **Performance Analytics Dashboard**
  - Overall performance metrics
  - Subject-wise progress tracking
  - Topic-wise performance analysis
  - Real-time progress monitoring
  - Interactive data visualization

- **Study Materials**
  - Physics, Chemistry, and Mathematics modules
  - Topic-wise practice problems
  - Detailed solutions and explanations
  - Progress tracking for each subject

- **Practice Tests**
  - Subject-specific tests
  - Full-length mock tests
  - Timed assessments
  - Detailed performance analysis

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- Chart.js for data visualization
- Prisma ORM
- NextAuth.js for authentication

## Local Development Setup

1. **Prerequisites:**
   - Node.js 18+ installed
   - PostgreSQL installed and running
   - Git installed

2. **Clone the repository:**
   ```bash
   git clone https://github.com/ojhadiwesh/jee_solver.git
   cd jee_solver
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/jee_solver"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   ```

5. **Initialize the database:**
   ```bash
   # Run database migrations
   npx prisma migrate dev

   # Seed the database with initial data
   npx prisma db seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Default admin credentials:
     - Email: admin@example.com
     - Password: admin123

## Development Commands

```bash
# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npx prisma generate

# Reset database
npx prisma reset
```

## Troubleshooting

Common issues and solutions:

1. **Database Connection Issues:**
   ```bash
   # Check database status
   npx prisma db push --preview-feature
   
   # Reset database
   npx prisma migrate reset
   ```

2. **Dependencies Issues:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

3. **Port Already in Use:**
   - Check if port 3000 is available
   - Change port in package.json if needed:
     ```json
     "dev": "next dev -p 3001"
     ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
