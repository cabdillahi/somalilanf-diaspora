"use client";

import { SearchFilterUpcoming } from "@/components/dashboard/events/upcoming/search-filters";
import { UpcomingTable } from "@/components/dashboard/events/upcoming/upcoming-table";
import { useCallback, useState } from "react";

export default function EventsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearchValue(newSearch);
  }, []);

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatusFilter(newStatus);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">events Management</h1>
        <p className="text-muted-foreground">
          Manage your eventss with search and filtering capabilities
        </p>
      </div>

      <SearchFilterUpcoming
        onSearchChange={handleSearchChange}
        onStatusFilter={handleStatusChange}
        searchValue={searchValue}
        statusFilter={statusFilter}
      />

      <UpcomingTable searchValue={searchValue} statusFilter={statusFilter} />
    </div>
  );
}
