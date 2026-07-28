import type { Stagehand } from "@browserbasehq/stagehand"
import type { ActionNodeType, NodeType } from "./node-registry"

import { act } from "./act"
import { agent } from "./agent"
import { extract } from "./extract"
import { observe } from "./observe"
import { openUrl } from "./open-url"

export type NodeContext = {
  values: Record<string, string>
  getStagehand: () => Promise<Stagehand>
}

export type NodeExecutor = (ctx: NodeContext) => Promise<unknown>

export const NodeExecutors: Partial<Record<NodeType, NodeExecutor>> = {
  "open-url": async ({ values, getStagehand }) => {
    return await openUrl({ stagehand: await getStagehand(), url: values.url })
  },
  act: async ({ values, getStagehand }) => {
    return await act({
      stagehand: await getStagehand(),
      instruction: values.instruction,
    })
  },
  extract: async ({ values, getStagehand }) => {
    return await extract({
      stagehand: await getStagehand(),
      instruction: values.instruction,
    })
  },
  observe: async ({ values, getStagehand }) => {
    return await observe({
      stagehand: await getStagehand(),
      instruction: values.instruction,
    })
  },
  agent: async ({ values, getStagehand }) => {
    return await agent({
      stagehand: await getStagehand(),
      instruction: values.instruction,
    })
  },
} satisfies Partial<Record<ActionNodeType, NodeExecutor>>


