"use client"

import React, { createContext, useContext, useMemo } from "react"
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks"

import type {
  RunStep,
  runWorkflowTask,
} from "@/features/workflows/tasks/run-workflow"

interface WorkflowRunsContextValue {
  steps: RunStep[]
  isLive: boolean
}

const WorkflowRunsContext = createContext<WorkflowRunsContextValue>({
  steps: [],
  isLive: false,
})

interface WorkflowRunsProviderProps {
  workflowId: string
  publicAccessToken?: string
  children: React.ReactNode
}

/**
 * Subscribes to realtime updates for a workflow's runs by tag (`workflow:<id>`)
 * and provides the latest run's step progress to all child components.
 */
export function WorkflowRunsProvider({
  workflowId,
  publicAccessToken,
  children,
}: WorkflowRunsProviderProps) {
  const { runs } = useRealtimeRunsWithTag<typeof runWorkflowTask>(
    `workflow:${workflowId}`,
    {
      accessToken: publicAccessToken,
      enabled: !!publicAccessToken,
    }
  )

  const value = useMemo(() => {
    if (!runs || runs.length === 0) {
      return { steps: [], isLive: false }
    }

    // Sort runs by createdAt ascending so the last run in the array is the most recent
    const sortedRuns = [...runs].sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return timeA - timeB
    })

    const latestRun = sortedRuns[sortedRuns.length - 1]

    const status = latestRun.status
    const isLive =
      status === "QUEUED" ||
      status === "EXECUTING" ||
      latestRun.isQueued ||
      latestRun.isExecuting

    // Prefer the run's final output steps and fall back to live metadata steps
    const outputSteps = latestRun.output?.steps as RunStep[] | undefined
    const metadataSteps = latestRun.metadata?.steps as RunStep[] | undefined

    const steps = outputSteps ?? metadataSteps ?? []

    return {
      steps,
      isLive,
    }
  }, [runs])

  return (
    <WorkflowRunsContext.Provider value={value}>
      {children}
    </WorkflowRunsContext.Provider>
  )
}

/**
 * Returns the most recent run's steps and whether it's still live (queued or executing).
 */
export function useLatestRunSteps(): { steps: RunStep[]; isLive: boolean } {
  return useContext(WorkflowRunsContext)
}
