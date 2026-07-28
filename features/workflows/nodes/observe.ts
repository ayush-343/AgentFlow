import type { Stagehand } from "@browserbasehq/stagehand"

export async function observe({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const page = stagehand.context.pages()[0]
  if (!page) throw new Error("No page available")

  const actions = await stagehand.observe(instruction)

  return {
    matches: actions.map((action) => ({
      selector: action.selector,
      description: action.description,
    })),
  }
}
