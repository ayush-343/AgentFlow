"use client"

import * as React from "react"
import { Plus, Workflow } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

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

export function WorkflowNav() {
  const { state } = useSidebar()
  const [selectedWorkflow, setSelectedWorkflow] = React.useState("dominant-wasp")

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Workflows">
                  <Workflow className="size-4 shrink-0" />
                  <span className="sr-only">Workflows</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-56 p-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-2 font-normal">
                      <Plus className="size-4" />
                      <span>New workflow</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <Separator className="my-1" />
                <SidebarMenu className="gap-y-0.5">
                  {WORKFLOWS.map((workflow) => (
                    <SidebarMenuItem key={workflow.title}>
                      <SidebarMenuButton
                        isActive={selectedWorkflow === workflow.title}
                        onClick={() => setSelectedWorkflow(workflow.title)}
                        className="h-9 font-normal px-3"
                      >
                        <span>{workflow.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
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
                <span>{workflow.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
