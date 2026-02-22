# Class 2 Proposal: Markdown-Driven Blog & Newsletter Backend

## 🎯 Objective
Transition from frontend vibe-coding (Day 1) to full-stack engineering. In this class, students will build a fully automated, Git-backed blog website and newsletter system. Instead of using a clunky CMS, students will write posts in Markdown, render them on a custom Next.js blog (inspired by [blog.sylph.ai](https://blog.sylph.ai/)), and push to GitHub to automatically trigger email campaigns.

---

## 🏗️ 1. Architecture Design

The architecture follows a modern, decoupled "Git-as-CMS" pattern:

- **Content Layer (Git):** Markdown files with YAML frontmatter act as the single source of truth for all blog content.
- **Frontend (Next.js 14 + Tailwind):** Statically generates blog pages from the local `.md` files for blazing fast SEO and performance.
- **Backend (Node.js + Express):** A lightweight API responsible for managing newsletter subscribers and handling the secure dispatch of emails.
- **Database (PostgreSQL + Prisma):** Stores subscriber lists and tracks which posts have already been emailed (idempotency).
- **Automation (GitHub Actions):** The orchestrator. Pushing a new markdown file to the `main` branch triggers a workflow that hits the backend API to sync posts and dispatch the newsletter.
- **Email Delivery:** Integrated with the **Resend API** for high-deliverability, styled HTML emails.

---

## ✨ 2. Feature Design

### Core Features to Build:
1. **Frontend Blog Website (Next.js):**
   - Build a high-performance static blog inspired by the design of [blog.sylph.ai](https://blog.sylph.ai/).
   - Create a home page listing all published markdown posts, and dynamic individual pages for each blog post.
   - **Newsletter Subscribe Component:** Integrate an email capture form prominently on the home blog listing and at the bottom of individual blog posts to drive audience growth.
2. **The "Push-to-Publish" Pipeline:**
   - A GitHub Action that detects new markdown files in the `posts/` directory.
   - Automatically parses the YAML frontmatter (title, date, excerpt, status).
2. **Automated Newsletter Dispatch:**
   - Converts Markdown to HTML.
   - Injects content into a branded, dark-themed email template matching the frontend.
   - Embeds Hero images directly via CID so they work offline and bypass email image blockers.
3. **Idempotency & Safety Guards:**
   - System checks the database before sending to guarantee a post is **never emailed twice**.
4. **Subscriber Management:**
   - API endpoints to collect emails from the Next.js landing page.
   - Secure unsubscribe links appended to every outgoing email.
5. **Local Testing CLI:**
   - A developer script (`scripts/send-post.ts`) to send draft posts to a test email address (with a `[TEST]` prefix) before merging to `main`.

---

## 🗄️ 3. Database Design

The database schema (managed via Prisma) is intentionally lightweight, focusing entirely on newsletter logistics rather than content storage:

### `Subscriber` Table
Stores the mailing list audience.
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `status` (Enum: `ACTIVE`, `UNSUBSCRIBED`)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### `PostDelivery` (or `Post`) Table
Tracks email campaigns to ensure idempotency. It does *not* store the post body (since Git handles that), just the metadata.
- `id` (UUID, Primary Key)
- `slug` (String, Unique) - Matches the Markdown filename.
- `title` (String)
- `emailSentStatus` (Enum: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`)
- `sentAt` (DateTime, Nullable)
- `createdAt` (DateTime)

---

## 🎓 Learning Outcomes for Students
By the end of Day 2, students will understand:
1. How to parse Markdown and YAML frontmatter in TypeScript.
2. How to design an idempotent system that prevents duplicate actions (e.g., accidental email spam).
3. How to write a basic GitHub Action for CI/CD automation.
4. Relational database modeling with Prisma and PostgreSQL.
5. Transactional email sending using modern APIs (Resend).
