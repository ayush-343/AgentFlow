import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  let body: { userIds?: string[] }
  try {
    body = await request.json()
  } catch {
    return new Response("Invalid JSON payload", { status: 400 })
  }

  const { userIds } = body

  if (!userIds || !Array.isArray(userIds)) {
    return new Response("userIds must be an array of user IDs", { status: 400 })
  }

  if (userIds.length === 0) {
    return Response.json([])
  }

  try {
    // Only resolve users that belong to the caller's organization, so display
    // info can't be harvested for arbitrary users across other tenants.
    const client =
      typeof clerkClient === "function" ? await clerkClient() : clerkClient
    const response = await client.users.getUserList({
      userId: userIds,
      organizationId: [orgId],
      limit: Math.min(userIds.length, 500),
    })

    const clerkUsers = Array.isArray(response) ? response : response.data

    const userMap = new Map(
      clerkUsers.map((u) => [
        u.id,
        {
          name:
            u.fullName ||
            [u.firstName, u.lastName].filter(Boolean).join(" ") ||
            u.emailAddresses?.[0]?.emailAddress ||
            "Anonymous",
          avatar: u.imageUrl,
        },
      ])
    )

    const result = userIds.map((id) => userMap.get(id) ?? null)

    return Response.json(result)
  } catch (error) {
    console.error("Error resolving users from Clerk:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
