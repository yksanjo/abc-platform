# Guidely — Agent-Powered Enterprise Operations

**Autonomous AI agents for enterprise productivity. Built for next.nyc "Always Be Closing".**

## What We Built

Guidely deploys **persistent AI agents** that handle enterprise operations autonomously. Based on the latest OpenClaw/Pi Runtime architecture (Feb 2026), our agents:

- **Hibernate** when inactive, wake on-demand (cost-efficient)
- **Maintain memory** across sessions (personalized, contextual)
- **Collaborate** in swarms for complex tasks
- **Execute safely** in sandboxed environments

**Addresses 4 of Datadog's 7 ABC wish list items:**

1. ✅ **Help Bots** - Conversational AI for employee support
2. ✅ **SOP/Training Manual Generator** - Auto-create documentation from processes
3. ✅ **Knowledge Base (HR-focused)** - Intelligent self-service HR portal
4. ✅ **ChatGPT Integration** - Enterprise-grade LLM deployment

## Live Demo

```bash
# Quick start
npm install
npm run dev
```

## Why This Wins at ABC

| ABC Buyer Need | Our Solution |
|---------------|--------------|
| "Help bots" | Production-ready conversational AI with enterprise security |
| "SOP generators" | AI-powered process documentation from screen recordings/inputs |
| "Knowledge bases, especially for HR" | Vector-based HR knowledge base with semantic search |
| "Anything that integrates with ChatGPT" | Secure enterprise LLM proxy with governance |

## Technical Architecture

Based on **OpenClaw Gateway-Server Model** (Feb 2026 intelligence):

```
┌─────────────────────────────────────────────────────────┐
│  Guidely Gateway (Port 18789)                           │
│  ├── Pi Runtime (Persistent Agent Execution)           │
│  ├── Skill System (Modular Capabilities)               │
│  ├── Multi-Tier Memory (Working/Episodic/Semantic)     │
│  └── Swarm Coordination (Multi-Agent Collaboration)    │
└─────────────────────────────────────────────────────────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    ▼                      ▼                      ▼
┌─────────┐        ┌──────────────┐       ┌──────────┐
│  React  │◄──────►│  Browser     │       │ Vector   │
│  Client │   WS   │  Control     │       │ Store    │
└─────────┘        │  (Port 18791)│       └──────────┘
                   └──────────────┘
```

**Components:**
- **Pi Runtime**: Persistent agent state across sessions
- **Skill System**: Self-configuring capability packages
- **Memory Tiers**: Working (context), Episodic (history), Semantic (knowledge)
- **Sandbox**: Docker-isolated code execution
- **MCP Compatible**: Integrates with Model Context Protocol

## Team Qualification

- ✅ Technical co-founder (you)
- ✅ 2-person founding team
- ✅ NYC-based
- ✅ Working prototype (this repo)
- ✅ Seed-stage appropriate

## Revenue Model

- **Pilot**: $5K/month (3-month pilot)
- **Growth**: $25K/year per 100 employees
- **Enterprise**: Custom pricing with SSO/SOC2

## Next Steps for ABC

1. Deploy to production
2. Secure pilot with Datadog or KPMG
3. Build out enterprise features (SSO, audit logs)

---

**Built for next.nyc Always Be Closing - February 2025**
