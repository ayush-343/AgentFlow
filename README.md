# AgentFlow

**AgentFlow** is a modern, real-time collaborative workflow automation platform built with Next.js, React Flow, Liveblocks, Trigger.dev, Stagehand, Browserbase, Resend, Neon PostgreSQL, and Clerk.

---

## 🌟 Key Features

- **⚡ Visual Workflow Editor**: Interactive node-based canvas built with `@xyflow/react` (React Flow) featuring custom trigger & action step nodes.
- **🛑 Run / Stop Workflow Toggle**: Start workflows or immediately cancel active, in-flight execution runs directly from the canvas header.
- **🤖 Stagehand AI Browser Automation**: Multi-step web automation powered by **Stagehand V3** and **Browserbase** cloud browsers:
  - `Start`: Workflow trigger entry point.
  - `Open URL`: Navigates to a web page.
  - `Act`: AI-driven actions (click, type, scroll) using `stagehand.act`.
  - `Extract`: Data extraction using `stagehand.extract`.
  - `Observe`: Element and action discovery using `stagehand.observe`.
  - `Agent`: Autonomous multi-step web task execution using `stagehand.agent` (Pro plan feature-gated).
- **📧 Email Notifications**: Integrated `Send Email` node powered by **Resend** for automated transactional emails within workflows.
- **🔗 Upstream Data Interpolation**: Dynamically reference upstream node outputs using `{{ nodeId.field }}` tokens. Includes a **Connections** panel in the inspector for one-click token insertion into fields.
- **📡 Real-Time Step Progress & Logs Console**: Real-time canvas node status indicators and a bottom **Console & Inspector Panel** featuring live step logs and **Browserbase Session Replays**.
- **👥 Real-Time Multiplayer Collaboration**: Powered by **Liveblocks**, supporting live presence, synchronized graph state (`useLiveblocksFlow`), and collaborative user cursors.
- **🔐 Auth & Multi-Tenancy**: Organization management and authentication using **Clerk** (with organization switcher & multi-tenant routing).
- **🗄️ Serverless Relational Database**: Schema management and data operations backed by **Neon PostgreSQL** and **Drizzle ORM**.
- **🎨 Modern UI & Dark Mode**: Modern theme support using **Tailwind CSS v4**, **shadcn/ui**, and **next-themes**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Browser Automation**: [Stagehand V3](https://stagehand.dev/) & [Browserbase](https://browserbase.com/)
- **Email Dispatch**: [Resend](https://resend.com/)
- **State & Collaboration**: [@liveblocks/react-flow](https://liveblocks.io/) & [@xyflow/react](https://reactflow.dev/)
- **Background Execution & Realtime**: [@trigger.dev/sdk](https://trigger.dev/) (v4)
- **Database**: [Neon Postgres](https://neon.tech/) & [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Lucide Icons
- **Language**: TypeScript

---

## 📁 Project Architecture

```text
AgentFlow/
├── app/                        # Next.js App Router routes
│   ├── (dashboard)/            # Dashboard layout & workflow routes
│   │   └── workflows/[id]/     # Workflow canvas, inspector & execution logs page
│   ├── api/                    # API endpoints (replays)
│   ├── choose-organization/    # Clerk organization selector
│   └── (auth)/                 # Sign-in & Sign-up routes
├── components/                 # Shared UI primitives (shadcn/ui)
├── features/
│   └── workflows/              # Workflow domain logic & components
│       ├── actions.ts          # Server actions for workflow CRUD & execution
│       ├── components/         # Canvas, Step Node, Inspector, Realtime Provider, Logs & Replays
│       ├── hooks/              # Upstream connections & state hooks
│       ├── lib/                # Graph validation, interpolation & topological engine
│       ├── nodes/              # Node registry, stagehand executors (open-url, act, extract, observe, agent, send-email)
│       ├── tasks/              # Trigger.dev background task definitions (run-workflow)
│       └── data.ts             # Database query helpers
├── db/                         # Drizzle database schemas & migrations
├── lib/                        # Client initializers (resend, liveblocks, db)
├── trigger.config.ts           # Trigger.dev background task configuration
└── liveblocks.config.ts        # Liveblocks room & presence configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20` or higher
- **npm** / **pnpm** / **bun**

### Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Neon Database
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."

# Liveblocks Realtime Collaboration
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_dev_...
LIVEBLOCKS_SECRET_KEY=sk_dev_...

# Trigger.dev Background Execution
TRIGGER_SECRET_KEY=tr_dev_...

# Browserbase Cloud Browser
BROWSERBASE_API_KEY=bb_live_...

# Resend API Key
RESEND_API_KEY=re_...
```

### Installation & Development

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run database migrations**:
   ```bash
   npm run db:push
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Start the Trigger.dev background task worker** (in a separate terminal):
   ```bash
   npx -y trigger.dev@latest dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Building

- **Type Check**:
  ```bash
  npx tsc --noEmit
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## 📝 License

Distributed under the MIT License.

