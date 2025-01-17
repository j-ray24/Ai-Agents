# AI Agents Platform

A comprehensive AI agent platform featuring specialized agents for Customer Service, Employee Onboarding, Lead Generation, and Marketing.

## Project Structure
```
ai_agents/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Main page components
│   │   └── styles/       # CSS and style files
│   └── public/          # Static assets
├── backend/
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── models/      # Data models
│   │   ├── services/    # Business logic
│   │   └── config/      # Configuration files
└── docs/               # Documentation
```

## Features

- 🤖 Four Specialized AI Agents:
  - Customer Service Agent
  - Employee Onboarding Agent
  - Lead Generation Agent
  - Marketing Agent
- 🎨 Customizable AI Agent Personas
- 📊 Comprehensive Analytics Dashboard
- 🔄 Third-party Integrations (CRM, HRIS, Marketing Platforms)

## Tech Stack

### Frontend
- React
- DaisyUI/Tailwind CSS
- TypeScript

### Backend
- Node.js/Express
- MongoDB
- TypeScript

## Development Setup

1. Clone the repository
2. Set up frontend:
```bash
cd frontend
npm install
npm start
```

3. Set up backend:
```bash
cd backend
npm install
npm run dev
```

4. Create necessary environment variables (see .env.example)

## API Documentation

API documentation can be found in the `/docs` directory.

## Contributing

Please read our contributing guidelines in CONTRIBUTING.md before submitting pull requests.
