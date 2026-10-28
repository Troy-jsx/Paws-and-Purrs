![Paws and Purrs Banner](./readme-assets/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs&logoColor=white" alt="Chart.js 4" />
</p>

<p align="center">
  <b>Built by Troy Evans (251096) for Interactive Development 200</b><br>
  <a href="http://retro-rat.ddns.net">Live on AWS</a> · <a href="http://102.37.153.116">Live on Azure</a> · <a href="#running-it-locally">Run it locally</a>
</p>

---

## Overview

Paws and Purrs Hub is a shelter dashboard with two sides to it. Donors sign up, check how the shelter's doing, donate to whatever it needs most and ask to adopt an animal. The shelter team gets an admin side where they look after the adoption list, pick the Animal of the Month, set donation goals and keep the animals saved numbers up to date.

Most small shelters run all of this off spreadsheets, WhatsApp groups and email. The idea here is one login where the team can change what donors see without needing a developer, and donors can see exactly where their money goes.

![Desktop Mockup](./readme-assets/desktop-mockup.png)

---

## Design Reference

The site is built from a Paws and Purrs design made in Figma by a UX200 team at Open Window.

| Role | Designer |
|---|---|
| Project Lead | Nicole Soldatos |
| UX Lead | Ethan Maritz |
| UX Researcher | Izobel du Toit |
| UI Designers | Nicole Soldatos, Ethan Maritz |
| Social Media Lead | Manqoba Gamede |
| Campaign Designers | Izobel du Toit, Manqoba Gamede, Zhaakir Muhammad Daya |
| Content Strategist | Zhaakir Muhammad Daya |

My lecturers gave us the go ahead to make big changes to the designs we received. What I reworked was the legibility, spacing, component styling and interactions, mostly to make it more usable and properly responsive.

---

## Features

**For donors**
- Register and log in
- A dashboard showing the Animal of the Month, animals saved, adoptable animals and progress on every donation goal
- Donate to a specific category and get a reference code to use when paying
- Browse the animals up for adoption and send an adoption request

**For admins** (everything under `/admin` is locked to admin accounts)
- Add, edit and remove adoptable animals, photos included
- Pick the Animal of the Month straight from the adoption list
- Edit each donation category's goal and amount raised
- Keep the animals saved stats current, shown as a donut chart
- See every donation with its reference code, filter by month and mark it as paid

**Across the whole site**
- One sidebar layout for both roles, with hover and active states, swapping to a top bar on mobile
- Responsive from phone to big desktop, with dashboard cards that size themselves to their own column

### Screenshots

| Donor | Admin |
|---|---|
| ![Donor Adoption](./readme-assets/donor-adoption.png) | ![Admin Dashboard](./readme-assets/admin-dashboard.png) |
| Browsing animals up for adoption | The admin dashboard |
| ![Donor Adoption Request](./readme-assets/donor-adoption-request.png) | ![Admin Adoption](./readme-assets/admin-adoption.png) |
| Starting an adoption request | Managing the adoption list |
| ![Donor Donate](./readme-assets/donor-donate.png) | ![Admin Donations](./readme-assets/admin-donations.png) |
| A donation reference code | Incoming donations |
| | ![Admin Shelter Donations](./readme-assets/admin-shelter-donations.png) |
| | Editing goals and animals saved |

<p align="center">
  <img src="./readme-assets/mobile-mockup.png" alt="Mobile Mockup" width="500" />
</p>

---

## Technologies Used

| Layer | What I used |
|---|---|
| Frontend | React 19, Vite, React Router |
| Styling | Tailwind CSS v4, with the brand colours set as theme variables |
| Charts | Chart.js with react-chartjs-2 |
| Backend | Node.js and Express 5 |
| Database | MongoDB Atlas with Mongoose |
| Auth | JSON Web Tokens, with passwords hashed using bcryptjs |
| Uploads | Multer |
| Tools | Figma, VS Code, Git, GitHub and Postman |

### How the data fits together

![Paws and Purrs ERD](./readme-assets/erd.png)

### Project layout

```
Paws-and-Purrs/
├── readme-assets/          images used in this README
├── Paws and Purrs/         React frontend
│   ├── vite.config.js      sends /api and /uploads to the backend during dev
│   └── src/
│       ├── auth/           logged in user, token and the role guard
│       ├── components/     dashboard cards, charts, sidebar and buttons
│       ├── layouts/        the shared sidebar layout
│       ├── pages/          admin pages, with the donor pages in pages/donor
│       ├── api.js          fetch helper that adds the JWT to every request
│       └── App.jsx         all the routes
└── server/                 Express API
    ├── middleware/         JWT and role checks, image uploads
    ├── models/             Mongoose schemas
    ├── routes/             one file per resource
    └── scripts/            create an admin and seed sample data
```

---

## Deployment Links

As instructed by my lecturer, the deployment part of this assignment was done using my Retro Rat project instead, since it's more public facing and could gather more data for the SEO report project. Both links go to Retro Rat.

| Platform | Link |
|---|---|
| Platform 1 · Amazon Web Services (EC2) | [retro-rat.ddns.net](http://retro-rat.ddns.net) |
| Platform 2 · Microsoft Azure (Virtual Machine) | [102.37.153.116](http://102.37.153.116) |

---

## Running It Locally

You'll need Node.js 18 or newer and a free MongoDB Atlas cluster.

**1. Clone it**

```bash
git clone https://github.com/Troy-jsx/Paws-and-Purrs.git
cd Paws-and-Purrs
```

**2. Start the API**

```bash
cd server
npm install
```

Make a copy of `server/.env.example` called `.env` and fill it in

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/pawsandpurrs
JWT_SECRET=replace-with-a-long-random-string
PORT=5000
CLIENT_URL=http://localhost:5173
```

Admins can't sign up through the site, so make your admin account from the terminal, load some sample data and start the server

```bash
npm run create-admin -- "Your Name" you@example.com yourpassword
npm run seed
npm run dev
```

**3. Start the frontend** in a second terminal, from the project root

```bash
cd "Paws and Purrs"
npm install
npm run dev
```

Open `http://localhost:5173`. Log in with your admin account for the admin side, or register a new account to see what donors get. The Vite dev server already forwards API calls to port 5000, so the frontend doesn't need its own `.env`.

---

## Deployment Summary

Both deployments run the exact same repo. Anything that changes between them, like the database connection, secrets and analytics ID, sits in a `.env` file on that server and never in the code.

**AWS.** An EC2 t3.micro running Ubuntu 24.04 in Cape Town (af-south-1), since that's closest to the people actually using it. Nginx serves the React build and passes `/api` requests through to Express, and PM2 keeps the API running and restarts it if it falls over. It has a fixed Elastic IP and a free No-IP domain, with a 301 redirect from the IP to the domain. This is the version that's connected to Google Analytics and Search Console, with a sitemap and robots.txt.

**Azure.** A B1s Ubuntu 24.04 virtual machine in South Africa North, running the same Nginx and PM2 setup. I added 2GB of swap so builds don't run out of memory on the small VM, and added its IP to MongoDB Atlas network access. It has no analytics, and its robots.txt blocks every crawler so Google doesn't treat it as duplicate content of the AWS site.

---

## Challenges and Solutions

| Challenge | What happened | How I solved it |
|---|---|---|
| Adoption emails | Requests were meant to send a confirmation email through Gmail, which needs an app password, and that needs 2-Step Verification, which the account wouldn't let me turn on | Emails aren't in this version, requests still save to the database with the donor's details. Next step is a personal Gmail with 2-Step Verification or a service like Resend |
| Cards beside a sidebar | Screen size breakpoints didn't work because a card could be narrow on a wide screen once the sidebar took its space | Tailwind v4 container queries, so each card responds to its own column instead of the whole screen |
| Changing someone else's design | The frontend needed big changes but still had to be clearly their design | Kept their colours, structure, content, and put the brand colours in Tailwind theme variables so every reworked component uses the same palette |
| Builds failing on Linux (Retro Rat Deployment)| Everything built on my Windows laptop but failed on the Ubuntu server | Windows ignores capital letters in file names and Linux doesn't, so I matched every import to the exact file name |
| No data on the live site (Retro Rat Deployment)| API calls pointed at `localhost`, which only exists on my own machine | Switched to the relative `/api` path and let Nginx pass it through to Express |
| Pages not getting indexed (Retro Rat Deployment)| Search Console called the pages soft 404s because my robots.txt blocked `/api`, so Google saw empty pages | Removed the rule and the pages were indexed on the next crawl |
| Uploads failing in production (Retro Rat Deployment)| Image uploads returned a 403 | Tested the Cloudinary key with curl, found it had no upload permission and swapped to one that did |
| An IP address isn't shareable (Retro Rat Deployment)| WhatsApp wouldn't turn the bare IP into a link | Got a free No-IP domain, redirected the IP to it and added it as its own Search Console property |

---

## Reflection

**Biggest lesson.** Working on my machine doesn't mean it works. File name casing, API URLs and permissions all broke the moment it went onto a real server, and that's why everything that changes between environments now lives in `.env` files.

**What I'd improve next.** Get the adoption emails working with a proper email service, and add an admin page that lists adoption requests so the shelter doesn't have to check the database.

---

## Credits

Design by the UX200 team above. Thanks to my lecturers Tsungai Katsuro and Talya Bekker.
