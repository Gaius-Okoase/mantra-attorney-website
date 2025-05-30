# Mantra Attorney Law Firm Website – Hackathon Project

Welcome to our full-stack project built during the M4ACE Project.  
This project is a live website for **Mantra Attorney LP** law firm, featuring both frontend and backend components, security, and cloud deployment.

---

## Folder Structure

```bash
/project-root
|
|- frontend/      → UI (HTML/CSS/JS or React/Vue)
|- backend/       → Express + Node.js API server
|- infra/         → Cloud setup, CI/CD, security configs
'- README.md
```

---

## Team Roles

| Name                    | Role              | Responsibilities |
|-------------------------|-------------------|------------------|
|  Gaius Okoase           | Backend Lead      | API, data handling, routes, DB |
| Patricia Ada            | Frontend Dev       | UI development, connecting to API |
| Ojarotade Joshua        | Cloud Engineer     | Deployment (e.g., AWS, GCP, Render) |
| Blessing Agundonu       | Cybersecurity      | Security auditing, auth, HTTPS, etc |
| Mercy Ohiole            | Product Designer   | UI/UX mockups, Figma |
| Augustine Eguavoen      | Brand Identity     | Logo, color palette, typography |
| Timilehin Badiora       | Product Manager    | Roadmap, task assignment, coordination |
| Akorede Waheed Qoyum    | Data Analyst       | User insights, analytics setup |
| Olaniyi Faith Oluwaseyi | Content Writer     | Legal content, lawyer bios, copywriting |
---

## Project Goals

- Informational website for a law firm
- Showcase lawyer profiles and specialties
- Client inquiry form (contact or booking)
- Secure admin interface (protected by JWT)
- Mobile-friendly and responsive design
- Secure and cloud-hosted
- Email notifications on form submissions

📄 [Product Requirements Doc (PRD)](https://brazen-birth-5fc.notion.site/PRD-FOR-MANTRA-ATTORNEYS-LP-WEBSITE-1f62d492bd3580fa9468fbc0aa2a23d1?pvs=4)

---

## Technologies Used

### Backend:
- Node.js + Express
- MongoDB (via Mongoose)
- Nodemailer (for email alerts)
- Multer (for file handling)
- AWS S3 (simulated for demo)
- CORS & dotenv
- Nodemon

### Frontend:
- HTML, CSS & JavaScript
- Fetch API to connect to backend

### DevOps / Cloud:
- AWS (S3 for hosting website)

### Data Analyst
- Googlt Tag Manager (GOTM)
- Google Analytics

---

## Design Links

- [Figma Design](https://www.figma.com/proto/H32RBJvwJp8GB7bE5ZQ7HI/Untitled?page-id=381%3A278&node-id=383-569&viewport=-427%2C-200%2C0.65&t=hhXEZGUz6YHSkAty-1&scaling=scale-down-width&content-scaling=fixed)
- Brand Book: [Branding colours](./design/images/image.png)
---

## Setup and Running the Project Locally

1. clone the repo
1. `cd backend`
1. `npm install`
1. `npm start`
1. Open `frontend/index.html` in browser (or use Live Server)
1. Make sure to create a `.env` file with the following variable:
```env
MONGO_URI=<your_uri>
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
JWT_SECRET=<your_secret_key>
PORT=3500 || <your_preferred_port>
EMAIL_USER=<your_email>
EMAIL_PASSWORD=<your_app_password>
ADMIN_EMAIL=<your_admin_email>
```
1. Use CORS middleware if accessing backend on different port

## Features Checklist

| Feature                                | Status             |
|----------------------------------------|--------------------|
| Frontend Layout                        | [x] Done           |
| Backend API routes                     | [x] Done           |
| Admin authentiaction with JWT          | [x] Done           |
| Email notification on booking          | [x] Done           |
| Email notification on contact form     | [x] Done           |
| Admin dashboard protected and working  | [x] Done           |
| Deployment to render                   | [x] Done           |
| CMS endpoints (POST/GET/DELETE)        | [] Hardcoded (due to time constraint) but API supported  |
| Dashboard search                       | [] Dropped due to time constraint. but API supported     |
| Responsive design                      | [x] Done            |
| Files upload to S3 (demo)              | [X] Done (Simulated)|
| Page view Tracking                     | [x] Done            |
| Click Event Tracking                   | [x] Done            |
| Bounce Rate Tracking                   | [x] Done            |
| Geographical Information Tracking      | [x] Done            |
| Total Website User Tracking/Total Active Users(Realtime)      | [x] Done            |

## Notes
- Run both backend and frontend servers separately
- Bookings will appear in MongoDB with timestamp and optional file
- CMS content is static but API ready
- Email uses Nodemailer with secure credentials

## Acknowledgemnts and Credits
This project was built by the **BEST Of The Best (BOTB) Team** with passion and dilligence for the **M4ACE Hackathon 2025 Batch A Cohort**.
Thanks to all mentors, organizers and everyone who supported.