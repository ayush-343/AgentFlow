import { auth } from "@clerk/nextjs/server"
import Browserbase from "@browserbasehq/sdk"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  props: { params: Promise<{ sessionId: string }> }
) {
  const { orgId } = await auth()
  if (!orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { sessionId } = await props.params
  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 })
  }

  const browserbase = new Browserbase({
    apiKey: process.env.BROWSERBASE_API_KEY,
  })

  try {
    const replay = await browserbase.sessions.replays.retrieve(sessionId)

    if (!replay?.pages || replay.pages.length === 0) {
      return NextResponse.json(
        { status: "not_ready", message: "Recording not ready" },
        { status: 404 }
      )
    }

    const pageId = replay.pages[0].pageId
    const response = await browserbase.sessions.replays.retrievePage(
      sessionId,
      pageId
    )
    const playlistText = await response.text()

    return new Response(playlistText, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string }
    const status = typeof err.status === "number" ? err.status : 404
    return NextResponse.json(
      { status: "not_ready", message: err.message || "Recording not ready" },
      { status }
    )
  }
}
