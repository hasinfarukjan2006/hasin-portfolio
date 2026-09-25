# HASIN F - Software Engineering Portfolio Website

Production-ready, high-performance personal portfolio website for **HASIN F**, Computer Science & Engineering student and software engineer, built with Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Three.js, Node.js, Express, and MongoDB Atlas.

All personal, academic, internship, project, certification, and achievement data are strictly sourced from HASIN F's official resume without any unauthorized additions or fabrications.

---

## 1. Project Architecture & Highlights

- **Frontend App Router**: Next.js 14 with Server Components, Client Modals, and React 18.
- **Dark Developer Aesthetic**: Deep navy background (`#080b13`), glassmorphism cards, developer grid pattern, custom glowing accents (`#3b82f6`, `#8b5cf6`, `#22d3ee`), and high readability.
- **Dynamic 3D Canvas**: Interactive particle and acoustic node mesh rendered via Three.js / Canvas context with low-overhead fallback and `prefers-reduced-motion` compliance.
- **Full Backend API**: Express.js REST API with TypeScript, Mongoose models, rate limiting (`express-rate-limit`), security headers (`helmet`), CORS, and JWT authentication.
- **Database Integration & Auto-Seeding**: Automatic seed pipeline for MongoDB Atlas with fallback support so the site operates smoothly offline or online.
- **Authenticated Admin Portal**: Live CRUD management interface (`/admin`) for Projects, Certifications, Achievements, Experience, and Contact Messages.
- **Resume Viewer & Download**: Native PDF viewer modal and direct download pointing to `/public/resume.pdf` & `/api/resume`.
- **SEO & Accessibility**: WCAG 2.2 compliant focus rings, semantic HTML5, aria labels, JSON-LD structured data (`Person` schema), OpenGraph & Twitter tags, dynamic `sitemap.xml`, and `robots.txt`.

---

## 2. Directory & File Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   └── page.tsx                # Authenticated Admin Dashboard
│   ├── api/
│   │   ├── contact/route.ts        # POST contact message handler
│   │   ├── health/route.ts         # GET system health status
│   │   ├── projects/route.ts       # GET projects list
│   │   └── resume/route.ts         # GET resume PDF stream handler
│   ├── projects/
│   │   └── [slug]/page.tsx         # Dedicated project detail page & architecture
│   ├── globals.css                 # Custom Tailwind, glassmorphism, scrollbars, animations
│   ├── layout.tsx                  # Root layout with fonts, JSON-LD, SEO tags
│   ├── page.tsx                    # Main portfolio page (All 11 sections)
│   ├── robots.ts                   # Dynamic robots.txt generator
│   └── sitemap.ts                  # Dynamic sitemap.xml generator
├── components/
│   ├── About.tsx                   # Education (MKCE, CGPA 7.77) & summary highlights
│   ├── Achievements.tsx            # TCS CodeVita, hackathons & bootcamp cards
│   ├── Certifications.tsx          # Oracle AI Vector Search, NPTEL HCI, AWS, etc.
│   ├── Contact.tsx                 # Direct contact info & validated contact form
│   ├── Experience.tsx              # Softrate, CodSoft, InternPe vertical timeline
│   ├── Footer.tsx                  # Developer footer, back-to-top, admin link
│   ├── Hero.tsx                    # Premium introduction, resume & project CTAs
│   ├── Navbar.tsx                  # Sticky responsive nav bar with active highlight
│   ├── ProjectModal.tsx            # Interactive project detail preview modal
│   ├── Projects.tsx                # SafeCare, AquaSentinel AI, Softrate Web App cards
│   ├── ResumeSection.tsx           # Resume preview modal & download section
│   ├── Skills.tsx                  # Categorized skill tags (No fake % bars)
│   └── ThreeBackground.tsx         # Interactive Three.js particle background
├── lib/
│   └── resumeData.ts               # Single source of truth data strictly matching resume
├── public/
│   └── resume.pdf                  # Official HASIN F Resume PDF document
├── server/                         # Express Backend Server (TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts               # Mongoose database connection
│   │   │   └── resumeData.ts       # Backend seed data definitions
│   │   ├── controllers/            # Projects, Experience, Skills, Certs, Achievements, Contact, Auth
│   │   ├── middleware/             # Auth, RateLimiter, ErrorHandler
│   │   ├── models/                 # Mongoose schemas (Project, Experience, Skill, Cert, Ach, Contact, User)
│   │   ├── routes/                 # Express REST endpoints
│   │   ├── services/               # Seed database service
│   │   ├── utils/                  # JWT and Logger helpers
│   │   ├── app.ts                  # Express application setup
│   │   └── server.ts               # Server startup listener
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── .env.example
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 3. Setup Instructions

### Prerequisites
- Node.js v18+ or v20+
- npm or pnpm
- MongoDB Atlas cluster URL (optional for live database storage)

### Installation
1. Clone or navigate into the root project directory:
   ```bash
   cd portfolio
   ```
2. Install frontend & root dependencies:
   ```bash
   npm install
   ```
3. Install backend server dependencies:
   ```bash
   cd server && npm install && cd ..
   ```

---

## 4. Environment Variables Setup

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create a `server/.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hasin_portfolio?retryWrites=true&w=majority
JWT_SECRET=hasin_portfolio_jwt_secret_key_2026
```

---

## 5. Database Setup & Seeding

The server automatically checks MongoDB Atlas on startup and seeds the database with HASIN F's resume data and the default admin account if empty.

To manually trigger seeding:
```bash
npm run seed
```

Default Admin User created:
- **Username**: `admin`
- **Password**: `admin123`

---

## 6. API Documentation

### Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server health and database status |
| `GET` | `/api/projects` | Returns all projects (or fallback seed data) |
| `GET` | `/api/projects/:id` | Returns project details by ID or slug |
| `GET` | `/api/experience` | Returns internship experience timeline |
| `GET` | `/api/skills` | Returns technical skill categories |
| `GET` | `/api/certifications` | Returns all verified certifications |
| `GET` | `/api/achievements` | Returns hackathons and competition ranks |
| `POST` | `/api/contact` | Submits a contact form message (rate-limited) |

### Admin Endpoints (Protected with JWT Header `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate admin user (`admin` / `admin123`) |
| `GET` | `/api/auth/me` | Verify active admin token |
| `POST` | `/api/projects` | Create a new project entry |
| `PUT` | `/api/projects/:id` | Update project details or toggle featured status |
| `DELETE` | `/api/projects/:id` | Delete a project |
| `POST` | `/api/certifications` | Add a new certification |
| `DELETE` | `/api/certifications/:id` | Remove a certification |
| `POST` | `/api/achievements` | Add a new achievement |
| `DELETE` | `/api/achievements/:id` | Delete an achievement |
| `GET` | `/api/contact` | View all submitted contact messages |

---

## 7. Local Development Commands

- **Run Frontend Development Server (Port 3000)**:
  ```bash
  npm run dev
  ```
- **Run Backend Express Server (Port 5000)**:
  ```bash
  npm run server:dev
  ```
- **Build Frontend Production Bundle**:
  ```bash
  npm run build
  ```
- **Build Backend TypeScript Code**:
  ```bash
  npm run server:build
  ```

---

## 8. Production Deployment Instructions

### Frontend (Vercel)
1. Push project to GitHub.
2. Import repository in [Vercel Dashboard](https://vercel.com).
3. Set Framework Preset to **Next.js**.
4. Configure Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com/api`
5. Click **Deploy**.

### Backend (Render / Railway)
1. Create a new **Web Service** on Render or Railway pointing to the `server/` subdirectory.
2. Build Command: `pnpm run build` or `npm run build`
3. Start Command: `node dist/server.js`
4. Set Environment Variables:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `<Your MongoDB Atlas connection URI>`
   - `JWT_SECRET` = `<Secret string>`

---

## 9. Admin Login Setup Instructions

1. Navigate to `/admin` in your browser.
2. Login with credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Manage projects (Add/Edit/Delete/Mark Featured), certifications, achievements, and view contact submissions.

---

## 10. Final Verification & Quality Audit

- [x] `npm run build` succeeds cleanly with zero TypeScript or lint errors.
- [x] All 11 navigation sections scroll smoothly.
- [x] Dedicated project pages (`/projects/[slug]`) and preview modals function properly.
- [x] GitHub and LinkedIn external links open in new tabs.
- [x] Contact form validates email format and message length with loading/success feedback.
- [x] PDF Resume view & direct download links work via `/public/resume.pdf` & `/api/resume`.
- [x] SEO metadata, OpenGraph, JSON-LD schema, `sitemap.xml`, and `robots.txt` generated.
- [x] `prefers-reduced-motion` supported for animations.
- [x] WCAG 2.2 accessibility keyboard navigation supported.

