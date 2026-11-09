# ContractPulse

<p align="left">
  <img src="https://img.shields.io/github/actions/workflow/status/parth2024-tech/contractpulse/ci.yml?branch=main&label=CI&style=flat-square" alt="CI Status" />
  <img src="https://img.shields.io/github/v/release/parth2024-tech/contractpulse?style=flat-square&color=blue" alt="Release" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

**ContractPulse** is an AI-powered contract management dashboard that helps teams track vendor contracts, renewal deadlines, and auto-renewal risks — all in one place.

---

### Architecture & Pipeline Flow

```mermaid
flowchart LR
    A["Contract Ingestion<br/>(PDF / DOCX Upload)"] --> B["Extraction & Terms Normalizer"]
    B --> C["Contract Vault<br/>(Terms, Notice Periods, SLA)"]
    C --> D["Spend & Risk Aggregator"]
    C --> E["Renewal Horizon Monitor<br/>(30 / 60 / 90 Days)"]
    E --> F["Alert & Dispatcher Service"]

    classDef default fill:#161b22,stroke:#30363d,stroke-width:1px,color:#c9d1d9;
    classDef core fill:#0d1117,stroke:#58a6ff,stroke-width:2px,color:#58a6ff;
    class C core;
```

---

## Features

- 📋 **Contract Dashboard** — At-a-glance view of all contracts, spend, and urgency
- 🔔 **Smart Alerts** — Automated 30/60/90-day renewal warnings
- 📁 **Contract Upload** — Upload and parse PDF/DOCX contracts
- 🔍 **Contract Detail View** — Full breakdown of terms, notice periods, and deadlines
- ⚙️ **Settings** — Manage notification preferences and account info
- 🔐 **Authentication** — Secure login/signup flow

---

## Tech Stack

| Layer     | Technology                            |
|-----------|---------------------------------------|
| Frontend  | React 18 + Vite                       |
| Styling   | Tailwind CSS                          |
| Routing   | React Router v6                       |
| Icons     | Lucide React                          |
| Build     | Vite                                  |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:parth2024-tech/contractpulse.git
cd contractpulse

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── DashboardLayout.jsx
│   ├── Sidebar.jsx
│   └── Toast.jsx
├── pages/              # Route-level page components
│   ├── Landing.jsx
│   ├── Auth.jsx
│   ├── Dashboard.jsx
│   ├── Contracts.jsx
│   ├── ContractDetail.jsx
│   ├── Upload.jsx
│   ├── Alerts.jsx
│   └── Settings.jsx
├── data.js             # Mock contract data and utility functions
├── App.jsx             # Root component and routing
├── main.jsx            # App entry point
└── index.css           # Global styles
```

---

## Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes.

---

## License

MIT © parth2024-tech
