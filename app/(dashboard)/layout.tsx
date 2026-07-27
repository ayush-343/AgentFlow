import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="h-svh">
      <AppSidebar />
      <SidebarInset className="shadow-none!-0 min-h-0 overflow-hidden border">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
