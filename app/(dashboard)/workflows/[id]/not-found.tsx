import Link from "next/link"
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

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6">
      <Empty className="border-0">
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="size-12 rounded-xl bg-muted/80 [&_svg]:size-6"
          >
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">
            Workflow not found
          </EmptyTitle>
          <EmptyDescription className="text-base text-muted-foreground">
            The workflow you are looking for doesn&apos;t exist or has been
            removed.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2">
          <Button size="lg" className="rounded-lg px-4 font-medium" asChild>
            <Link href="/">Back to workflows</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
