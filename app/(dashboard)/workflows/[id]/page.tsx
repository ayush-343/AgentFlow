import { auth as clerkAuth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { ReactFlowProvider } from "@xyflow/react"
import { auth as triggerAuth } from "@trigger.dev/sdk"

import { getWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/lib/liveblocks"

import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { WorkflowRunsProvider } from "@/features/workflows/components/workflow-runs-provider"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await clerkAuth()

  if (!orgId) notFound()

  const workflow = await getWorkflow(orgId, id)
  if (!workflow) notFound()

  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
    metadata: {
      title: workflow.name,
    },
  })

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: {
      read: {
        tags: [`workflow:${id}`],
      },
    },
    expirationTime: "1h",
  })

  return (
    <ReactFlowProvider>
      <Room roomId={id}>
        <WorkflowRunsProvider
          workflowId={id}
          publicAccessToken={publicAccessToken}
        >
          <WorkflowShell workflowId={id} />
        </WorkflowRunsProvider>
      </Room>
    </ReactFlowProvider>
  )
}
