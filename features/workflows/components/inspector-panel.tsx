"use client"

import prettyMilliseconds from "pretty-ms"
import { AlertCircle, CheckCircle2, Clock, Loader2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { NodeIcon } from "@/features/workflows/components/node-icon"
import type { ConsoleSelection } from "@/features/workflows/components/logs-panel"
import { useConsoleRuns } from "@/features/workflows/components/workflow-runs-provider"

import { SessionReplay } from "@/features/workflows/components/session-replay"

export function InspectorPanel({ selection }: { selection: ConsoleSelection }) {
  const runs = useConsoleRuns()
  const run = runs.find((r) => r.id === selection.runId)

  if (!run) {
    return (
      <div className="flex size-full items-center justify-center p-4 text-xs text-muted-foreground">
        Run not found
      </div>
    )
  }

  if (selection.kind === "replay") {
    return (
      <div className="flex size-full flex-col gap-3 p-3 text-xs font-sans">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="font-semibold text-foreground">Run Replay</span>
          <span className="font-mono text-muted-foreground">{run.id}</span>
        </div>
        {run.browserbaseSessionId ? (
          <div className="flex-1 min-h-0 overflow-hidden">
            <SessionReplay sessionId={run.browserbaseSessionId} />
          </div>
        ) : (
          <div className="p-3 text-muted-foreground italic">
            No recording session available for this run.
          </div>
        )}
      </div>
    )
  }

  const step = run.steps.find((s) => s.nodeId === selection.nodeId)

  if (!step) {
    return (
      <div className="flex size-full items-center justify-center p-4 text-xs text-muted-foreground">
        Step not found
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col gap-3 overflow-y-auto p-3 text-xs font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <NodeIcon type={step.type} />
          <span className="font-semibold text-foreground text-sm">
            {step.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {step.durationMs != null && (
            <span className="font-mono text-muted-foreground">
              {prettyMilliseconds(step.durationMs)}
            </span>
          )}
          <StepStatusBadge status={step.status} />
        </div>
      </div>

      {/* Error Callout */}
      {step.error && (
        <div className="flex flex-col gap-1 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-destructive">
          <span className="font-semibold flex items-center gap-1.5">
            <AlertCircle className="size-3.5" />
            Error
          </span>
          <pre className="font-mono text-xs whitespace-pre-wrap break-all">
            {step.error}
          </pre>
        </div>
      )}

      {/* Output */}
      {step.output !== undefined && (
        <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-2.5">
          <span className="font-semibold text-muted-foreground">Output</span>
          <pre className="font-mono text-xs whitespace-pre-wrap break-all text-foreground bg-muted/40 p-2 rounded border border-border/50">
            {typeof step.output === "string"
              ? step.output
              : JSON.stringify(step.output, null, 2)}
          </pre>
        </div>
      )}

      {/* Empty State */}
      {!step.error && step.output === undefined && (
        <div className="py-4 text-center text-muted-foreground italic">
          No output produced by this step.
        </div>
      )}
    </div>
  )
}

function StepStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "done":
      return (
        <Badge
          variant="outline"
          className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-[10px]"
        >
          <CheckCircle2 className="size-3" />
          DONE
        </Badge>
      )
    case "running":
      return (
        <Badge
          variant="outline"
          className="gap-1 border-blue-500/30 bg-blue-500/10 text-blue-600 text-[10px]"
        >
          <Loader2 className="size-3 animate-spin" />
          RUNNING
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="gap-1 text-[10px]">
          <AlertCircle className="size-3" />
          FAILED
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary" className="gap-1 text-[10px]">
          <Clock className="size-3" />
          PENDING
        </Badge>
      )
  }
}
