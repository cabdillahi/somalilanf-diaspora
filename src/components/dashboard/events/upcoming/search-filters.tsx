"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { CreateUpcomingEvent } from "./create-upcoming-event";

interface SearchFilterUpcomingProps {
  onSearchChange?: (search: string) => void;
  searchValue?: string;
}

export function SearchFilterUpcoming({
  onSearchChange,
  searchValue = "",
}: SearchFilterUpcomingProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* Search input */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Events
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title or ID..."
              className="pl-10"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Create Event
          </Button>
        </div>

        {/* Dialog */}
        <CreateUpcomingEvent
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    </div>
  );
}
