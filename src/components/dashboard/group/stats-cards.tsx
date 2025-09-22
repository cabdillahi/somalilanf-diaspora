import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, Activity, Clock } from "lucide-react"

// Define the structure for each metric card
interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  iconBgColor: string
}

function StatCard({ title, value, icon, iconBgColor }: StatCardProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {/* Card title with muted styling */}
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            {/* Large metric value */}
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          {/* Colored icon container */}
          <div className={`p-3 rounded-full ${iconBgColor}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  // Sample data matching the dashboard design
  const stats = [
    {
      title: "Total Groups",
      value: "130",
      icon: <Users className="h-6 w-6 text-white" />,
      iconBgColor: "bg-green-500",
    },
    {
      title: "Total Members",
      value: "305,723",
      icon: <UserCheck className="h-6 w-6 text-white" />,
      iconBgColor: "bg-orange-500",
    },
    {
      title: "Groups Active",
      value: "90",
      icon: <Activity className="h-6 w-6 text-white" />,
      iconBgColor: "bg-blue-500",
    },
    {
      title: "Groups Pending",
      value: "40",
      icon: <Clock className="h-6 w-6 text-white" />,
      iconBgColor: "bg-red-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
