"use client"

import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6">
      <Empty className="border-0">
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="size-12 rounded-xl bg-muted/80 [&_svg]:size-6"
          >
            <AlertTriangle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">
            Something went wrong!
          </EmptyTitle>
          <EmptyDescription className="text-base text-muted-foreground">
            An error occurred while loading this workflow.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2">
          <Button
            size="lg"
            className="rounded-lg px-4 font-medium"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
