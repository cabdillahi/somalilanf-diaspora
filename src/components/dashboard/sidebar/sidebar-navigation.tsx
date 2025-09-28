"use client";

import {
  Bell,
  Calendar,
  Circle,
  ClipboardMinus,
  FileText,
  Fingerprint,
  Heart,
  Home,
  NotebookText,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { CollapsibleSection } from "./collapsible-section";
import { SidebarItem } from "./sidebar-item";
interface SidebarNavigationProps {
  onItemClick?: () => void;
}

export function SidebarNavigation({ onItemClick }: SidebarNavigationProps) {
  const [activeItem, setActiveItem] = useState("dashboards");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    onItemClick?.();
  };

  return (
    <div className="flex-1 overflow-y-auto py-4 transition-all duration-300 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-800">
      <nav className="space-y-2 px-2">
        {/* Overview Section */}
        <div className="mb-6">
          <h3 className="px-4 py-2 text-xs font-medium text-green-200 uppercase tracking-wider">
            Overview
          </h3>
          <SidebarItem
            icon={<Home />}
            label="Dashboards"
            href="/dashboard"
            isActive={activeItem === "dashboards"}
            onClick={() => handleItemClick("dashboards")}
          />
        </div>

        {/* Content Management Section */}
        <div className="mb-6">
          <h3 className="px-4 py-2 text-xs font-medium text-green-200 uppercase tracking-wider">
            Content Management
          </h3>
          <div className="space-y-1">
            <SidebarItem
              icon={<Users />}
              label="Groups"
              href={"/dashboard/groups"}
              isActive={activeItem === "groups"}
              onClick={() => handleItemClick("groups")}
            />
            <SidebarItem
              icon={<FileText />}
              label="Articles"
              isActive={activeItem === "articles"}
              href={"/dashboard/articles"}
              onClick={() => handleItemClick("articles")}
            />
            <SidebarItem
              icon={<NotebookText />}
              label="Resources"
              isActive={activeItem === "resources"}
              onClick={() => handleItemClick("resources")}
            />
          </div>
        </div>

        {/* Event Management Section */}
        <div className="mb-6">
          <h3 className="px-4 py-2 text-xs font-medium text-green-200 uppercase tracking-wider">
            Event Management
          </h3>
          <div className="space-y-1">
            <CollapsibleSection
              icon={<Calendar />}
              label="Events"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Upcoming Events"
                href={"/dashboard/events/upcoming"}
                isActive={activeItem === "upcoming-events"}
                onClick={() => handleItemClick("upcoming-events")}
              />
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Past Events"
                isActive={activeItem === "past-events"}
                onClick={() => handleItemClick("past-events")}
              />
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Event Categories"
                isActive={activeItem === "event-categories"}
                onClick={() => handleItemClick("event-categories")}
              />
            </CollapsibleSection>

            <CollapsibleSection
              icon={<Heart />}
              label="Volunteers"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Active Volunteers"
                isActive={activeItem === "active-volunteers"}
                onClick={() => handleItemClick("active-volunteers")}
              />
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Volunteer Applications"
                isActive={activeItem === "volunteer-applications"}
                onClick={() => handleItemClick("volunteer-applications")}
              />
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Volunteer Programs"
                isActive={activeItem === "volunteer-programs"}
                onClick={() => handleItemClick("volunteer-programs")}
              />
            </CollapsibleSection>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="px-4 py-2 text-xs font-medium text-green-200 uppercase tracking-wider">
            Communication
          </h3>
          <div className="space-y-1">
            <CollapsibleSection
              icon={<Calendar />}
              label="Announcements"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Announcements"
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
            <CollapsibleSection
              icon={<Bell />}
              label="Notifications"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label="Notifications"
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="px-4 py-2 text-xs font-medium text-green-200 uppercase tracking-wider">
            Analytics & Reports
          </h3>
          <div className="space-y-1">
            <CollapsibleSection
              icon={<Circle />}
              label="User Insights"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 hidden bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label=""
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
            <CollapsibleSection
              icon={<Users />}
              label="Group Engagement"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 hidden bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label=""
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
            <CollapsibleSection
              icon={<ClipboardMinus />}
              label="Event Reports"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 hidden bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label=""
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="px-4 py-2 text-xs font-medium text-green-200 uppercase tracking-wider">
            System & Security
          </h3>
          <div className="space-y-1">
            <CollapsibleSection
              icon={<Settings />}
              label="Settings"
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 hidden bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label=""
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
            <CollapsibleSection
              icon={<Fingerprint />}
              label="Security "
              defaultOpen={false}
            >
              <SidebarItem
                icon={
                  <div className="w-2 h-2 hidden bg-green-300 rounded-full transition-all duration-300 ease-in-out hover:scale-125" />
                }
                label=""
                href={"#"}
                // isActive={activeItem === "upcoming-events"}
                // onClick={() => handleItemClick("upcoming-events")}
              />
            </CollapsibleSection>
          </div>
        </div>
      </nav>
    </div>
  );
}
