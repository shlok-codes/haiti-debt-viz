# Haiti Independence Debt Visualization

An interactive timeline visualizing Haiti’s colonial indemnity and related “double debt” from 1804–1947.  
Built as a learning project exploring data ingestion, database seeding, API development, UI design, and deployment with a full CI/CD workflow (GitHub → Vercel → Neon).

---

## ⭐ Project Overview


Haiti secured independence in 1804 after a successful slave revolution—but in 1825, France imposed a massive indemnity of **150 million gold francs** under threat of invasion and reinstated slavery.

Because Haiti could not pay upfront, it was forced into a **high‑interest loan** from French banks.

Historians call this structure the **“double debt”**:

1. **Indemnity** (the payment to France)
2. **Loan** (the debt Haiti took out *to pay the indemnity*)

This project visualizes:

- Annual payments  
- Outstanding balances  
- Conversion to 2021 USD  
- The full timeline from 1804–1947  

Data comes primarily from **The New York Times’ 2022 investigation _“The Ransom”_** along with historical financial records.

---

## 📊 Live Demo

**Production URL:**https://haiti-debt-viz.vercel.app/

---

## 🚀 Badges

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://haiti-debt-viz.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Neon](https://img.shields.io/badge/Neon%20Postgres-Serverless-green?logo=postgresql)
![Recharts](https://img.shields.io/badge/Recharts-Data%20Viz-orange)


---

## 📁 Features

### ✔️ Interactive Visualization
- Slider from 1804–1947  
- Year‑specific details pane  
- Dynamic line chart using Recharts  
- Toggleable data series (Payments / Outstanding Balance)

### ✔️ Historical Pages
- **/history** — explanation of Haiti’s indemnity and its economic impact  
- **/sources** — data sources, methodology, and limitations

### ✔️ Backend & Data
- Neon Postgres database
- Custom seed script generating a full 1804–1947 yearly series
- Next.js API route at `/api/debt`

### ✔️ CI/CD
- GitHub feature branches
- Pull requests with Vercel preview deployments
- Automatic production deploys after merge

---

## 🗂️ Tech Stack

- **Next.js 16 (App Router)**
- **TypeScript**
- **Recharts** for data visualization
- **Neon Postgres** (serverless PostgreSQL)
- **Vercel** for deployment
- **Tailwind CSS** for styling

---

## 🏗️ Project Structure

```
haiti-debt-viz/
├── app/
│   ├── api/
│   │   └── debt/route.ts   # API route (fetches DB data)
│   ├── history/page.tsx    # History page
│   ├── sources/page.tsx    # Sources page
│   └── page.tsx            # Visualization UI
├── data/
│   ├── haiti-double-debt.csv
│   └── haiti-double-debt.json
├── scripts/
│   └── seed.ts             # DB seeding script
├── .env                    # local DB URL (ignored)
├── package.json
└── README.md
```

---

## 📚 Data Sources

### Core Dataset
- **The New York Times (2022)**: _“The Ransom”_  
  Reconstruction of Haiti’s indemnity payments and loan obligations.

### Additional Context
Historical works on:
- Haitian Revolution  
- Indemnity negotiations  
- Haiti’s 19th‑century public finance  
- Odious debt frameworks

Full sources listed on `/sources`.

---

## 📄 License

This project is for educational purposes and does not represent a complete historical or financial accounting.  
Feel free to fork, explore, and extend.
