"use client"

import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import Link from "next/link"

export default function Page() {
  const { setTheme, resolvedTheme } = useTheme()

  const handleButtonClick = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    toast(`Theme changed to ${nextTheme}`, {
      description: `Successfully switched to ${nextTheme} mode.`,
    })
  }

  return (
    <div className="flex min-h-svh flex-col p-6 gap-6">
      <header className="flex items-center justify-between border-b pb-4">
        <h1 className="font-semibold text-lg">AgentFlow</h1>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton showName />
          </Show>
        </div>
      </header>

      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h2 className="font-medium text-base">Project ready!</h2>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component and Clerk authentication for you.</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Button onClick={handleButtonClick}>
              Toggle Theme & Show Toast
            </Button>
            <Link href="/protected">
              <Button variant="secondary">
                Visit Protected Route (/protected)
              </Button>
            </Link>
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
