import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ProtectedPage() {
  await auth.protect()
  const user = await currentUser()

  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col gap-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">Protected Test Page</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This route is protected by Clerk authentication.
        </p>
      </header>

      <main className="space-y-4">
        <div className="space-y-2 rounded-lg border bg-muted/40 p-4">
          <h2 className="text-sm font-semibold">Authenticated User Info</h2>
          <p className="font-mono text-sm">ID: {user?.id}</p>
          <p className="font-mono text-sm">
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
