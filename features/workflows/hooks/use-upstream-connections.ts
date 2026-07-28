import { useMemo } from "react"
import { useEdges, useNodes, type Node } from "@xyflow/react"

import {
  nodeRegistry,
  type NodeType,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry"

export type UpstreamOutput = {
  /** Ready-to-insert placeholder token, e.g. "{{ open-url-1.title }}" */
  token: string
  /** Human-friendly display label, e.g. "Open URL 1 · Title" */
  label: string
  /** Source node type (e.g. "open-url"), useful for rendering the node's icon */
  type: NodeType
  /** Source node ID */
  nodeId: string
  /** Source node title */
  nodeTitle: string
  /** Output property path (e.g. "title") */
  path: string
  /** Output property label (e.g. "Title") */
  outputLabel: string
}

/**
 * Returns every output exposed by nodes upstream of the given selected node.
 * Automatically traverses connections all the way back up the DAG and updates
 * as nodes or edges change.
 */
export function useUpstreamConnections(
  selectedNode: StepNodeType | Node | string | null | undefined
): UpstreamOutput[] {
  const nodes = useNodes<StepNodeType>()
  const edges = useEdges()

  return useMemo(() => {
    const selectedId =
      typeof selectedNode === "string" ? selectedNode : selectedNode?.id
    if (!selectedId) return []

    const nodesById = new Map<string, StepNodeType>()
    for (const node of nodes) {
      nodesById.set(node.id, node)
    }

    // Map incoming targetId -> array of sourceIds
    const incomingMap = new Map<string, string[]>()
    for (const edge of edges) {
      if (!incomingMap.has(edge.target)) {
        incomingMap.set(edge.target, [])
      }
      incomingMap.get(edge.target)!.push(edge.source)
    }

    // Traversal (BFS) to find all ancestor nodes
    const visited = new Set<string>([selectedId])
    const queue: string[] = [selectedId]
    const upstreamIds: string[] = []

    while (queue.length > 0) {
      const currId = queue.shift()!
      const parentIds = incomingMap.get(currId) || []
      for (const parentId of parentIds) {
        if (!visited.has(parentId)) {
          visited.add(parentId)
          queue.push(parentId)
          upstreamIds.push(parentId)
        }
      }
    }

    const outputs: UpstreamOutput[] = []

    for (const id of upstreamIds) {
      const node = nodesById.get(id)
      if (!node || !node.data?.type) continue

      const def = nodeRegistry[node.data.type]
      if (!def || !def.outputs || def.outputs.length === 0) continue

      const nodeTitle = node.data.title || def.label || node.id

      for (const output of def.outputs) {
        outputs.push({
          token: `{{ ${node.id}.${output.path} }}`,
          label: `${nodeTitle} · ${output.label}`,
          type: node.data.type,
          nodeId: node.id,
          nodeTitle,
          path: output.path,
          outputLabel: output.label,
        })
      }
    }

    return outputs
  }, [selectedNode, nodes, edges])
}
