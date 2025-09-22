import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Brand logo design",
    assignee: "Assigned to Jama",
    status: "Active",
    priority: "high",
    dueDate: "2 days",
  },
  {
    id: 2,
    title: "Blog Template UI",
    assignee: "Assigned to Dharma",
    status: "Pending",
    priority: "medium",
    dueDate: "5 days",
  },
  {
    id: 3,
    title: "Multipurpose Landing",
    assignee: "Assigned to Haarith",
    status: "Active",
    priority: "high",
    dueDate: "1 week",
  },
  {
    id: 4,
    title: "Redesign - Landing page",
    assignee: "Assigned to Dharma",
    status: "Pending",
    priority: "low",
    dueDate: "2 weeks",
  },
];

const statusColors: any = {
  Active: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

const priorityColors: any = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
};

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Upcoming Events</CardTitle>
        <Button variant="ghost" size="sm">
          <Calendar className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 rounded-lg border"
          >
            <div className="flex-shrink-0 mt-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  priorityColors[event.priority]
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium mb-1">{event.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">
                {event.assignee}
              </p>
              <div className="flex items-center justify-between">
                <Badge
                  className={statusColors[event.status]}
                  variant="secondary"
                >
                  {event.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {event.dueDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
