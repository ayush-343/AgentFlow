"use client"

import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6">
      <Empty className="border-0">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-12 rounded-xl bg-destructive/10 text-destructive [&_svg]:size-6">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">
            Something went wrong!
          </EmptyTitle>
          <EmptyDescription className="text-base text-muted-foreground">
            {error.message || "An error occurred while loading the workflow."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2">
          <Button size="lg" className="rounded-lg font-medium px-4" onClick={() => reset()}>
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
