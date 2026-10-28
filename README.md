# 🐾 Paws and Purrs

![Paws and Purrs Banner](./readme-assets/banner.png)

### Troy Evans 251096

A shelter dashboard that keeps donations, adoptions and featured animals in one place.

**Paws and Purrs** is a full-stack animal shelter platform with two sides. Donors can create an account, see how the shelter is doing, make a donation and send an adoption request. Admins get a protected dashboard where they manage adoptable animals with image uploads, pick the Animal of the Month, set donation goals and keep track of animals saved.

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [How to Install](#how-to-install)
  - [File Structure](#file-structure)
- [Features and Functionality](#features-and-functionality)
- [Planning and Process](#planning-and-process)
  - [ERD](#erd)
  - [Design Reference](#design-reference)
- [Final Outcome](#final-outcome)
  - [Live Website Links](#live-website-links)
  - [Mockups](#mockups)
  - [Screenshots](#screenshots)
- [Deployment Summary](#deployment-summary)
- [Challenges and Solutions](#challenges-and-solutions)
- [What I Learnt](#what-i-learnt)
- [Acknowledgements](#acknowledgements)

---

## About the Project

Small shelters usually juggle donations, adoption enquiries and social posts across spreadsheets, WhatsApp and email. Paws and Purrs puts all of that behind one login, so the shelter team can update what donors see without needing a developer, and donors always know what the shelter actually needs.

### Built With

- **Frontend.** React 19 with Vite, React Router and Tailwind CSS v4
- **Charts.** Chart.js with react-chartjs-2
- **Backend.** Node.js and Express 5 (routes, models and middleware split into their own folders)
- **Database.** MongoDB Atlas with Mongoose
- **Auth.** JSON Web Tokens and bcryptjs for hashed passwords
- **Image uploads.** Multer
- **Tools.** Figma, VS Code, Git and GitHub, Postman

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer) and npm
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A code editor (eg. VS Code)

### How to Install

1. Clone the repository

```bash
git clone https://github.com/Troy-jsx/Paws-and-Purrs.git
cd Paws-and-Purrs
```

2. Set up the backend

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` and fill in your own values

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/pawsandpurrs
JWT_SECRET=replace-with-a-long-random-string
PORT=5000
CLIENT_URL=http://localhost:5173
```

There's no public admin sign up on purpose, so create your own admin account from the command line, then add the sample data and start the API

```bash
npm run create-admin -- "Your Name" you@example.com yourpassword
npm run seed
npm run dev
```

The API runs at `http://localhost:5000`.

3. Set up the frontend (in a new terminal, from the project root)

```bash
cd "Paws and Purrs"
npm install
npm run dev
```

The app opens at `http://localhost:5173`. `vite.config.js` already proxies `/api` and `/uploads` to the backend, so no frontend `.env` is needed.

4. Log in with the admin account you created to reach the admin dashboard, or register a new account to see the donor side.

### File Structure

```
Paws-and-Purrs/
├── .gitignore
├── README.md
│
├── Paws and Purrs/                # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.js             # Tailwind plugin and the /api proxy
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── adoption/          # sample animal photos
│       │   └── icons/             # sidebar icons and hover states
│       ├── auth/
│       │   ├── AuthContext.jsx    # logged in user and token
│       │   └── RequireRole.jsx    # route guard for donor and admin pages
│       ├── components/            # dashboard cards, charts, sidebar and buttons
│       ├── layouts/
│       │   ├── DashboardLayout.jsx
│       │   └── DonorLayout.jsx
│       ├── pages/
│       │   ├── AuthPage.jsx
│       │   ├── Register.jsx
│       │   ├── AdminDash.jsx
│       │   ├── Donate.jsx
│       │   ├── Adoption.jsx
│       │   ├── AOTM.jsx
│       │   ├── ShelterDonations.jsx
│       │   └── donor/
│       │       ├── DonorAdopt.jsx
│       │       └── DonorDonate.jsx
│       ├── api.js                 # fetch helper that attaches the JWT
│       ├── chartsetup.js
│       ├── App.jsx                # routes
│       ├── main.jsx
│       └── index.css              # Tailwind theme and colour variables
│
└── server/                        # Express API
    ├── .env.example
    ├── index.js
    ├── middleware/
    │   ├── auth.js                # checks the JWT and role
    │   └── upload.js              # Multer image uploads (5MB limit)
    ├── models/
    │   ├── AdoptionRequest.js
    │   ├── Animal.js
    │   ├── AnimalOfMonth.js
    │   ├── AnimalStat.js
    │   ├── Category.js
    │   ├── Donation.js
    │   └── User.js
    ├── routes/
    │   ├── adoptionRequests.js
    │   ├── animalOfMonth.js
    │   ├── animalStats.js
    │   ├── animals.js
    │   ├── auth.js
    │   ├── categories.js
    │   └── donations.js
    ├── scripts/
    │   ├── createAdmin.js
    │   └── seed.js
    └── uploads/                   # uploaded animal images
```

---

## Features and Functionality

Donors land on a login page and can register in a few seconds. Once in, they see the shelter dashboard with the Animal of the Month, how many animals have been saved, adoptable animals and how close each donation category is to its goal. From there they can donate to a specific category, which gives them a reference code to match their payment, or send an adoption request for an animal they like.

Admins log in to a protected dashboard under `/admin`. They can add, edit and remove adoptable animals with photos, choose the Animal of the Month straight from the adoption list, update donation goals and totals, and keep the animals saved stats up to date. Every donation shows up on the admin Donations page with its reference code, where it can be filtered by month and marked as paid once the money comes in. Adoption requests are saved to the database for the shelter to follow up on.

Both roles share the same sidebar layout, with hover and active states on every nav item and a mobile top bar on smaller screens. Every page is responsive across mobile, tablet and desktop, and the dashboard cards resize based on their own space rather than the whole screen.

| Role | Pages |
|---|---|
| Donor | Dashboard, Donate, Adopt |
| Admin | Dashboard, Donate, Animal of the Month, Adoption, Shelter Donations |

---

## Planning and Process

### ERD

![Paws and Purrs ERD](./readme-assets/erd.png)

### Design Reference

This website implements the **Paws and Purrs** shelter dashboard designed in Figma by a UX200 design team at Open Window.

| Role | Designer |
|---|---|
| Project Lead | Nicole Soldatos |
| UX Lead | Ethan Maritz |
| UX Researcher | Izobel du Toit |
| UI Designers | Nicole Soldatos, Ethan Maritz |
| Social Media Lead | Manqoba Gamede |
| Campaign Designers | Izobel du Toit, Manqoba Gamede, Zhaakir Muhammad Daya |
| Content Strategist | Zhaakir Muhammad Daya |

- Design source and credit. Designed by the UX200 team above, with an updated frontend done by me
- Design changes. With approval from my lecturers I made big changes to the original frontend so the finished site works as a portfolio piece. The structure, content and core brand (colour palette, typefaces and imagery) stay true to the original, while the layouts, spacing, component styling and interactions were reworked for usability and responsiveness

---

## Final Outcome

### Live Website Links

> **Note.** As instructed by my lecturer, the deployment part of this assignment was done with my Retro Rat project, since it's more public facing. Both live links below go to Retro Rat.

Platform 1
[Amazon Web Services (EC2)](http://retro-rat.ddns.net)

Platform 2
[Microsoft Azure (Virtual Machine)](http://102.37.153.116)

### Mockups

#### Desktop
![Desktop Mockup](./readme-assets/desktop-mockup.png)

#### Mobile
![Mobile Mockup](./readme-assets/mobile-mockup.png)

### Screenshots

#### Donor View

**Adoption.** Donors browse every animal waiting for a home

![Donor Adoption](./readme-assets/donor-adoption.png)

**Adoption request.** Picking an animal opens a confirmation to start the adoption journey

![Donor Adoption Request](./readme-assets/donor-adoption-request.png)

**Donate.** After choosing a category and amount, donors get a reference code to use when they pay

![Donor Donate](./readme-assets/donor-donate.png)

#### Admin View

**Dashboard.** Animal of the Month, animals saved, adoptable animals and donation progress at a glance

![Admin Dashboard](./readme-assets/admin-dashboard.png)

**Adoption.** Add, edit and remove adoptable animals with image uploads

![Admin Adoption](./readme-assets/admin-adoption.png)

**Donations.** Every donation with its reference code, filterable by month and markable as paid

![Admin Donations](./readme-assets/admin-donations.png)

**Shelter Donations.** Edit each category's goal and total, and update the animals saved stats

![Admin Shelter Donations](./readme-assets/admin-shelter-donations.png)

---

## Deployment Summary

Both deployments run from the same repository with no code changes between them. Everything that changes per platform (database connection, secrets, analytics ID, allowed origin) lives in `.env` files on each server.

### Platform 1 · Amazon Web Services
- **Server.** EC2 t3.micro running Ubuntu 24.04 in the Cape Town region (af-south-1), picked for low latency for South African users
- **Web server.** Nginx serves the built React frontend and reverse proxies `/api` requests to the Express backend
- **Process manager.** PM2 keeps the Node API running and restarts it if it crashes
- **Address.** A fixed Elastic IP, plus a free No-IP domain (retro-rat.ddns.net) with a 301 redirect from the IP to the domain
- **Database and images.** MongoDB Atlas and Cloudinary
- **Search.** Google Analytics 4, Google Search Console, a dynamic sitemap and robots.txt

### Platform 2 · Microsoft Azure
- **Server.** B1s Ubuntu 24.04 virtual machine in the South Africa North region, set up through Azure for Students
- **Web server and process manager.** The same Nginx and PM2 setup as AWS, with 2GB of swap added so builds don't run out of memory
- **Database and images.** The same MongoDB Atlas cluster and Cloudinary account, with the Azure IP added to Atlas network access
- **Search.** No analytics on this one, and Nginx serves a robots.txt that blocks all crawlers so it doesn't compete with the AWS site as duplicate content

---

## Challenges and Solutions

### During Development

**1. Adoption emails couldn't be sent**
- **Challenge.** Adoption requests were meant to send a confirmation email through Gmail, which needs an app password.
- **Cause.** App passwords need 2-Step Verification, and the account's security settings wouldn't let me turn it on.
- **Solution.** Email sending isn't in this version, but adoption requests still save to the database with the donor's contact details. A future fix is a personal Gmail with 2-Step Verification or a proper email service like Resend.

**2. Dashboard cards next to a sidebar**
- **Challenge.** Normal screen size breakpoints didn't work, because a card could be narrow even on a wide screen once the sidebar took its space.
- **Solution.** Used Tailwind v4 container queries (`@container`), so each card responds to the width of its own column instead of the whole screen.

**3. Reworking the design without losing it**
- **Challenge.** The original frontend needed big changes to be portfolio ready, but it still had to be recognisably their design.
- **Solution.** Kept the structure, content, colours, fonts and imagery, and moved the brand colours into Tailwind theme variables so every reworked component pulls from the same palette.

### Deployment

**4. Imports broke on Linux**
- **Challenge.** The site built fine on my Windows laptop but the build failed on the Ubuntu server.
- **Cause.** Windows ignores capital letters in file names and Linux doesn't, so any import whose casing didn't exactly match the file name broke.
- **Solution.** Matched every import path to the exact file name casing.

**5. Hardcoded localhost URLs**
- **Challenge.** The live site loaded but couldn't fetch any data.
- **Cause.** API calls pointed at `http://localhost`, which only exists on my own machine.
- **Solution.** Switched every call to the relative `/api` path and let Nginx forward it to Express, so the same build works on any server.

**6. Google couldn't index the pages**
- **Challenge.** Search Console flagged pages as soft 404s, meaning Google thought they were empty.
- **Cause.** My first robots.txt blocked `/api`, so Googlebot could load the React pages but not the data inside them.
- **Solution.** Removed that rule, and all public pages were indexed after the next crawl.

**7. Image uploads failed in production**
- **Challenge.** Uploads returned a 403 error on the live server.
- **Cause.** The Cloudinary API key I was using didn't have upload permissions.
- **Solution.** Tested the key directly with curl to confirm it was a permissions issue, then switched to a key with upload access.

**8. A bare IP address isn't shareable**
- **Challenge.** WhatsApp wouldn't turn the IP address into a clickable link, which made sharing the site awkward.
- **Solution.** Registered a free No-IP domain, pointed it at the Elastic IP, added a 301 redirect from the IP and set up a second Search Console property for the domain.

---

## What I Learnt

- Something working on my own machine means nothing until it works on a server... file name casing, URLs and permissions all behaved differently once it went live
- Configuration belongs in environment variables so the same code can deploy to as many platforms as I want
- Taking someone else's design and changing it means being clear about what stays and what changes, and why

---

## Acknowledgements

The UX200 design team (Nicole Soldatos, Ethan Maritz, Izobel du Toit, Manqoba Gamede and Zhaakir Muhammad Daya), MongoDB Atlas, Cloudinary, AWS, Azure, and my lecturers Tsungai Katsuro and Talya Bekker.
