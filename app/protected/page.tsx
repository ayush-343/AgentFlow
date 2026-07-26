import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ProtectedPage() {
  await auth.protect()
  const user = await currentUser()

  return (
    <div className="flex min-h-svh flex-col p-6 gap-6 max-w-xl mx-auto">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">Protected Test Page</h1>
        <p className="text-sm text-muted-foreground mt-1">
          This route is protected by Clerk authentication.
        </p>
      </header>

      <main className="space-y-4">
        <div className="rounded-lg border p-4 bg-muted/40 space-y-2">
          <h2 className="font-semibold text-sm">Authenticated User Info</h2>
          <p className="text-sm font-mono">ID: {user?.id}</p>
          <p className="text-sm font-mono">
            Email: {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        <Link href="/" prefetch={false}>
          <Button variant="outline" size="sm">
            ← Back to Home
          </Button>
        </Link>
      </main>
    </div>
  )
}
