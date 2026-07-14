# 🎓 Estudiando Virtual

A modern, interactive web platform for booking and managing private online math lessons. Designed to offer a seamless user experience, from exploring the methodology to class booking confirmation.

---

## ✨ Key Features

*   **Optimized User Journey:** Landing page with a guided 3-stage flow (Introduction -> Methodology -> Booking).
*   **Interactive Walkthrough:** Descriptive breakdown of class dynamics (real-time interactive whiteboard and downloadable PDF notes).
*   **Smart Booking Calendar:** Dynamic form for slot selection with automatic Google Meet link generation and confirmation emails.

---

## 🛠️ Tech Stack

This project is built using a modern and efficient development stack:

*   **Frontend & API:** [Next.js](https://nextjs.org/) (App Router) with [Tailwind CSS](https://tailwindcss.com/) for a fast, responsive user interface.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for robust, type-safe development across the entire stack.
*   **Database & ORM:** [PostgreSQL 16](https://www.postgresql.org/) running via [Docker](https://www.docker.com/) alongside [Prisma ORM](https://www.prisma.io/).
*   **Iconography:** [Lucide React](https://lucide.dev/).

---

## 🚀 Getting Started (Local Development)

### 1. Database (Docker)
Start the local database container in the background:

```bash
docker compose up -d
```

### 2. Application (Next.js)
Install the dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📁 Project Structure

```text
├── app/
│   ├── components/      # UI Components (Hero, HowItWorks, BookingForm)
│   ├── layout.tsx       # Global configuration and typography (Poppins, Kalam)
│   └── page.tsx         # Main landing page and interactive scroll flow
├── prisma/              # Database schema and Prisma migrations
└── docker-compose.yml   # PostgreSQL container configuration
```
