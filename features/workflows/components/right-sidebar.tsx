"use client"

import { useTransition } from "react"
import { Loader2Icon, PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/actions"

interface RightSidebarProps {
  onRunTriggered?: (runData: { runId: string; publicAccessToken: string }) => void
}

export function RightSidebar({ onRunTriggered }: RightSidebarProps) {
  const [isPending, startTransition] = useTransition()

  const handleRun = () => {
    startTransition(async () => {
      const res = await runWorkflowAction()
      if (res?.runId && res?.publicAccessToken) {
        onRunTriggered?.(res)
      }
    })
  }

  return (
    <div className="flex size-full items-center justify-center p-4">
      <Button onClick={handleRun} disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <PlayIcon className="size-4" />
        )}
        Run
      </Button>
    </div>
  )
}
