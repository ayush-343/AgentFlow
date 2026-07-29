"use client"

import { Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

export default function Home() {
  const handleCreateWorkflow = () => {
    const name = generateSlug()
    createWorkflowAction(name)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-6">
      <Empty className="border-0">
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="size-12 rounded-xl bg-muted/80 [&_svg]:size-6"
          >
            <Workflow />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">
            No workflow selected
          </EmptyTitle>
          <EmptyDescription className="text-base text-muted-foreground">
            Select a workflow from the sidebar
            <br />
            or create a new one to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2">
          <Button
            size="lg"
            className="rounded-lg px-4 font-medium"
            onClick={handleCreateWorkflow}
          >
            <Plus className="size-4" />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

