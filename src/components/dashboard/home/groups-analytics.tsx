import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, FileText } from "lucide-react"

const activityData = [
  {
    type: "registration",
    title: "New Registrations:",
    count: "12 new users in last 24 hours",
    change: "+30%",
    changeType: "increase",
    subtitle: "from previous period",
    icon: UserPlus,
    color: "text-blue-600",
  },
  {
    type: "content",
    title: "Content Submissions:",
    count: "5 articles awaiting approval",
    change: "",
    changeType: "",
    subtitle: "",
    icon: FileText,
    color: "text-orange-600",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activityData.map((activity, index) => {
          const Icon = activity.icon

          return (
            <div key={index} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">{activity.title}</div>
                  <div className="text-sm font-semibold">{activity.count}</div>
                  {activity.change && (
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={activity.changeType === "increase" ? "default" : "secondary"}
                        className={`text-xs ${
                          activity.changeType === "increase"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        {activity.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.subtitle}</span>
                    </div>
                  )}
                </div>
              </div>

              {activity.type === "content" && (
                <div className="ml-11">
                  <Badge variant="destructive" className="text-xs">
                    View Details →
                  </Badge>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
