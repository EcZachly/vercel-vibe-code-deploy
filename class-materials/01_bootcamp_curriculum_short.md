# Ship AI-Native Substack in 2 Days
## Vibe Coding Bootcamp with AdaL

**Dates**: Feb 14-15, 2026  
**Format**: 2 days, ~1.5 hours per day  
**Cost**: FREE  
**Instructors**: Li Yin (AdaL Founder), Zach (Bootcamp Expert)

---

## Key Takeaways: Best Engineering Practices with Coding Agents

1. **AI has vast knowledge — ask questions first** - Don't just command. "What's the best way to..." gets far better results than "Build me...". The more context you provide, the better the output.

2. **The new-age engineer = Product Manager + Architect + AI Team Lead** - You ask lots of questions (like managing a vast extended engineering team), write design docs, and the coding agent implements + writes unit tests + reviews. This is the new workflow and the new engineer.

3. **Build vs Buy is being redefined** - Other than absolute infrastructure we can't easily build (email delivery like Resend, cloud infra, hardware), AI redefines SaaS:
   - **(a)** We don't need old SaaS designed for humans (like Mailchimp) — it slows us down
   - **(b)** We can build internal tools designed to work with both AI and the engineer

---

## What Students Will Build

Students ship a complete **AI-native Substack** — a blog + newsletter platform built to work with coding agents, not legacy SaaS tools.

**Day 1**: A stunning landing page for your new Substack product, deployed live  
**Day 2**: The SaaS engine — blog system + automated newsletter  
**Capstone**: A polished, deployed product you can show the world

> 💡 **Bonus**: These same skills let you build a personal portfolio site to showcase your work and land your next job.

---

## What Students Will Learn

### 🤖 Terminal Coding Agents
- How to work with an AI coding agent in the terminal (AdaL CLI)
- The agent workflow: prompt → plan → implement → test → review
- Auto-accept mode (`Shift+Tab`) for rapid iteration vs. review mode for careful edits

### 🔌 MCP (Model Context Protocol)
- What MCP servers are and why they matter — extending your agent with external tools
- Connecting to services like GitHub, Playwright (browser automation), Slack, and more
- Using `/mcp` to manage and configure integrations

### 🧠 Model Switching — Right Model for the Right Job
- Using `/model` to switch between AI models on the fly
- When to use which model:
  | Task | Best Model | Why |
  |------|------------|-----|
  | Visual design, UI | Gemini 2.5 Pro | Better aesthetic sense |
  | Code architecture | Claude Sonnet | Precise, structured |
  | Quick iterations | Claude Haiku | Fast, cheap |
  | Complex debugging | Claude Opus | Deep reasoning |

### 📋 Skills & Plugins
- What skills are — domain expertise packages your agent can load on-demand
- Using `/skills` to view available skills and `/plugin` to install from marketplaces
- How skills guide the agent to follow best practices for specific domains

### 📐 AGENTS.md — Context Management for Your Agent
- What `AGENTS.md` is — a project-level instruction file the agent reads automatically
- Using `/init` to auto-generate an `AGENTS.md` for your project
- How to write one: project structure, coding conventions, build commands, architecture decisions
- Why it matters: the agent becomes a team member who understands your codebase, not a generic tool

### 📎 `@` File Referencing — Precise Context Control
- Using `@` to target specific files when prompting the agent
- How `@` gives the agent exactly the context it needs — no more, no less
- Combining `@` references with instructions for surgical edits and focused work

---


## Schedule

### Day 1: Build the Landing Page (~1.5 hours)
*The face of your AI-native Substack*

| Time | Duration | Instructor | Content |
|------|----------|------------|---------|
| 0:00 | 15 min | **Zach** | **Opening**: Welcome, what is vibe coding, why it matters for data engineers & beyond |
| 0:15 | 45 min | **Li** | **Session**: Build your Substack's landing page with AI — live coding with AdaL |
| 1:00 | 15 min | **Li + Zach** | Q&A + Assignment introduction |

**Topics Covered**:
- Installing and using AdaL CLI ([Slides](./docs/slides-adal-cli-howto.html))
- Product Manager Workflow: Design to Code ([Slides](./docs/slides-build-landing-page.html))
- Key AdaL features: `/model` switching, `Shift+Tab` auto-accept, `@` file targeting
- AI model switching (Gemini for design, Claude for code quality)
- Building React components with Tailwind CSS
- Deploying to Vercel

**Assignment**: Enhance your landing page — add a pricing section, testimonials, or feature showcase

---

### Day 2: Build the SaaS Engine (~1 hour)
*Ship your AI-native Substack*

| Time | Duration | Instructor | Content |
|------|----------|------------|---------|
| 0:00 | 15 min | **Li + Zach** | **Discussion**: Build vs Buy in the AI era — why we don't need old SaaS |
| 0:15 | 30 min | **Li** | **Session**: Build blog + newsletter system designed for AI workflows |
| 0:45 | 15 min | **Li + Zach** | Q&A + Capstone introduction |

**Topics Covered**:
- **Markdown-based blog system** (Next.js) — blog posts render into both web pages and newsletter emails
- **Newsletter system with Resend** — send emails to subscribers (no subscribe/unsubscribe service yet, just email delivery)
- **Admin dashboard** — fixed subscriber list, view delivery status (sent / not sent per post per subscriber)
- **Database** (PostgreSQL) — subscriber table, post delivery tracking (who received, who hasn't)
- Why build your own vs. pay for Mailchimp/Substack

**Assignment**: Students build all remaining pieces themselves — subscriber table, admin dashboard with delivery status, email template with subscribe/unsubscribe links, and the full subscription service

---

## After the Bootcamp

### Week 1-2: Assignments
Complete the Day 1 and Day 2 assignments on your own:
- **Day 1 Assignment**: Enhance your landing page (pricing, testimonials, feature showcase)
- **Day 2 Assignment**: Build subscriber table, admin dashboard, email templates with subscribe/unsubscribe, full subscription service

### Optional: Personal Portfolio Landing Page
Use the same skills from Day 1 to build a personal portfolio site — showcase your bootcamp projects and land your next role.

### Grading (for assignments + capstone combined)

| Criteria | Points |
|----------|--------|
| Visual polish | 25 |
| Functionality | 25 |
| Code quality | 20 |
| Documentation | 15 |
| Creativity | 15 |
| **Total** | **100** |

### 🏆 Awards — Top 2 Students Win

| Prize | Value |
|-------|-------|
| Free entry to Zach's next Data Engineer Bootcamp | **$3,000** |
| AdaL CLI Pro subscription for 1 year | **$240/year** |

Winners selected based on overall grading score. Both prizes awarded to each of the top 2 students.

---

## Prerequisites

- AdaL CLI installed and signed up (`npm install -g @sylphai/adal-cli`) — signup gives you **$5 free credits**
- IDE installed (VS Code recommended)
- Familiarity with command line
- Node.js 20+ installed
- GitHub account
- Vercel account (free tier)


