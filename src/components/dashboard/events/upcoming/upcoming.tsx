import { DashboardHeader } from "../../home/dashboard-header";
import { SearchFilterUpcoming } from "./search-filters";
import { UpcomingTable } from "./upcoming-table";

export default function Upcoming() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6 overflow-y-scroll h-[90vh] max-w-7xl">
        <SearchFilterUpcoming />
        <UpcomingTable />
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          2025© Somaliland Diaspora Engagement Platform. Design & Develop by
          Tijgal Solutions
        </footer>
      </div>
    </div>
  );
}
