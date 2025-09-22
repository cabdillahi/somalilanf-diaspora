import { ActivityFeed } from "@/components/dashboard/home/activity-feed";
import { DashboardHeader } from "@/components/dashboard/home/dashboard-header";
import { GroupsAnalytics } from "@/components/dashboard/home/groups-analytics";
import { PopularArticles } from "@/components/dashboard/home/popular-articles";
import { StatsCards } from "@/components/dashboard/home/stats-cards";
import { UpcomingEvents } from "@/components/dashboard/home/upcoming-events";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somaliland Diaspora | Dashboard",
  description: "Somaliland Diaspora Engagement Platform.",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen w-full overflow-y-scroll scrollHidden  ">
      <main className="flex-1 space-y-6 p-6 ">
        {/* Welcome Section & Stats */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed />
            <div className="mt-6">
              <UpcomingEvents />
            </div>
          </div>

          {/* Right Column - Analytics & Articles */}
          <div className="lg:col-span-2 space-y-6">
            <GroupsAnalytics />
            <PopularArticles />
          </div>
        </div>
      </main>
    </div>
  );
}
