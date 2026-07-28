import { auth } from "@clerk/nextjs/server"
import NotFound, { notFound } from "next/navigation"

import { getWorkflow } from "@/features/workflows/data"

import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()

  if (!orgId) notFound()

  const workflow = await getWorkflow(orgId, id)
  if (!workflow) notFound()


  return (
    <Room roomId={id}>
      <WorkflowShell workflowId={id} />
    </Room>
  )
}

