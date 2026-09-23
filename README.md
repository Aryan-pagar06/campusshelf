# CampusShelf

CampusShelf is a university-focused academic resource exchange platform designed for students and faculty to share, sell, rent, or exchange academic materials.

## Architecture

The project maintains a strict separation between frontend and backend:

```
CampusShelf/
├── frontend/    # React + Vite + TypeScript + Tailwind CSS + shadcn/ui
├── backend/     # Node.js + Express + TypeScript + Prisma ORM
├── .gitignore   # Monorepo root ignore rules
└── README.md    # Project overview & documentation
```

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL (Neon), Prisma ORM
- **Authentication**: JWT, Email OTP, Nodemailer
- **External Services**: Cloudinary (Image upload), Google Gemini API (Resource summaries), WhatsApp Click-to-Chat (Communication)
- **Deployment**: Frontend on Vercel, Backend on Render, Database on Neon PostgreSQL

## Project Scope (Locked Version 1)

CampusShelf is strictly focused on academic resource listings and peer-to-peer coordination:
- Resource browsing, search, and filtering
- Listing resources for Sell, Rent, Exchange, or Free Resource
- Cloudinary image uploads & details view
- Wishlist and resource request management (Accept/Reject)
- Transaction coordination via WhatsApp Click-to-Chat
- Completed transaction marking & ratings/reviews
- In-app notification alerts
- Gemini AI resource summaries & book information
- Admin moderation & dashboard analytics

*Note: Online payment gateways, in-app chat systems, multi-university systems, and mobile apps are explicitly out of scope for V1.*

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm (v10+ recommended)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
