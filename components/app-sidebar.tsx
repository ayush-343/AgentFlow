import * as React from "react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { listWorkflows } from "@/features/workflows/data"
import { createWorkflowAction } from "@/features/workflows/actions"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center">
        <div className="group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher
            hidePersonal={false}
            afterSelectOrganizationUrl="/"
            afterCreateOrganizationUrl="/"
            appearance={{
              elements: {
                organizationSwitcherTrigger:
                  "focus:shadow-none focus:outline-none text-sidebar-foreground",
              },
            }}
          />
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <WorkflowNav
          workflows={workflows}
          createWorkflowAction={createWorkflowAction}
        />
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:items-center">
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "w-full justify-start group-data-[collapsible=icon]:justify-center",
              userButtonOuterIdentifier: "group-data-[collapsible=icon]:hidden",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
