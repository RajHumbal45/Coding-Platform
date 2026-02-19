# DA Sheet (MERN + Next.js Frontend)

Production-oriented DA Sheet app with:
- Student auth (register/login/logout)
- Forgot/reset password flow
- Role-based access (student/admin)
- Chapter -> Topic -> Problem structured DSA sheet
- YouTube, LeetCode/Codeforces, and article links
- Easy/Medium/Tough indicators
- Per-student progress persistence
- Admin panel to add chapters, topics, and problems

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose
- Security: HttpOnly cookie session, Helmet, CORS credentials, rate limiting
- Frontend: Next.js (pages router)

## Project Structure
- `backend/` Express API + MongoDB models
- `frontend/` Next.js app

## Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` manually with:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_secret_key`
   - `CLIENT_URL=http://localhost:3000`
   - `NODE_ENV=development`
5. `npm run dev`

Backend runs on `http://localhost:5000`.

## Frontend Setup
1. Open another terminal and `cd frontend`
2. `npm install`
3. Create `.env.local` manually with:
   - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
4. `npm run dev`

Frontend runs on `http://localhost:3000`.

## Demo Accounts
- Student: `student@example.com` / `student123`
- Admin: `admin@example.com` / `admin123`

## Core Routes
- Auth: `/login`, `/register`, `/forgot-password`, `/reset-password`
- Student: `/dashboard`, `/progress`
- Admin: `/admin`

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/sheet`
- `GET /api/progress`
- `PUT /api/progress/:problemId`
- `GET /api/admin/sheet` (admin)
- `POST /api/admin/chapter` (admin)
- `POST /api/admin/chapter/:chapterId/topic` (admin)
- `POST /api/admin/chapter/:chapterId/topic/:topicId/problem` (admin)

## Note
Reset password is token-based and currently returns token in API response for local/dev usage.

