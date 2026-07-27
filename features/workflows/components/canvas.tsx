"use client"

import { useCallback, useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  type ColorMode,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

const emptySubscribe = () => () => {}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 100, y: 150 },
    data: { label: "Trigger Node" },
  },
  {
    id: "2",
    position: { x: 350, y: 150 },
    data: { label: "Action Node" },
  },
  {
    id: "3",
    type: "output",
    position: { x: 600, y: 150 },
    data: { label: "Output Node" },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
]

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useIsMounted()
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  const colorMode: ColorMode =
    mounted && (resolvedTheme === "dark" || resolvedTheme === "light")
      ? resolvedTheme
      : "light"

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={colorMode}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{
          stroke: "var(--border)",
        }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            stroke: "var(--border)",
          },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
