/**
 * Resolves a nested property path from an object or array.
 * E.g. "someNodeId.items[0].name" -> obj["someNodeId"]["items"][0]["name"]
 */
export function getByPath(obj: unknown, path: string): unknown {
  if (obj == null) return undefined
  const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1")
  const keys = normalizedPath.split(".")

  let current: any = obj
  for (const key of keys) {
    const trimmed = key.trim()
    if (!trimmed) continue
    if (current == null || typeof current !== "object") {
      return undefined
    }
    current = current[trimmed]
  }
  return current
}

/**
 * Replaces placeholders in `text` matching `{{ path }}` with values from `outputs`.
 *
 * - If a placeholder resolves to nothing (null/undefined), it is replaced with `""`.
 * - If a placeholder resolves to an object/array, it is replaced with `JSON.stringify(val)`.
 * - Otherwise, it is converted to string.
 */
export function interpolate(
  text: string,
  outputs: Record<string, unknown>
): string {
  if (!text) return ""

  return text.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, path: string) => {
    const val = getByPath(outputs, path)

    if (val === undefined || val === null) {
      return ""
    }

    if (typeof val === "object") {
      return JSON.stringify(val)
    }

    return String(val)
  })
}
