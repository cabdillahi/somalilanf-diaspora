import { Card, CardContent } from "@/components/ui/card"
import { Users, Users2, FileText, TrendingUp, TrendingDown } from "lucide-react"

const kpiData = [
  {
    title: "Total Users",
    value: "1,452",
    change: "+3.5%",
    trend: "up",
    subtitle: "from last month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Groups",
    value: "28,452",
    change: "+8.1%",
    trend: "up",
    subtitle: "from last week",
    icon: Users2,
    color: "text-green-600",
  },
  {
    title: "Published Articles",
    value: "3844",
    change: "-2.3%",
    trend: "down",
    subtitle: "from yesterday",
    icon: FileText,
    color: "text-purple-600",
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={index} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                    <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <TrendIcon className={`h-3 w-3 ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                      <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>{kpi.change}</span>
                      <span>{kpi.subtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
