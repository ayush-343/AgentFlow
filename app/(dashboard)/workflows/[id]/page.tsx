export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-bold">Workflow</h1>
      <p className="text-sm text-muted-foreground">ID: {id}</p>
    </div>
  )
}
