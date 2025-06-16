
# 🏡 CallClosing AI (Under Development)

**AI-Powered Calling Platform for Real Estate Professionals**

CallClosing AI is a modern web application that empowers real estate professionals to **automate outreach**, manage leads efficiently, and **increase conversions** using intelligent AI-driven calling and seamless data management.

---
![Screenshot](screenshot.png)
## 🚀 Features

### 🔊 AI-Powered Calling & Dynamic Scripting
- Real-time adaptive call scripts powered by VAPI.ai to boost effectiveness.

### 📁 Prospect Management
- **CSV Upload + Column Mapping**  
  Import leads with ease and map fields flexibly.
- **Webhook Integration**  
  Push data to platforms like `n8n`, and view webhook responses in-app.
- **Supabase Storage**  
  Secure prospect data storage, linked to user accounts.

### 📞 VAPI Integration
- Fetch call logs and detailed analytics.
- API key management built into the app.

### 🔐 Authentication & Security
- Secure login, signup, and session handling using Supabase Auth.

### 📊 Dashboard & Analytics
- Track calls, lead engagement, and view insights—all from a sleek, dark-themed UI.

### 🧠 3D Visuals
- Interactive **Rubik's Cube animation** using Three.js for a unique experience.

---

## 🛠️ Tech Stack

### 💻 Frontend
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [React Router DOM](https://reactrouter.com/)
- 3D: `@react-three/fiber`, `@react-three/drei`, `three.js`
- Utility: `clsx`, `tailwind-merge`

### 🧪 Backend / Auth / Database
- [Supabase](https://supabase.io/) (PostgreSQL, Auth, Realtime)

### 🌐 External APIs
- [VAPI.ai](https://vapi.ai/) for AI calling and call analytics
- Webhook support for integration platforms like `n8n`

---

## ⚙️ Getting Started

### 🔑 Prerequisites
- Node.js (v18+)
- npm or Yarn
- Supabase account
- VAPI.ai account (for analytics)

### 📦 Installation

```bash
git clone https://github.com/developerjagdish/callclosing.git
cd callclosing
npm install
# or
yarn install
```

### 📁 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 🧱 Supabase Setup

1. Go to [Supabase Dashboard](https://app.supabase.com/) → Create a new project
2. Run migration script in the SQL Editor:
   ```sql
   -- Located at: supabase/migrations/20250616111715_gentle_disk.sql
   ```
3. Enable **Row Level Security (RLS)** for:
   - `prospects`
   - `user_settings`

---

### ▶️ Run the App

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧑‍💼 How to Use

1. **Sign Up / Log In**
2. **View Dashboard**: See call stats and recent leads.
3. **Manage Prospects**: Add, edit, and delete entries.
4. **Upload CSV**: Bulk import contacts with smart mapping.
5. **Connect Webhook**: Push each contact to your custom automation (e.g., n8n).
6. **Configure VAPI**: Enter your VAPI API key for real-time call logs.
7. **Explore Analytics**: View call metrics and insights.

---

## 🗂️ Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout/
│   │   └── ui/
│   ├── contexts/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🤝 Contributing

We welcome contributions!  
Please open an [issue](https://github.com/developerjagdish/callclosing/issues) or submit a [pull request](https://github.com/developerjagdish/callclosing/pulls) to collaborate.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 📍 Live Demo (Coming Soon)

[Visit The Live demo By Clicking Here](https://callclosing.me/).

---

## 💡 Tip

Use [n8n](https://n8n.io/) + CallClosing AI to build **end-to-end real estate automation workflows** — from outreach to qualification to CRM integration.
