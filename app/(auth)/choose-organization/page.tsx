import { OrganizationList } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function ChooseOrganizationPage() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <OrganizationList
        hidePersonal={false}
        afterSelectOrganizationUrl="/"
        afterCreateOrganizationUrl="/"
      />
    </div>
  )
}
