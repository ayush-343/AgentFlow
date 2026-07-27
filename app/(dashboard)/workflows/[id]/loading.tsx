import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  )
}
