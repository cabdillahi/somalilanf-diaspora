import { UserPlus, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    type: "registration",
    title: "New Registrations",
    description: "12 new users in last 24 hours",
    count: "12",
    change: "+20%",
    changeType: "increase" as const,
    subtitle: "from previous period",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    type: "submission",
    title: "Content Submissions",
    description: "5 articles awaiting approval",
    count: "5",
    change: "",
    changeType: "neutral" as const,
    subtitle: "awaiting approval",
    icon: FileText,
    color: "text-blue-600",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <span className="text-lg font-semibold">{activity.count}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  {activity.change && (
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {activity.change}
                    </Badge>
                  )}
                  <span className="text-muted-foreground">{activity.subtitle}</span>
                </div>
              </div>
            </div>
            {index < activities.length - 1 && <div className="border-b" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
