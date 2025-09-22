import { SidebarContent } from "./sidebar-content";

export function DesktopSidebar() {
  return (
    <div className="hidden lg:block w-80 h-screen">
      <SidebarContent />
    </div>
  );
}
