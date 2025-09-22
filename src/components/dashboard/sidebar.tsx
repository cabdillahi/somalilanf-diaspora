import { DesktopSidebar } from "./sidebar/desktop-sidebar";
import { MobileSidebar } from "./sidebar/mobile-sidebar";

export function Sidebar() {
  return (
    <>
      <div>
        <DesktopSidebar />
        <MobileSidebar />
      </div>
    </>
  );
}
