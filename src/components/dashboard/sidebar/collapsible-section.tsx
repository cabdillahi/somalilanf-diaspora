"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  icon,
  label,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("transition-all duration-300 ease-in-out")}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between gap-3 px-4 py-3 h-auto text-left font-normal transition-all duration-300 ease-in-out hover:bg-green-600/20 hover:text-white hover:translate-x-1 group"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg transition-transform duration-300 ease-in-out group-hover:scale-110">
              {icon}
            </span>
            <span className="text-sm">{label}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-all duration-300 ease-in-out",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="space-y-1 pl-4 pt-2 pb-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
