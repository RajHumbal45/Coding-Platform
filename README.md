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
3. Copy `.env.example` to `.env`
4. Set `JWT_SECRET` in `.env`
5. `npm run dev`

Backend runs on `http://localhost:5000`.

## Frontend Setup
1. Open another terminal and `cd frontend`
2. `npm install`
3. Copy `.env.local.example` to `.env.local`
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

## 4-5 Minute Demo Script (Ready To Read)

Hi everyone, in this demo I’ll walk you through my DA Sheet platform built with MERN and Next.js.

The idea behind this project is very practical.
Most students already have enough DSA resources, but they don’t have one structured place to track progress consistently.
They jump between videos, articles, and coding platforms, and lose continuity.
So I built this platform to give them a clean chapter-wise roadmap with persistent progress tracking.

Let’s start from the student side.
This is the login page.
A user can log in, register a new account, or reset password if needed.
I’ll log in as a student.
After login, we reach the dashboard.

Here, the DSA sheet is organized as:
Chapter -> Topic -> Problems.
I can expand chapter and topic, and for each problem I get:
- difficulty level
- YouTube tutorial link
- LeetCode/Codeforces practice link
- article link for theory

So the student does not need to search resources separately.
Everything needed for one problem is available in one row.

Now I’ll mark this problem as completed using the checkbox.
This is saved in backend for this specific user.
It is not just temporary frontend state.

Next, I open the Progress page.
Here we can clearly see:
- overall completion percentage
- chapter-wise progress
- difficulty-wise solved count
- completed problem list

This gives a clear preparation snapshot and helps students know exactly what to do next.

Now I’ll log out and log in again.
The previously solved problem is still marked completed.
So resume-from-where-you-left works correctly.

Now I’ll quickly show admin flow.
I log in with admin credentials and open the Admin Panel.
From here, admin can add:
- a new chapter
- a topic inside that chapter
- a problem inside that topic with links and level

A good UX point is that admin does not need to manually create IDs.
The backend auto-generates IDs, so admin only enters user-friendly fields.
As soon as content is added, it becomes part of the student sheet.

From architecture perspective:
Frontend is Next.js pages router with Redux and Redux-Saga in feature-first structure.
GET actions trigger sagas, SET actions update reducers, and API calls stay in request layer.
That keeps components clean and maintainable.
Backend is Express with MongoDB.
Authentication is JWT-based with secure cookie session handling.
Roles are separated into student and admin.

So in summary, this is not just a basic tracker.
It is a production-oriented learning workflow platform where students can prepare consistently and admins can manage content easily from one place.
