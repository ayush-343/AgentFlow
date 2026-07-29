"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { AlertCircle, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface SessionReplayProps {
  sessionId: string
  className?: string
}

export function SessionReplay({ sessionId, className }: SessionReplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Poll the replay route until the HLS playlist is ready
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    let isCancelled = false

    async function checkStatus() {
      try {
        const res = await fetch(`/api/replays/${sessionId}`, {
          method: "GET",
          cache: "no-store",
        })

        if (isCancelled) return

        if (res.ok) {
          setIsReady(true)
          setIsLoading(false)
          setError(null)
          return
        }

        if (res.status === 401) {
          setError("Unauthorized to view this session replay.")
          setIsLoading(false)
          return
        }

        // Not ready yet (e.g. 404 or not_ready status); keep polling every 2 seconds
        timerId = setTimeout(checkStatus, 2000)
      } catch (err) {
        if (isCancelled) return
        timerId = setTimeout(checkStatus, 2000)
      }
    }

    setIsReady(false)
    setIsLoading(true)
    setError(null)
    checkStatus()

    return () => {
      isCancelled = true
      if (timerId) clearTimeout(timerId)
    }
  }, [sessionId])

  // Attach hls.js to the video element once the playlist is ready
  useEffect(() => {
    if (!isReady || !videoRef.current) return

    const video = videoRef.current
    const playlistUrl = `/api/replays/${sessionId}`
    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
      })
      hls.loadSource(playlistUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay might be blocked by browser policy
        })
      })
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError()
              break
            default:
              hls?.destroy()
              break
          }
        }
      })
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = playlistUrl
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {})
      })
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [isReady, sessionId])

  if (error) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-4 text-xs text-destructive",
          className
        )}
      >
        <AlertCircle className="size-5" />
        <span>{error}</span>
      </div>
    )
  }

  if (isLoading || !isReady) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-4 text-xs text-muted-foreground",
          className
        )}
      >
        <Loader2 className="size-5 animate-spin text-primary" />
        <span>Preparing session replay recording...</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden rounded-md bg-black",
        className
      )}
    >
      <video
        ref={videoRef}
        controls
        playsInline
        className="size-full object-contain"
      />
    </div>
  )
}
