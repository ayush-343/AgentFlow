"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Spinner } from "@/components/ui/spinner";

interface RoomProps {
    roomId: string;
    children: ReactNode;
}

export function Room({ roomId, children }: RoomProps) {
    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint="/api/liveblocks/auth"
            resolveUsers={async ({ userIds }) => {
                try {
                    const response = await fetch("/api/liveblocks/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userIds }),
                    });

                    if (!response.ok) {
                        return undefined;
                    }


                    return await response.json();
                } catch {
                    return undefined;
                }
            }}>
            <RoomProvider id={roomId}>
                <ClientSideSuspense
                    fallback={
                        <div className="flex items-center justify-center min-h-svh">
                            <Spinner
                                className="size-8 text-muted-foreground"
                                aria-label="Loading room…"
                            />
                        </div>
                    }>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
