"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
    roomId: string;
    children: ReactNode;
}

export function Room({ roomId, children }: RoomProps) {
    return (
        <LiveblocksProvider
            throttle={16}
            publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}>
            <RoomProvider id={roomId}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
