"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Workflow as WorkflowIcon } from "lucide-react"

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

import type { Workflow } from "@/lib/db/schema"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

interface WorkflowNavProps {
  workflows: Pick<Workflow, "id" | "name">[]
  createWorkflowAction: (name: string) => Promise<void>
}

export function WorkflowNav({
  workflows,
  createWorkflowAction,
}: WorkflowNavProps) {
  const { state } = useSidebar()
  const pathname = usePathname()

  const handleCreateWorkflow = () => {
    const name = generateSlug()
    createWorkflowAction(name)
  }

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Workflows">
                  <WorkflowIcon className="size-4 shrink-0" />
                  <span className="sr-only">Workflows</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-56 p-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="gap-2 font-normal"
                      onClick={handleCreateWorkflow}
                    >
                      <Plus className="size-4" />
                      <span>New workflow</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <Separator className="my-1" />
                <SidebarMenu className="gap-y-0.5">
                  {workflows.map((workflow) => {
                    const href = `/workflows/${workflow.id}`
                    const isActive = pathname === href

                    return (
                      <SidebarMenuItem key={workflow.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className="h-9 font-normal px-3"
                        >
                          <Link href={href}>
                            <span>{workflow.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
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
      <SidebarGroupAction
        title="Add workflow"
        onClick={handleCreateWorkflow}
      >
        <Plus className="size-4" />
        <span className="sr-only">Add workflow</span>
      </SidebarGroupAction>

      <SidebarGroupContent className="mt-1">
        <SidebarMenu className="gap-y-0.5">
          {workflows.map((workflow) => {
            const href = `/workflows/${workflow.id}`
            const isActive = pathname === href

            return (
              <SidebarMenuItem key={workflow.id}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={workflow.name}
                  className="h-9 font-normal px-3"
                >
                  <Link href={href}>
                    <span>{workflow.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}