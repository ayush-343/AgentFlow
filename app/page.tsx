import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <UserButton />
      <OrganizationSwitcher
        hidePersonal={false}
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
      />
    </div>
  )
}
