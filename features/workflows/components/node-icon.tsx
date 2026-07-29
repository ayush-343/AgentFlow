"use client"

import { Loader2 } from "lucide-react"

import {
  nodeRegistry,
  type NodeType,
} from "@/features/workflows/nodes/node-registry"
import { cn } from "@/lib/utils"

export function NodeIcon({
  type,
  running,
  className,
}: {
  type: NodeType
  running?: boolean
  className?: string
}) {
  const def = nodeRegistry[type]
  if (!def) return null
  const Icon = def.icon
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        def.accent,
        className
      )}
    >
      {running ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Icon className="size-3.5" />
      )}
    </span>
  )
}
