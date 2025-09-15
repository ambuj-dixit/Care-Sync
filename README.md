🌐 Rural HealthConnect – Telemedicine Platform

A multilingual, offline-ready, animated telemedicine platform built with React + TypeScript to solve rural healthcare access challenges.
Designed for patients, doctors, pharmacies, and administrators, with features like video consultation, digital health records, real-time medicine availability, and dark/light mode.

🚀 Features
🔑 Core Features

Multilingual Support (English, Hindi, Punjabi) on every page.

Dark/Light Mode Toggle across the app.

User Authentication (Email & Phone OTP with Firebase).

User Dashboard

Book consultations with doctors.

Access & upload digital health records (offline-first).

Check real-time medicine availability in nearby pharmacies.

Doctor Panel

Manage availability and appointments.

Video consultations powered by Jitsi API / WebRTC.

Access patient history.

Pharmacy Panel

Update medicine stock.

Patients can search availability before traveling.

Admin Panel

Manage doctors and pharmacies.

Monitor consultations & stock reports.

🎨 UI & Experience

Fully animated interface with Framer Motion.

Smooth page transitions, hover effects, and modal animations.

Card-based responsive design (TailwindCSS).

PWA-ready for mobile installation.

📦 Advanced Features (Optional)

AI-based symptom checker (rule-based).

Notifications for appointments and medicine availability.

Role-based access (User / Doctor / Pharmacy / Admin).

🛠️ Tech Stack

Frontend: React + TypeScript + Vite

State Management: Redux Toolkit

Styling: TailwindCSS + Framer Motion

Routing: React Router v6

Multilingual: i18next

Authentication: Firebase Auth (Email & Phone OTP)

Database: Firebase Firestore (for demo data)

Offline Storage: IndexedDB (Dexie.js)

Video Calls: Jitsi Meet API

📂 Project Structure
src/
 ├── components/      # Reusable UI components (Navbar, Sidebar, Cards, Modals)<br>
 ├── pages/           # Page views (Auth, User, Doctor, Pharmacy, Admin, Settings)<br>
 ├── store/           # Redux slices (auth, user, doctor, pharmacy, admin)<br>
 ├── hooks/           # Custom hooks (auth, theme, i18n, offline sync)<br>
 ├── i18n/            # Language files (en.json, hi.json, pa.json)<br>
 ├── assets/          # Static files (icons, images)<br>
 ├── App.tsx          # Root app with routing & theme provider<br>
 ├── main.tsx         # Entry point<br>
 └── index.css        # Global TailwindCSS styles<br>

⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/ambuj-dixit/TeleMed-Pro.git
cd rural-healthconnect

2️⃣ Install dependencies
npm install

3️⃣ Setup Firebase

Create a Firebase project.

Enable Authentication (Email & Phone).

Enable Firestore Database.

Add your Firebase config in .env.

4️⃣ Run the app
npm run dev

🌍 Multilingual Setup

Language files are stored in src/i18n/.

Add translations in:

en.json → English

hi.json → Hindi

pa.json → Punjabi

Switch languages via the Settings page.

🎥 Video Consultation

Powered by Jitsi Meet API.

Doctors can start a video call.

Patients receive a meeting link in their dashboard.

🤝 Stakeholders & Impact

Patients – Save travel time, access doctors remotely.

Doctors – Manage patients efficiently.

Pharmacies – Update real-time stock.

Admin – Oversee healthcare delivery in rural areas.