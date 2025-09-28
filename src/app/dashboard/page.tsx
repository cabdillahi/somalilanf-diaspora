import { ActivityFeed } from "@/components/dashboard/home/activity-feed";
import { AnalyticsCharts } from "@/components/dashboard/home/analytics-charts";
import { ArticlesSection } from "@/components/dashboard/home/articles-section";
import { EventsSection } from "@/components/dashboard/home/events-section";
import { KpiCards } from "@/components/dashboard/home/kpi-cards";
import { WelcomeSection } from "@/components/dashboard/home/welcome-section";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome and KPI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <WelcomeSection />
          </div>
          <div className="lg:col-span-3">
            <KpiCards />
          </div>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Activity Feed and Events */}
          <div className="xl:col-span-1 space-y-6">
            <ActivityFeed />
            <EventsSection />
          </div>

          {/* Right Columns - Charts and Articles */}
          <div className="xl:col-span-2 space-y-6">
            <AnalyticsCharts />
            <ArticlesSection />
          </div>
        </div>
      </main>
    </div>
  );
}
