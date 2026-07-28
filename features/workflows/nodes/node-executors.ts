import type { Stagehand } from "@browserbasehq/stagehand"
import type { ActionNodeType, NodeType } from "./node-registry"

import { openUrl } from "./open-url"

export type NodeContext = {
    values: Record<string, string>
    getStagehand: () => Promise<Stagehand>
}

export type NodeExecutor = (ctx: NodeContext) => Promise<void>

export const NodeExecutors: Partial<Record<NodeType, NodeExecutor>> = {
    "open-url": async ({ values, getStagehand }) => {
        await openUrl({ stagehand: await getStagehand(), url: values.url })
    }
} satisfies Record<ActionNodeType, NodeExecutor>


