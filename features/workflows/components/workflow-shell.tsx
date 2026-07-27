"use client"

import { useState } from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RightSidebar } from "@/features/workflows/components/right-sidebar"
import { WorkflowLogs } from "@/features/workflows/components/workflow-logs"

interface WorkflowShellProps {
  workflowId: string
}

export function WorkflowShell({ workflowId: _workflowId }: WorkflowShellProps) {
  const [activeRun, setActiveRun] = useState<{
    runId: string
    publicAccessToken: string
  } | null>(null)

  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel minSize="18rem">
            <div className="flex size-full items-center justify-center p-4">
              <span className="text-sm font-medium text-muted-foreground">
                Canvas
              </span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            {activeRun ? (
              <WorkflowLogs
                runId={activeRun.runId}
                publicAccessToken={activeRun.publicAccessToken}
              />
            ) : (
              <div className="flex size-full items-center justify-center p-4">
                <span className="text-sm font-medium text-muted-foreground">
                  No active run logs. Click "Run" to trigger workflow task.
                </span>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <RightSidebar onRunTriggered={setActiveRun} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
