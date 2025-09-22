import { DashboardHeader } from "../home/dashboard-header";
import { GroupsTable } from "./groups-table";
import { SearchFilters } from "./search-filters";
import { StatsCards } from "./stats-cards";

export default function Group() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6 overflow-y-scroll h-[90vh] max-w-7xl">
        <SearchFilters />
        <GroupsTable />
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          2025© Somaliland Diaspora Engagement Platform. Design & Develop by
          Tijgal Solutions
        </footer>
      </div>
    </div>
  );
}
