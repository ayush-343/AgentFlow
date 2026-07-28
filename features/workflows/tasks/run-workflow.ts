import toposort from "toposort"
import { logger, metadata, task } from "@trigger.dev/sdk"
import { Stagehand } from "@browserbasehq/stagehand"
import { NodeExecutors } from "../nodes/node-executors"
import { interpolate } from "../lib"

import { getWorkflow } from "@/features/workflows/data"

export type RunStep = {
  id: string
  status: "pending" | "running" | "done" | "failed"
}

// The Trigger.dev task the Run button fires. It loads the saved graph, works out
// what order the nodes should run in, and walks them. For now each node just
// announces itself — real execution (per-node executors, live progress, browser
// sessions) gets layered on from here.
export const runWorkflowTask = task({
  id: "run-workflow",
  run: async ({ workflowId, orgId }: { workflowId: string; orgId: string }) => {
    const workflow = await getWorkflow(orgId, workflowId)
    if (!workflow?.graph) throw new Error(`Workflow ${workflowId} has no graph`)

    const { nodes, edges } = workflow.graph
    const byId = new Map(nodes.map((n) => [n.id, n]))

    // Run only connected nodes — anything touching an edge. Orphans dropped on
    // the canvas are skipped. toposort orders them and throws on a cycle.
    const connected = new Set(edges.flatMap((e) => [e.source, e.target]))
    const order = toposort
      .array(
        nodes.map((n) => n.id),
        edges.map((e) => [e.source, e.target])
      )
      .filter((id) => connected.has(id))

    logger.log(`Running workflow ${workflow.name}`, { steps: order.length })

    let stagehand: Stagehand | undefined
    const getStagehand = async () => {
      if (stagehand) return stagehand
      stagehand = new Stagehand({
        env: "BROWSERBASE",
        apiKey: process.env.BROWSERBASE_API_KEY,
        model: "google/gemini-2.5-flash",
        disablePino: true,
      })
      await stagehand.init()
      return stagehand
    }

    const steps: RunStep[] = order.map((id) => ({
      id,
      status: "pending",
    }))
    metadata.set("steps", steps)

    const outputs: Record<string, unknown> = {}

    for (let i = 0; i < order.length; i++) {
      const id = order[i]
      const node = byId.get(id)!
      logger.log(`Running step: ${node.data.title}`)

      steps[i].status = "running"
      metadata.set("steps", steps)
      await metadata.flush()

      const interpolatedValues: Record<string, string> = {}
      for (const [key, value] of Object.entries(node.data.values || {})) {
        interpolatedValues[key] = interpolate(value, outputs)
      }

      try {
        const executor = NodeExecutors[node.data.type]
        if (executor) {
          outputs[id] = await executor({
            values: interpolatedValues,
            getStagehand,
          })
        }
        steps[i].status = "done"
        metadata.set("steps", steps)
      } catch (error) {
        steps[i].status = "failed"
        metadata.set("steps", steps)
        await metadata.flush()
        await stagehand?.close()
        throw error
      }
    }

    await stagehand?.close()

    return { steps }
  },
})