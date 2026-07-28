import type { Stagehand } from "@browserbasehq/stagehand"

export async function extract({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const page = stagehand.context.pages()[0]
  if (!page) throw new Error("No page available")

  const result = await stagehand.extract(instruction)

  return {
    extraction: result.extraction,
  }
}
