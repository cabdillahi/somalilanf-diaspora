"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: any;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarItemProps) {
  return href ? (
    <>
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start  cursor-pointer gap-3 px-4 py-3 h-auto text-left font-normal transition-all duration-300 ease-in-out",
            "hover:bg-green-600/20 hover:text-white hover:translate-x-1",
            isActive && "bg-green-600/30 text-white translate-x-1"
          )}
          onClick={onClick}
        >
          <span className="text-lg transition-transform duration-300 ease-in-out group-hover:scale-110">
            {icon}
          </span>
          <span className="text-smr">{label}</span>
        </Button>
      </Link>
    </>
  ) : (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start  cursor-pointer gap-3 px-4 py-3 h-auto text-left font-normal transition-all duration-300 ease-in-out",
        "hover:bg-green-600/20 hover:text-white hover:translate-x-1",
        isActive && "bg-green-600/30 text-white translate-x-1"
      )}
      onClick={onClick}
    >
      <span className="text-lg transition-transform duration-300 ease-in-out group-hover:scale-110">
        {icon}
      </span>
      <span className="text-smr">{label}</span>
    </Button>
  );
}
