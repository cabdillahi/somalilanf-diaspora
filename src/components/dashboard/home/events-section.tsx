import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2 } from "lucide-react"

const eventsData = [
  {
    id: 1,
    title: "Brand logo design",
    assignee: "Assigned to Jama",
    status: "active",
    completed: false,
  },
  {
    id: 2,
    title: "Blog Template UI",
    assignee: "Assigned to Dianna",
    status: "pending",
    completed: false,
  },
  {
    id: 3,
    title: "Multipurpose Landing",
    assignee: "Assigned to Team B",
    status: "pending",
    completed: false,
  },
  {
    id: 4,
    title: "Redesign - Landing page",
    assignee: "Assigned to Dianna",
    status: "pending",
    completed: false,
  },
]

export function EventsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4 mb-4">
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
              Active
            </Badge>
            <Badge variant="secondary">Pending</Badge>
          </div>

          <div className="space-y-3">
            {eventsData.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                <Checkbox
                  checked={event.completed}
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />

                <div className="flex-1 space-y-1">
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs text-muted-foreground">{event.assignee}</div>
                </div>

                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-muted rounded">
                    <Edit className="h-3 w-3 text-green-600" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded">
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
