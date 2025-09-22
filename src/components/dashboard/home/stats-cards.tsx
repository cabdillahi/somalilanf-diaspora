import { TrendingUp, TrendingDown, Users, FileText, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Users",
    value: "1,452",
    change: "+12%",
    changeType: "increase" as const,
    subtitle: "from last month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Groups",
    value: "28,452",
    change: "+8%",
    changeType: "increase" as const,
    subtitle: "from last week",
    icon: Globe,
    color: "text-green-600",
  },
  {
    title: "Published Articles",
    value: "3844",
    change: "+2%",
    changeType: "increase" as const,
    subtitle: "from yesterday",
    icon: FileText,
    color: "text-purple-600",
  },
]

export function StatsCards() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-green-800 mb-1">Welcome Back !</h1>
            <p className="text-green-700 text-sm mb-2">Specialized Diaspora Admin Portal</p>
            <div className="space-y-1 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>v1.2</span>
              </div>
              <div className="text-xs text-green-600">Last login 2025-01-01</div>
            </div>
          </div>
          <Badge variant="destructive" className="bg-red-500 text-white">
            Live Demo
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                </div>
                <span>{stat.subtitle}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
