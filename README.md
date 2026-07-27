# AgentFlow

**AgentFlow** is a modern, real-time collaborative workflow automation platform built with Next.js, React Flow, Liveblocks, Trigger.dev, Neon PostgreSQL, and Clerk.

---

## 🌟 Key Features

- **⚡ Visual Workflow Editor**: Interactive node-based canvas built with `@xyflow/react` (React Flow) featuring custom step nodes (`start` trigger, `open-url` action, etc.).
- **👥 Real-Time Multiplayer Collaboration**: Powered by **Liveblocks**, supporting live multiplayer presence, real-time node/edge state synchronization (`useLiveblocksFlow`), and collaborative user cursors.
- **⚙️ Background Workflow Execution**: Integrated with **Trigger.dev v4** for executing workflow tasks in the background with real-time execution log streaming (`useRealtimeRun`).
- **🔐 Auth & Multi-Tenancy**: Complete authentication and organization management using **Clerk** (with organization switcher & multi-tenant routing).
- **🗄️ Serverless Relational Database**: Schema migrations and data operations backed by **Neon PostgreSQL** and **Drizzle ORM**.
- **🎨 Modern UI & Dark Mode**: Sleek dark/light theme support using **Tailwind CSS v4**, **shadcn/ui**, and **next-themes**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **State & Collaboration**: [@liveblocks/react-flow](https://liveblocks.io/) & [@xyflow/react](https://reactflow.dev/)
- **Background Tasks**: [@trigger.dev/sdk](https://trigger.dev/) (v4)
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
│   │   └── workflows/[id]/     # Individual workflow canvas & execution logs page
│   ├── choose-organization/    # Clerk organization selector
│   └── (auth)/                 # Sign-in & Sign-up routes
├── components/                 # Shared UI primitives (shadcn/ui)
├── features/
│   └── workflows/              # Workflow domain logic & components
│       ├── actions.ts          # Server actions for workflow CRUD
│       ├── components/         # Canvas, Step Node, Room, Workflow Shell, Realtime Logs
│       ├── nodes/              # Node registry & custom step node definitions
│       └── data.ts             # Mock & database query helpers
├── db/                         # Drizzle database schemas & migrations
├── trigger/                    # Trigger.dev background task definitions
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

# Trigger.dev Background Execution
TRIGGER_SECRET_KEY=tr_dev_...
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Building

- **Type Check**:
  ```bash
  npm run typecheck
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## 📝 License

Distributed under the MIT License.
