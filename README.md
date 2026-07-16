# AI First CRM - HCP

## Overview

AI First CRM - HCP is an AI-powered Customer Relationship Management application designed to efficiently manage Healthcare Professional (HCP) interactions.

The application combines a modern React dashboard with a FastAPI backend and LangGraph-based AI agents to provide intelligent assistance, interaction management, and automated CRM workflows.

The AI Assistant helps users interact with CRM data through natural language queries and performs actions using integrated AI tools.

---

## Features

### CRM Management

- Create, view, update, and manage HCP interaction records
- Store and retrieve customer interaction details
- Track interaction history efficiently

### AI Assistant

- Chat-based AI interface for CRM operations
- Natural language query processing
- Intelligent responses using LLM integration
- AI-driven workflow automation

### LangGraph AI Agent

- Agent-based decision workflow
- Tool calling capabilities
- Automated CRM operations through AI tools

### Dashboard

- Modern React-based user interface
- Interaction history management
- Easy navigation and user-friendly experience

---

## Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Material UI
- JavaScript
- Vite

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### AI / LLM

- LangGraph
- LangChain
- Large Language Model API Integration
- AI Agent Workflow

### Development Tools

- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
AI-First-CRM-HCP/
│
├── backend/
│   ├── app.py              # FastAPI application entry point
│   ├── agent.py            # AI agent implementation
│   ├── graph.py            # LangGraph workflow
│   ├── tools.py            # AI tools and CRM operations
│   ├── models.py           # Pydantic request models
│   ├── schemas.py          # API response schemas
│   ├── crud.py             # Database operations
│   ├── db_models.py        # SQLAlchemy database models
│   ├── database.py         # Database configuration
│   └── requirements.txt    # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── redux/          # Redux state management
│   │   └── services/       # API services
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Poovi16/AI-First-CRM-HCP.git
```
