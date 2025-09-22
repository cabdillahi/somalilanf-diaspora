import { SidebarHeader } from "./sidebar-header"
import { SidebarNavigation } from "./sidebar-navigation"

interface SidebarContentProps {
  onItemClick?: () => void
}

export function SidebarContent({ onItemClick }: SidebarContentProps) {
  return (
    <div className="h-full bg-green-700 text-white flex flex-col">
      <SidebarHeader />
      <SidebarNavigation onItemClick={onItemClick} />
    </div>
  )
}
