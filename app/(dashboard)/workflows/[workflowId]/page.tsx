interface WorkflowPageProps {
  params: Promise<{
    workflowId: string
  }>
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { workflowId } = await params

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-bold">Workflow</h1>
      <p className="text-sm text-muted-foreground">ID: {workflowId}</p>
    </div>
  )
}
