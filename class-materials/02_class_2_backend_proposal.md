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
- **Email Delivery (Resend API):** Integrated with the **Resend API** for high-deliverability, styled HTML emails.
- **Payments (use Stripe):** authors can offer paid or free subscriptions for their publications (every post can be free or paid). 

---

## ✨ 2. Feature Design

### Core Features to Build:
1. **Frontend Blog Website (Next.js):**
   - Build a high-performance static blog inspired by the design of [blog.sylph.ai](https://blog.sylph.ai/).
   - Create a home page listing all published markdown posts, and dynamic individual pages for each blog post.
   - **Newsletter Subscribe Component:** Integrate an email capture form prominently on the home blog listing and at the bottom of individual blog posts to drive audience growth.
   - **Unsubscribe Component:** Allow subscribers to unsubscribe from the newsletter at any time.
   - **Manage Payment Component:** Allow subscribes to unsubscribe, refund, or cancel their paid subscriptions through Stripe
   - **Author Post Component:** Allow authors to create a new post inside of a editor on the frontend
   - **Author Publish Component:** Allow authors to publish their post to the blog and send the email once they're done editing it.
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
6. **Authentication Feature:**
   - Use Supabase OAuth to authenticate all Author users.
7. **Security Features:**
   - Make sure all secret keys like Stripe, Resend, Supabase, etc are all in environment files and never exposed on the frontend.
   - Make sure the email send API is rate limited so authors can't spam users more than once per day
   - A post can only be as big as a standard email allows
   - Make sure to check for malicious code inside the email body (to prevent XSS attacks)
---

## 🗄️ 3. Database Design

The database schema (managed via Prisma) is intentionally lightweight, focusing entirely on newsletter logistics rather than content storage:


### `Author` Table
Stores the mailing list audience.
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### `Post` Table
Stores the mailing list audience.
- `id` (UUID, Primary Key)
- `content_markdown` (String, Unique)
- `author_id` (FOREIGN KEY to `Author`)
- `is_paid` (Boolean)
- `status` (Published, Draft, or Archived)
- `publishedAt` (DateTime)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### `Subscriber` Table
Stores the mailing list audience.
- `id` (UUID, Primary Key)
- `authorId` (FOREIGN KEY to `Author)
- `email` (String)
- `status` (Enum: `ACTIVE`, `UNSUBSCRIBED`)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

---

## 🎓 Learning Outcomes for Students
By the end of Day 2, students will understand:
1. How to parse Markdown and YAML frontmatter in TypeScript.
2. How to design an idempotent system that prevents duplicate actions (e.g., accidental email spam).
3. How to write a basic GitHub Action for CI/CD automation.
4. Relational database modeling with Prisma and PostgreSQL.
5. Transactional email sending using modern APIs (Resend).
