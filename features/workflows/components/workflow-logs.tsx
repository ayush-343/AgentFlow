"use client"

import { useEffect, useRef } from "react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import {
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  Loader2Icon,
  TerminalIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import type { helloWorldTask } from "@/trigger/example"

interface WorkflowLogsProps {
  runId: string
  publicAccessToken: string
}

export function WorkflowLogs({ runId, publicAccessToken }: WorkflowLogsProps) {
  const toastIdRef = useRef<string | number | null>(null)
  const hasCompletedRef = useRef<boolean>(false)

  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken: publicAccessToken,
  })

  // Manage toast notification lifecycle
  useEffect(() => {
    hasCompletedRef.current = false
    const toastId = toast.loading(`Task run initialized...`)
    toastIdRef.current = toastId

    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current)
      }
    }
  }, [runId])

  useEffect(() => {
    if (!run || !toastIdRef.current || hasCompletedRef.current) return

    if (run.status === "COMPLETED") {
      hasCompletedRef.current = true
      toast.success(`Task completed successfully!`, {
        id: toastIdRef.current,
        description: `Duration: ${run.durationMs ?? 0}ms`,
      })
    } else if (
      run.status === "FAILED" ||
      run.status === "CRASHED" ||
      run.status === "SYSTEM_FAILURE"
    ) {
      hasCompletedRef.current = true
      toast.error(`Task execution failed`, {
        id: toastIdRef.current,
        description: run.error
          ? JSON.stringify(run.error)
          : "An error occurred during execution.",
      })
    } else if (run.status === "EXECUTING") {
      toast.loading(`Task is executing...`, {
        id: toastIdRef.current,
      })
    }
  }, [run, run?.status, run?.durationMs, run?.error])

  if (error) {
    return (
      <div className="flex h-full items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        <AlertCircleIcon className="size-4 shrink-0" />
        <span>Failed to load run logs: {error.message}</span>
      </div>
    )
  }

  if (!run) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2Icon className="size-4 animate-spin" />
        <span>Subscribing to realtime run logs...</span>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2Icon className="size-3.5" />
            COMPLETED
          </Badge>
        )
      case "EXECUTING":
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
          >
            <Loader2Icon className="size-3.5 animate-spin" />
            EXECUTING
          </Badge>
        )
      case "QUEUED":
      case "WAITING_FOR_DEPLOY":
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          >
            <ClockIcon className="size-3.5" />
            {status}
          </Badge>
        )
      case "FAILED":
      case "CRASHED":
      case "SYSTEM_FAILURE":
        return (
          <Badge variant="destructive" className="gap-1.5">
            <AlertCircleIcon className="size-3.5" />
            {status}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">Run ID:</span>
          <span className="text-muted-foreground">{run.id}</span>
        </div>
        <div className="flex items-center gap-3">
          {run.durationMs !== undefined && run.durationMs !== null && (
            <span className="text-muted-foreground">
              {(run.durationMs / 1000).toFixed(2)}s
            </span>
          )}
          {getStatusBadge(run.status)}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {run.payload && (
          <div className="rounded-md border bg-muted/40 p-3">
            <div className="mb-1.5 font-sans font-medium text-muted-foreground">
              Input Payload
            </div>
            <pre className="break-all whitespace-pre-wrap text-muted-foreground">
              {JSON.stringify(run.payload, null, 2)}
            </pre>
          </div>
        )}

        {run.output ? (
          <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="mb-1.5 font-sans font-medium text-emerald-600 dark:text-emerald-400">
              Output Result
            </div>
            <pre className="break-all whitespace-pre-wrap text-emerald-700 dark:text-emerald-300">
              {JSON.stringify(run.output, null, 2)}
            </pre>
          </div>
        ) : run.error ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3">
            <div className="mb-1.5 font-sans font-medium text-destructive">
              Error
            </div>
            <pre className="break-all whitespace-pre-wrap text-destructive">
              {JSON.stringify(run.error, null, 2)}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  )
}
