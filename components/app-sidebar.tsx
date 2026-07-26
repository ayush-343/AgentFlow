"use client"

import * as React from "react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus, Workflow } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const WORKFLOWS = [
  { title: "dominant-wasp" },
  { title: "honest-reindeer" },
  { title: "expected-llama" },
  { title: "essential-ocelot" },
  { title: "creepy-echidna" },
  { title: "eastern-silkworm" },
  { title: "cultural-lion" },
  { title: "proud-weasel" },
  { title: "regional-bonobo" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedWorkflow, setSelectedWorkflow] = React.useState("dominant-wasp")

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
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            Workflows
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add workflow">
            <Plus className="size-4" />
            <span className="sr-only">Add workflow</span>
          </SidebarGroupAction>

          <SidebarGroupContent className="mt-1">
            <SidebarMenu className="gap-y-0.5">
              {WORKFLOWS.map((workflow) => (
                <SidebarMenuItem key={workflow.title}>
                  <SidebarMenuButton
                    isActive={selectedWorkflow === workflow.title}
                    tooltip={workflow.title}
                    onClick={() => setSelectedWorkflow(workflow.title)}
                    className="h-9 font-normal px-3"
                  >
                    <Workflow className="size-4 shrink-0" />
                    <span>{workflow.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:items-center">
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "w-full justify-start group-data-[collapsible=icon]: justify-center",
              userButtonOuterIdentifier: "group-data-[collapsible=icon]: hidden",
            }
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
